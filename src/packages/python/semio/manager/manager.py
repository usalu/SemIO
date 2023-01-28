from __future__ import annotations
from abc import ABC,abstractmethod
from typing import Iterable,Tuple
from pydantic import Field

from grpc import insecure_channel

from .v1.manager_pb2 import DESCRIPTOR, ElementRequest, ConnectElementRequest, ConnectElementResponse,RegisterExtensionRequest,RegisterExtensionResponse
from .v1.manager_pb2_grpc import add_ManagerServiceServicer_to_server, ManagerServiceServicer, ManagerServiceStub
from semio.model import Point,Pose,Platform,Sobject,Connection,Element
from semio.extension import Extending
from semio.utils import SemioServer, SemioServiceDescription, SemioProxy, SemioService
from semio.constants import DEFAULT_MANAGER_PORT, DEFAULT_ASSEMBLER_PORT

class ManagerServer(SemioServer,SemioService,ABC):
    assemblerAddress: str = "localhost:"+str(DEFAULT_ASSEMBLER_PORT)
    extensions: dict[str,Extending]= Field(default_factory=dict, description="Extensions with address as key and extension description as value.")
    
    def __init__(self,port = DEFAULT_MANAGER_PORT, name = "Python Semio Manager Server", **kw):
        super().__init__(port=port,name=name, **kw)

    def getServicesDescriptions(self):
        return [SemioServiceDescription(service=self,servicer=ManagerServiceServicer,add_Service_to_server=add_ManagerServiceServicer_to_server,descriptor=DESCRIPTOR)]

    def getAssemblerProxy(self):#->AssemblerProxy:
        """Get the assembler proxy. The proxy needs to be created at runtime to avoid cyclic imports between proxies and servers."""
        if not hasattr(self,'assemblerProxy'):
            from assembler import AssemblerProxy
            self.assemblerProxy = AssemblerProxy(self.assemblerAddress)
        return self.assemblerProxy

    def getExtensionProxy(self,extensionAddress: str):#->ExtensionProxy
        """Get the extension proxy for an address. The proxy needs to be created at runtime to avoid cyclic imports between proxies and servers."""
        if not extensionAddress in self.extensions:
            raise ValueError(f'There is no extension registered at {extensionAddress}. Make sure that the extension initializes properly.')
        if not hasattr(self,'extensionsProxies'):
            from extension import ExtensionProxy
            self.extensionsProxies = {extensionAddress:ExtensionProxy(extensionAddress)}
        if not extensionAddress in self.extensionsProxies:
            from extension import ExtensionProxy
            self.extensionsProxies[extensionAddress] = ExtensionProxy(extensionAddress)
        return self.extensionsProxies[extensionAddress]

    @abstractmethod
    def requestElement(self, 
        sobject:Sobject,
        target_representation_platforms:Iterable[Platform] | None = None,
        target_representation_concepts:Iterable[str] | None = None,
        target_representation_lods:Iterable[int] | None = None,
        targets_required: bool = False)->Element:
        pass

    def RequestElement(self, request, context):
        return self.requestElement(
            request.sobject,
            request.target_representation_platforms,
            request.target_representation_concepts,
            request.target_representation_lods,
            request.targets_required)
    
    @abstractmethod
    def connectElement(self, 
        connected_sobject: Sobject,
        connecting_sobject:Sobject,
        connection: Connection)->Tuple[Pose,Point]:
        pass

    def ConnectElement(self, request, context):
        connected_element_pose,connection_point = self.connectElement(
            request.connected_sobject,
            request.connecting_sobject,
            request.connection)
        return ConnectElementResponse(connected_element_pose=connected_element_pose,connection_point=connection_point)

    def registerExtension(self, 
        extending: Extending,
        replace_existing: bool = True)->Tuple[bool,str]:
        oldAddress= ""
        for extensionAddress, extension in self.extensions.items():
            if extension.name == extending.name:
                if replace_existing:
                    oldAddress = extensionAddress
                else:
                    raise ValueError(f'There is already an extension with the name {extension.name}. If you wish to replace it set replace existing to true.')
        self.extensions[extending.address]=extending
        return (True,oldAddress)

    def RegisterExtension(self,request, context):
        success,oldAddress = self.registerExtension(**request)
        return RegisterExtensionResponse(success=success,old_address=oldAddress)

    def getRegisteredExtensions(self)->Iterable[Extending]:
        return self.extensions.values()
    
    def GetRegisteredExtensions(self, request, context):
        return self.getRegisteredExtensions

class ManagerProxy(SemioProxy):
    def __init__(self,address ='localhost:'+str(DEFAULT_MANAGER_PORT), **kw):
        super().__init__(address=address,**kw)
        self._stub = ManagerServiceStub(insecure_channel(self.address))

    def RequestElement(
        self, sobject: Sobject = Sobject(),
        target_representation_platforms:Iterable[Platform] = [],
        target_representation_concepts:Iterable[str] = [],
        target_representation_lods:Iterable[int] = [],
        targets_required:bool = False)-> Element:
        return self._stub.RequestElement(ElementRequest(
            sobject=sobject,
            target_representation_platforms=target_representation_platforms,
            target_representation_concepts=target_representation_concepts,
            target_representation_lods=target_representation_lods,
            targets_required=targets_required))

    def ConnectElement(self,
        sobjects:Tuple[Sobject,Sobject],
        connection:Connection)->Tuple[Pose,Point]:
        connectElementResponse = self._stub.ConnectElement(request=ConnectElementRequest(
            connected_sobject=sobjects[0],
            connecting_sobject=sobjects[1],
            connection=connection))
        return (connectElementResponse.connected_element_pose,connectElementResponse.connection_point)

    def RegisterExtension(self,extending:Extending, replace_existing=True):
        registerExtensionResponse = self._stub.RegisterExtension(
            request=RegisterExtensionRequest(
                extending=extending,replace_existing=replace_existing))
        return (registerExtensionResponse.success,registerExtensionResponse.old_address)

    def GetRegisteredExtensions(self)->Iterable[Extending]:
        registeredExtensionsResponse = self._stub.GetRegisteredExtensions()
        return registeredExtensionsResponse.extensions



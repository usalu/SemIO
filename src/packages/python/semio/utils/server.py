from concurrent import futures
import grpc
from grpc_reflection.v1alpha import reflection
from grpc.aio import ServicerContext

from typing import Tuple, Any
from collections.abc import Callable

from pydantic import BaseModel, Field

class SemioService(BaseModel):
    servicer:type
    # TODO Update typing to be more specific
    add_Service_to_server: Callable[[Any,Any],Any]
    # TODO Update typing to be more specific
    descriptor: Any

class SemioServer(BaseModel):
    port: int =  Field(default=50000,description="Port of server.")
    name: str = ""
    servicesDescriptions: list[SemioService] = Field(default=None, description="All services")

    def serve(self) -> None:
        """Call this function to start the server."""
        server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        server.add_insecure_port('[::]:' + str(self.port))
        for serviceDescription in SemioServer.servicesDescriptions:
            serviceDescription.add_Service_to_server(serviceDescription.servicer(),server)
            SERVICE_NAMES = (
                serviceDescription.descriptor.services_by_name[serviceDescription.servicer.__name__].full_name,
                reflection.SERVICE_NAME,
            )
            reflection.enable_server_reflection(SERVICE_NAMES, server)    
        server.start()
        print(f"Server {self.name} started, listening on " + str(self.port))
        server.wait_for_termination()

    class Config:
        arbitrary_types_allowed = True


# class AsyncServer(BaseModel):
#     port: int =  Field(default=50000,description="Port of server.")
#     name: str = ""
#     services: list[Service] = Field(default=None, description="All services")

#     async def serve(self) -> None:
#         """Call this function to start the server."""
#         server = grpc.aio.server()
#         server.add_insecure_port('[::]:' + str(self.port))
#         for service in self.services:
#             SERVICE_NAMES = (
#                 service.descriptor.services_by_name[service.type.__name__].full_name,
#                 reflection.SERVICE_NAME,
#             )
#             reflection.enable_server_reflection(SERVICE_NAMES, server)    
#         await server.start()
#         print(f"Server {self.name} started, listening on " + str(self.port))
#         await server.wait_for_termination()

#     class Config:
#         arbitrary_types_allowed = True

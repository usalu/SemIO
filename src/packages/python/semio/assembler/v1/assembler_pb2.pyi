from model.v1 import model_pb2 as _model_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class AssembleLayoutResponse(_message.Message):
    __slots__ = ["elements"]
    ELEMENTS_FIELD_NUMBER: _ClassVar[int]
    elements: _containers.RepeatedCompositeFieldContainer[_model_pb2.Element]
    def __init__(self, elements: _Optional[_Iterable[_Union[_model_pb2.Element, _Mapping]]] = ...) -> None: ...

class LayoutToAssembliesResponse(_message.Message):
    __slots__ = ["assemblies"]
    ASSEMBLIES_FIELD_NUMBER: _ClassVar[int]
    assemblies: _containers.RepeatedCompositeFieldContainer[_model_pb2.Assembly]
    def __init__(self, assemblies: _Optional[_Iterable[_Union[_model_pb2.Assembly, _Mapping]]] = ...) -> None: ...

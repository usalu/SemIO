from google.protobuf import any_pb2 as _any_pb2
from model.v1 import model_pb2 as _model_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class RepresentationConversionRequest(_message.Message):
    __slots__ = ["options", "representation", "target_type"]
    OPTIONS_FIELD_NUMBER: _ClassVar[int]
    REPRESENTATION_FIELD_NUMBER: _ClassVar[int]
    TARGET_TYPE_FIELD_NUMBER: _ClassVar[int]
    options: _any_pb2.Any
    representation: _model_pb2.Representation
    target_type: str
    def __init__(self, representation: _Optional[_Union[_model_pb2.Representation, _Mapping]] = ..., target_type: _Optional[str] = ..., options: _Optional[_Union[_any_pb2.Any, _Mapping]] = ...) -> None: ...

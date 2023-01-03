from google.protobuf import any_pb2 as _any_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Attraction(_message.Message):
    __slots__ = ["attracted", "attractor"]
    ATTRACTED_FIELD_NUMBER: _ClassVar[int]
    ATTRACTOR_FIELD_NUMBER: _ClassVar[int]
    attracted: AttractionParticipant
    attractor: AttractionParticipant
    def __init__(self, attractor: _Optional[_Union[AttractionParticipant, _Mapping]] = ..., attracted: _Optional[_Union[AttractionParticipant, _Mapping]] = ...) -> None: ...

class AttractionChain(_message.Message):
    __slots__ = ["attractions"]
    ATTRACTIONS_FIELD_NUMBER: _ClassVar[int]
    attractions: _containers.RepeatedCompositeFieldContainer[Attraction]
    def __init__(self, attractions: _Optional[_Iterable[_Union[Attraction, _Mapping]]] = ...) -> None: ...

class AttractionParticipant(_message.Message):
    __slots__ = ["sobject_id", "strategy"]
    SOBJECT_ID_FIELD_NUMBER: _ClassVar[int]
    STRATEGY_FIELD_NUMBER: _ClassVar[int]
    sobject_id: str
    strategy: AttractionStragegy
    def __init__(self, sobject_id: _Optional[str] = ..., strategy: _Optional[_Union[AttractionStragegy, _Mapping]] = ...) -> None: ...

class AttractionStragegy(_message.Message):
    __slots__ = ["parameters", "port", "representation"]
    class ParametersEntry(_message.Message):
        __slots__ = ["key", "value"]
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: _any_pb2.Any
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[_any_pb2.Any, _Mapping]] = ...) -> None: ...
    PARAMETERS_FIELD_NUMBER: _ClassVar[int]
    PORT_FIELD_NUMBER: _ClassVar[int]
    REPRESENTATION_FIELD_NUMBER: _ClassVar[int]
    parameters: _containers.MessageMap[str, _any_pb2.Any]
    port: str
    representation: _any_pb2.Any
    def __init__(self, representation: _Optional[_Union[_any_pb2.Any, _Mapping]] = ..., port: _Optional[str] = ..., parameters: _Optional[_Mapping[str, _any_pb2.Any]] = ...) -> None: ...

class Choreography(_message.Message):
    __slots__ = ["attractionChains", "solitary_sobjects"]
    ATTRACTIONCHAINS_FIELD_NUMBER: _ClassVar[int]
    SOLITARY_SOBJECTS_FIELD_NUMBER: _ClassVar[int]
    attractionChains: _containers.RepeatedCompositeFieldContainer[AttractionChain]
    solitary_sobjects: _containers.RepeatedCompositeFieldContainer[Sobject]
    def __init__(self, solitary_sobjects: _Optional[_Iterable[_Union[Sobject, _Mapping]]] = ..., attractionChains: _Optional[_Iterable[_Union[AttractionChain, _Mapping]]] = ...) -> None: ...

class Decision(_message.Message):
    __slots__ = ["modification", "strategy"]
    MODIFICATION_FIELD_NUMBER: _ClassVar[int]
    STRATEGY_FIELD_NUMBER: _ClassVar[int]
    modification: LayoutModification
    strategy: LayoutModificationStrategy
    def __init__(self, modification: _Optional[_Union[LayoutModification, _Mapping]] = ..., strategy: _Optional[_Union[LayoutModificationStrategy, _Mapping]] = ...) -> None: ...

class Design(_message.Message):
    __slots__ = ["elements"]
    ELEMENTS_FIELD_NUMBER: _ClassVar[int]
    elements: _containers.RepeatedCompositeFieldContainer[Element]
    def __init__(self, elements: _Optional[_Iterable[_Union[Element, _Mapping]]] = ...) -> None: ...

class Element(_message.Message):
    __slots__ = ["pose", "representations"]
    POSE_FIELD_NUMBER: _ClassVar[int]
    REPRESENTATIONS_FIELD_NUMBER: _ClassVar[int]
    pose: Pose
    representations: Representations
    def __init__(self, pose: _Optional[_Union[Pose, _Mapping]] = ..., representations: _Optional[_Union[Representations, _Mapping]] = ...) -> None: ...

class Layout(_message.Message):
    __slots__ = ["attractions", "sobjects"]
    ATTRACTIONS_FIELD_NUMBER: _ClassVar[int]
    SOBJECTS_FIELD_NUMBER: _ClassVar[int]
    attractions: _containers.RepeatedCompositeFieldContainer[Attraction]
    sobjects: _containers.RepeatedCompositeFieldContainer[Sobject]
    def __init__(self, sobjects: _Optional[_Iterable[_Union[Sobject, _Mapping]]] = ..., attractions: _Optional[_Iterable[_Union[Attraction, _Mapping]]] = ...) -> None: ...

class LayoutModification(_message.Message):
    __slots__ = ["context_layout", "modified_context_layout"]
    CONTEXT_LAYOUT_FIELD_NUMBER: _ClassVar[int]
    MODIFIED_CONTEXT_LAYOUT_FIELD_NUMBER: _ClassVar[int]
    context_layout: Layout
    modified_context_layout: Layout
    def __init__(self, context_layout: _Optional[_Union[Layout, _Mapping]] = ..., modified_context_layout: _Optional[_Union[Layout, _Mapping]] = ...) -> None: ...

class LayoutModificationStrategy(_message.Message):
    __slots__ = ["match_count"]
    MATCH_COUNT_FIELD_NUMBER: _ClassVar[int]
    match_count: int
    def __init__(self, match_count: _Optional[int] = ...) -> None: ...

class Point(_message.Message):
    __slots__ = ["x", "y", "z"]
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    Z_FIELD_NUMBER: _ClassVar[int]
    x: float
    y: float
    z: float
    def __init__(self, x: _Optional[float] = ..., y: _Optional[float] = ..., z: _Optional[float] = ...) -> None: ...

class Pose(_message.Message):
    __slots__ = ["point_of_view", "view"]
    POINT_OF_VIEW_FIELD_NUMBER: _ClassVar[int]
    VIEW_FIELD_NUMBER: _ClassVar[int]
    point_of_view: Point
    view: Quaternion
    def __init__(self, point_of_view: _Optional[_Union[Point, _Mapping]] = ..., view: _Optional[_Union[Quaternion, _Mapping]] = ...) -> None: ...

class Quaternion(_message.Message):
    __slots__ = ["w", "x", "y", "z"]
    W_FIELD_NUMBER: _ClassVar[int]
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    Z_FIELD_NUMBER: _ClassVar[int]
    w: float
    x: float
    y: float
    z: float
    def __init__(self, w: _Optional[float] = ..., x: _Optional[float] = ..., y: _Optional[float] = ..., z: _Optional[float] = ...) -> None: ...

class Representation(_message.Message):
    __slots__ = ["body", "lod", "metadata", "name", "type"]
    BODY_FIELD_NUMBER: _ClassVar[int]
    LOD_FIELD_NUMBER: _ClassVar[int]
    METADATA_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    body: _any_pb2.Any
    lod: int
    metadata: _any_pb2.Any
    name: str
    type: str
    def __init__(self, type: _Optional[str] = ..., body: _Optional[_Union[_any_pb2.Any, _Mapping]] = ..., name: _Optional[str] = ..., lod: _Optional[int] = ..., metadata: _Optional[_Union[_any_pb2.Any, _Mapping]] = ...) -> None: ...

class Representations(_message.Message):
    __slots__ = ["representations"]
    REPRESENTATIONS_FIELD_NUMBER: _ClassVar[int]
    representations: _containers.RepeatedCompositeFieldContainer[Representation]
    def __init__(self, representations: _Optional[_Iterable[_Union[Representation, _Mapping]]] = ...) -> None: ...

class Sobject(_message.Message):
    __slots__ = ["id", "parameters", "pose", "url"]
    class ParametersEntry(_message.Message):
        __slots__ = ["key", "value"]
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: _any_pb2.Any
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[_any_pb2.Any, _Mapping]] = ...) -> None: ...
    ID_FIELD_NUMBER: _ClassVar[int]
    PARAMETERS_FIELD_NUMBER: _ClassVar[int]
    POSE_FIELD_NUMBER: _ClassVar[int]
    URL_FIELD_NUMBER: _ClassVar[int]
    id: str
    parameters: _containers.MessageMap[str, _any_pb2.Any]
    pose: Pose
    url: str
    def __init__(self, id: _Optional[str] = ..., url: _Optional[str] = ..., pose: _Optional[_Union[Pose, _Mapping]] = ..., parameters: _Optional[_Mapping[str, _any_pb2.Any]] = ...) -> None: ...

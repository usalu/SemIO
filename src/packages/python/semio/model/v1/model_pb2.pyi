from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor
ENCODING_TEXT_ASCII: Encoding
ENCODING_TEXT_BASE64: Encoding
ENCODING_TEXT_UFT16: Encoding
ENCODING_TEXT_UFT32: Encoding
ENCODING_TEXT_UFT8: Encoding
FILETYPE_C: FileType
FILETYPE_CPP: FileType
FILETYPE_CSHARP: FileType
FILETYPE_GO: FileType
FILETYPE_JSON: FileType
FILETYPE_NATIVE: FileType
FILETYPE_PY: FileType
FILETYPE_RUST: FileType
FILETYPE_STEP: FileType
FILETYPE_TOML: FileType
FILETYPE_XML: FileType
FILETYPE_YAML: FileType
LAYOUTSTRATEGY_BREADTHFIRST: LayoutStrategy
LAYOUTSTRATEGY_DEPTHFIRST: LayoutStrategy
PLATFORM_CADQUERY: Platform
PLATFORM_DYNAMO: Platform
PLATFORM_FREECAD: Platform
PLATFORM_Fornjot: Platform
PLATFORM_GRASSHOPPER: Platform
PLATFORM_IFCOPENSHELL: Platform
PLATFORM_JSCAD: Platform
PLATFORM_OPENSCAD: Platform
PLATFORM_REVIT: Platform
PLATFORM_RHINO: Platform
PLATFORM_SEMIO: Platform
PLATFORM_SVERCHOK: Platform
PLATFORM_THREE: Platform
PLATFORM_TRUCK: Platform
REPRESENTATIONPROTOCOL_FULL: RepresentationProtocol
REPRESENTATIONPROTOCOL_NONE: RepresentationProtocol
REPRESENTATIONPROTOCOL_SIMPLE: RepresentationProtocol

class Attraction(_message.Message):
    __slots__ = ["attracted", "attractor", "id"]
    ATTRACTED_FIELD_NUMBER: _ClassVar[int]
    ATTRACTOR_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    attracted: AttractionParticipant
    attractor: AttractionParticipant
    id: str
    def __init__(self, id: _Optional[str] = ..., attractor: _Optional[_Union[AttractionParticipant, _Mapping]] = ..., attracted: _Optional[_Union[AttractionParticipant, _Mapping]] = ...) -> None: ...

class AttractionParticipant(_message.Message):
    __slots__ = ["bias", "participant_id", "ports", "pose", "representationProtocol"]
    class BiasEntry(_message.Message):
        __slots__ = ["key", "value"]
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    BIAS_FIELD_NUMBER: _ClassVar[int]
    PARTICIPANT_ID_FIELD_NUMBER: _ClassVar[int]
    PORTS_FIELD_NUMBER: _ClassVar[int]
    POSE_FIELD_NUMBER: _ClassVar[int]
    REPRESENTATIONPROTOCOL_FIELD_NUMBER: _ClassVar[int]
    bias: _containers.ScalarMap[str, str]
    participant_id: str
    ports: _containers.RepeatedScalarFieldContainer[str]
    pose: Pose
    representationProtocol: RepresentationProtocol
    def __init__(self, participant_id: _Optional[str] = ..., pose: _Optional[_Union[Pose, _Mapping]] = ..., representationProtocol: _Optional[_Union[RepresentationProtocol, str]] = ..., ports: _Optional[_Iterable[str]] = ..., bias: _Optional[_Mapping[str, str]] = ...) -> None: ...

class AttractionTree(_message.Message):
    __slots__ = ["attraction_id", "children", "sobject_id"]
    ATTRACTION_ID_FIELD_NUMBER: _ClassVar[int]
    CHILDREN_FIELD_NUMBER: _ClassVar[int]
    SOBJECT_ID_FIELD_NUMBER: _ClassVar[int]
    attraction_id: str
    children: _containers.RepeatedCompositeFieldContainer[AttractionTree]
    sobject_id: str
    def __init__(self, sobject_id: _Optional[str] = ..., attraction_id: _Optional[str] = ..., children: _Optional[_Iterable[_Union[AttractionTree, _Mapping]]] = ...) -> None: ...

class Decision(_message.Message):
    __slots__ = ["modification", "strategy"]
    MODIFICATION_FIELD_NUMBER: _ClassVar[int]
    STRATEGY_FIELD_NUMBER: _ClassVar[int]
    modification: LayoutModification
    strategy: LayoutModificationStrategy
    def __init__(self, modification: _Optional[_Union[LayoutModification, _Mapping]] = ..., strategy: _Optional[_Union[LayoutModificationStrategy, _Mapping]] = ...) -> None: ...

class Design(_message.Message):
    __slots__ = ["elementTrees", "elements"]
    ELEMENTS_FIELD_NUMBER: _ClassVar[int]
    ELEMENTTREES_FIELD_NUMBER: _ClassVar[int]
    elementTrees: _containers.RepeatedCompositeFieldContainer[ElementTree]
    elements: _containers.RepeatedCompositeFieldContainer[Element]
    def __init__(self, elements: _Optional[_Iterable[_Union[Element, _Mapping]]] = ..., elementTrees: _Optional[_Iterable[_Union[ElementTree, _Mapping]]] = ...) -> None: ...

class Element(_message.Message):
    __slots__ = ["description", "id", "representations"]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    REPRESENTATIONS_FIELD_NUMBER: _ClassVar[int]
    description: str
    id: str
    representations: _containers.RepeatedCompositeFieldContainer[Representation]
    def __init__(self, id: _Optional[str] = ..., representations: _Optional[_Iterable[_Union[Representation, _Mapping]]] = ..., description: _Optional[str] = ...) -> None: ...

class ElementTree(_message.Message):
    __slots__ = ["element_id", "parts", "pose", "type"]
    class PartsEntry(_message.Message):
        __slots__ = ["key", "value"]
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: ElementTree
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[ElementTree, _Mapping]] = ...) -> None: ...
    ELEMENT_ID_FIELD_NUMBER: _ClassVar[int]
    PARTS_FIELD_NUMBER: _ClassVar[int]
    POSE_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    element_id: str
    parts: _containers.MessageMap[str, ElementTree]
    pose: Pose
    type: str
    def __init__(self, element_id: _Optional[str] = ..., pose: _Optional[_Union[Pose, _Mapping]] = ..., type: _Optional[str] = ..., parts: _Optional[_Mapping[str, ElementTree]] = ...) -> None: ...

class Layout(_message.Message):
    __slots__ = ["attraction_trees", "attractions", "sobjects", "strategy"]
    ATTRACTIONS_FIELD_NUMBER: _ClassVar[int]
    ATTRACTION_TREES_FIELD_NUMBER: _ClassVar[int]
    SOBJECTS_FIELD_NUMBER: _ClassVar[int]
    STRATEGY_FIELD_NUMBER: _ClassVar[int]
    attraction_trees: _containers.RepeatedCompositeFieldContainer[AttractionTree]
    attractions: _containers.RepeatedCompositeFieldContainer[Attraction]
    sobjects: _containers.RepeatedCompositeFieldContainer[Sobject]
    strategy: LayoutStrategy
    def __init__(self, sobjects: _Optional[_Iterable[_Union[Sobject, _Mapping]]] = ..., attractions: _Optional[_Iterable[_Union[Attraction, _Mapping]]] = ..., strategy: _Optional[_Union[LayoutStrategy, str]] = ..., attraction_trees: _Optional[_Iterable[_Union[AttractionTree, _Mapping]]] = ...) -> None: ...

class LayoutModification(_message.Message):
    __slots__ = ["context", "modified_context"]
    CONTEXT_FIELD_NUMBER: _ClassVar[int]
    MODIFIED_CONTEXT_FIELD_NUMBER: _ClassVar[int]
    context: Layout
    modified_context: Layout
    def __init__(self, context: _Optional[_Union[Layout, _Mapping]] = ..., modified_context: _Optional[_Union[Layout, _Mapping]] = ...) -> None: ...

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
    __slots__ = ["body", "concepts", "description", "encoding", "file_type", "lod", "platform"]
    BODY_FIELD_NUMBER: _ClassVar[int]
    CONCEPTS_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    ENCODING_FIELD_NUMBER: _ClassVar[int]
    FILE_TYPE_FIELD_NUMBER: _ClassVar[int]
    LOD_FIELD_NUMBER: _ClassVar[int]
    PLATFORM_FIELD_NUMBER: _ClassVar[int]
    body: bytes
    concepts: _containers.RepeatedScalarFieldContainer[str]
    description: str
    encoding: Encoding
    file_type: FileType
    lod: int
    platform: Platform
    def __init__(self, body: _Optional[bytes] = ..., encoding: _Optional[_Union[Encoding, str]] = ..., file_type: _Optional[_Union[FileType, str]] = ..., platform: _Optional[_Union[Platform, str]] = ..., description: _Optional[str] = ..., concepts: _Optional[_Iterable[str]] = ..., lod: _Optional[int] = ...) -> None: ...

class Sobject(_message.Message):
    __slots__ = ["id", "parameters", "url"]
    class ParametersEntry(_message.Message):
        __slots__ = ["key", "value"]
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    ID_FIELD_NUMBER: _ClassVar[int]
    PARAMETERS_FIELD_NUMBER: _ClassVar[int]
    URL_FIELD_NUMBER: _ClassVar[int]
    id: str
    parameters: _containers.ScalarMap[str, str]
    url: str
    def __init__(self, id: _Optional[str] = ..., url: _Optional[str] = ..., parameters: _Optional[_Mapping[str, str]] = ...) -> None: ...

class Encoding(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = []

class FileType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = []

class Platform(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = []

class RepresentationProtocol(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = []

class LayoutStrategy(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = []

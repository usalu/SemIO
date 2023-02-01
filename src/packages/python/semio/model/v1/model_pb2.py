# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: model/v1/model.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from geometry.v1 import geometry_pb2 as geometry_dot_v1_dot_geometry__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x14model/v1/model.proto\x12\x0esemio.model.v1\x1a\x1ageometry/v1/geometry.proto\"w\n\x04Pose\x12<\n\rpoint_of_view\x18\x01 \x01(\x0b\x32\x18.semio.geometry.v1.PointR\x0bpointOfView\x12\x31\n\x04view\x18\x02 \x01(\x0b\x32\x1d.semio.geometry.v1.QuaternionR\x04view\"\x97\x02\n\x0eRepresentation\x12\x12\n\x04\x62ody\x18\x01 \x01(\x0cR\x04\x62ody\x12\x34\n\x08\x65ncoding\x18\x02 \x01(\x0e\x32\x18.semio.model.v1.EncodingR\x08\x65ncoding\x12\x35\n\tfile_type\x18\x03 \x01(\x0e\x32\x18.semio.model.v1.FileTypeR\x08\x66ileType\x12\x34\n\x08platform\x18\x04 \x01(\x0e\x32\x18.semio.model.v1.PlatformR\x08platform\x12 \n\x0b\x64\x65scription\x18\x05 \x01(\tR\x0b\x64\x65scription\x12\x1a\n\x08\x63oncepts\x18\x06 \x03(\tR\x08\x63oncepts\x12\x10\n\x03lod\x18\x07 \x01(\x05R\x03lod\"7\n\x05Scope\x12\x18\n\x07\x63oncept\x18\x01 \x01(\tR\x07\x63oncept\x12\x14\n\x05order\x18\x02 \x01(\x05R\x05order\"\xc4\x01\n\x05Value\x12\x14\n\x04text\x18\x01 \x01(\tH\x00R\x04text\x12\x18\n\x06number\x18\x02 \x01(\x01H\x00R\x06number\x12\'\n\x0einteger_number\x18\x03 \x01(\x05H\x00R\rintegerNumber\x12\'\n\x0enatural_number\x18\x04 \x01(\rH\x00R\rnaturalNumber\x12\x30\n\x05point\x18\x05 \x01(\x0b\x32\x18.semio.geometry.v1.PointH\x00R\x05pointB\x07\n\x05value\"}\n\tParameter\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x12/\n\x07\x63ontext\x18\x02 \x03(\x0b\x32\x15.semio.model.v1.ScopeR\x07\x63ontext\x12+\n\x05value\x18\x03 \x01(\x0b\x32\x15.semio.model.v1.ValueR\x05value\"S\n\x04Plan\x12\x10\n\x03url\x18\x01 \x01(\tR\x03url\x12\x39\n\nparameters\x18\x02 \x03(\x0b\x32\x19.semio.model.v1.ParameterR\nparameters\"\x89\x01\n\x07Sobject\x12\x0e\n\x02id\x18\x01 \x01(\tR\x02id\x12(\n\x04pose\x18\x02 \x01(\x0b\x32\x14.semio.model.v1.PoseR\x04pose\x12(\n\x04plan\x18\x03 \x01(\x0b\x32\x14.semio.model.v1.PlanR\x04plan\x12\x1a\n\x08\x63oncepts\x18\x04 \x03(\tR\x08\x63oncepts\"\xc0\x01\n\x04Link\x12^\n\x16representationProtocol\x18\x01 \x01(\x0e\x32&.semio.model.v1.RepresentationProtocolR\x16representationProtocol\x12\x14\n\x05ports\x18\x02 \x03(\tR\x05ports\x12\x42\n\x0f\x62ias_parameters\x18\x03 \x03(\x0b\x32\x19.semio.model.v1.ParameterR\x0e\x62iasParameters\"V\n\x0b\x43onnectable\x12\x1d\n\nsobject_id\x18\x01 \x01(\tR\tsobjectId\x12(\n\x04link\x18\x02 \x01(\x0b\x32\x14.semio.model.v1.LinkR\x04link\"\x84\x01\n\nConnection\x12;\n\nconnecting\x18\x01 \x01(\x0b\x32\x1b.semio.model.v1.ConnectableR\nconnecting\x12\x39\n\tconnected\x18\x02 \x01(\x0b\x32\x1b.semio.model.v1.ConnectableR\tconnected\"Y\n\x08\x41ssembly\x12\x1d\n\nsobject_id\x18\x01 \x01(\tR\tsobjectId\x12.\n\x05parts\x18\x02 \x03(\x0b\x32\x18.semio.model.v1.AssemblyR\x05parts\"\xf1\x01\n\x06Layout\x12\x33\n\x08sobjects\x18\x01 \x03(\x0b\x32\x17.semio.model.v1.SobjectR\x08sobjects\x12<\n\x0b\x63onnections\x18\x02 \x03(\x0b\x32\x1a.semio.model.v1.ConnectionR\x0b\x63onnections\x12:\n\x08strategy\x18\x03 \x01(\x0e\x32\x1e.semio.model.v1.LayoutStrategyR\x08strategy\x12\x38\n\nassemblies\x18\x04 \x03(\x0b\x32\x18.semio.model.v1.AssemblyR\nassemblies\"\x94\x01\n\tPrototype\x12\x1b\n\tplan_hash\x18\x01 \x01(\tR\x08planHash\x12H\n\x0frepresentations\x18\x02 \x03(\x0b\x32\x1e.semio.model.v1.RepresentationR\x0frepresentations\x12 \n\x0b\x64\x65scription\x18\x03 \x01(\tR\x0b\x64\x65scription\"\x82\x01\n\x07\x45lement\x12\x1d\n\nsobject_id\x18\x01 \x01(\tR\tsobjectId\x12.\n\x13prototype_plan_hash\x18\x02 \x01(\tR\x11prototypePlanHash\x12(\n\x04pose\x18\x03 \x01(\x0b\x32\x14.semio.model.v1.PoseR\x04pose\"x\n\x06\x44\x65sign\x12\x39\n\nprototypes\x18\x01 \x03(\x0b\x32\x19.semio.model.v1.PrototypeR\nprototypes\x12\x33\n\x08\x65lements\x18\x02 \x03(\x0b\x32\x17.semio.model.v1.ElementR\x08\x65lements\"\x89\x01\n\x12LayoutModification\x12\x30\n\x07\x63ontext\x18\x01 \x01(\x0b\x32\x16.semio.model.v1.LayoutR\x07\x63ontext\x12\x41\n\x10modified_context\x18\x02 \x01(\x0b\x32\x16.semio.model.v1.LayoutR\x0fmodifiedContext\"=\n\x1aLayoutModificationStrategy\x12\x1f\n\x0bmatch_count\x18\x01 \x01(\rR\nmatchCount\"\x9a\x01\n\x08\x44\x65\x63ision\x12\x46\n\x0cmodification\x18\x01 \x01(\x0b\x32\".semio.model.v1.LayoutModificationR\x0cmodification\x12\x46\n\x08strategy\x18\x02 \x01(\x0b\x32*.semio.model.v1.LayoutModificationStrategyR\x08strategy*\x87\x01\n\x08\x45ncoding\x12\x16\n\x12\x45NCODING_TEXT_UFT8\x10\x00\x12\x17\n\x13\x45NCODING_TEXT_UFT16\x10\x01\x12\x17\n\x13\x45NCODING_TEXT_UFT32\x10\x02\x12\x17\n\x13\x45NCODING_TEXT_ASCII\x10\x03\x12\x18\n\x14\x45NCODING_TEXT_BASE64\x10\x04*\xe9\x01\n\x08\x46ileType\x12\x13\n\x0f\x46ILETYPE_NATIVE\x10\x00\x12\x11\n\rFILETYPE_JSON\x10\x01\x12\x10\n\x0c\x46ILETYPE_XML\x10\x02\x12\x11\n\rFILETYPE_YAML\x10\x03\x12\x11\n\rFILETYPE_TOML\x10\x04\x12\x11\n\rFILETYPE_STEP\x10\x05\x12\x0f\n\x0b\x46ILETYPE_PY\x10\x06\x12\x0e\n\nFILETYPE_C\x10\x07\x12\x10\n\x0c\x46ILETYPE_CPP\x10\x08\x12\x13\n\x0f\x46ILETYPE_CSHARP\x10\t\x12\x0f\n\x0b\x46ILETYPE_GO\x10\n\x12\x11\n\rFILETYPE_RUST\x10\x0b*\xad\x04\n\x08Platform\x12\x12\n\x0ePLATFORM_SEMIO\x10\x00\x12\x18\n\x10PLATFORM_SPECKLE\x10\xb0\xce\x8d\xfb\x05\x12\x16\n\x0ePLATFORM_THREE\x10\xe4\x94\xeb\xdc\x03\x12\x19\n\x11PLATFORM_SVERCHOK\x10\xc8\xcb\xb5\xee\x01\x12\x1d\n\x15PLATFORM_IFCOPENSHELL\x10\xa0\xce\xd3\xe1\x03\x12\x19\n\x11PLATFORM_CADQUERY\x10\x84\xae\xfe\xfa\x05\x12\x18\n\x10PLATFORM_FREECAD\x10\xe8\xdf\xe2\xfc\x01\x12\x19\n\x11PLATFORM_OPENSCAD\x10\xcc\xe0\xe2\xfc\x01\x12\x16\n\x0ePLATFORM_JSCAD\x10\xb0\xee\xa6\xcb\x05\x12\x18\n\x10PLATFORM_FORNJOT\x10\xac\xe4\xcf\xaa\x06\x12\x16\n\x0ePLATFORM_TRUCK\x10\x90\xe1\xa0\xcb\x05\x12\x1b\n\x13PLATFORM_ENERGYPLUS\x10\xa4\x81\x8b\x8a\x07\x12\x1b\n\x13PLATFORM_OPENSTUDIO\x10\xa5\xae\xed\x8e\x07\x12\x16\n\x0ePLATFORM_RHINO\x10\xe0\xc5\xc9\xfc\x07\x12\x1c\n\x14PLATFORM_GRASSHOPPER\x10\xe1\xc5\xc9\xfc\x07\x12\x16\n\x0ePLATFORM_REVIT\x10\xc4\xc6\xc9\xfc\x07\x12\x17\n\x0fPLATFORM_DYNAMO\x10\xc5\xc6\xc9\xfc\x07\x12\x19\n\x11PLATFORM_ARCHICAD\x10\xa8\xc7\xc9\xfc\x07\x12\x1b\n\x13PLATFORM_CITYENGINE\x10\x8c\xc8\xc9\xfc\x07\x12\x16\n\x0ePLATFORM_EXCEL\x10\xf0\xc8\xc9\xfc\x07\x12\x16\n\x0ePLATFORM_HYPAR\x10\x94\xcd\xcc\xfc\x07*}\n\x16RepresentationProtocol\x12\x1f\n\x1bREPRESENTATIONPROTOCOL_NONE\x10\x00\x12!\n\x1dREPRESENTATIONPROTOCOL_SIMPLE\x10\x01\x12\x1f\n\x1bREPRESENTATIONPROTOCOL_FULL\x10\x02*P\n\x0eLayoutStrategy\x12\x1f\n\x1bLAYOUTSTRATEGY_BREADTHFIRST\x10\x00\x12\x1d\n\x19LAYOUTSTRATEGY_DEPTHFIRST\x10\x01\x42\xab\x01\n\x12\x63om.semio.model.v1B\nModelProtoP\x01Z/github.com/usalu/semio/src/packages/go/model/v1\xa2\x02\x03SMX\xaa\x02\x0eSemio.Model.V1\xca\x02\x0eSemio\\Model\\V1\xe2\x02\x1aSemio\\Model\\V1\\GPBMetadata\xea\x02\x10Semio::Model::V1b\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'model.v1.model_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\022com.semio.model.v1B\nModelProtoP\001Z/github.com/usalu/semio/src/packages/go/model/v1\242\002\003SMX\252\002\016Semio.Model.V1\312\002\016Semio\\Model\\V1\342\002\032Semio\\Model\\V1\\GPBMetadata\352\002\020Semio::Model::V1'
  _ENCODING._serialized_start=2599
  _ENCODING._serialized_end=2734
  _FILETYPE._serialized_start=2737
  _FILETYPE._serialized_end=2970
  _PLATFORM._serialized_start=2973
  _PLATFORM._serialized_end=3530
  _REPRESENTATIONPROTOCOL._serialized_start=3532
  _REPRESENTATIONPROTOCOL._serialized_end=3657
  _LAYOUTSTRATEGY._serialized_start=3659
  _LAYOUTSTRATEGY._serialized_end=3739
  _POSE._serialized_start=68
  _POSE._serialized_end=187
  _REPRESENTATION._serialized_start=190
  _REPRESENTATION._serialized_end=469
  _SCOPE._serialized_start=471
  _SCOPE._serialized_end=526
  _VALUE._serialized_start=529
  _VALUE._serialized_end=725
  _PARAMETER._serialized_start=727
  _PARAMETER._serialized_end=852
  _PLAN._serialized_start=854
  _PLAN._serialized_end=937
  _SOBJECT._serialized_start=940
  _SOBJECT._serialized_end=1077
  _LINK._serialized_start=1080
  _LINK._serialized_end=1272
  _CONNECTABLE._serialized_start=1274
  _CONNECTABLE._serialized_end=1360
  _CONNECTION._serialized_start=1363
  _CONNECTION._serialized_end=1495
  _ASSEMBLY._serialized_start=1497
  _ASSEMBLY._serialized_end=1586
  _LAYOUT._serialized_start=1589
  _LAYOUT._serialized_end=1830
  _PROTOTYPE._serialized_start=1833
  _PROTOTYPE._serialized_end=1981
  _ELEMENT._serialized_start=1984
  _ELEMENT._serialized_end=2114
  _DESIGN._serialized_start=2116
  _DESIGN._serialized_end=2236
  _LAYOUTMODIFICATION._serialized_start=2239
  _LAYOUTMODIFICATION._serialized_end=2376
  _LAYOUTMODIFICATIONSTRATEGY._serialized_start=2378
  _LAYOUTMODIFICATIONSTRATEGY._serialized_end=2439
  _DECISION._serialized_start=2442
  _DECISION._serialized_end=2596
# @@protoc_insertion_point(module_scope)

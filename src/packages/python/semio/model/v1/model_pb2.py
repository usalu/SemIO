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




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x14model/v1/model.proto\x12\x0esemio.model.v1\"1\n\x05Point\x12\x0c\n\x01x\x18\x01 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x02 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x03 \x01(\x01R\x01z\"D\n\nQuaternion\x12\x0c\n\x01w\x18\x01 \x01(\x01R\x01w\x12\x0c\n\x01x\x18\x02 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x03 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x04 \x01(\x01R\x01z\"q\n\x04Pose\x12\x39\n\rpoint_of_view\x18\x01 \x01(\x0b\x32\x15.semio.model.v1.PointR\x0bpointOfView\x12.\n\x04view\x18\x02 \x01(\x0b\x32\x1a.semio.model.v1.QuaternionR\x04view\"\xed\x01\n\x0eRepresentation\x12\x12\n\x04\x62ody\x18\x01 \x01(\x0cR\x04\x62ody\x12\x34\n\x08\x65ncoding\x18\x02 \x01(\x0e\x32\x18.semio.model.v1.EncodingR\x08\x65ncoding\x12\x35\n\tfile_type\x18\x03 \x01(\x0e\x32\x18.semio.model.v1.FileTypeR\x08\x66ileType\x12\x34\n\x08platform\x18\x04 \x01(\x0e\x32\x18.semio.model.v1.PlatformR\x08platform\x12\x12\n\x04name\x18\x05 \x01(\tR\x04name\x12\x10\n\x03lod\x18\x06 \x01(\x03R\x03lod\"\xdd\x01\n\x07Sobject\x12\x0e\n\x02id\x18\x01 \x01(\tR\x02id\x12\x10\n\x03url\x18\x02 \x01(\tR\x03url\x12(\n\x04pose\x18\x03 \x01(\x0b\x32\x14.semio.model.v1.PoseR\x04pose\x12G\n\nparameters\x18\x04 \x03(\x0b\x32\'.semio.model.v1.Sobject.ParametersEntryR\nparameters\x1a=\n\x0fParametersEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x14\n\x05value\x18\x02 \x01(\tR\x05value:\x02\x38\x01\"\xb2\x02\n\x15\x41ttractionParticipant\x12%\n\x0epatricipant_id\x18\x01 \x01(\tR\rpatricipantId\x12^\n\x16representationProtocol\x18\x02 \x01(\x0e\x32&.semio.model.v1.RepresentationProtocolR\x16representationProtocol\x12\x14\n\x05ports\x18\x03 \x03(\tR\x05ports\x12\x43\n\x04\x62ias\x18\x04 \x03(\x0b\x32/.semio.model.v1.AttractionParticipant.BiasEntryR\x04\x62ias\x1a\x37\n\tBiasEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x14\n\x05value\x18\x02 \x01(\tR\x05value:\x02\x38\x01\"\xa6\x01\n\nAttraction\x12\x0e\n\x02id\x18\x01 \x01(\tR\x02id\x12\x43\n\tattractor\x18\x02 \x01(\x0b\x32%.semio.model.v1.AttractionParticipantR\tattractor\x12\x43\n\tattracted\x18\x03 \x01(\x0b\x32%.semio.model.v1.AttractionParticipantR\tattracted\"q\n\x0e\x41ttractionTree\x12#\n\rattraction_id\x18\x01 \x01(\tR\x0c\x61ttractionId\x12:\n\x08\x63hildren\x18\x02 \x03(\x0b\x32\x1e.semio.model.v1.AttractionTreeR\x08\x63hildren\"\xa9\x02\n\x06Layout\x12\x33\n\x08sobjects\x18\x01 \x03(\x0b\x32\x17.semio.model.v1.SobjectR\x08sobjects\x12<\n\x0b\x61ttractions\x18\x02 \x03(\x0b\x32\x1a.semio.model.v1.AttractionR\x0b\x61ttractions\x12&\n\x0froot_sobject_id\x18\x03 \x01(\tR\rrootSobjectId\x12:\n\x08stragegy\x18\x04 \x01(\x0e\x32\x1e.semio.model.v1.LayoutStrategyR\x08stragegy\x12H\n\x0f\x61ttractionTrees\x18\x05 \x03(\x0b\x32\x1e.semio.model.v1.AttractionTreeR\x0f\x61ttractionTrees\"}\n\x07\x45lement\x12(\n\x04pose\x18\x01 \x01(\x0b\x32\x14.semio.model.v1.PoseR\x04pose\x12H\n\x0frepresentations\x18\x02 \x03(\x0b\x32\x1e.semio.model.v1.RepresentationR\x0frepresentations\"=\n\x06\x44\x65sign\x12\x33\n\x08\x65lements\x18\x01 \x03(\x0b\x32\x17.semio.model.v1.ElementR\x08\x65lements\"\x89\x01\n\x12LayoutModification\x12\x30\n\x07\x63ontext\x18\x01 \x01(\x0b\x32\x16.semio.model.v1.LayoutR\x07\x63ontext\x12\x41\n\x10modified_context\x18\x02 \x01(\x0b\x32\x16.semio.model.v1.LayoutR\x0fmodifiedContext\"=\n\x1aLayoutModificationStrategy\x12\x1f\n\x0bmatch_count\x18\x01 \x01(\x03R\nmatchCount\"\x9a\x01\n\x08\x44\x65\x63ision\x12\x46\n\x0cmodification\x18\x01 \x01(\x0b\x32\".semio.model.v1.LayoutModificationR\x0cmodification\x12\x46\n\x08strategy\x18\x02 \x01(\x0b\x32*.semio.model.v1.LayoutModificationStrategyR\x08strategy*\x87\x01\n\x08\x45ncoding\x12\x16\n\x12\x46ILETYPE_TEXT_UFT8\x10\x00\x12\x17\n\x13\x46ILETYPE_TEXT_UFT16\x10\x01\x12\x17\n\x13\x46ILETYPE_TEXT_UFT32\x10\x02\x12\x17\n\x13\x46ILETYPE_TEXT_ASCII\x10\x03\x12\x18\n\x14\x46ILETYPE_TEXT_BASE64\x10\x04*\xef\x01\n\x08\x46ileType\x12\x19\n\x15\x46ILETYPE_NATIVEBINARY\x10\x00\x12\x11\n\rFILETYPE_JSON\x10\x01\x12\x10\n\x0c\x46ILETYPE_XML\x10\x02\x12\x11\n\rFILETYPE_YAML\x10\x03\x12\x11\n\rFILETYPE_TOML\x10\x04\x12\x11\n\rFILETYPE_STEP\x10\x05\x12\x0f\n\x0b\x46ILETYPE_PY\x10\x06\x12\x0e\n\nFILETYPE_C\x10\x07\x12\x10\n\x0c\x46ILETYPE_CPP\x10\x08\x12\x13\n\x0f\x46ILETYPE_CSHARP\x10\t\x12\x0f\n\x0b\x46ILETYPE_GO\x10\n\x12\x11\n\rFILETYPE_RUST\x10\x0b*\x85\x01\n\x08Platform\x12\x12\n\x0ePLATFORM_SEMIO\x10\x00\x12\x16\n\x0ePLATFORM_RHINO\x10\x80\xa7\xb1\xfd\x07\x12\x1c\n\x14PLATFORM_GRASSHOPPER\x10\x81\xa7\xb1\xfd\x07\x12\x16\n\x0ePLATFORM_REVIT\x10\xe8\xae\xb1\xfd\x07\x12\x17\n\x0fPLATFORM_DYNAMO\x10\xe9\xae\xb1\xfd\x07*}\n\x16RepresentationProtocol\x12\x1f\n\x1bREPRESENTATIONPROTOCOL_NONE\x10\x00\x12!\n\x1dREPRESENTATIONPROTOCOL_SIMPLE\x10\x01\x12\x1f\n\x1bREPRESENTATIONPROTOCOL_FULL\x10\x02*P\n\x0eLayoutStrategy\x12\x1f\n\x1bLAYOUTSTRATEGY_BREADTHFIRST\x10\x00\x12\x1d\n\x19LAYOUTSTRATEGY_DEPTHFIRST\x10\x01\x42\xab\x01\n\x12\x63om.semio.model.v1B\nModelProtoP\x01Z/github.com/usalu/semio/src/packages/go/model/v1\xa2\x02\x03SMX\xaa\x02\x0eSemio.Model.V1\xca\x02\x0eSemio\\Model\\V1\xe2\x02\x1aSemio\\Model\\V1\\GPBMetadata\xea\x02\x10Semio::Model::V1b\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'model.v1.model_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\022com.semio.model.v1B\nModelProtoP\001Z/github.com/usalu/semio/src/packages/go/model/v1\242\002\003SMX\252\002\016Semio.Model.V1\312\002\016Semio\\Model\\V1\342\002\032Semio\\Model\\V1\\GPBMetadata\352\002\020Semio::Model::V1'
  _SOBJECT_PARAMETERSENTRY._options = None
  _SOBJECT_PARAMETERSENTRY._serialized_options = b'8\001'
  _ATTRACTIONPARTICIPANT_BIASENTRY._options = None
  _ATTRACTIONPARTICIPANT_BIASENTRY._serialized_options = b'8\001'
  _ENCODING._serialized_start=2184
  _ENCODING._serialized_end=2319
  _FILETYPE._serialized_start=2322
  _FILETYPE._serialized_end=2561
  _PLATFORM._serialized_start=2564
  _PLATFORM._serialized_end=2697
  _REPRESENTATIONPROTOCOL._serialized_start=2699
  _REPRESENTATIONPROTOCOL._serialized_end=2824
  _LAYOUTSTRATEGY._serialized_start=2826
  _LAYOUTSTRATEGY._serialized_end=2906
  _POINT._serialized_start=40
  _POINT._serialized_end=89
  _QUATERNION._serialized_start=91
  _QUATERNION._serialized_end=159
  _POSE._serialized_start=161
  _POSE._serialized_end=274
  _REPRESENTATION._serialized_start=277
  _REPRESENTATION._serialized_end=514
  _SOBJECT._serialized_start=517
  _SOBJECT._serialized_end=738
  _SOBJECT_PARAMETERSENTRY._serialized_start=677
  _SOBJECT_PARAMETERSENTRY._serialized_end=738
  _ATTRACTIONPARTICIPANT._serialized_start=741
  _ATTRACTIONPARTICIPANT._serialized_end=1047
  _ATTRACTIONPARTICIPANT_BIASENTRY._serialized_start=992
  _ATTRACTIONPARTICIPANT_BIASENTRY._serialized_end=1047
  _ATTRACTION._serialized_start=1050
  _ATTRACTION._serialized_end=1216
  _ATTRACTIONTREE._serialized_start=1218
  _ATTRACTIONTREE._serialized_end=1331
  _LAYOUT._serialized_start=1334
  _LAYOUT._serialized_end=1631
  _ELEMENT._serialized_start=1633
  _ELEMENT._serialized_end=1758
  _DESIGN._serialized_start=1760
  _DESIGN._serialized_end=1821
  _LAYOUTMODIFICATION._serialized_start=1824
  _LAYOUTMODIFICATION._serialized_end=1961
  _LAYOUTMODIFICATIONSTRATEGY._serialized_start=1963
  _LAYOUTMODIFICATIONSTRATEGY._serialized_end=2024
  _DECISION._serialized_start=2027
  _DECISION._serialized_end=2181
# @@protoc_insertion_point(module_scope)

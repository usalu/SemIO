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


from google.protobuf import any_pb2 as google_dot_protobuf_dot_any__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x14model/v1/model.proto\x12\x0esemio.model.v1\x1a\x19google/protobuf/any.proto\"1\n\x05Point\x12\x0c\n\x01x\x18\x01 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x02 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x03 \x01(\x01R\x01z\"D\n\nQuaternion\x12\x0c\n\x01w\x18\x01 \x01(\x01R\x01w\x12\x0c\n\x01x\x18\x02 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x03 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x04 \x01(\x01R\x01z\"q\n\x04Pose\x12\x39\n\rpoint_of_view\x18\x01 \x01(\x0b\x32\x15.semio.model.v1.PointR\x0bpointOfView\x12.\n\x04view\x18\x02 \x01(\x0b\x32\x1a.semio.model.v1.QuaternionR\x04view\"\xa6\x01\n\x0eRepresentation\x12\x12\n\x04type\x18\x01 \x01(\tR\x04type\x12(\n\x04\x62ody\x18\x02 \x01(\x0b\x32\x14.google.protobuf.AnyR\x04\x62ody\x12\x12\n\x04name\x18\x03 \x01(\tR\x04name\x12\x10\n\x03lod\x18\x04 \x01(\x03R\x03lod\x12\x30\n\x08metadata\x18\x05 \x01(\x0b\x32\x14.google.protobuf.AnyR\x08metadata\"[\n\x0fRepresentations\x12H\n\x0frepresentations\x18\x01 \x03(\x0b\x32\x1e.semio.model.v1.RepresentationR\x0frepresentations\"\xf3\x01\n\x07Sobject\x12\x0e\n\x02id\x18\x01 \x01(\tR\x02id\x12\x10\n\x03url\x18\x02 \x01(\tR\x03url\x12(\n\x04pose\x18\x03 \x01(\x0b\x32\x14.semio.model.v1.PoseR\x04pose\x12G\n\nparameters\x18\x04 \x03(\x0b\x32\'.semio.model.v1.Sobject.ParametersEntryR\nparameters\x1aS\n\x0fParametersEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12*\n\x05value\x18\x02 \x01(\x0b\x32\x14.google.protobuf.AnyR\x05value:\x02\x38\x01\"\x8f\x02\n\x12\x41ttractionStragegy\x12<\n\x0erepresentation\x18\x01 \x01(\x0b\x32\x14.google.protobuf.AnyR\x0erepresentation\x12\x12\n\x04port\x18\x02 \x01(\tR\x04port\x12R\n\nparameters\x18\x03 \x03(\x0b\x32\x32.semio.model.v1.AttractionStragegy.ParametersEntryR\nparameters\x1aS\n\x0fParametersEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12*\n\x05value\x18\x02 \x01(\x0b\x32\x14.google.protobuf.AnyR\x05value:\x02\x38\x01\"v\n\x15\x41ttractionParticipant\x12\x1d\n\nsobject_id\x18\x01 \x01(\tR\tsobjectId\x12>\n\x08strategy\x18\x02 \x01(\x0b\x32\".semio.model.v1.AttractionStragegyR\x08strategy\"\x96\x01\n\nAttraction\x12\x43\n\tattractor\x18\x01 \x01(\x0b\x32%.semio.model.v1.AttractionParticipantR\tattractor\x12\x43\n\tattracted\x18\x02 \x01(\x0b\x32%.semio.model.v1.AttractionParticipantR\tattracted\"{\n\x06Layout\x12\x33\n\x08sobjects\x18\x01 \x03(\x0b\x32\x17.semio.model.v1.SobjectR\x08sobjects\x12<\n\x0b\x61ttractions\x18\x02 \x03(\x0b\x32\x1a.semio.model.v1.AttractionR\x0b\x61ttractions\"O\n\x0f\x41ttractionChain\x12<\n\x0b\x61ttractions\x18\x01 \x03(\x0b\x32\x1a.semio.model.v1.AttractionR\x0b\x61ttractions\"\xa1\x01\n\x0c\x43horeography\x12\x44\n\x11solitary_sobjects\x18\x01 \x03(\x0b\x32\x17.semio.model.v1.SobjectR\x10solitarySobjects\x12K\n\x10\x61ttractionChains\x18\x02 \x03(\x0b\x32\x1f.semio.model.v1.AttractionChainR\x10\x61ttractionChains\"~\n\x07\x45lement\x12(\n\x04pose\x18\x01 \x01(\x0b\x32\x14.semio.model.v1.PoseR\x04pose\x12I\n\x0frepresentations\x18\x02 \x01(\x0b\x32\x1f.semio.model.v1.RepresentationsR\x0frepresentations\"=\n\x06\x44\x65sign\x12\x33\n\x08\x65lements\x18\x01 \x03(\x0b\x32\x17.semio.model.v1.ElementR\x08\x65lements\"\xa3\x01\n\x12LayoutModification\x12=\n\x0e\x63ontext_layout\x18\x01 \x01(\x0b\x32\x16.semio.model.v1.LayoutR\rcontextLayout\x12N\n\x17modified_context_layout\x18\x02 \x01(\x0b\x32\x16.semio.model.v1.LayoutR\x15modifiedContextLayout\"=\n\x1aLayoutModificationStrategy\x12\x1f\n\x0bmatch_count\x18\x01 \x01(\x03R\nmatchCount\"\x9a\x01\n\x08\x44\x65\x63ision\x12\x46\n\x0cmodification\x18\x01 \x01(\x0b\x32\".semio.model.v1.LayoutModificationR\x0cmodification\x12\x46\n\x08strategy\x18\x02 \x01(\x0b\x32*.semio.model.v1.LayoutModificationStrategyR\x08strategyBz\n\x12\x63om.semio.model.v1B\nModelProtoP\x01\xa2\x02\x03SMX\xaa\x02\x0eSemio.Model.V1\xca\x02\x0eSemio\\Model\\V1\xe2\x02\x1aSemio\\Model\\V1\\GPBMetadata\xea\x02\x10Semio::Model::V1b\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'model.v1.model_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\022com.semio.model.v1B\nModelProtoP\001\242\002\003SMX\252\002\016Semio.Model.V1\312\002\016Semio\\Model\\V1\342\002\032Semio\\Model\\V1\\GPBMetadata\352\002\020Semio::Model::V1'
  _SOBJECT_PARAMETERSENTRY._options = None
  _SOBJECT_PARAMETERSENTRY._serialized_options = b'8\001'
  _ATTRACTIONSTRAGEGY_PARAMETERSENTRY._options = None
  _ATTRACTIONSTRAGEGY_PARAMETERSENTRY._serialized_options = b'8\001'
  _POINT._serialized_start=67
  _POINT._serialized_end=116
  _QUATERNION._serialized_start=118
  _QUATERNION._serialized_end=186
  _POSE._serialized_start=188
  _POSE._serialized_end=301
  _REPRESENTATION._serialized_start=304
  _REPRESENTATION._serialized_end=470
  _REPRESENTATIONS._serialized_start=472
  _REPRESENTATIONS._serialized_end=563
  _SOBJECT._serialized_start=566
  _SOBJECT._serialized_end=809
  _SOBJECT_PARAMETERSENTRY._serialized_start=726
  _SOBJECT_PARAMETERSENTRY._serialized_end=809
  _ATTRACTIONSTRAGEGY._serialized_start=812
  _ATTRACTIONSTRAGEGY._serialized_end=1083
  _ATTRACTIONSTRAGEGY_PARAMETERSENTRY._serialized_start=726
  _ATTRACTIONSTRAGEGY_PARAMETERSENTRY._serialized_end=809
  _ATTRACTIONPARTICIPANT._serialized_start=1085
  _ATTRACTIONPARTICIPANT._serialized_end=1203
  _ATTRACTION._serialized_start=1206
  _ATTRACTION._serialized_end=1356
  _LAYOUT._serialized_start=1358
  _LAYOUT._serialized_end=1481
  _ATTRACTIONCHAIN._serialized_start=1483
  _ATTRACTIONCHAIN._serialized_end=1562
  _CHOREOGRAPHY._serialized_start=1565
  _CHOREOGRAPHY._serialized_end=1726
  _ELEMENT._serialized_start=1728
  _ELEMENT._serialized_end=1854
  _DESIGN._serialized_start=1856
  _DESIGN._serialized_end=1917
  _LAYOUTMODIFICATION._serialized_start=1920
  _LAYOUTMODIFICATION._serialized_end=2083
  _LAYOUTMODIFICATIONSTRATEGY._serialized_start=2085
  _LAYOUTMODIFICATIONSTRATEGY._serialized_end=2146
  _DECISION._serialized_start=2149
  _DECISION._serialized_end=2303
# @@protoc_insertion_point(module_scope)

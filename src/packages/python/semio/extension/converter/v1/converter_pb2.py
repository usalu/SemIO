# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: extension/converter/v1/converter.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from model.v1 import model_pb2 as model_dot_v1_dot_model__pb2
from google.protobuf import any_pb2 as google_dot_protobuf_dot_any__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n&extension/converter/v1/converter.proto\x12\x1csemio.extension.converter.v1\x1a\x14model/v1/model.proto\x1a\x19google/protobuf/any.proto\"\xba\x01\n\x1fRepresentationConversionRequest\x12\x46\n\x0erepresentation\x18\x01 \x01(\x0b\x32\x1e.semio.model.v1.RepresentationR\x0erepresentation\x12\x1f\n\x0btarget_type\x18\x02 \x01(\tR\ntargetType\x12.\n\x07options\x18\x03 \x01(\x0b\x32\x14.google.protobuf.AnyR\x07options2\x8a\x01\n\x10\x43onverterService\x12v\n\x15\x43onvertRepresentation\x12=.semio.extension.converter.v1.RepresentationConversionRequest\x1a\x1e.semio.model.v1.RepresentationB\xc5\x01\n com.semio.extension.converter.v1B\x0e\x43onverterProtoP\x01\xa2\x02\x03SEC\xaa\x02\x1cSemio.Extension.Converter.V1\xca\x02\x1cSemio\\Extension\\Converter\\V1\xe2\x02(Semio\\Extension\\Converter\\V1\\GPBMetadata\xea\x02\x1fSemio::Extension::Converter::V1b\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'extension.converter.v1.converter_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n com.semio.extension.converter.v1B\016ConverterProtoP\001\242\002\003SEC\252\002\034Semio.Extension.Converter.V1\312\002\034Semio\\Extension\\Converter\\V1\342\002(Semio\\Extension\\Converter\\V1\\GPBMetadata\352\002\037Semio::Extension::Converter::V1'
  _REPRESENTATIONCONVERSIONREQUEST._serialized_start=122
  _REPRESENTATIONCONVERSIONREQUEST._serialized_end=308
  _CONVERTERSERVICE._serialized_start=311
  _CONVERTERSERVICE._serialized_end=449
# @@protoc_insertion_point(module_scope)

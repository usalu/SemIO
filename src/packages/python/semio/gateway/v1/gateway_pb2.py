# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: gateway/v1/gateway.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from model.v1 import model_pb2 as model_dot_v1_dot_model__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x18gateway/v1/gateway.proto\x12\x10semio.gateway.v1\x1a\x14model/v1/model.proto\"f\n\x13LayoutDesignRequest\x12.\n\x06layout\x18\x01 \x01(\x0b\x32\x16.semio.model.v1.LayoutR\x06layout\x12\x1f\n\x0btarget_type\x18\x02 \x01(\tR\ntargetType2a\n\x0eGatewayService\x12O\n\x0cLayoutDesign\x12%.semio.gateway.v1.LayoutDesignRequest\x1a\x16.semio.model.v1.Design\"\x00\x42\xba\x01\n\x14\x63om.semio.gateway.v1B\x0cGatewayProtoP\x01Z2github.com/usalu/semio/src/schema/semio/gateway/v1\xa2\x02\x03SGX\xaa\x02\x10Semio.Gateway.V1\xca\x02\x10Semio\\Gateway\\V1\xe2\x02\x1cSemio\\Gateway\\V1\\GPBMetadata\xea\x02\x12Semio::Gateway::V1b\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'gateway.v1.gateway_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\024com.semio.gateway.v1B\014GatewayProtoP\001Z2github.com/usalu/semio/src/schema/semio/gateway/v1\242\002\003SGX\252\002\020Semio.Gateway.V1\312\002\020Semio\\Gateway\\V1\342\002\034Semio\\Gateway\\V1\\GPBMetadata\352\002\022Semio::Gateway::V1'
  _LAYOUTDESIGNREQUEST._serialized_start=68
  _LAYOUTDESIGNREQUEST._serialized_end=170
  _GATEWAYSERVICE._serialized_start=172
  _GATEWAYSERVICE._serialized_end=269
# @@protoc_insertion_point(module_scope)

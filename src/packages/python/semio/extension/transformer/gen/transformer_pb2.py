# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: transformer.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import model_pb2 as model__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11transformer.proto\x12\x1esemio.extension.transformer.v1\x1a\x0bmodel.proto\"s\n\x14RewriteLayoutRequest\x12+\n\tdecisions\x18\x01 \x03(\x0b\x32\x18.semio.model.v1.Decision\x12.\n\x0einitial_layout\x18\x02 \x01(\x0b\x32\x16.semio.model.v1.Layout2o\n\x0eLayoutRewriter\x12]\n\rRewriteLayout\x12\x34.semio.extension.transformer.v1.RewriteLayoutRequest\x1a\x16.semio.model.v1.Layoutb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'transformer_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _REWRITELAYOUTREQUEST._serialized_start=66
  _REWRITELAYOUTREQUEST._serialized_end=181
  _LAYOUTREWRITER._serialized_start=183
  _LAYOUTREWRITER._serialized_end=294
# @@protoc_insertion_point(module_scope)

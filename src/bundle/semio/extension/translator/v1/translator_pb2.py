# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: extension/translator/v1/translator.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from semio.model.v1 import model_pb2 as model_dot_v1_dot_model__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n(extension/translator/v1/translator.proto\x12\x1dsemio.extension.translator.v1\x1a\x14model/v1/model.proto\"C\n\x0bTranslating\x12\x34\n\x08platform\x18\x01 \x01(\x0e\x32\x18.semio.model.v1.PlatformR\x08platform\"\xd6\x01\n\x1eTranslateRepresentationRequest\x12\x46\n\x0erepresentation\x18\x01 \x01(\x0b\x32\x1e.semio.model.v1.RepresentationR\x0erepresentation\x12\x35\n\x0btarget_pose\x18\x02 \x01(\x0b\x32\x14.semio.model.v1.PoseR\ntargetPose\x12\x35\n\x0bsource_pose\x18\x03 \x01(\x0b\x32\x14.semio.model.v1.PoseR\nsourcePose2\x8d\x01\n\x11TranslatorService\x12x\n\x17TranslateRepresentation\x12=.semio.extension.translator.v1.TranslateRepresentationRequest\x1a\x1e.semio.model.v1.RepresentationB\x8b\x02\n!com.semio.extension.translator.v1B\x0fTranslatorProtoP\x01Z>github.com/usalu/semio/src/packages/go/extension/translator/v1\xa2\x02\x03SET\xaa\x02\x1dSemio.Extension.Translator.V1\xca\x02\x1dSemio\\Extension\\Translator\\V1\xe2\x02)Semio\\Extension\\Translator\\V1\\GPBMetadata\xea\x02 Semio::Extension::Translator::V1b\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'extension.translator.v1.translator_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n!com.semio.extension.translator.v1B\017TranslatorProtoP\001Z>github.com/usalu/semio/src/packages/go/extension/translator/v1\242\002\003SET\252\002\035Semio.Extension.Translator.V1\312\002\035Semio\\Extension\\Translator\\V1\342\002)Semio\\Extension\\Translator\\V1\\GPBMetadata\352\002 Semio::Extension::Translator::V1'
  _TRANSLATING._serialized_start=97
  _TRANSLATING._serialized_end=164
  _TRANSLATEREPRESENTATIONREQUEST._serialized_start=167
  _TRANSLATEREPRESENTATIONREQUEST._serialized_end=381
  _TRANSLATORSERVICE._serialized_start=384
  _TRANSLATORSERVICE._serialized_end=525
# @@protoc_insertion_point(module_scope)

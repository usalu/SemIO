# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: geometry/v1/geometry.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1ageometry/v1/geometry.proto\x12\x11semio.geometry.v1\"1\n\x05Point\x12\x0c\n\x01x\x18\x01 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x02 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x03 \x01(\x01R\x01z\"2\n\x06Vector\x12\x0c\n\x01x\x18\x01 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x02 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x03 \x01(\x01R\x01z\"D\n\nQuaternion\x12\x0c\n\x01w\x18\x01 \x01(\x01R\x01w\x12\x0c\n\x01x\x18\x02 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x03 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x04 \x01(\x01R\x01z\"\xab\x02\n\tTransform\x12\x10\n\x03m00\x18\x01 \x01(\x01R\x03m00\x12\x10\n\x03m01\x18\x02 \x01(\x01R\x03m01\x12\x10\n\x03m02\x18\x03 \x01(\x01R\x03m02\x12\x10\n\x03m03\x18\x04 \x01(\x01R\x03m03\x12\x10\n\x03m10\x18\x05 \x01(\x01R\x03m10\x12\x10\n\x03m11\x18\x06 \x01(\x01R\x03m11\x12\x10\n\x03m12\x18\x07 \x01(\x01R\x03m12\x12\x10\n\x03m13\x18\x08 \x01(\x01R\x03m13\x12\x10\n\x03m20\x18\t \x01(\x01R\x03m20\x12\x10\n\x03m21\x18\n \x01(\x01R\x03m21\x12\x10\n\x03m22\x18\x0b \x01(\x01R\x03m22\x12\x10\n\x03m23\x18\x0c \x01(\x01R\x03m23\x12\x10\n\x03m30\x18\r \x01(\x01R\x03m30\x12\x10\n\x03m31\x18\x0e \x01(\x01R\x03m31\x12\x10\n\x03m32\x18\x0f \x01(\x01R\x03m32\x12\x10\n\x03m33\x18\x10 \x01(\x01R\x03m33\"7\n\x0b\x45ulerAngles\x12\x0c\n\x01x\x18\x01 \x01(\x01R\x01x\x12\x0c\n\x01y\x18\x02 \x01(\x01R\x01y\x12\x0c\n\x01z\x18\x03 \x01(\x01R\x01z\"J\n\x0cNauticAngles\x12\x10\n\x03yaw\x18\x01 \x01(\x01R\x03yaw\x12\x14\n\x05pitch\x18\x02 \x01(\x01R\x05pitch\x12\x12\n\x04roll\x18\x03 \x01(\x01R\x04rollB\xc0\x01\n\x15\x63om.semio.geometry.v1B\rGeometryProtoP\x01Z2github.com/usalu/semio/src/packages/go/geometry/v1\xa2\x02\x03SGX\xaa\x02\x11Semio.Geometry.V1\xca\x02\x11Semio\\Geometry\\V1\xe2\x02\x1dSemio\\Geometry\\V1\\GPBMetadata\xea\x02\x13Semio::Geometry::V1b\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'geometry.v1.geometry_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\025com.semio.geometry.v1B\rGeometryProtoP\001Z2github.com/usalu/semio/src/packages/go/geometry/v1\242\002\003SGX\252\002\021Semio.Geometry.V1\312\002\021Semio\\Geometry\\V1\342\002\035Semio\\Geometry\\V1\\GPBMetadata\352\002\023Semio::Geometry::V1'
  _POINT._serialized_start=49
  _POINT._serialized_end=98
  _VECTOR._serialized_start=100
  _VECTOR._serialized_end=150
  _QUATERNION._serialized_start=152
  _QUATERNION._serialized_end=220
  _TRANSFORM._serialized_start=223
  _TRANSFORM._serialized_end=522
  _EULERANGLES._serialized_start=524
  _EULERANGLES._serialized_end=579
  _NAUTICANGLES._serialized_start=581
  _NAUTICANGLES._serialized_end=655
# @@protoc_insertion_point(module_scope)
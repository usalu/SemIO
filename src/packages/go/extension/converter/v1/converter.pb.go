// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        (unknown)
// source: extension/converter/v1/converter.proto

package v1

import (
	v1 "github.com/usalu/semio/src/packages/go/model/v1"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// Description what a converter is converting.
type Converting struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	SourcePlatform v1.Platform `protobuf:"varint,1,opt,name=source_platform,json=sourcePlatform,proto3,enum=semio.model.v1.Platform" json:"source_platform,omitempty"`
	TargetPlatform v1.Platform `protobuf:"varint,2,opt,name=target_platform,json=targetPlatform,proto3,enum=semio.model.v1.Platform" json:"target_platform,omitempty"`
}

func (x *Converting) Reset() {
	*x = Converting{}
	if protoimpl.UnsafeEnabled {
		mi := &file_extension_converter_v1_converter_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Converting) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Converting) ProtoMessage() {}

func (x *Converting) ProtoReflect() protoreflect.Message {
	mi := &file_extension_converter_v1_converter_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Converting.ProtoReflect.Descriptor instead.
func (*Converting) Descriptor() ([]byte, []int) {
	return file_extension_converter_v1_converter_proto_rawDescGZIP(), []int{0}
}

func (x *Converting) GetSourcePlatform() v1.Platform {
	if x != nil {
		return x.SourcePlatform
	}
	return v1.Platform(0)
}

func (x *Converting) GetTargetPlatform() v1.Platform {
	if x != nil {
		return x.TargetPlatform
	}
	return v1.Platform(0)
}

// A request for converting a represenation.
type RepresentationConversionRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Representation *v1.Representation `protobuf:"bytes,1,opt,name=representation,proto3" json:"representation,omitempty"`
	TargetPlatform v1.Platform        `protobuf:"varint,2,opt,name=target_platform,json=targetPlatform,proto3,enum=semio.model.v1.Platform" json:"target_platform,omitempty"`
}

func (x *RepresentationConversionRequest) Reset() {
	*x = RepresentationConversionRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_extension_converter_v1_converter_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RepresentationConversionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RepresentationConversionRequest) ProtoMessage() {}

func (x *RepresentationConversionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_extension_converter_v1_converter_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RepresentationConversionRequest.ProtoReflect.Descriptor instead.
func (*RepresentationConversionRequest) Descriptor() ([]byte, []int) {
	return file_extension_converter_v1_converter_proto_rawDescGZIP(), []int{1}
}

func (x *RepresentationConversionRequest) GetRepresentation() *v1.Representation {
	if x != nil {
		return x.Representation
	}
	return nil
}

func (x *RepresentationConversionRequest) GetTargetPlatform() v1.Platform {
	if x != nil {
		return x.TargetPlatform
	}
	return v1.Platform(0)
}

var File_extension_converter_v1_converter_proto protoreflect.FileDescriptor

var file_extension_converter_v1_converter_proto_rawDesc = []byte{
	0x0a, 0x26, 0x65, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2f, 0x63, 0x6f, 0x6e, 0x76,
	0x65, 0x72, 0x74, 0x65, 0x72, 0x2f, 0x76, 0x31, 0x2f, 0x63, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74,
	0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x1c, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e,
	0x65, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2e, 0x63, 0x6f, 0x6e, 0x76, 0x65, 0x72,
	0x74, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x1a, 0x14, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2f, 0x76, 0x31,
	0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x92, 0x01, 0x0a,
	0x0a, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74, 0x69, 0x6e, 0x67, 0x12, 0x41, 0x0a, 0x0f, 0x73,
	0x6f, 0x75, 0x72, 0x63, 0x65, 0x5f, 0x70, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0e, 0x32, 0x18, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64,
	0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x52, 0x0e,
	0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x12, 0x41,
	0x0a, 0x0f, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x5f, 0x70, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72,
	0x6d, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x18, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e,
	0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72,
	0x6d, 0x52, 0x0e, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72,
	0x6d, 0x22, 0xac, 0x01, 0x0a, 0x1f, 0x52, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61,
	0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x46, 0x0a, 0x0e, 0x72, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65,
	0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1e, 0x2e,
	0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x52,
	0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x0e, 0x72,
	0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x41, 0x0a,
	0x0f, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x5f, 0x70, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x18, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d,
	0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d,
	0x52, 0x0e, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d,
	0x32, 0x8a, 0x01, 0x0a, 0x10, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74, 0x65, 0x72, 0x53, 0x65,
	0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x76, 0x0a, 0x15, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74,
	0x52, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x3d,
	0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x65, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e,
	0x2e, 0x63, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x52, 0x65,
	0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f, 0x6e, 0x76,
	0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1e, 0x2e,
	0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x52,
	0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x42, 0x84, 0x02,
	0x0a, 0x20, 0x63, 0x6f, 0x6d, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x65, 0x78, 0x74, 0x65,
	0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2e, 0x63, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74, 0x65, 0x72, 0x2e,
	0x76, 0x31, 0x42, 0x0e, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74, 0x65, 0x72, 0x50, 0x72, 0x6f,
	0x74, 0x6f, 0x50, 0x01, 0x5a, 0x3d, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d,
	0x2f, 0x75, 0x73, 0x61, 0x6c, 0x75, 0x2f, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2f, 0x73, 0x72, 0x63,
	0x2f, 0x70, 0x61, 0x63, 0x6b, 0x61, 0x67, 0x65, 0x73, 0x2f, 0x67, 0x6f, 0x2f, 0x65, 0x78, 0x74,
	0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2f, 0x63, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74, 0x65, 0x72,
	0x2f, 0x76, 0x31, 0xa2, 0x02, 0x03, 0x53, 0x45, 0x43, 0xaa, 0x02, 0x1c, 0x53, 0x65, 0x6d, 0x69,
	0x6f, 0x2e, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2e, 0x43, 0x6f, 0x6e, 0x76,
	0x65, 0x72, 0x74, 0x65, 0x72, 0x2e, 0x56, 0x31, 0xca, 0x02, 0x1c, 0x53, 0x65, 0x6d, 0x69, 0x6f,
	0x5c, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x5c, 0x43, 0x6f, 0x6e, 0x76, 0x65,
	0x72, 0x74, 0x65, 0x72, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x28, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x5c,
	0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x5c, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72,
	0x74, 0x65, 0x72, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61,
	0x74, 0x61, 0xea, 0x02, 0x1f, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x3a, 0x3a, 0x45, 0x78, 0x74, 0x65,
	0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x3a, 0x3a, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x74, 0x65, 0x72,
	0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_extension_converter_v1_converter_proto_rawDescOnce sync.Once
	file_extension_converter_v1_converter_proto_rawDescData = file_extension_converter_v1_converter_proto_rawDesc
)

func file_extension_converter_v1_converter_proto_rawDescGZIP() []byte {
	file_extension_converter_v1_converter_proto_rawDescOnce.Do(func() {
		file_extension_converter_v1_converter_proto_rawDescData = protoimpl.X.CompressGZIP(file_extension_converter_v1_converter_proto_rawDescData)
	})
	return file_extension_converter_v1_converter_proto_rawDescData
}

var file_extension_converter_v1_converter_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_extension_converter_v1_converter_proto_goTypes = []interface{}{
	(*Converting)(nil),                      // 0: semio.extension.converter.v1.Converting
	(*RepresentationConversionRequest)(nil), // 1: semio.extension.converter.v1.RepresentationConversionRequest
	(v1.Platform)(0),                        // 2: semio.model.v1.Platform
	(*v1.Representation)(nil),               // 3: semio.model.v1.Representation
}
var file_extension_converter_v1_converter_proto_depIdxs = []int32{
	2, // 0: semio.extension.converter.v1.Converting.source_platform:type_name -> semio.model.v1.Platform
	2, // 1: semio.extension.converter.v1.Converting.target_platform:type_name -> semio.model.v1.Platform
	3, // 2: semio.extension.converter.v1.RepresentationConversionRequest.representation:type_name -> semio.model.v1.Representation
	2, // 3: semio.extension.converter.v1.RepresentationConversionRequest.target_platform:type_name -> semio.model.v1.Platform
	1, // 4: semio.extension.converter.v1.ConverterService.ConvertRepresentation:input_type -> semio.extension.converter.v1.RepresentationConversionRequest
	3, // 5: semio.extension.converter.v1.ConverterService.ConvertRepresentation:output_type -> semio.model.v1.Representation
	5, // [5:6] is the sub-list for method output_type
	4, // [4:5] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_extension_converter_v1_converter_proto_init() }
func file_extension_converter_v1_converter_proto_init() {
	if File_extension_converter_v1_converter_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_extension_converter_v1_converter_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Converting); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_extension_converter_v1_converter_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RepresentationConversionRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_extension_converter_v1_converter_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_extension_converter_v1_converter_proto_goTypes,
		DependencyIndexes: file_extension_converter_v1_converter_proto_depIdxs,
		MessageInfos:      file_extension_converter_v1_converter_proto_msgTypes,
	}.Build()
	File_extension_converter_v1_converter_proto = out.File
	file_extension_converter_v1_converter_proto_rawDesc = nil
	file_extension_converter_v1_converter_proto_goTypes = nil
	file_extension_converter_v1_converter_proto_depIdxs = nil
}

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        (unknown)
// source: gateway/v1/gateway.proto

package v1

import (
	_ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2/options"
	v1 "github.com/usalu/semio/src/packages/go/model/v1"
	_ "google.golang.org/genproto/googleapis/api/annotations"
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

type LayoutDesignRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The layout that
	Layout *v1.Layout `protobuf:"bytes,1,opt,name=layout,proto3" json:"layout,omitempty"`
	// An optional target platform which will try to convert all elements into it.
	TargetPlatform v1.Platform `protobuf:"varint,2,opt,name=target_platform,json=targetPlatform,proto3,enum=semio.model.v1.Platform" json:"target_platform,omitempty"`
}

func (x *LayoutDesignRequest) Reset() {
	*x = LayoutDesignRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_gateway_v1_gateway_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LayoutDesignRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LayoutDesignRequest) ProtoMessage() {}

func (x *LayoutDesignRequest) ProtoReflect() protoreflect.Message {
	mi := &file_gateway_v1_gateway_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LayoutDesignRequest.ProtoReflect.Descriptor instead.
func (*LayoutDesignRequest) Descriptor() ([]byte, []int) {
	return file_gateway_v1_gateway_proto_rawDescGZIP(), []int{0}
}

func (x *LayoutDesignRequest) GetLayout() *v1.Layout {
	if x != nil {
		return x.Layout
	}
	return nil
}

func (x *LayoutDesignRequest) GetTargetPlatform() v1.Platform {
	if x != nil {
		return x.TargetPlatform
	}
	return v1.Platform(0)
}

var File_gateway_v1_gateway_proto protoreflect.FileDescriptor

var file_gateway_v1_gateway_proto_rawDesc = []byte{
	0x0a, 0x18, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2f, 0x76, 0x31, 0x2f, 0x67, 0x61, 0x74,
	0x65, 0x77, 0x61, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x10, 0x73, 0x65, 0x6d, 0x69,
	0x6f, 0x2e, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2e, 0x76, 0x31, 0x1a, 0x14, 0x6d, 0x6f,
	0x64, 0x65, 0x6c, 0x2f, 0x76, 0x31, 0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61,
	0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x1a, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x6f, 0x70, 0x65,
	0x6e, 0x61, 0x70, 0x69, 0x76, 0x32, 0x2f, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2f, 0x61,
	0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x22, 0x88, 0x01, 0x0a, 0x13, 0x4c, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x44, 0x65, 0x73, 0x69, 0x67,
	0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x2e, 0x0a, 0x06, 0x6c, 0x61, 0x79, 0x6f,
	0x75, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x16, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f,
	0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x61, 0x79, 0x6f, 0x75, 0x74,
	0x52, 0x06, 0x6c, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x12, 0x41, 0x0a, 0x0f, 0x74, 0x61, 0x72, 0x67,
	0x65, 0x74, 0x5f, 0x70, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x0e, 0x32, 0x18, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e,
	0x76, 0x31, 0x2e, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x52, 0x0e, 0x74, 0x61, 0x72,
	0x67, 0x65, 0x74, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x32, 0x7c, 0x0a, 0x0e, 0x47,
	0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x6a, 0x0a,
	0x0c, 0x4c, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x44, 0x65, 0x73, 0x69, 0x67, 0x6e, 0x12, 0x25, 0x2e,
	0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2e, 0x76, 0x31,
	0x2e, 0x4c, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x44, 0x65, 0x73, 0x69, 0x67, 0x6e, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64,
	0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x44, 0x65, 0x73, 0x69, 0x67, 0x6e, 0x22, 0x1b, 0x82, 0xd3,
	0xe4, 0x93, 0x02, 0x15, 0x3a, 0x01, 0x2a, 0x22, 0x10, 0x2f, 0x76, 0x31, 0x2f, 0x6c, 0x61, 0x79,
	0x6f, 0x75, 0x74, 0x64, 0x65, 0x73, 0x69, 0x67, 0x6e, 0x42, 0xa1, 0x02, 0x0a, 0x14, 0x63, 0x6f,
	0x6d, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2e,
	0x76, 0x31, 0x42, 0x0c, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x50, 0x72, 0x6f, 0x74, 0x6f,
	0x50, 0x01, 0x5a, 0x31, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x75,
	0x73, 0x61, 0x6c, 0x75, 0x2f, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2f, 0x73, 0x72, 0x63, 0x2f, 0x70,
	0x61, 0x63, 0x6b, 0x61, 0x67, 0x65, 0x73, 0x2f, 0x67, 0x6f, 0x2f, 0x67, 0x61, 0x74, 0x65, 0x77,
	0x61, 0x79, 0x2f, 0x76, 0x31, 0xa2, 0x02, 0x03, 0x53, 0x47, 0x58, 0xaa, 0x02, 0x10, 0x53, 0x65,
	0x6d, 0x69, 0x6f, 0x2e, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2e, 0x56, 0x31, 0xca, 0x02,
	0x10, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x5c, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x5c, 0x56,
	0x31, 0xe2, 0x02, 0x1c, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x5c, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61,
	0x79, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61,
	0xea, 0x02, 0x12, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x3a, 0x3a, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61,
	0x79, 0x3a, 0x3a, 0x56, 0x31, 0x92, 0x41, 0x65, 0x12, 0x63, 0x0a, 0x05, 0x53, 0x65, 0x6d, 0x69,
	0x6f, 0x22, 0x3e, 0x0a, 0x0a, 0x55, 0x65, 0x6c, 0x69, 0x20, 0x53, 0x61, 0x6c, 0x75, 0x7a, 0x12,
	0x1e, 0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x75, 0x73, 0x61, 0x6c, 0x75, 0x2f, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x1a,
	0x10, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x40, 0x70, 0x6f, 0x73, 0x74, 0x65, 0x6f, 0x2e, 0x6f, 0x72,
	0x67, 0x2a, 0x13, 0x0a, 0x11, 0x41, 0x47, 0x50, 0x4c, 0x2d, 0x33, 0x2e, 0x30, 0x2d, 0x6f, 0x72,
	0x2d, 0x6c, 0x61, 0x74, 0x65, 0x72, 0x32, 0x05, 0x30, 0x2e, 0x30, 0x2e, 0x31, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_gateway_v1_gateway_proto_rawDescOnce sync.Once
	file_gateway_v1_gateway_proto_rawDescData = file_gateway_v1_gateway_proto_rawDesc
)

func file_gateway_v1_gateway_proto_rawDescGZIP() []byte {
	file_gateway_v1_gateway_proto_rawDescOnce.Do(func() {
		file_gateway_v1_gateway_proto_rawDescData = protoimpl.X.CompressGZIP(file_gateway_v1_gateway_proto_rawDescData)
	})
	return file_gateway_v1_gateway_proto_rawDescData
}

var file_gateway_v1_gateway_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_gateway_v1_gateway_proto_goTypes = []interface{}{
	(*LayoutDesignRequest)(nil), // 0: semio.gateway.v1.LayoutDesignRequest
	(*v1.Layout)(nil),           // 1: semio.model.v1.Layout
	(v1.Platform)(0),            // 2: semio.model.v1.Platform
	(*v1.Design)(nil),           // 3: semio.model.v1.Design
}
var file_gateway_v1_gateway_proto_depIdxs = []int32{
	1, // 0: semio.gateway.v1.LayoutDesignRequest.layout:type_name -> semio.model.v1.Layout
	2, // 1: semio.gateway.v1.LayoutDesignRequest.target_platform:type_name -> semio.model.v1.Platform
	0, // 2: semio.gateway.v1.GatewayService.LayoutDesign:input_type -> semio.gateway.v1.LayoutDesignRequest
	3, // 3: semio.gateway.v1.GatewayService.LayoutDesign:output_type -> semio.model.v1.Design
	3, // [3:4] is the sub-list for method output_type
	2, // [2:3] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_gateway_v1_gateway_proto_init() }
func file_gateway_v1_gateway_proto_init() {
	if File_gateway_v1_gateway_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_gateway_v1_gateway_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LayoutDesignRequest); i {
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
			RawDescriptor: file_gateway_v1_gateway_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_gateway_v1_gateway_proto_goTypes,
		DependencyIndexes: file_gateway_v1_gateway_proto_depIdxs,
		MessageInfos:      file_gateway_v1_gateway_proto_msgTypes,
	}.Build()
	File_gateway_v1_gateway_proto = out.File
	file_gateway_v1_gateway_proto_rawDesc = nil
	file_gateway_v1_gateway_proto_goTypes = nil
	file_gateway_v1_gateway_proto_depIdxs = nil
}

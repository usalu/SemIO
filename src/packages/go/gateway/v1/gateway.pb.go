// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        (unknown)
// source: gateway/v1/gateway.proto

package v1

import (
	v1 "github.com/usalu/semio/src/packages/go/assembler/v1"
	v11 "github.com/usalu/semio/src/packages/go/model/v1"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

var File_gateway_v1_gateway_proto protoreflect.FileDescriptor

var file_gateway_v1_gateway_proto_rawDesc = []byte{
	0x0a, 0x18, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2f, 0x76, 0x31, 0x2f, 0x67, 0x61, 0x74,
	0x65, 0x77, 0x61, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x10, 0x73, 0x65, 0x6d, 0x69,
	0x6f, 0x2e, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2e, 0x76, 0x31, 0x1a, 0x14, 0x6d, 0x6f,
	0x64, 0x65, 0x6c, 0x2f, 0x76, 0x31, 0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x1c, 0x61, 0x73, 0x73, 0x65, 0x6d, 0x62, 0x6c, 0x65, 0x72, 0x2f, 0x76, 0x31,
	0x2f, 0x61, 0x73, 0x73, 0x65, 0x6d, 0x62, 0x6c, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x6e, 0x6e,
	0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x32, 0x7e,
	0x0a, 0x0e, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x12, 0x6c, 0x0a, 0x0c, 0x4c, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x44, 0x65, 0x73, 0x69, 0x67, 0x6e,
	0x12, 0x27, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x61, 0x73, 0x73, 0x65, 0x6d, 0x62, 0x6c,
	0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x44, 0x65, 0x73, 0x69,
	0x67, 0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x73, 0x65, 0x6d, 0x69,
	0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x44, 0x65, 0x73, 0x69, 0x67,
	0x6e, 0x22, 0x1b, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x15, 0x3a, 0x01, 0x2a, 0x22, 0x10, 0x2f, 0x76,
	0x31, 0x2f, 0x6c, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x64, 0x65, 0x73, 0x69, 0x67, 0x6e, 0x42, 0xb9,
	0x01, 0x0a, 0x14, 0x63, 0x6f, 0x6d, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x67, 0x61, 0x74,
	0x65, 0x77, 0x61, 0x79, 0x2e, 0x76, 0x31, 0x42, 0x0c, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79,
	0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x31, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x75, 0x73, 0x61, 0x6c, 0x75, 0x2f, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2f,
	0x73, 0x72, 0x63, 0x2f, 0x70, 0x61, 0x63, 0x6b, 0x61, 0x67, 0x65, 0x73, 0x2f, 0x67, 0x6f, 0x2f,
	0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2f, 0x76, 0x31, 0xa2, 0x02, 0x03, 0x53, 0x47, 0x58,
	0xaa, 0x02, 0x10, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x47, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79,
	0x2e, 0x56, 0x31, 0xca, 0x02, 0x10, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x5c, 0x47, 0x61, 0x74, 0x65,
	0x77, 0x61, 0x79, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x1c, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x5c, 0x47,
	0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74,
	0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x12, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x3a, 0x3a, 0x47,
	0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
}

var file_gateway_v1_gateway_proto_goTypes = []interface{}{
	(*v1.LayoutDesignRequest)(nil), // 0: semio.assembler.v1.LayoutDesignRequest
	(*v11.Design)(nil),             // 1: semio.model.v1.Design
}
var file_gateway_v1_gateway_proto_depIdxs = []int32{
	0, // 0: semio.gateway.v1.GatewayService.LayoutDesign:input_type -> semio.assembler.v1.LayoutDesignRequest
	1, // 1: semio.gateway.v1.GatewayService.LayoutDesign:output_type -> semio.model.v1.Design
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_gateway_v1_gateway_proto_init() }
func file_gateway_v1_gateway_proto_init() {
	if File_gateway_v1_gateway_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_gateway_v1_gateway_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_gateway_v1_gateway_proto_goTypes,
		DependencyIndexes: file_gateway_v1_gateway_proto_depIdxs,
	}.Build()
	File_gateway_v1_gateway_proto = out.File
	file_gateway_v1_gateway_proto_rawDesc = nil
	file_gateway_v1_gateway_proto_goTypes = nil
	file_gateway_v1_gateway_proto_depIdxs = nil
}

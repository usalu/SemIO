// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        (unknown)
// source: manager/v1/manager.proto

package v1

import (
	v12 "github.com/usalu/semio/src/packages/go/extension/v1"
	v11 "github.com/usalu/semio/src/packages/go/geometry/v1"
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

type PrototypeRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Plan           *v1.Plan    `protobuf:"bytes,1,opt,name=plan,proto3" json:"plan,omitempty"`
	TargetPlatform v1.Platform `protobuf:"varint,2,opt,name=target_platform,json=targetPlatform,proto3,enum=semio.model.v1.Platform" json:"target_platform,omitempty"`
}

func (x *PrototypeRequest) Reset() {
	*x = PrototypeRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_manager_v1_manager_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PrototypeRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PrototypeRequest) ProtoMessage() {}

func (x *PrototypeRequest) ProtoReflect() protoreflect.Message {
	mi := &file_manager_v1_manager_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PrototypeRequest.ProtoReflect.Descriptor instead.
func (*PrototypeRequest) Descriptor() ([]byte, []int) {
	return file_manager_v1_manager_proto_rawDescGZIP(), []int{0}
}

func (x *PrototypeRequest) GetPlan() *v1.Plan {
	if x != nil {
		return x.Plan
	}
	return nil
}

func (x *PrototypeRequest) GetTargetPlatform() v1.Platform {
	if x != nil {
		return x.TargetPlatform
	}
	return v1.Platform(0)
}

type ConnectElementRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConnectedSobject  *v1.Sobject    `protobuf:"bytes,1,opt,name=connected_sobject,json=connectedSobject,proto3" json:"connected_sobject,omitempty"`
	ConnectingSobject *v1.Sobject    `protobuf:"bytes,2,opt,name=connecting_sobject,json=connectingSobject,proto3" json:"connecting_sobject,omitempty"`
	Connection        *v1.Connection `protobuf:"bytes,3,opt,name=connection,proto3" json:"connection,omitempty"`
}

func (x *ConnectElementRequest) Reset() {
	*x = ConnectElementRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_manager_v1_manager_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ConnectElementRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ConnectElementRequest) ProtoMessage() {}

func (x *ConnectElementRequest) ProtoReflect() protoreflect.Message {
	mi := &file_manager_v1_manager_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ConnectElementRequest.ProtoReflect.Descriptor instead.
func (*ConnectElementRequest) Descriptor() ([]byte, []int) {
	return file_manager_v1_manager_proto_rawDescGZIP(), []int{1}
}

func (x *ConnectElementRequest) GetConnectedSobject() *v1.Sobject {
	if x != nil {
		return x.ConnectedSobject
	}
	return nil
}

func (x *ConnectElementRequest) GetConnectingSobject() *v1.Sobject {
	if x != nil {
		return x.ConnectingSobject
	}
	return nil
}

func (x *ConnectElementRequest) GetConnection() *v1.Connection {
	if x != nil {
		return x.Connection
	}
	return nil
}

type ConnectElementResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConnectedElementPose *v1.Pose   `protobuf:"bytes,1,opt,name=connected_element_pose,json=connectedElementPose,proto3" json:"connected_element_pose,omitempty"`
	ConnectionPoint      *v11.Point `protobuf:"bytes,2,opt,name=connection_point,json=connectionPoint,proto3" json:"connection_point,omitempty"`
}

func (x *ConnectElementResponse) Reset() {
	*x = ConnectElementResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_manager_v1_manager_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ConnectElementResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ConnectElementResponse) ProtoMessage() {}

func (x *ConnectElementResponse) ProtoReflect() protoreflect.Message {
	mi := &file_manager_v1_manager_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ConnectElementResponse.ProtoReflect.Descriptor instead.
func (*ConnectElementResponse) Descriptor() ([]byte, []int) {
	return file_manager_v1_manager_proto_rawDescGZIP(), []int{2}
}

func (x *ConnectElementResponse) GetConnectedElementPose() *v1.Pose {
	if x != nil {
		return x.ConnectedElementPose
	}
	return nil
}

func (x *ConnectElementResponse) GetConnectionPoint() *v11.Point {
	if x != nil {
		return x.ConnectionPoint
	}
	return nil
}

type RegisterExtensionRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Extending       *v12.Extending `protobuf:"bytes,1,opt,name=extending,proto3" json:"extending,omitempty"`
	ReplaceExisting bool           `protobuf:"varint,2,opt,name=replace_existing,json=replaceExisting,proto3" json:"replace_existing,omitempty"`
}

func (x *RegisterExtensionRequest) Reset() {
	*x = RegisterExtensionRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_manager_v1_manager_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisterExtensionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisterExtensionRequest) ProtoMessage() {}

func (x *RegisterExtensionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_manager_v1_manager_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisterExtensionRequest.ProtoReflect.Descriptor instead.
func (*RegisterExtensionRequest) Descriptor() ([]byte, []int) {
	return file_manager_v1_manager_proto_rawDescGZIP(), []int{3}
}

func (x *RegisterExtensionRequest) GetExtending() *v12.Extending {
	if x != nil {
		return x.Extending
	}
	return nil
}

func (x *RegisterExtensionRequest) GetReplaceExisting() bool {
	if x != nil {
		return x.ReplaceExisting
	}
	return false
}

type RegisterExtensionResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Success bool `protobuf:"varint,1,opt,name=success,proto3" json:"success,omitempty"`
	// The old address of the same service type if there was one.
	OldAddress string `protobuf:"bytes,2,opt,name=old_address,json=oldAddress,proto3" json:"old_address,omitempty"`
}

func (x *RegisterExtensionResponse) Reset() {
	*x = RegisterExtensionResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_manager_v1_manager_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisterExtensionResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisterExtensionResponse) ProtoMessage() {}

func (x *RegisterExtensionResponse) ProtoReflect() protoreflect.Message {
	mi := &file_manager_v1_manager_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisterExtensionResponse.ProtoReflect.Descriptor instead.
func (*RegisterExtensionResponse) Descriptor() ([]byte, []int) {
	return file_manager_v1_manager_proto_rawDescGZIP(), []int{4}
}

func (x *RegisterExtensionResponse) GetSuccess() bool {
	if x != nil {
		return x.Success
	}
	return false
}

func (x *RegisterExtensionResponse) GetOldAddress() string {
	if x != nil {
		return x.OldAddress
	}
	return ""
}

type GetRegisteredExtensionsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetRegisteredExtensionsRequest) Reset() {
	*x = GetRegisteredExtensionsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_manager_v1_manager_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetRegisteredExtensionsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetRegisteredExtensionsRequest) ProtoMessage() {}

func (x *GetRegisteredExtensionsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_manager_v1_manager_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetRegisteredExtensionsRequest.ProtoReflect.Descriptor instead.
func (*GetRegisteredExtensionsRequest) Descriptor() ([]byte, []int) {
	return file_manager_v1_manager_proto_rawDescGZIP(), []int{5}
}

type RegisteredExtensionsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// A map with extensions where the address is the key and the extension description is the value.
	Extensions map[string]*v12.Extending `protobuf:"bytes,1,rep,name=extensions,proto3" json:"extensions,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

func (x *RegisteredExtensionsResponse) Reset() {
	*x = RegisteredExtensionsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_manager_v1_manager_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisteredExtensionsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisteredExtensionsResponse) ProtoMessage() {}

func (x *RegisteredExtensionsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_manager_v1_manager_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisteredExtensionsResponse.ProtoReflect.Descriptor instead.
func (*RegisteredExtensionsResponse) Descriptor() ([]byte, []int) {
	return file_manager_v1_manager_proto_rawDescGZIP(), []int{6}
}

func (x *RegisteredExtensionsResponse) GetExtensions() map[string]*v12.Extending {
	if x != nil {
		return x.Extensions
	}
	return nil
}

var File_manager_v1_manager_proto protoreflect.FileDescriptor

var file_manager_v1_manager_proto_rawDesc = []byte{
	0x0a, 0x18, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2f, 0x76, 0x31, 0x2f, 0x6d, 0x61, 0x6e,
	0x61, 0x67, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x10, 0x73, 0x65, 0x6d, 0x69,
	0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x1a, 0x1a, 0x67, 0x65,
	0x6f, 0x6d, 0x65, 0x74, 0x72, 0x79, 0x2f, 0x76, 0x31, 0x2f, 0x67, 0x65, 0x6f, 0x6d, 0x65, 0x74,
	0x72, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x14, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2f,
	0x76, 0x31, 0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1c,
	0x65, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2f, 0x76, 0x31, 0x2f, 0x65, 0x78, 0x74,
	0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x7f, 0x0a, 0x10,
	0x50, 0x72, 0x6f, 0x74, 0x6f, 0x74, 0x79, 0x70, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x12, 0x28, 0x0a, 0x04, 0x70, 0x6c, 0x61, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14,
	0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e,
	0x50, 0x6c, 0x61, 0x6e, 0x52, 0x04, 0x70, 0x6c, 0x61, 0x6e, 0x12, 0x41, 0x0a, 0x0f, 0x74, 0x61,
	0x72, 0x67, 0x65, 0x74, 0x5f, 0x70, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0e, 0x32, 0x18, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65,
	0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x52, 0x0e, 0x74,
	0x61, 0x72, 0x67, 0x65, 0x74, 0x50, 0x6c, 0x61, 0x74, 0x66, 0x6f, 0x72, 0x6d, 0x22, 0xe1, 0x01,
	0x0a, 0x15, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x45, 0x6c, 0x65, 0x6d, 0x65, 0x6e, 0x74,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x44, 0x0a, 0x11, 0x63, 0x6f, 0x6e, 0x6e, 0x65,
	0x63, 0x74, 0x65, 0x64, 0x5f, 0x73, 0x6f, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x17, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c,
	0x2e, 0x76, 0x31, 0x2e, 0x53, 0x6f, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x52, 0x10, 0x63, 0x6f, 0x6e,
	0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x53, 0x6f, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x12, 0x46, 0x0a,
	0x12, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6e, 0x67, 0x5f, 0x73, 0x6f, 0x62, 0x6a,
	0x65, 0x63, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x73, 0x65, 0x6d, 0x69,
	0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x53, 0x6f, 0x62, 0x6a, 0x65,
	0x63, 0x74, 0x52, 0x11, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6e, 0x67, 0x53, 0x6f,
	0x62, 0x6a, 0x65, 0x63, 0x74, 0x12, 0x3a, 0x0a, 0x0a, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74,
	0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x73, 0x65, 0x6d, 0x69,
	0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x43, 0x6f, 0x6e, 0x6e, 0x65,
	0x63, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f,
	0x6e, 0x22, 0xa9, 0x01, 0x0a, 0x16, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x45, 0x6c, 0x65,
	0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4a, 0x0a, 0x16,
	0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x5f, 0x65, 0x6c, 0x65, 0x6d, 0x65, 0x6e,
	0x74, 0x5f, 0x70, 0x6f, 0x73, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x73,
	0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x6f,
	0x73, 0x65, 0x52, 0x14, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x45, 0x6c, 0x65,
	0x6d, 0x65, 0x6e, 0x74, 0x50, 0x6f, 0x73, 0x65, 0x12, 0x43, 0x0a, 0x10, 0x63, 0x6f, 0x6e, 0x6e,
	0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x18, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x67, 0x65, 0x6f, 0x6d, 0x65,
	0x74, 0x72, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x52, 0x0f, 0x63, 0x6f,
	0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x22, 0x82, 0x01,
	0x0a, 0x18, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73,
	0x69, 0x6f, 0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x3b, 0x0a, 0x09, 0x65, 0x78,
	0x74, 0x65, 0x6e, 0x64, 0x69, 0x6e, 0x67, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1d, 0x2e,
	0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x65, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x2e,
	0x76, 0x31, 0x2e, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x64, 0x69, 0x6e, 0x67, 0x52, 0x09, 0x65, 0x78,
	0x74, 0x65, 0x6e, 0x64, 0x69, 0x6e, 0x67, 0x12, 0x29, 0x0a, 0x10, 0x72, 0x65, 0x70, 0x6c, 0x61,
	0x63, 0x65, 0x5f, 0x65, 0x78, 0x69, 0x73, 0x74, 0x69, 0x6e, 0x67, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x08, 0x52, 0x0f, 0x72, 0x65, 0x70, 0x6c, 0x61, 0x63, 0x65, 0x45, 0x78, 0x69, 0x73, 0x74, 0x69,
	0x6e, 0x67, 0x22, 0x56, 0x0a, 0x19, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x45, 0x78,
	0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12,
	0x18, 0x0a, 0x07, 0x73, 0x75, 0x63, 0x63, 0x65, 0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08,
	0x52, 0x07, 0x73, 0x75, 0x63, 0x63, 0x65, 0x73, 0x73, 0x12, 0x1f, 0x0a, 0x0b, 0x6f, 0x6c, 0x64,
	0x5f, 0x61, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a,
	0x6f, 0x6c, 0x64, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x22, 0x20, 0x0a, 0x1e, 0x47, 0x65,
	0x74, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x45, 0x78, 0x74, 0x65, 0x6e,
	0x73, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0xdc, 0x01, 0x0a,
	0x1c, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x45, 0x78, 0x74, 0x65, 0x6e,
	0x73, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x5e, 0x0a,
	0x0a, 0x65, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28,
	0x0b, 0x32, 0x3e, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65,
	0x72, 0x2e, 0x76, 0x31, 0x2e, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x45,
	0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x2e, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x45, 0x6e, 0x74, 0x72,
	0x79, 0x52, 0x0a, 0x65, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x1a, 0x5c, 0x0a,
	0x0f, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x45, 0x6e, 0x74, 0x72, 0x79,
	0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b,
	0x65, 0x79, 0x12, 0x33, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x1d, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x65, 0x78, 0x74, 0x65, 0x6e, 0x73,
	0x69, 0x6f, 0x6e, 0x2e, 0x76, 0x31, 0x2e, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x64, 0x69, 0x6e, 0x67,
	0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3a, 0x02, 0x38, 0x01, 0x32, 0xb3, 0x03, 0x0a, 0x0e,
	0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x51,
	0x0a, 0x10, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x74, 0x79,
	0x70, 0x65, 0x12, 0x22, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61, 0x67,
	0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x74, 0x79, 0x70, 0x65, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x19, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d,
	0x6f, 0x64, 0x65, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x74, 0x79, 0x70,
	0x65, 0x12, 0x63, 0x0a, 0x0e, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x45, 0x6c, 0x65, 0x6d,
	0x65, 0x6e, 0x74, 0x12, 0x27, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61,
	0x67, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x45, 0x6c,
	0x65, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x28, 0x2e, 0x73,
	0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e,
	0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x45, 0x6c, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x6c, 0x0a, 0x11, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74,
	0x65, 0x72, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x12, 0x2a, 0x2e, 0x73, 0x65,
	0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x52,
	0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x2b, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e,
	0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x52, 0x65, 0x67, 0x69, 0x73,
	0x74, 0x65, 0x72, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x7b, 0x0a, 0x17, 0x47, 0x65, 0x74, 0x52, 0x65, 0x67, 0x69, 0x73,
	0x74, 0x65, 0x72, 0x65, 0x64, 0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x12,
	0x30, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2e,
	0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64,
	0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x2e, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65,
	0x72, 0x2e, 0x76, 0x31, 0x2e, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x45,
	0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x42, 0xb9, 0x01, 0x0a, 0x14, 0x63, 0x6f, 0x6d, 0x2e, 0x73, 0x65, 0x6d, 0x69, 0x6f, 0x2e,
	0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x42, 0x0c, 0x4d, 0x61, 0x6e, 0x61,
	0x67, 0x65, 0x72, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x31, 0x67, 0x69, 0x74, 0x68,
	0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x75, 0x73, 0x61, 0x6c, 0x75, 0x2f, 0x73, 0x65, 0x6d,
	0x69, 0x6f, 0x2f, 0x73, 0x72, 0x63, 0x2f, 0x70, 0x61, 0x63, 0x6b, 0x61, 0x67, 0x65, 0x73, 0x2f,
	0x67, 0x6f, 0x2f, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2f, 0x76, 0x31, 0xa2, 0x02, 0x03,
	0x53, 0x4d, 0x58, 0xaa, 0x02, 0x10, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x2e, 0x4d, 0x61, 0x6e, 0x61,
	0x67, 0x65, 0x72, 0x2e, 0x56, 0x31, 0xca, 0x02, 0x10, 0x53, 0x65, 0x6d, 0x69, 0x6f, 0x5c, 0x4d,
	0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x1c, 0x53, 0x65, 0x6d, 0x69,
	0x6f, 0x5c, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42,
	0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x12, 0x53, 0x65, 0x6d, 0x69, 0x6f,
	0x3a, 0x3a, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_manager_v1_manager_proto_rawDescOnce sync.Once
	file_manager_v1_manager_proto_rawDescData = file_manager_v1_manager_proto_rawDesc
)

func file_manager_v1_manager_proto_rawDescGZIP() []byte {
	file_manager_v1_manager_proto_rawDescOnce.Do(func() {
		file_manager_v1_manager_proto_rawDescData = protoimpl.X.CompressGZIP(file_manager_v1_manager_proto_rawDescData)
	})
	return file_manager_v1_manager_proto_rawDescData
}

var file_manager_v1_manager_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_manager_v1_manager_proto_goTypes = []interface{}{
	(*PrototypeRequest)(nil),               // 0: semio.manager.v1.PrototypeRequest
	(*ConnectElementRequest)(nil),          // 1: semio.manager.v1.ConnectElementRequest
	(*ConnectElementResponse)(nil),         // 2: semio.manager.v1.ConnectElementResponse
	(*RegisterExtensionRequest)(nil),       // 3: semio.manager.v1.RegisterExtensionRequest
	(*RegisterExtensionResponse)(nil),      // 4: semio.manager.v1.RegisterExtensionResponse
	(*GetRegisteredExtensionsRequest)(nil), // 5: semio.manager.v1.GetRegisteredExtensionsRequest
	(*RegisteredExtensionsResponse)(nil),   // 6: semio.manager.v1.RegisteredExtensionsResponse
	nil,                                    // 7: semio.manager.v1.RegisteredExtensionsResponse.ExtensionsEntry
	(*v1.Plan)(nil),                        // 8: semio.model.v1.Plan
	(v1.Platform)(0),                       // 9: semio.model.v1.Platform
	(*v1.Sobject)(nil),                     // 10: semio.model.v1.Sobject
	(*v1.Connection)(nil),                  // 11: semio.model.v1.Connection
	(*v1.Pose)(nil),                        // 12: semio.model.v1.Pose
	(*v11.Point)(nil),                      // 13: semio.geometry.v1.Point
	(*v12.Extending)(nil),                  // 14: semio.extension.v1.Extending
	(*v1.Prototype)(nil),                   // 15: semio.model.v1.Prototype
}
var file_manager_v1_manager_proto_depIdxs = []int32{
	8,  // 0: semio.manager.v1.PrototypeRequest.plan:type_name -> semio.model.v1.Plan
	9,  // 1: semio.manager.v1.PrototypeRequest.target_platform:type_name -> semio.model.v1.Platform
	10, // 2: semio.manager.v1.ConnectElementRequest.connected_sobject:type_name -> semio.model.v1.Sobject
	10, // 3: semio.manager.v1.ConnectElementRequest.connecting_sobject:type_name -> semio.model.v1.Sobject
	11, // 4: semio.manager.v1.ConnectElementRequest.connection:type_name -> semio.model.v1.Connection
	12, // 5: semio.manager.v1.ConnectElementResponse.connected_element_pose:type_name -> semio.model.v1.Pose
	13, // 6: semio.manager.v1.ConnectElementResponse.connection_point:type_name -> semio.geometry.v1.Point
	14, // 7: semio.manager.v1.RegisterExtensionRequest.extending:type_name -> semio.extension.v1.Extending
	7,  // 8: semio.manager.v1.RegisteredExtensionsResponse.extensions:type_name -> semio.manager.v1.RegisteredExtensionsResponse.ExtensionsEntry
	14, // 9: semio.manager.v1.RegisteredExtensionsResponse.ExtensionsEntry.value:type_name -> semio.extension.v1.Extending
	0,  // 10: semio.manager.v1.ManagerService.RequestPrototype:input_type -> semio.manager.v1.PrototypeRequest
	1,  // 11: semio.manager.v1.ManagerService.ConnectElement:input_type -> semio.manager.v1.ConnectElementRequest
	3,  // 12: semio.manager.v1.ManagerService.RegisterExtension:input_type -> semio.manager.v1.RegisterExtensionRequest
	5,  // 13: semio.manager.v1.ManagerService.GetRegisteredExtensions:input_type -> semio.manager.v1.GetRegisteredExtensionsRequest
	15, // 14: semio.manager.v1.ManagerService.RequestPrototype:output_type -> semio.model.v1.Prototype
	2,  // 15: semio.manager.v1.ManagerService.ConnectElement:output_type -> semio.manager.v1.ConnectElementResponse
	4,  // 16: semio.manager.v1.ManagerService.RegisterExtension:output_type -> semio.manager.v1.RegisterExtensionResponse
	6,  // 17: semio.manager.v1.ManagerService.GetRegisteredExtensions:output_type -> semio.manager.v1.RegisteredExtensionsResponse
	14, // [14:18] is the sub-list for method output_type
	10, // [10:14] is the sub-list for method input_type
	10, // [10:10] is the sub-list for extension type_name
	10, // [10:10] is the sub-list for extension extendee
	0,  // [0:10] is the sub-list for field type_name
}

func init() { file_manager_v1_manager_proto_init() }
func file_manager_v1_manager_proto_init() {
	if File_manager_v1_manager_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_manager_v1_manager_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PrototypeRequest); i {
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
		file_manager_v1_manager_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ConnectElementRequest); i {
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
		file_manager_v1_manager_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ConnectElementResponse); i {
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
		file_manager_v1_manager_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisterExtensionRequest); i {
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
		file_manager_v1_manager_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisterExtensionResponse); i {
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
		file_manager_v1_manager_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetRegisteredExtensionsRequest); i {
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
		file_manager_v1_manager_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisteredExtensionsResponse); i {
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
			RawDescriptor: file_manager_v1_manager_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_manager_v1_manager_proto_goTypes,
		DependencyIndexes: file_manager_v1_manager_proto_depIdxs,
		MessageInfos:      file_manager_v1_manager_proto_msgTypes,
	}.Build()
	File_manager_v1_manager_proto = out.File
	file_manager_v1_manager_proto_rawDesc = nil
	file_manager_v1_manager_proto_goTypes = nil
	file_manager_v1_manager_proto_depIdxs = nil
}

// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "manager/v1/manager.proto" (package "semio.manager.v1", syntax proto3)
// tslint:disable
import { RegisteredExtensionsResponse } from "./manager";
import { GetRegisteredExtensionsRequest } from "./manager";
import { ExtensionRegistrationResponse } from "./manager";
import { ExtensionRegistrationRequest } from "./manager";
import { AttractionResponse } from "./manager";
import { AttractionRequest } from "./manager";
import { Element } from "../../model/v1/model";
import { ElementRequest } from "./manager";
import type * as grpc from "@grpc/grpc-js";
/**
 * A manager service is responsible for calling extensions, storing/caching results while offering a cleaner interface to the server.
 *
 * @generated from protobuf service semio.manager.v1.ManagerService
 */
export interface IManagerService extends grpc.UntypedServiceImplementation {
    /**
     * Request an element from instance information and a traget type.
     * The target type tries to be provided by one of the following strategies (lowest number wins).
     * 1. The element directly (1.1) or the extension can convert directly (1.2) or indirectly (1.3)
     * 2. Another extension can convert these types directly (2.1) or indirectly (2.2)
     * 3. Multiple extensions together can convert directly (3.1) or indirectly (3.2).
     *
     * @generated from protobuf rpc: RequestElement(semio.manager.v1.ElementRequest) returns (semio.model.v1.Element);
     */
    requestElement: grpc.handleUnaryCall<ElementRequest, Element>;
    /**
     * Request the attracted element for an attraction.
     * The target type tries to be provided by one of the following strategies (lowest number wins).
     * 1. The element directly (1.1) or the extension can convert directly (1.2) or indirectly (1.3)
     * 2. Another extension can convert these types directly (2.1) or indirectly (2.2)
     * 3. Multiple extensions together can convert directly (3.1) or indirectly (3.2).
     *
     * @generated from protobuf rpc: RequestAttraction(semio.manager.v1.AttractionRequest) returns (semio.manager.v1.AttractionResponse);
     */
    requestAttraction: grpc.handleUnaryCall<AttractionRequest, AttractionResponse>;
    /**
     * Register a service to the server.
     *
     * @generated from protobuf rpc: RegisterExtension(semio.manager.v1.ExtensionRegistrationRequest) returns (semio.manager.v1.ExtensionRegistrationResponse);
     */
    registerExtension: grpc.handleUnaryCall<ExtensionRegistrationRequest, ExtensionRegistrationResponse>;
    /**
     * Get all registered extensions.
     *
     * @generated from protobuf rpc: GetRegisteredExtensions(semio.manager.v1.GetRegisteredExtensionsRequest) returns (semio.manager.v1.RegisteredExtensionsResponse);
     */
    getRegisteredExtensions: grpc.handleUnaryCall<GetRegisteredExtensionsRequest, RegisteredExtensionsResponse>;
}
/**
 * @grpc/grpc-js definition for the protobuf service semio.manager.v1.ManagerService.
 *
 * Usage: Implement the interface IManagerService and add to a grpc server.
 *
 * ```typescript
 * const server = new grpc.Server();
 * const service: IManagerService = ...
 * server.addService(managerServiceDefinition, service);
 * ```
 */
export const managerServiceDefinition: grpc.ServiceDefinition<IManagerService> = {
    requestElement: {
        path: "/semio.manager.v1.ManagerService/RequestElement",
        originalName: "RequestElement",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Element.fromBinary(bytes),
        requestDeserialize: bytes => ElementRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Element.toBinary(value)),
        requestSerialize: value => Buffer.from(ElementRequest.toBinary(value))
    },
    requestAttraction: {
        path: "/semio.manager.v1.ManagerService/RequestAttraction",
        originalName: "RequestAttraction",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => AttractionResponse.fromBinary(bytes),
        requestDeserialize: bytes => AttractionRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(AttractionResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(AttractionRequest.toBinary(value))
    },
    registerExtension: {
        path: "/semio.manager.v1.ManagerService/RegisterExtension",
        originalName: "RegisterExtension",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => ExtensionRegistrationResponse.fromBinary(bytes),
        requestDeserialize: bytes => ExtensionRegistrationRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(ExtensionRegistrationResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(ExtensionRegistrationRequest.toBinary(value))
    },
    getRegisteredExtensions: {
        path: "/semio.manager.v1.ManagerService/GetRegisteredExtensions",
        originalName: "GetRegisteredExtensions",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => RegisteredExtensionsResponse.fromBinary(bytes),
        requestDeserialize: bytes => GetRegisteredExtensionsRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(RegisteredExtensionsResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(GetRegisteredExtensionsRequest.toBinary(value))
    }
};

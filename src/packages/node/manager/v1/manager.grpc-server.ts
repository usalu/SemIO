// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "manager/v1/manager.proto" (package "semio.manager.v1", syntax proto3)
// tslint:disable
import { RegisteredExtensionsResponse } from "./manager";
import { GetRegisteredExtensionsRequest } from "./manager";
import { RegisterExtensionResponse } from "./manager";
import { RegisterExtensionRequest } from "./manager";
import { ConnectElementResponse } from "./manager";
import { ConnectElementRequest } from "./manager";
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
     * Request an element from instance information and an optional traget representation parameters.
     *
     * @generated from protobuf rpc: RequestElement(semio.manager.v1.ElementRequest) returns (semio.model.v1.Element);
     */
    requestElement: grpc.handleUnaryCall<ElementRequest, Element>;
    /**
     * Connected element for an connection.
     *
     * @generated from protobuf rpc: ConnectElement(semio.manager.v1.ConnectElementRequest) returns (semio.manager.v1.ConnectElementResponse);
     */
    connectElement: grpc.handleUnaryCall<ConnectElementRequest, ConnectElementResponse>;
    /**
     * Register a service to the server.
     *
     * @generated from protobuf rpc: RegisterExtension(semio.manager.v1.RegisterExtensionRequest) returns (semio.manager.v1.RegisterExtensionResponse);
     */
    registerExtension: grpc.handleUnaryCall<RegisterExtensionRequest, RegisterExtensionResponse>;
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
    connectElement: {
        path: "/semio.manager.v1.ManagerService/ConnectElement",
        originalName: "ConnectElement",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => ConnectElementResponse.fromBinary(bytes),
        requestDeserialize: bytes => ConnectElementRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(ConnectElementResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(ConnectElementRequest.toBinary(value))
    },
    registerExtension: {
        path: "/semio.manager.v1.ManagerService/RegisterExtension",
        originalName: "RegisterExtension",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => RegisterExtensionResponse.fromBinary(bytes),
        requestDeserialize: bytes => RegisterExtensionRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(RegisterExtensionResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(RegisterExtensionRequest.toBinary(value))
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

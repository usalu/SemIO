// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "server/v1/server.proto" (package "semio.server.v1", syntax proto3)
// tslint:disable
import { ServerServices } from "./server";
import { GetRegisteredServicesRequest } from "./server";
import { ServiceRegistrationResponse } from "./server";
import { ServiceRegistrationRequest } from "./server";
import { Design } from "../../model/v1/model";
import { Layout } from "../../model/v1/model";
import type * as grpc from "@grpc/grpc-js";
/**
 * The server service is the gateway for all other apis of semio.
 *
 *   option (google.api.default_host) = "localhost:50000";
 *
 * @generated from protobuf service semio.server.v1.ServerService
 */
export interface IServerService extends grpc.UntypedServiceImplementation {
    /**
     * Lay out a design from a layout and return a design.
     *
     * option (google.api.http) = {
     *   post: "v1/layout-design"
     *   body: "*"
     * };
     *
     * @generated from protobuf rpc: LayoutDesign(semio.model.v1.Layout) returns (semio.model.v1.Design);
     */
    layoutDesign: grpc.handleUnaryCall<Layout, Design>;
    /**
     * Register a service to the server.
     *
     * @generated from protobuf rpc: RegisterService(semio.server.v1.ServiceRegistrationRequest) returns (semio.server.v1.ServiceRegistrationResponse);
     */
    registerService: grpc.handleUnaryCall<ServiceRegistrationRequest, ServiceRegistrationResponse>;
    /**
     * Get all registered services.
     *
     * @generated from protobuf rpc: GetRegisteredServices(semio.server.v1.GetRegisteredServicesRequest) returns (semio.server.v1.ServerServices);
     */
    getRegisteredServices: grpc.handleUnaryCall<GetRegisteredServicesRequest, ServerServices>;
}
/**
 * @grpc/grpc-js definition for the protobuf service semio.server.v1.ServerService.
 *
 * Usage: Implement the interface IServerService and add to a grpc server.
 *
 * ```typescript
 * const server = new grpc.Server();
 * const service: IServerService = ...
 * server.addService(serverServiceDefinition, service);
 * ```
 */
export const serverServiceDefinition: grpc.ServiceDefinition<IServerService> = {
    layoutDesign: {
        path: "/semio.server.v1.ServerService/LayoutDesign",
        originalName: "LayoutDesign",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Design.fromBinary(bytes),
        requestDeserialize: bytes => Layout.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Design.toBinary(value)),
        requestSerialize: value => Buffer.from(Layout.toBinary(value))
    },
    registerService: {
        path: "/semio.server.v1.ServerService/RegisterService",
        originalName: "RegisterService",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => ServiceRegistrationResponse.fromBinary(bytes),
        requestDeserialize: bytes => ServiceRegistrationRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(ServiceRegistrationResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(ServiceRegistrationRequest.toBinary(value))
    },
    getRegisteredServices: {
        path: "/semio.server.v1.ServerService/GetRegisteredServices",
        originalName: "GetRegisteredServices",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => ServerServices.fromBinary(bytes),
        requestDeserialize: bytes => GetRegisteredServicesRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(ServerServices.toBinary(value)),
        requestSerialize: value => Buffer.from(GetRegisteredServicesRequest.toBinary(value))
    }
};

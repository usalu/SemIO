// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "extension/adapter/v1/adapter.proto" (package "semio.extension.adapter.v1", syntax proto3)
// tslint:disable
import { Prototype } from "../../../model/v1/model";
import { PrototypeRequest } from "./adapter";
import { Point } from "../../../model/v1/model";
import { ConnectionPointRequest } from "./adapter";
import type * as grpc from "@grpc/grpc-js";
/**
 * An adapter service is an adapter for elements to a specific platform where your elements are (parameterically) defined in.
 *
 * @generated from protobuf service semio.extension.adapter.v1.AdapterService
 */
export interface IAdapterService extends grpc.UntypedServiceImplementation {
    /**
     * Request an connection point for the connected.
     *
     * @generated from protobuf rpc: RequestConnectionPoint(semio.extension.adapter.v1.ConnectionPointRequest) returns (semio.model.v1.Point);
     */
    requestConnectionPoint: grpc.handleUnaryCall<ConnectionPointRequest, Point>;
    /**
     * Request a prototype.
     *
     * @generated from protobuf rpc: RequestPrototype(semio.extension.adapter.v1.PrototypeRequest) returns (semio.model.v1.Prototype);
     */
    requestPrototype: grpc.handleUnaryCall<PrototypeRequest, Prototype>;
}
/**
 * @grpc/grpc-js definition for the protobuf service semio.extension.adapter.v1.AdapterService.
 *
 * Usage: Implement the interface IAdapterService and add to a grpc server.
 *
 * ```typescript
 * const server = new grpc.Server();
 * const service: IAdapterService = ...
 * server.addService(adapterServiceDefinition, service);
 * ```
 */
export const adapterServiceDefinition: grpc.ServiceDefinition<IAdapterService> = {
    requestConnectionPoint: {
        path: "/semio.extension.adapter.v1.AdapterService/RequestConnectionPoint",
        originalName: "RequestConnectionPoint",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Point.fromBinary(bytes),
        requestDeserialize: bytes => ConnectionPointRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Point.toBinary(value)),
        requestSerialize: value => Buffer.from(ConnectionPointRequest.toBinary(value))
    },
    requestPrototype: {
        path: "/semio.extension.adapter.v1.AdapterService/RequestPrototype",
        originalName: "RequestPrototype",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Prototype.fromBinary(bytes),
        requestDeserialize: bytes => PrototypeRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Prototype.toBinary(value)),
        requestSerialize: value => Buffer.from(PrototypeRequest.toBinary(value))
    }
};

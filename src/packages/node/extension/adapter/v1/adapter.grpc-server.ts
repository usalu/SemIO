// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "extension/adapter/v1/adapter.proto" (package "semio.extension.adapter.v1", syntax proto3)
// tslint:disable
import { Representations } from "../../../model/v1/model";
import { RepresentationsRequest } from "./adapter";
import { Representation } from "../../../model/v1/model";
import { RepresentationRequest } from "./adapter";
import { Point } from "../../../model/v1/model";
import { AttractionPointRequest } from "./adapter";
import type * as grpc from "@grpc/grpc-js";
/**
 * An adapter service is an adapter for elements to a specific platform where your elements are (parameterically) defined in.
 *
 * @generated from protobuf service semio.extension.adapter.v1.AdapterService
 */
export interface IAdapterService extends grpc.UntypedServiceImplementation {
    /**
     * Request an attraction point for the attracted.
     *
     * @generated from protobuf rpc: RequestAttractionPoint(semio.extension.adapter.v1.AttractionPointRequest) returns (semio.model.v1.Point);
     */
    requestAttractionPoint: grpc.handleUnaryCall<AttractionPointRequest, Point>;
    /**
     * Request a specific representation
     *
     * @generated from protobuf rpc: RequestRepresentation(semio.extension.adapter.v1.RepresentationRequest) returns (semio.model.v1.Representation);
     */
    requestRepresentation: grpc.handleUnaryCall<RepresentationRequest, Representation>;
    /**
     * Request potentially all representations
     *
     * @generated from protobuf rpc: RequestRepresentations(semio.extension.adapter.v1.RepresentationsRequest) returns (semio.model.v1.Representations);
     */
    requestRepresentations: grpc.handleUnaryCall<RepresentationsRequest, Representations>;
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
    requestAttractionPoint: {
        path: "/semio.extension.adapter.v1.AdapterService/RequestAttractionPoint",
        originalName: "RequestAttractionPoint",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Point.fromBinary(bytes),
        requestDeserialize: bytes => AttractionPointRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Point.toBinary(value)),
        requestSerialize: value => Buffer.from(AttractionPointRequest.toBinary(value))
    },
    requestRepresentation: {
        path: "/semio.extension.adapter.v1.AdapterService/RequestRepresentation",
        originalName: "RequestRepresentation",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Representation.fromBinary(bytes),
        requestDeserialize: bytes => RepresentationRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Representation.toBinary(value)),
        requestSerialize: value => Buffer.from(RepresentationRequest.toBinary(value))
    },
    requestRepresentations: {
        path: "/semio.extension.adapter.v1.AdapterService/RequestRepresentations",
        originalName: "RequestRepresentations",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Representations.fromBinary(bytes),
        requestDeserialize: bytes => RepresentationsRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Representations.toBinary(value)),
        requestSerialize: value => Buffer.from(RepresentationsRequest.toBinary(value))
    }
};
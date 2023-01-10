// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "extension/translator/v1/translator.proto" (package "semio.extension.translator.v1", syntax proto3)
// tslint:disable
import { Representation } from "../../../model/v1/model";
import { TranslateRepresentationRequest } from "./translator";
import type * as grpc from "@grpc/grpc-js";
/**
 * A translator service can (mostly) translate representations of the specific extension platform.
 *
 * @generated from protobuf service semio.extension.translator.v1.TranslatorService
 */
export interface ITranslatorService extends grpc.UntypedServiceImplementation {
    /**
     * Translate a representation from one pose (coordinate system) into another one.
     *
     * @generated from protobuf rpc: TranslateRepresentation(semio.extension.translator.v1.TranslateRepresentationRequest) returns (semio.model.v1.Representation);
     */
    translateRepresentation: grpc.handleUnaryCall<TranslateRepresentationRequest, Representation>;
}
/**
 * @grpc/grpc-js definition for the protobuf service semio.extension.translator.v1.TranslatorService.
 *
 * Usage: Implement the interface ITranslatorService and add to a grpc server.
 *
 * ```typescript
 * const server = new grpc.Server();
 * const service: ITranslatorService = ...
 * server.addService(translatorServiceDefinition, service);
 * ```
 */
export const translatorServiceDefinition: grpc.ServiceDefinition<ITranslatorService> = {
    translateRepresentation: {
        path: "/semio.extension.translator.v1.TranslatorService/TranslateRepresentation",
        originalName: "TranslateRepresentation",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => Representation.fromBinary(bytes),
        requestDeserialize: bytes => TranslateRepresentationRequest.fromBinary(bytes),
        responseSerialize: value => Buffer.from(Representation.toBinary(value)),
        requestSerialize: value => Buffer.from(TranslateRepresentationRequest.toBinary(value))
    }
};

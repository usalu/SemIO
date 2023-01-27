// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "assembler/v1/assembler.proto" (package "semio.assembler.v1", syntax proto3)
// tslint:disable
import { AssembleLayoutResponse } from "./assembler";
import { Assembly } from "../../model/v1/model";
import { LayoutToAssembliesResponse } from "./assembler";
import { Layout } from "../../model/v1/model";
import type * as grpc from "@grpc/grpc-js";
/**
 * The assembler service is responsible for assembling layouts into designs.
 *
 * @generated from protobuf service semio.assembler.v1.AssemblerService
 */
export interface IAssemblerService extends grpc.UntypedServiceImplementation {
    /**
     * Turn a layout into assemblies.
     *
     * @generated from protobuf rpc: LayoutToAssemblies(semio.model.v1.Layout) returns (semio.assembler.v1.LayoutToAssembliesResponse);
     */
    layoutToAssemblies: grpc.handleUnaryCall<Layout, LayoutToAssembliesResponse>;
    /**
     * Assemble elements from an assembly.
     *
     * @generated from protobuf rpc: AssemblyToElements(semio.model.v1.Assembly) returns (semio.assembler.v1.AssembleLayoutResponse);
     */
    assemblyToElements: grpc.handleUnaryCall<Assembly, AssembleLayoutResponse>;
}
/**
 * @grpc/grpc-js definition for the protobuf service semio.assembler.v1.AssemblerService.
 *
 * Usage: Implement the interface IAssemblerService and add to a grpc server.
 *
 * ```typescript
 * const server = new grpc.Server();
 * const service: IAssemblerService = ...
 * server.addService(assemblerServiceDefinition, service);
 * ```
 */
export const assemblerServiceDefinition: grpc.ServiceDefinition<IAssemblerService> = {
    layoutToAssemblies: {
        path: "/semio.assembler.v1.AssemblerService/LayoutToAssemblies",
        originalName: "LayoutToAssemblies",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => LayoutToAssembliesResponse.fromBinary(bytes),
        requestDeserialize: bytes => Layout.fromBinary(bytes),
        responseSerialize: value => Buffer.from(LayoutToAssembliesResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(Layout.toBinary(value))
    },
    assemblyToElements: {
        path: "/semio.assembler.v1.AssemblerService/AssemblyToElements",
        originalName: "AssemblyToElements",
        requestStream: false,
        responseStream: false,
        responseDeserialize: bytes => AssembleLayoutResponse.fromBinary(bytes),
        requestDeserialize: bytes => Assembly.fromBinary(bytes),
        responseSerialize: value => Buffer.from(AssembleLayoutResponse.toBinary(value)),
        requestSerialize: value => Buffer.from(Assembly.toBinary(value))
    }
};

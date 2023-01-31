// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "manager/v1/manager.proto" (package "semio.manager.v1", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ManagerService } from "./manager";
import type { RegisteredExtensionsResponse } from "./manager";
import type { GetRegisteredExtensionsRequest } from "./manager";
import type { RegisterExtensionResponse } from "./manager";
import type { RegisterExtensionRequest } from "./manager";
import type { ConnectElementResponse } from "./manager";
import type { ConnectElementRequest } from "./manager";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { Prototype } from "../../model/v1/model";
import type { PrototypeRequest } from "./manager";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * A manager service is responsible for calling extensions, storing/caching results while offering a cleaner interface to the server.
 *
 * @generated from protobuf service semio.manager.v1.ManagerService
 */
export interface IManagerServiceClient {
    /**
     * Request an element from instance information and an optional traget representation parameters.
     *
     * @generated from protobuf rpc: RequestPrototype(semio.manager.v1.PrototypeRequest) returns (semio.model.v1.Prototype);
     */
    requestPrototype(input: PrototypeRequest, options?: RpcOptions): UnaryCall<PrototypeRequest, Prototype>;
    /**
     * Get the connected pose and the connection point for a connection.
     *
     * @generated from protobuf rpc: ConnectElement(semio.manager.v1.ConnectElementRequest) returns (semio.manager.v1.ConnectElementResponse);
     */
    connectElement(input: ConnectElementRequest, options?: RpcOptions): UnaryCall<ConnectElementRequest, ConnectElementResponse>;
    /**
     * Register a service to the server.
     *
     * @generated from protobuf rpc: RegisterExtension(semio.manager.v1.RegisterExtensionRequest) returns (semio.manager.v1.RegisterExtensionResponse);
     */
    registerExtension(input: RegisterExtensionRequest, options?: RpcOptions): UnaryCall<RegisterExtensionRequest, RegisterExtensionResponse>;
    /**
     * Get all registered extensions.
     *
     * @generated from protobuf rpc: GetRegisteredExtensions(semio.manager.v1.GetRegisteredExtensionsRequest) returns (semio.manager.v1.RegisteredExtensionsResponse);
     */
    getRegisteredExtensions(input: GetRegisteredExtensionsRequest, options?: RpcOptions): UnaryCall<GetRegisteredExtensionsRequest, RegisteredExtensionsResponse>;
}
/**
 * A manager service is responsible for calling extensions, storing/caching results while offering a cleaner interface to the server.
 *
 * @generated from protobuf service semio.manager.v1.ManagerService
 */
export class ManagerServiceClient implements IManagerServiceClient, ServiceInfo {
    typeName = ManagerService.typeName;
    methods = ManagerService.methods;
    options = ManagerService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Request an element from instance information and an optional traget representation parameters.
     *
     * @generated from protobuf rpc: RequestPrototype(semio.manager.v1.PrototypeRequest) returns (semio.model.v1.Prototype);
     */
    requestPrototype(input: PrototypeRequest, options?: RpcOptions): UnaryCall<PrototypeRequest, Prototype> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<PrototypeRequest, Prototype>("unary", this._transport, method, opt, input);
    }
    /**
     * Get the connected pose and the connection point for a connection.
     *
     * @generated from protobuf rpc: ConnectElement(semio.manager.v1.ConnectElementRequest) returns (semio.manager.v1.ConnectElementResponse);
     */
    connectElement(input: ConnectElementRequest, options?: RpcOptions): UnaryCall<ConnectElementRequest, ConnectElementResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<ConnectElementRequest, ConnectElementResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * Register a service to the server.
     *
     * @generated from protobuf rpc: RegisterExtension(semio.manager.v1.RegisterExtensionRequest) returns (semio.manager.v1.RegisterExtensionResponse);
     */
    registerExtension(input: RegisterExtensionRequest, options?: RpcOptions): UnaryCall<RegisterExtensionRequest, RegisterExtensionResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<RegisterExtensionRequest, RegisterExtensionResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * Get all registered extensions.
     *
     * @generated from protobuf rpc: GetRegisteredExtensions(semio.manager.v1.GetRegisteredExtensionsRequest) returns (semio.manager.v1.RegisteredExtensionsResponse);
     */
    getRegisteredExtensions(input: GetRegisteredExtensionsRequest, options?: RpcOptions): UnaryCall<GetRegisteredExtensionsRequest, RegisteredExtensionsResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetRegisteredExtensionsRequest, RegisteredExtensionsResponse>("unary", this._transport, method, opt, input);
    }
}

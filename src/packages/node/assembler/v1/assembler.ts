// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "assembler/v1/assembler.proto" (package "semio.assembler.v1", syntax proto3)
// tslint:disable
import { Layout } from "../../model/v1/model";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Element } from "../../model/v1/model";
import { Prototype } from "../../model/v1/model";
import { Connection } from "../../model/v1/model";
import { Sobject } from "../../model/v1/model";
import { Assembly } from "../../model/v1/model";
/**
 * @generated from protobuf message semio.assembler.v1.LayoutToAssembliesResponse
 */
export interface LayoutToAssembliesResponse {
    /**
     * @generated from protobuf field: repeated semio.model.v1.Assembly assemblies = 1;
     */
    assemblies: Assembly[];
}
/**
 * @generated from protobuf message semio.assembler.v1.AssemblyToElementsRequest
 */
export interface AssemblyToElementsRequest {
    /**
     * @generated from protobuf field: semio.model.v1.Assembly assembly = 1;
     */
    assembly?: Assembly;
    /**
     * @generated from protobuf field: repeated semio.model.v1.Sobject sobjects = 2;
     */
    sobjects: Sobject[];
    /**
     * @generated from protobuf field: repeated semio.model.v1.Connection connections = 3;
     */
    connections: Connection[];
}
/**
 * @generated from protobuf message semio.assembler.v1.AssemblyToElementsResponse
 */
export interface AssemblyToElementsResponse {
    /**
     * @generated from protobuf field: repeated semio.model.v1.Prototype prototypes = 1;
     */
    prototypes: Prototype[];
    /**
     * @generated from protobuf field: repeated semio.model.v1.Element elements = 2;
     */
    elements: Element[];
}
// @generated message type with reflection information, may provide speed optimized methods
class LayoutToAssembliesResponse$Type extends MessageType<LayoutToAssembliesResponse> {
    constructor() {
        super("semio.assembler.v1.LayoutToAssembliesResponse", [
            { no: 1, name: "assemblies", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Assembly }
        ]);
    }
    create(value?: PartialMessage<LayoutToAssembliesResponse>): LayoutToAssembliesResponse {
        const message = { assemblies: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<LayoutToAssembliesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LayoutToAssembliesResponse): LayoutToAssembliesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated semio.model.v1.Assembly assemblies */ 1:
                    message.assemblies.push(Assembly.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LayoutToAssembliesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated semio.model.v1.Assembly assemblies = 1; */
        for (let i = 0; i < message.assemblies.length; i++)
            Assembly.internalBinaryWrite(message.assemblies[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.assembler.v1.LayoutToAssembliesResponse
 */
export const LayoutToAssembliesResponse = new LayoutToAssembliesResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AssemblyToElementsRequest$Type extends MessageType<AssemblyToElementsRequest> {
    constructor() {
        super("semio.assembler.v1.AssemblyToElementsRequest", [
            { no: 1, name: "assembly", kind: "message", T: () => Assembly },
            { no: 2, name: "sobjects", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Sobject },
            { no: 3, name: "connections", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Connection }
        ]);
    }
    create(value?: PartialMessage<AssemblyToElementsRequest>): AssemblyToElementsRequest {
        const message = { sobjects: [], connections: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AssemblyToElementsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AssemblyToElementsRequest): AssemblyToElementsRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* semio.model.v1.Assembly assembly */ 1:
                    message.assembly = Assembly.internalBinaryRead(reader, reader.uint32(), options, message.assembly);
                    break;
                case /* repeated semio.model.v1.Sobject sobjects */ 2:
                    message.sobjects.push(Sobject.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated semio.model.v1.Connection connections */ 3:
                    message.connections.push(Connection.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AssemblyToElementsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* semio.model.v1.Assembly assembly = 1; */
        if (message.assembly)
            Assembly.internalBinaryWrite(message.assembly, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated semio.model.v1.Sobject sobjects = 2; */
        for (let i = 0; i < message.sobjects.length; i++)
            Sobject.internalBinaryWrite(message.sobjects[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated semio.model.v1.Connection connections = 3; */
        for (let i = 0; i < message.connections.length; i++)
            Connection.internalBinaryWrite(message.connections[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.assembler.v1.AssemblyToElementsRequest
 */
export const AssemblyToElementsRequest = new AssemblyToElementsRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AssemblyToElementsResponse$Type extends MessageType<AssemblyToElementsResponse> {
    constructor() {
        super("semio.assembler.v1.AssemblyToElementsResponse", [
            { no: 1, name: "prototypes", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Prototype },
            { no: 2, name: "elements", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Element }
        ]);
    }
    create(value?: PartialMessage<AssemblyToElementsResponse>): AssemblyToElementsResponse {
        const message = { prototypes: [], elements: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AssemblyToElementsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AssemblyToElementsResponse): AssemblyToElementsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated semio.model.v1.Prototype prototypes */ 1:
                    message.prototypes.push(Prototype.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated semio.model.v1.Element elements */ 2:
                    message.elements.push(Element.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AssemblyToElementsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated semio.model.v1.Prototype prototypes = 1; */
        for (let i = 0; i < message.prototypes.length; i++)
            Prototype.internalBinaryWrite(message.prototypes[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated semio.model.v1.Element elements = 2; */
        for (let i = 0; i < message.elements.length; i++)
            Element.internalBinaryWrite(message.elements[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.assembler.v1.AssemblyToElementsResponse
 */
export const AssemblyToElementsResponse = new AssemblyToElementsResponse$Type();
/**
 * @generated ServiceType for protobuf service semio.assembler.v1.AssemblerService
 */
export const AssemblerService = new ServiceType("semio.assembler.v1.AssemblerService", [
    { name: "LayoutToAssemblies", options: {}, I: Layout, O: LayoutToAssembliesResponse },
    { name: "AssemblyToElements", options: {}, I: AssemblyToElementsRequest, O: AssemblyToElementsResponse }
]);

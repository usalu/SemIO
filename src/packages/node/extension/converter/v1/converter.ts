// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "extension/converter/v1/converter.proto" (package "semio.extension.converter.v1", syntax proto3)
// tslint:disable
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
import { Representation } from "../../../model/v1/model";
import { Platform } from "../../../model/v1/model";
/**
 * Description what a converter is converting.
 *
 * @generated from protobuf message semio.extension.converter.v1.Converting
 */
export interface Converting {
    /**
     * @generated from protobuf field: semio.model.v1.Platform source_platform = 1;
     */
    sourcePlatform: Platform;
    /**
     * @generated from protobuf field: semio.model.v1.Platform target_platform = 2;
     */
    targetPlatform: Platform;
}
/**
 * A request for converting a represenation.
 *
 * @generated from protobuf message semio.extension.converter.v1.RepresentationConversionRequest
 */
export interface RepresentationConversionRequest {
    /**
     * @generated from protobuf field: semio.model.v1.Representation representation = 1;
     */
    representation?: Representation;
    /**
     * @generated from protobuf field: semio.model.v1.Platform target_platform = 2;
     */
    targetPlatform: Platform;
}
// @generated message type with reflection information, may provide speed optimized methods
class Converting$Type extends MessageType<Converting> {
    constructor() {
        super("semio.extension.converter.v1.Converting", [
            { no: 1, name: "source_platform", kind: "enum", T: () => ["semio.model.v1.Platform", Platform, "PLATFORM_"] },
            { no: 2, name: "target_platform", kind: "enum", T: () => ["semio.model.v1.Platform", Platform, "PLATFORM_"] }
        ]);
    }
    create(value?: PartialMessage<Converting>): Converting {
        const message = { sourcePlatform: 0, targetPlatform: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Converting>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Converting): Converting {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* semio.model.v1.Platform source_platform */ 1:
                    message.sourcePlatform = reader.int32();
                    break;
                case /* semio.model.v1.Platform target_platform */ 2:
                    message.targetPlatform = reader.int32();
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
    internalBinaryWrite(message: Converting, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* semio.model.v1.Platform source_platform = 1; */
        if (message.sourcePlatform !== 0)
            writer.tag(1, WireType.Varint).int32(message.sourcePlatform);
        /* semio.model.v1.Platform target_platform = 2; */
        if (message.targetPlatform !== 0)
            writer.tag(2, WireType.Varint).int32(message.targetPlatform);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.extension.converter.v1.Converting
 */
export const Converting = new Converting$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RepresentationConversionRequest$Type extends MessageType<RepresentationConversionRequest> {
    constructor() {
        super("semio.extension.converter.v1.RepresentationConversionRequest", [
            { no: 1, name: "representation", kind: "message", T: () => Representation },
            { no: 2, name: "target_platform", kind: "enum", T: () => ["semio.model.v1.Platform", Platform, "PLATFORM_"] }
        ]);
    }
    create(value?: PartialMessage<RepresentationConversionRequest>): RepresentationConversionRequest {
        const message = { targetPlatform: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<RepresentationConversionRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RepresentationConversionRequest): RepresentationConversionRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* semio.model.v1.Representation representation */ 1:
                    message.representation = Representation.internalBinaryRead(reader, reader.uint32(), options, message.representation);
                    break;
                case /* semio.model.v1.Platform target_platform */ 2:
                    message.targetPlatform = reader.int32();
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
    internalBinaryWrite(message: RepresentationConversionRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* semio.model.v1.Representation representation = 1; */
        if (message.representation)
            Representation.internalBinaryWrite(message.representation, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* semio.model.v1.Platform target_platform = 2; */
        if (message.targetPlatform !== 0)
            writer.tag(2, WireType.Varint).int32(message.targetPlatform);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.extension.converter.v1.RepresentationConversionRequest
 */
export const RepresentationConversionRequest = new RepresentationConversionRequest$Type();
/**
 * @generated ServiceType for protobuf service semio.extension.converter.v1.ConverterService
 */
export const ConverterService = new ServiceType("semio.extension.converter.v1.ConverterService", [
    { name: "ConvertRepresentation", options: {}, I: RepresentationConversionRequest, O: Representation }
]);

// @generated by protobuf-ts 2.8.2 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "manager/v1/manager.proto" (package "semio.manager.v1", syntax proto3)
// tslint:disable
import { Representation } from "../../model/v1/model";
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
import { Point } from "../../model/v1/model";
import { Pose } from "../../model/v1/model";
import { Attraction } from "../../model/v1/model";
import { Sobject } from "../../model/v1/model";
/**
 * @generated from protobuf message semio.manager.v1.ElementRequest
 */
export interface ElementRequest {
    /**
     * @generated from protobuf field: semio.model.v1.Sobject sobject = 1;
     */
    sobject?: Sobject;
    /**
     * @generated from protobuf field: string target_type_url = 2;
     */
    targetTypeUrl: string;
}
/**
 * @generated from protobuf message semio.manager.v1.AttractionRequest
 */
export interface AttractionRequest {
    /**
     * @generated from protobuf field: semio.model.v1.Attraction attraction = 1;
     */
    attraction?: Attraction;
    /**
     * @generated from protobuf field: string target_type_url = 2;
     */
    targetTypeUrl: string;
}
/**
 * @generated from protobuf message semio.manager.v1.AttractionResponse
 */
export interface AttractionResponse {
    /**
     * @generated from protobuf field: semio.model.v1.Pose attracted_pose = 1;
     */
    attractedPose?: Pose;
    /**
     * @generated from protobuf field: semio.model.v1.Point attraction_point = 2;
     */
    attractionPoint?: Point;
}
/**
 * @generated from protobuf message semio.manager.v1.TranslatingService
 */
export interface TranslatingService {
    /**
     * @generated from protobuf field: string platform_name = 1;
     */
    platformName: string;
}
/**
 * @generated from protobuf message semio.manager.v1.AdaptingService
 */
export interface AdaptingService {
    /**
     * @generated from protobuf field: string platform_name = 1;
     */
    platformName: string;
}
/**
 * @generated from protobuf message semio.manager.v1.ConvertingService
 */
export interface ConvertingService {
    /**
     * @generated from protobuf field: string source_type_url = 1;
     */
    sourceTypeUrl: string;
    /**
     * @generated from protobuf field: string target_type_url = 2;
     */
    targetTypeUrl: string;
}
/**
 * @generated from protobuf message semio.manager.v1.TransformingService
 */
export interface TransformingService {
}
/**
 * @generated from protobuf message semio.manager.v1.ExtendingService
 */
export interface ExtendingService {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * @generated from protobuf field: string address = 2;
     */
    address: string;
    /**
     * @generated from protobuf field: repeated semio.manager.v1.AdaptingService adaptingServices = 3;
     */
    adaptingServices: AdaptingService[];
    /**
     * @generated from protobuf field: repeated semio.manager.v1.ConvertingService convertingServices = 4;
     */
    convertingServices: ConvertingService[];
    /**
     * @generated from protobuf field: repeated semio.manager.v1.TransformingService transformingServices = 5;
     */
    transformingServices: TransformingService[];
    /**
     * @generated from protobuf field: repeated semio.manager.v1.TranslatingService translatingServices = 6;
     */
    translatingServices: TranslatingService[];
}
/**
 * @generated from protobuf message semio.manager.v1.ExtendingServices
 */
export interface ExtendingServices {
    /**
     * @generated from protobuf field: repeated semio.manager.v1.ExtendingService extendingServices = 1;
     */
    extendingServices: ExtendingService[];
}
/**
 * @generated from protobuf message semio.manager.v1.ExtensionRegistrationRequest
 */
export interface ExtensionRegistrationRequest {
    /**
     * @generated from protobuf field: bool replace_existing = 1;
     */
    replaceExisting: boolean;
    /**
     * @generated from protobuf field: semio.manager.v1.ExtendingService extendingService = 2;
     */
    extendingService?: ExtendingService;
}
/**
 * @generated from protobuf message semio.manager.v1.ExtensionRegistrationResponse
 */
export interface ExtensionRegistrationResponse {
    /**
     * @generated from protobuf field: bool success = 1;
     */
    success: boolean;
    /**
     * The old address of the same service type if there was one.
     *
     * @generated from protobuf field: string old_address = 2;
     */
    oldAddress: string;
}
/**
 * @generated from protobuf message semio.manager.v1.GetRegisteredExtensionsRequest
 */
export interface GetRegisteredExtensionsRequest {
}
// @generated message type with reflection information, may provide speed optimized methods
class ElementRequest$Type extends MessageType<ElementRequest> {
    constructor() {
        super("semio.manager.v1.ElementRequest", [
            { no: 1, name: "sobject", kind: "message", T: () => Sobject },
            { no: 2, name: "target_type_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<ElementRequest>): ElementRequest {
        const message = { targetTypeUrl: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ElementRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ElementRequest): ElementRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* semio.model.v1.Sobject sobject */ 1:
                    message.sobject = Sobject.internalBinaryRead(reader, reader.uint32(), options, message.sobject);
                    break;
                case /* string target_type_url */ 2:
                    message.targetTypeUrl = reader.string();
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
    internalBinaryWrite(message: ElementRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* semio.model.v1.Sobject sobject = 1; */
        if (message.sobject)
            Sobject.internalBinaryWrite(message.sobject, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string target_type_url = 2; */
        if (message.targetTypeUrl !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.targetTypeUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.ElementRequest
 */
export const ElementRequest = new ElementRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AttractionRequest$Type extends MessageType<AttractionRequest> {
    constructor() {
        super("semio.manager.v1.AttractionRequest", [
            { no: 1, name: "attraction", kind: "message", T: () => Attraction },
            { no: 2, name: "target_type_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<AttractionRequest>): AttractionRequest {
        const message = { targetTypeUrl: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AttractionRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AttractionRequest): AttractionRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* semio.model.v1.Attraction attraction */ 1:
                    message.attraction = Attraction.internalBinaryRead(reader, reader.uint32(), options, message.attraction);
                    break;
                case /* string target_type_url */ 2:
                    message.targetTypeUrl = reader.string();
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
    internalBinaryWrite(message: AttractionRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* semio.model.v1.Attraction attraction = 1; */
        if (message.attraction)
            Attraction.internalBinaryWrite(message.attraction, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string target_type_url = 2; */
        if (message.targetTypeUrl !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.targetTypeUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.AttractionRequest
 */
export const AttractionRequest = new AttractionRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AttractionResponse$Type extends MessageType<AttractionResponse> {
    constructor() {
        super("semio.manager.v1.AttractionResponse", [
            { no: 1, name: "attracted_pose", kind: "message", T: () => Pose },
            { no: 2, name: "attraction_point", kind: "message", T: () => Point }
        ]);
    }
    create(value?: PartialMessage<AttractionResponse>): AttractionResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AttractionResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AttractionResponse): AttractionResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* semio.model.v1.Pose attracted_pose */ 1:
                    message.attractedPose = Pose.internalBinaryRead(reader, reader.uint32(), options, message.attractedPose);
                    break;
                case /* semio.model.v1.Point attraction_point */ 2:
                    message.attractionPoint = Point.internalBinaryRead(reader, reader.uint32(), options, message.attractionPoint);
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
    internalBinaryWrite(message: AttractionResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* semio.model.v1.Pose attracted_pose = 1; */
        if (message.attractedPose)
            Pose.internalBinaryWrite(message.attractedPose, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* semio.model.v1.Point attraction_point = 2; */
        if (message.attractionPoint)
            Point.internalBinaryWrite(message.attractionPoint, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.AttractionResponse
 */
export const AttractionResponse = new AttractionResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TranslatingService$Type extends MessageType<TranslatingService> {
    constructor() {
        super("semio.manager.v1.TranslatingService", [
            { no: 1, name: "platform_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<TranslatingService>): TranslatingService {
        const message = { platformName: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TranslatingService>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TranslatingService): TranslatingService {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string platform_name */ 1:
                    message.platformName = reader.string();
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
    internalBinaryWrite(message: TranslatingService, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string platform_name = 1; */
        if (message.platformName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.platformName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.TranslatingService
 */
export const TranslatingService = new TranslatingService$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AdaptingService$Type extends MessageType<AdaptingService> {
    constructor() {
        super("semio.manager.v1.AdaptingService", [
            { no: 1, name: "platform_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<AdaptingService>): AdaptingService {
        const message = { platformName: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AdaptingService>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AdaptingService): AdaptingService {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string platform_name */ 1:
                    message.platformName = reader.string();
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
    internalBinaryWrite(message: AdaptingService, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string platform_name = 1; */
        if (message.platformName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.platformName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.AdaptingService
 */
export const AdaptingService = new AdaptingService$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ConvertingService$Type extends MessageType<ConvertingService> {
    constructor() {
        super("semio.manager.v1.ConvertingService", [
            { no: 1, name: "source_type_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "target_type_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<ConvertingService>): ConvertingService {
        const message = { sourceTypeUrl: "", targetTypeUrl: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ConvertingService>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ConvertingService): ConvertingService {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string source_type_url */ 1:
                    message.sourceTypeUrl = reader.string();
                    break;
                case /* string target_type_url */ 2:
                    message.targetTypeUrl = reader.string();
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
    internalBinaryWrite(message: ConvertingService, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string source_type_url = 1; */
        if (message.sourceTypeUrl !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.sourceTypeUrl);
        /* string target_type_url = 2; */
        if (message.targetTypeUrl !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.targetTypeUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.ConvertingService
 */
export const ConvertingService = new ConvertingService$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TransformingService$Type extends MessageType<TransformingService> {
    constructor() {
        super("semio.manager.v1.TransformingService", []);
    }
    create(value?: PartialMessage<TransformingService>): TransformingService {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TransformingService>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TransformingService): TransformingService {
        return target ?? this.create();
    }
    internalBinaryWrite(message: TransformingService, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.TransformingService
 */
export const TransformingService = new TransformingService$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ExtendingService$Type extends MessageType<ExtendingService> {
    constructor() {
        super("semio.manager.v1.ExtendingService", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "adaptingServices", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => AdaptingService },
            { no: 4, name: "convertingServices", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ConvertingService },
            { no: 5, name: "transformingServices", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => TransformingService },
            { no: 6, name: "translatingServices", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => TranslatingService }
        ]);
    }
    create(value?: PartialMessage<ExtendingService>): ExtendingService {
        const message = { name: "", address: "", adaptingServices: [], convertingServices: [], transformingServices: [], translatingServices: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ExtendingService>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ExtendingService): ExtendingService {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* string address */ 2:
                    message.address = reader.string();
                    break;
                case /* repeated semio.manager.v1.AdaptingService adaptingServices */ 3:
                    message.adaptingServices.push(AdaptingService.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated semio.manager.v1.ConvertingService convertingServices */ 4:
                    message.convertingServices.push(ConvertingService.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated semio.manager.v1.TransformingService transformingServices */ 5:
                    message.transformingServices.push(TransformingService.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated semio.manager.v1.TranslatingService translatingServices */ 6:
                    message.translatingServices.push(TranslatingService.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ExtendingService, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* string address = 2; */
        if (message.address !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.address);
        /* repeated semio.manager.v1.AdaptingService adaptingServices = 3; */
        for (let i = 0; i < message.adaptingServices.length; i++)
            AdaptingService.internalBinaryWrite(message.adaptingServices[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* repeated semio.manager.v1.ConvertingService convertingServices = 4; */
        for (let i = 0; i < message.convertingServices.length; i++)
            ConvertingService.internalBinaryWrite(message.convertingServices[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* repeated semio.manager.v1.TransformingService transformingServices = 5; */
        for (let i = 0; i < message.transformingServices.length; i++)
            TransformingService.internalBinaryWrite(message.transformingServices[i], writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* repeated semio.manager.v1.TranslatingService translatingServices = 6; */
        for (let i = 0; i < message.translatingServices.length; i++)
            TranslatingService.internalBinaryWrite(message.translatingServices[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.ExtendingService
 */
export const ExtendingService = new ExtendingService$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ExtendingServices$Type extends MessageType<ExtendingServices> {
    constructor() {
        super("semio.manager.v1.ExtendingServices", [
            { no: 1, name: "extendingServices", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ExtendingService }
        ]);
    }
    create(value?: PartialMessage<ExtendingServices>): ExtendingServices {
        const message = { extendingServices: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ExtendingServices>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ExtendingServices): ExtendingServices {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated semio.manager.v1.ExtendingService extendingServices */ 1:
                    message.extendingServices.push(ExtendingService.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ExtendingServices, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated semio.manager.v1.ExtendingService extendingServices = 1; */
        for (let i = 0; i < message.extendingServices.length; i++)
            ExtendingService.internalBinaryWrite(message.extendingServices[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.ExtendingServices
 */
export const ExtendingServices = new ExtendingServices$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ExtensionRegistrationRequest$Type extends MessageType<ExtensionRegistrationRequest> {
    constructor() {
        super("semio.manager.v1.ExtensionRegistrationRequest", [
            { no: 1, name: "replace_existing", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "extendingService", kind: "message", T: () => ExtendingService }
        ]);
    }
    create(value?: PartialMessage<ExtensionRegistrationRequest>): ExtensionRegistrationRequest {
        const message = { replaceExisting: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ExtensionRegistrationRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ExtensionRegistrationRequest): ExtensionRegistrationRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool replace_existing */ 1:
                    message.replaceExisting = reader.bool();
                    break;
                case /* semio.manager.v1.ExtendingService extendingService */ 2:
                    message.extendingService = ExtendingService.internalBinaryRead(reader, reader.uint32(), options, message.extendingService);
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
    internalBinaryWrite(message: ExtensionRegistrationRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool replace_existing = 1; */
        if (message.replaceExisting !== false)
            writer.tag(1, WireType.Varint).bool(message.replaceExisting);
        /* semio.manager.v1.ExtendingService extendingService = 2; */
        if (message.extendingService)
            ExtendingService.internalBinaryWrite(message.extendingService, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.ExtensionRegistrationRequest
 */
export const ExtensionRegistrationRequest = new ExtensionRegistrationRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ExtensionRegistrationResponse$Type extends MessageType<ExtensionRegistrationResponse> {
    constructor() {
        super("semio.manager.v1.ExtensionRegistrationResponse", [
            { no: 1, name: "success", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "old_address", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<ExtensionRegistrationResponse>): ExtensionRegistrationResponse {
        const message = { success: false, oldAddress: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ExtensionRegistrationResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ExtensionRegistrationResponse): ExtensionRegistrationResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool success */ 1:
                    message.success = reader.bool();
                    break;
                case /* string old_address */ 2:
                    message.oldAddress = reader.string();
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
    internalBinaryWrite(message: ExtensionRegistrationResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool success = 1; */
        if (message.success !== false)
            writer.tag(1, WireType.Varint).bool(message.success);
        /* string old_address = 2; */
        if (message.oldAddress !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.oldAddress);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.ExtensionRegistrationResponse
 */
export const ExtensionRegistrationResponse = new ExtensionRegistrationResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetRegisteredExtensionsRequest$Type extends MessageType<GetRegisteredExtensionsRequest> {
    constructor() {
        super("semio.manager.v1.GetRegisteredExtensionsRequest", []);
    }
    create(value?: PartialMessage<GetRegisteredExtensionsRequest>): GetRegisteredExtensionsRequest {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetRegisteredExtensionsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetRegisteredExtensionsRequest): GetRegisteredExtensionsRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: GetRegisteredExtensionsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.manager.v1.GetRegisteredExtensionsRequest
 */
export const GetRegisteredExtensionsRequest = new GetRegisteredExtensionsRequest$Type();
/**
 * @generated ServiceType for protobuf service semio.manager.v1.ManagerService
 */
export const ManagerService = new ServiceType("semio.manager.v1.ManagerService", [
    { name: "RequestElement", options: {}, I: ElementRequest, O: Representation },
    { name: "RequestAttraction", options: {}, I: AttractionRequest, O: AttractionResponse },
    { name: "RegisterExtension", options: {}, I: ExtensionRegistrationRequest, O: ExtensionRegistrationResponse },
    { name: "GetRegisteredExtensions", options: {}, I: GetRegisteredExtensionsRequest, O: ExtendingServices }
]);

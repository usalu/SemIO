// @generated by protobuf-ts 2.8.2
// @generated from protobuf file "server/v1/server.proto" (package "semio.server.v1", syntax proto3)
// tslint:disable
import { Design } from "../../model/v1/model";
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
import { Layout } from "../../model/v1/model";
/**
 * @generated from protobuf message semio.server.v1.LayoutDesignRequest
 */
export interface LayoutDesignRequest {
    /**
     * @generated from protobuf field: semio.model.v1.Layout layout = 1;
     */
    layout?: Layout;
    /**
     * @generated from protobuf field: string target_type = 2;
     */
    targetType: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class LayoutDesignRequest$Type extends MessageType<LayoutDesignRequest> {
    constructor() {
        super("semio.server.v1.LayoutDesignRequest", [
            { no: 1, name: "layout", kind: "message", T: () => Layout },
            { no: 2, name: "target_type", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<LayoutDesignRequest>): LayoutDesignRequest {
        const message = { targetType: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<LayoutDesignRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LayoutDesignRequest): LayoutDesignRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* semio.model.v1.Layout layout */ 1:
                    message.layout = Layout.internalBinaryRead(reader, reader.uint32(), options, message.layout);
                    break;
                case /* string target_type */ 2:
                    message.targetType = reader.string();
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
    internalBinaryWrite(message: LayoutDesignRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* semio.model.v1.Layout layout = 1; */
        if (message.layout)
            Layout.internalBinaryWrite(message.layout, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string target_type = 2; */
        if (message.targetType !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.targetType);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message semio.server.v1.LayoutDesignRequest
 */
export const LayoutDesignRequest = new LayoutDesignRequest$Type();
/**
 * @generated ServiceType for protobuf service semio.server.v1.ServerService
 */
export const ServerService = new ServiceType("semio.server.v1.ServerService", [
    { name: "LayoutDesign", options: {}, I: Layout, O: Design }
]);

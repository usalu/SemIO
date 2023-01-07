// source: model/v1/model.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.semio.model.v1.Quaternion');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.semio.model.v1.Quaternion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.semio.model.v1.Quaternion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.semio.model.v1.Quaternion.displayName = 'proto.semio.model.v1.Quaternion';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.semio.model.v1.Quaternion.prototype.toObject = function(opt_includeInstance) {
  return proto.semio.model.v1.Quaternion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.semio.model.v1.Quaternion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.model.v1.Quaternion.toObject = function(includeInstance, msg) {
  var f, obj = {
    w: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    x: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    y: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    z: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.semio.model.v1.Quaternion}
 */
proto.semio.model.v1.Quaternion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.semio.model.v1.Quaternion;
  return proto.semio.model.v1.Quaternion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.semio.model.v1.Quaternion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.semio.model.v1.Quaternion}
 */
proto.semio.model.v1.Quaternion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setW(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setX(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setY(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setZ(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.semio.model.v1.Quaternion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.semio.model.v1.Quaternion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.semio.model.v1.Quaternion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.model.v1.Quaternion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getW();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getX();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getZ();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
};


/**
 * optional double w = 1;
 * @return {number}
 */
proto.semio.model.v1.Quaternion.prototype.getW = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.semio.model.v1.Quaternion} returns this
 */
proto.semio.model.v1.Quaternion.prototype.setW = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional double x = 2;
 * @return {number}
 */
proto.semio.model.v1.Quaternion.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.semio.model.v1.Quaternion} returns this
 */
proto.semio.model.v1.Quaternion.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double y = 3;
 * @return {number}
 */
proto.semio.model.v1.Quaternion.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.semio.model.v1.Quaternion} returns this
 */
proto.semio.model.v1.Quaternion.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double z = 4;
 * @return {number}
 */
proto.semio.model.v1.Quaternion.prototype.getZ = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.semio.model.v1.Quaternion} returns this
 */
proto.semio.model.v1.Quaternion.prototype.setZ = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


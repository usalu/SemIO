// source: converter.proto
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

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var model_pb = require('./model_pb.js');
goog.object.extend(proto, model_pb);
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
goog.object.extend(proto, google_protobuf_any_pb);
goog.exportSymbol('proto.semio.extension.converter.v1.RepresentationConversionRequest', null, global);
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
proto.semio.extension.converter.v1.RepresentationConversionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.semio.extension.converter.v1.RepresentationConversionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.semio.extension.converter.v1.RepresentationConversionRequest.displayName = 'proto.semio.extension.converter.v1.RepresentationConversionRequest';
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
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.semio.extension.converter.v1.RepresentationConversionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.semio.extension.converter.v1.RepresentationConversionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    representation: (f = msg.getRepresentation()) && model_pb.Representation.toObject(includeInstance, f),
    targetType: jspb.Message.getFieldWithDefault(msg, 2, ""),
    options: (f = msg.getOptions()) && google_protobuf_any_pb.Any.toObject(includeInstance, f)
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
 * @return {!proto.semio.extension.converter.v1.RepresentationConversionRequest}
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.semio.extension.converter.v1.RepresentationConversionRequest;
  return proto.semio.extension.converter.v1.RepresentationConversionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.semio.extension.converter.v1.RepresentationConversionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.semio.extension.converter.v1.RepresentationConversionRequest}
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new model_pb.Representation;
      reader.readMessage(value,model_pb.Representation.deserializeBinaryFromReader);
      msg.setRepresentation(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetType(value);
      break;
    case 3:
      var value = new google_protobuf_any_pb.Any;
      reader.readMessage(value,google_protobuf_any_pb.Any.deserializeBinaryFromReader);
      msg.setOptions(value);
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
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.semio.extension.converter.v1.RepresentationConversionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.semio.extension.converter.v1.RepresentationConversionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepresentation();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      model_pb.Representation.serializeBinaryToWriter
    );
  }
  f = message.getTargetType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_any_pb.Any.serializeBinaryToWriter
    );
  }
};


/**
 * optional semio.model.v1.Representation representation = 1;
 * @return {?proto.semio.model.v1.Representation}
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.getRepresentation = function() {
  return /** @type{?proto.semio.model.v1.Representation} */ (
    jspb.Message.getWrapperField(this, model_pb.Representation, 1));
};


/**
 * @param {?proto.semio.model.v1.Representation|undefined} value
 * @return {!proto.semio.extension.converter.v1.RepresentationConversionRequest} returns this
*/
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.setRepresentation = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.semio.extension.converter.v1.RepresentationConversionRequest} returns this
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.clearRepresentation = function() {
  return this.setRepresentation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.hasRepresentation = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string target_type = 2;
 * @return {string}
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.getTargetType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.semio.extension.converter.v1.RepresentationConversionRequest} returns this
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.setTargetType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional google.protobuf.Any options = 3;
 * @return {?proto.google.protobuf.Any}
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.Any} */ (
    jspb.Message.getWrapperField(this, google_protobuf_any_pb.Any, 3));
};


/**
 * @param {?proto.google.protobuf.Any|undefined} value
 * @return {!proto.semio.extension.converter.v1.RepresentationConversionRequest} returns this
*/
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.semio.extension.converter.v1.RepresentationConversionRequest} returns this
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.semio.extension.converter.v1.RepresentationConversionRequest.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 3) != null;
};


goog.object.extend(exports, proto.semio.extension.converter.v1);
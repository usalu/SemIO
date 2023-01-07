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

goog.provide('proto.semio.model.v1.LayoutModification');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.semio.model.v1.Layout');

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
proto.semio.model.v1.LayoutModification = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.semio.model.v1.LayoutModification, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.semio.model.v1.LayoutModification.displayName = 'proto.semio.model.v1.LayoutModification';
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
proto.semio.model.v1.LayoutModification.prototype.toObject = function(opt_includeInstance) {
  return proto.semio.model.v1.LayoutModification.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.semio.model.v1.LayoutModification} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.model.v1.LayoutModification.toObject = function(includeInstance, msg) {
  var f, obj = {
    contextLayout: (f = msg.getContextLayout()) && proto.semio.model.v1.Layout.toObject(includeInstance, f),
    modifiedContextLayout: (f = msg.getModifiedContextLayout()) && proto.semio.model.v1.Layout.toObject(includeInstance, f)
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
 * @return {!proto.semio.model.v1.LayoutModification}
 */
proto.semio.model.v1.LayoutModification.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.semio.model.v1.LayoutModification;
  return proto.semio.model.v1.LayoutModification.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.semio.model.v1.LayoutModification} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.semio.model.v1.LayoutModification}
 */
proto.semio.model.v1.LayoutModification.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.semio.model.v1.Layout;
      reader.readMessage(value,proto.semio.model.v1.Layout.deserializeBinaryFromReader);
      msg.setContextLayout(value);
      break;
    case 2:
      var value = new proto.semio.model.v1.Layout;
      reader.readMessage(value,proto.semio.model.v1.Layout.deserializeBinaryFromReader);
      msg.setModifiedContextLayout(value);
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
proto.semio.model.v1.LayoutModification.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.semio.model.v1.LayoutModification.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.semio.model.v1.LayoutModification} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.model.v1.LayoutModification.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContextLayout();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.semio.model.v1.Layout.serializeBinaryToWriter
    );
  }
  f = message.getModifiedContextLayout();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.semio.model.v1.Layout.serializeBinaryToWriter
    );
  }
};


/**
 * optional Layout context_layout = 1;
 * @return {?proto.semio.model.v1.Layout}
 */
proto.semio.model.v1.LayoutModification.prototype.getContextLayout = function() {
  return /** @type{?proto.semio.model.v1.Layout} */ (
    jspb.Message.getWrapperField(this, proto.semio.model.v1.Layout, 1));
};


/**
 * @param {?proto.semio.model.v1.Layout|undefined} value
 * @return {!proto.semio.model.v1.LayoutModification} returns this
*/
proto.semio.model.v1.LayoutModification.prototype.setContextLayout = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.semio.model.v1.LayoutModification} returns this
 */
proto.semio.model.v1.LayoutModification.prototype.clearContextLayout = function() {
  return this.setContextLayout(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.semio.model.v1.LayoutModification.prototype.hasContextLayout = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Layout modified_context_layout = 2;
 * @return {?proto.semio.model.v1.Layout}
 */
proto.semio.model.v1.LayoutModification.prototype.getModifiedContextLayout = function() {
  return /** @type{?proto.semio.model.v1.Layout} */ (
    jspb.Message.getWrapperField(this, proto.semio.model.v1.Layout, 2));
};


/**
 * @param {?proto.semio.model.v1.Layout|undefined} value
 * @return {!proto.semio.model.v1.LayoutModification} returns this
*/
proto.semio.model.v1.LayoutModification.prototype.setModifiedContextLayout = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.semio.model.v1.LayoutModification} returns this
 */
proto.semio.model.v1.LayoutModification.prototype.clearModifiedContextLayout = function() {
  return this.setModifiedContextLayout(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.semio.model.v1.LayoutModification.prototype.hasModifiedContextLayout = function() {
  return jspb.Message.getField(this, 2) != null;
};



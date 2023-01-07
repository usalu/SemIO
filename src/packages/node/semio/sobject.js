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

goog.provide('proto.semio.model.v1.Sobject');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Map');
goog.require('jspb.Message');
goog.require('proto.google.protobuf.Any');
goog.require('proto.semio.model.v1.Pose');

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
proto.semio.model.v1.Sobject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.semio.model.v1.Sobject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.semio.model.v1.Sobject.displayName = 'proto.semio.model.v1.Sobject';
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
proto.semio.model.v1.Sobject.prototype.toObject = function(opt_includeInstance) {
  return proto.semio.model.v1.Sobject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.semio.model.v1.Sobject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.model.v1.Sobject.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    url: jspb.Message.getFieldWithDefault(msg, 2, ""),
    pose: (f = msg.getPose()) && proto.semio.model.v1.Pose.toObject(includeInstance, f),
    parametersMap: (f = msg.getParametersMap()) ? f.toObject(includeInstance, proto.google.protobuf.Any.toObject) : []
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
 * @return {!proto.semio.model.v1.Sobject}
 */
proto.semio.model.v1.Sobject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.semio.model.v1.Sobject;
  return proto.semio.model.v1.Sobject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.semio.model.v1.Sobject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.semio.model.v1.Sobject}
 */
proto.semio.model.v1.Sobject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 3:
      var value = new proto.semio.model.v1.Pose;
      reader.readMessage(value,proto.semio.model.v1.Pose.deserializeBinaryFromReader);
      msg.setPose(value);
      break;
    case 4:
      var value = msg.getParametersMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.google.protobuf.Any.deserializeBinaryFromReader, "", new proto.google.protobuf.Any());
         });
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
proto.semio.model.v1.Sobject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.semio.model.v1.Sobject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.semio.model.v1.Sobject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.semio.model.v1.Sobject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPose();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.semio.model.v1.Pose.serializeBinaryToWriter
    );
  }
  f = message.getParametersMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(4, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.google.protobuf.Any.serializeBinaryToWriter);
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.semio.model.v1.Sobject.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.semio.model.v1.Sobject} returns this
 */
proto.semio.model.v1.Sobject.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string url = 2;
 * @return {string}
 */
proto.semio.model.v1.Sobject.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.semio.model.v1.Sobject} returns this
 */
proto.semio.model.v1.Sobject.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Pose pose = 3;
 * @return {?proto.semio.model.v1.Pose}
 */
proto.semio.model.v1.Sobject.prototype.getPose = function() {
  return /** @type{?proto.semio.model.v1.Pose} */ (
    jspb.Message.getWrapperField(this, proto.semio.model.v1.Pose, 3));
};


/**
 * @param {?proto.semio.model.v1.Pose|undefined} value
 * @return {!proto.semio.model.v1.Sobject} returns this
*/
proto.semio.model.v1.Sobject.prototype.setPose = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.semio.model.v1.Sobject} returns this
 */
proto.semio.model.v1.Sobject.prototype.clearPose = function() {
  return this.setPose(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.semio.model.v1.Sobject.prototype.hasPose = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * map<string, google.protobuf.Any> parameters = 4;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.google.protobuf.Any>}
 */
proto.semio.model.v1.Sobject.prototype.getParametersMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.google.protobuf.Any>} */ (
      jspb.Message.getMapField(this, 4, opt_noLazyCreate,
      proto.google.protobuf.Any));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.semio.model.v1.Sobject} returns this
 */
proto.semio.model.v1.Sobject.prototype.clearParametersMap = function() {
  this.getParametersMap().clear();
  return this;
};


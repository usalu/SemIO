# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from semio.extension.translator.v1 import translator_pb2 as extension_dot_translator_dot_v1_dot_translator__pb2
from semio.model.v1 import model_pb2 as model_dot_v1_dot_model__pb2


class TranslatorServiceStub(object):
    """A translator service can (mostly) translate representations of the specific extension platform. Translating means moving, rotating and scaling representations.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.TranslateRepresentation = channel.unary_unary(
                '/semio.extension.translator.v1.TranslatorService/TranslateRepresentation',
                request_serializer=extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationRequest.SerializeToString,
                response_deserializer=model_dot_v1_dot_model__pb2.Representation.FromString,
                )


class TranslatorServiceServicer(object):
    """A translator service can (mostly) translate representations of the specific extension platform. Translating means moving, rotating and scaling representations.
    """

    def TranslateRepresentation(self, request, context):
        """Translate a representation from one pose (coordinate system) into another one.
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_TranslatorServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'TranslateRepresentation': grpc.unary_unary_rpc_method_handler(
                    servicer.TranslateRepresentation,
                    request_deserializer=extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationRequest.FromString,
                    response_serializer=model_dot_v1_dot_model__pb2.Representation.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'semio.extension.translator.v1.TranslatorService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class TranslatorService(object):
    """A translator service can (mostly) translate representations of the specific extension platform. Translating means moving, rotating and scaling representations.
    """

    @staticmethod
    def TranslateRepresentation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/semio.extension.translator.v1.TranslatorService/TranslateRepresentation',
            extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationRequest.SerializeToString,
            model_dot_v1_dot_model__pb2.Representation.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

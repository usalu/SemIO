# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from extension.translator.v1 import translator_pb2 as extension_dot_translator_dot_v1_dot_translator__pb2


class TranslatorServiceStub(object):
    """A translator service translates representations between different poses (coordinate systems).
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.TranslateRepresentation = channel.unary_unary(
                '/semio.server.v1.TranslatorService/TranslateRepresentation',
                request_serializer=extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationRequest.SerializeToString,
                response_deserializer=extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationResponse.FromString,
                )


class TranslatorServiceServicer(object):
    """A translator service translates representations between different poses (coordinate systems).
    """

    def TranslateRepresentation(self, request, context):
        """Lay out a design from a layout and return a design.
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_TranslatorServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'TranslateRepresentation': grpc.unary_unary_rpc_method_handler(
                    servicer.TranslateRepresentation,
                    request_deserializer=extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationRequest.FromString,
                    response_serializer=extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'semio.server.v1.TranslatorService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class TranslatorService(object):
    """A translator service translates representations between different poses (coordinate systems).
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
        return grpc.experimental.unary_unary(request, target, '/semio.server.v1.TranslatorService/TranslateRepresentation',
            extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationRequest.SerializeToString,
            extension_dot_translator_dot_v1_dot_translator__pb2.TranslateRepresentationResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

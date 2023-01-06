# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from extension.adapter.v1 import adapter_pb2 as extension_dot_adapter_dot_v1_dot_adapter__pb2
from model.v1 import model_pb2 as model_dot_v1_dot_model__pb2


class AdapterServiceStub(object):
    """An adapter service is an adapter for elements to a specific platform where your elements are (parameterically) defined in.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.RequestAttractionPoint = channel.unary_unary(
                '/semio.extension.adapter.v1.AdapterService/RequestAttractionPoint',
                request_serializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.AttractionPointRequest.SerializeToString,
                response_deserializer=model_dot_v1_dot_model__pb2.Point.FromString,
                )
        self.RequestRepresentation = channel.unary_unary(
                '/semio.extension.adapter.v1.AdapterService/RequestRepresentation',
                request_serializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.RepresentationRequest.SerializeToString,
                response_deserializer=model_dot_v1_dot_model__pb2.Representation.FromString,
                )
        self.RequestRepresentations = channel.unary_unary(
                '/semio.extension.adapter.v1.AdapterService/RequestRepresentations',
                request_serializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.RepresentationsRequest.SerializeToString,
                response_deserializer=model_dot_v1_dot_model__pb2.Representations.FromString,
                )


class AdapterServiceServicer(object):
    """An adapter service is an adapter for elements to a specific platform where your elements are (parameterically) defined in.
    """

    def RequestAttractionPoint(self, request, context):
        """Request an attraction point for the attracted.
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RequestRepresentation(self, request, context):
        """Request a specific representation
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RequestRepresentations(self, request, context):
        """Request potentially all representations
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_AdapterServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'RequestAttractionPoint': grpc.unary_unary_rpc_method_handler(
                    servicer.RequestAttractionPoint,
                    request_deserializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.AttractionPointRequest.FromString,
                    response_serializer=model_dot_v1_dot_model__pb2.Point.SerializeToString,
            ),
            'RequestRepresentation': grpc.unary_unary_rpc_method_handler(
                    servicer.RequestRepresentation,
                    request_deserializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.RepresentationRequest.FromString,
                    response_serializer=model_dot_v1_dot_model__pb2.Representation.SerializeToString,
            ),
            'RequestRepresentations': grpc.unary_unary_rpc_method_handler(
                    servicer.RequestRepresentations,
                    request_deserializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.RepresentationsRequest.FromString,
                    response_serializer=model_dot_v1_dot_model__pb2.Representations.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'semio.extension.adapter.v1.AdapterService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class AdapterService(object):
    """An adapter service is an adapter for elements to a specific platform where your elements are (parameterically) defined in.
    """

    @staticmethod
    def RequestAttractionPoint(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/semio.extension.adapter.v1.AdapterService/RequestAttractionPoint',
            extension_dot_adapter_dot_v1_dot_adapter__pb2.AttractionPointRequest.SerializeToString,
            model_dot_v1_dot_model__pb2.Point.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RequestRepresentation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/semio.extension.adapter.v1.AdapterService/RequestRepresentation',
            extension_dot_adapter_dot_v1_dot_adapter__pb2.RepresentationRequest.SerializeToString,
            model_dot_v1_dot_model__pb2.Representation.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RequestRepresentations(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/semio.extension.adapter.v1.AdapterService/RequestRepresentations',
            extension_dot_adapter_dot_v1_dot_adapter__pb2.RepresentationsRequest.SerializeToString,
            model_dot_v1_dot_model__pb2.Representations.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
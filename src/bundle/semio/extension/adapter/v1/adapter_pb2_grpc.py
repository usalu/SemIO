# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from semio.extension.adapter.v1 import adapter_pb2 as extension_dot_adapter_dot_v1_dot_adapter__pb2
from semio.geometry.v1 import geometry_pb2 as geometry_dot_v1_dot_geometry__pb2
from semio.model.v1 import model_pb2 as model_dot_v1_dot_model__pb2


class AdapterServiceStub(object):
    """An adapter service is an adapter for elements to a specific platform where your elements are (parameterically) defined in.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.RequestPrototype = channel.unary_unary(
                '/semio.extension.adapter.v1.AdapterService/RequestPrototype',
                request_serializer=model_dot_v1_dot_model__pb2.Plan.SerializeToString,
                response_deserializer=model_dot_v1_dot_model__pb2.Prototype.FromString,
                )
        self.RequestConnectionPoint = channel.unary_unary(
                '/semio.extension.adapter.v1.AdapterService/RequestConnectionPoint',
                request_serializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.ConnectionPointRequest.SerializeToString,
                response_deserializer=geometry_dot_v1_dot_geometry__pb2.Point.FromString,
                )


class AdapterServiceServicer(object):
    """An adapter service is an adapter for elements to a specific platform where your elements are (parameterically) defined in.
    """

    def RequestPrototype(self, request, context):
        """Request a prototype.
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RequestConnectionPoint(self, request, context):
        """Request an connection point for the connected.
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_AdapterServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'RequestPrototype': grpc.unary_unary_rpc_method_handler(
                    servicer.RequestPrototype,
                    request_deserializer=model_dot_v1_dot_model__pb2.Plan.FromString,
                    response_serializer=model_dot_v1_dot_model__pb2.Prototype.SerializeToString,
            ),
            'RequestConnectionPoint': grpc.unary_unary_rpc_method_handler(
                    servicer.RequestConnectionPoint,
                    request_deserializer=extension_dot_adapter_dot_v1_dot_adapter__pb2.ConnectionPointRequest.FromString,
                    response_serializer=geometry_dot_v1_dot_geometry__pb2.Point.SerializeToString,
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
    def RequestPrototype(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/semio.extension.adapter.v1.AdapterService/RequestPrototype',
            model_dot_v1_dot_model__pb2.Plan.SerializeToString,
            model_dot_v1_dot_model__pb2.Prototype.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RequestConnectionPoint(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/semio.extension.adapter.v1.AdapterService/RequestConnectionPoint',
            extension_dot_adapter_dot_v1_dot_adapter__pb2.ConnectionPointRequest.SerializeToString,
            geometry_dot_v1_dot_geometry__pb2.Point.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
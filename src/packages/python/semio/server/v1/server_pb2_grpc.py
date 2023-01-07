# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from model.v1 import model_pb2 as model_dot_v1_dot_model__pb2


class ServerServiceStub(object):
    """The server service is the gateway for all other apis of semio.
    option (google.api.default_host) = "localhost:50000";
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.LayoutDesign = channel.unary_unary(
                '/semio.server.v1.ServerService/LayoutDesign',
                request_serializer=model_dot_v1_dot_model__pb2.Layout.SerializeToString,
                response_deserializer=model_dot_v1_dot_model__pb2.Design.FromString,
                )


class ServerServiceServicer(object):
    """The server service is the gateway for all other apis of semio.
    option (google.api.default_host) = "localhost:50000";
    """

    def LayoutDesign(self, request, context):
        """Lay out a design from a layout and return a design.
        option (google.api.http) = {
        post: "v1/layout-design"
        body: "*"
        };
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ServerServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'LayoutDesign': grpc.unary_unary_rpc_method_handler(
                    servicer.LayoutDesign,
                    request_deserializer=model_dot_v1_dot_model__pb2.Layout.FromString,
                    response_serializer=model_dot_v1_dot_model__pb2.Design.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'semio.server.v1.ServerService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class ServerService(object):
    """The server service is the gateway for all other apis of semio.
    option (google.api.default_host) = "localhost:50000";
    """

    @staticmethod
    def LayoutDesign(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/semio.server.v1.ServerService/LayoutDesign',
            model_dot_v1_dot_model__pb2.Layout.SerializeToString,
            model_dot_v1_dot_model__pb2.Design.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

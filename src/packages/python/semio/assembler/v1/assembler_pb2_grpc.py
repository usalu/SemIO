# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from assembler.v1 import assembler_pb2 as assembler_dot_v1_dot_assembler__pb2
from model.v1 import model_pb2 as model_dot_v1_dot_model__pb2


class AssemblerServiceStub(object):
    """The assembler service is responsible for assembling layouts into designs.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.LayoutDesign = channel.unary_unary(
                '/semio.assembler.v1.AssemblerService/LayoutDesign',
                request_serializer=assembler_dot_v1_dot_assembler__pb2.LayoutDesignRequest.SerializeToString,
                response_deserializer=model_dot_v1_dot_model__pb2.Design.FromString,
                )


class AssemblerServiceServicer(object):
    """The assembler service is responsible for assembling layouts into designs.
    """

    def LayoutDesign(self, request, context):
        """Lay out a design from a layout and return a design.
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_AssemblerServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'LayoutDesign': grpc.unary_unary_rpc_method_handler(
                    servicer.LayoutDesign,
                    request_deserializer=assembler_dot_v1_dot_assembler__pb2.LayoutDesignRequest.FromString,
                    response_serializer=model_dot_v1_dot_model__pb2.Design.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'semio.assembler.v1.AssemblerService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class AssemblerService(object):
    """The assembler service is responsible for assembling layouts into designs.
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
        return grpc.experimental.unary_unary(request, target, '/semio.assembler.v1.AssemblerService/LayoutDesign',
            assembler_dot_v1_dot_assembler__pb2.LayoutDesignRequest.SerializeToString,
            model_dot_v1_dot_model__pb2.Design.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

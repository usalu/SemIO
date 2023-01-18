from zmq import Context, REP

from semio.gateway import GatewayProxy, LayoutDesignRequest



gatewayProxy = GatewayProxy()

context = Context()
socket = context.socket(REP)
socket.bind("tcp://*:5556")

while True:
    #  Wait for next request from client
    message = socket.recv()
    print("Received request: %s" % message)
    try:
        response = gatewayProxy.LayoutDesign(request=LayoutDesignRequest.FromString(bytes.decode(message)))
    except Exception as e:
        response = str(e)
    socket.send(response)
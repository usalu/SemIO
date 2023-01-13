from pytest import mark,fixture

from semio.model import Point,Pose,Quaternion,Sobject,Attraction,AttractionParticipant,LayoutStragey,LAYOUTSTRATEGY_BREADTHFIRST,Layout,Any
from semio.gateway import LayoutDesignRequest, GatewayProxy

@fixture
def sampleLayoutDesignRequest():
    return LayoutDesignRequest(layout=Layout(
        sobjects=[
                Sobject(id='1',url="elements/RectangleWithMiter.gh",pose=Pose(point_of_view=Point(x=-400,y=10,z=-5),view=Quaternion(w=1,x=0,y=0,z=0)),parameters={'Length':Any(value=b'330')}),
                Sobject(id='2',url="elements/RectangleWithMiter.gh",pose=Pose(point_of_view=Point(x=30,y=500,z=20),view=Quaternion(w=0,x=0.707,y=-0.707,z=0)),parameters={'Length':Any(value=b'220')})
        ],
        attractions=[
            Attraction(id='1',attractor=AttractionParticipant(patricipant_id='1'),attracted=AttractionParticipant(patricipant_id='2'))
        ],
        root_sobject_id='1',
        stragegy=LAYOUTSTRATEGY_BREADTHFIRST
    ))


def test_layoutDesign(sampleLayoutDesignRequest):
    gatewayProxy = GatewayProxy()
    response = gatewayProxy.LayoutDesign(request=sampleLayoutDesignRequest)
    design = response.design

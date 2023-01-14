import logging

from typing import Iterable

from semio.manager import AttractionRequest,AttractionResponse, ElementRequest

from semio.model import Point,Sobject,Attraction,AttractionTree,Layout,Element,Design
from semio.gateway import GatewayServer, LayoutDesignRequest

def getElementsFromAttractionTree(sonjects: Iterable[Sobject], attractions: Iterable[Attraction], attractionTree:AttractionTree, bias:Point|None = None)->Iterable[Element]:
    # while attractionTree.childrean.count != 0:
    # attractionTree.attraction_id
    return []

class Gateway(GatewayServer):

    def attract(self, attraction: Attraction, targetTypeUrl: str):
        self.managerProxy.RequestAttraction(AttractionRequest(attraction=attraction,target_type_url=targetTypeUrl))

    def LayoutDesign(self, request:LayoutDesignRequest, context) -> Design:
        element = self.getManagerProxy().RequestElement(request=ElementRequest(sobject=request.layout.sobjects[0]))
        # attractionTree = request.layout.attractionTrees[0]
        #elements = getElementsFromAttractionTree(request.layout.sobjects,request.layout.attractions,attractionTree)
        return Design(elements=[element])

if __name__ == '__main__':
    logging.basicConfig()
    gateway = Gateway()
    gateway.serve()
from typing import Iterable

from semio.geometry import Point
from semio.model import Sobject,Platform,Connection,Assembly,Layout,Representation,Prototype,Element,Design
from semio.gateway import GatewayServer

class Gateway(GatewayServer):

    def layoutDesign(self, layout:Layout, target_platform:Platform)->Design:
        
        # Task 1
        prototypes = []
        sobjectPlanHashes = {sobject.id:sobject.plan.hash() for sobject in layout.sobjects}

        for sobject in layout.sobjects:
            if not sobjectPlanHashes[sobject.id] in prototypes:
                prototype = self.RequestPrototype(sobject.plan,target_platform)
                assert sobjectPlanHashes[sobject.id]==prototype.plan_hash
                prototypes.append(prototype)

        # Task 2
        elements = []
        assemblies = self.LayoutToAssemblies(layout)
        for assembly in assemblies:
            elementsFromAssembly = self.AssemblyToElements(assembly,layout.sobjects,layout.connections)
            elements+=elementsFromAssembly

        # await Task 1 & 2
        return Design(prototypes=prototypes,elements=elements)

def main():
    Gateway(startOverCli=True).serve()

if __name__ == '__main__':
    main()
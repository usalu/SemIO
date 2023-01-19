﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Google.Protobuf.Reflection;
using Grasshopper.Kernel;
using Rhino.Geometry;
using Semio.Model.V1;
using Semio.UI.Grasshopper.Components.Model;
using Semio.UI.Grasshopper.Goos;
using Semio.UI.Grasshopper.Params;
using Semio.UI.Grasshopper.Properties;

namespace Semio.UI.Grasshopper
{
    public class ConstructLayoutComponent : ConstructComponent
    {
        public ConstructLayoutComponent()
          : base("Construct Layout", "Layout", "", "Semio", "Model")
        {
        }
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
            pManager.AddParameter(new SobjectParam(),"Sobjects", "S", "", GH_ParamAccess.list);
            pManager.AddParameter(new AttractionParam(), "Attractions", "A", "", GH_ParamAccess.list);
            pManager[1].Optional = true;
            pManager.AddParameter(new SobjectParam(),"Root Sobject", "R", "", GH_ParamAccess.item);
            pManager[2].Optional = true;
            pManager.AddParameter(new LayoutStrategyParam(), "Layout Strategy", "LS","",GH_ParamAccess.item);
            pManager[3].Optional = true;
            pManager.AddParameter(new AttractionTreeParam(),"Attraction Tree", "AT", "", GH_ParamAccess.list);
            pManager[4].Optional = true;
        }
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
            pManager.AddParameter(new LayoutParam());
        }
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            var sobjects = new List<SobjectGoo>();
            if (!DA.GetDataList(0, sobjects)) return;

            var attractions = new List<AttractionGoo>();
            DA.GetDataList(1, attractions);

            SobjectGoo rootSobject = new();
            DA.GetData(2, ref rootSobject);

            LayoutStrategyGoo strategy = new();
            DA.GetData(3, ref strategy);

            var attractionTrees = new List<AttractionTreeGoo>();
            DA.GetDataList(4, attractionTrees);

            Layout layout = new Layout()
            {
               RootSobjectId = rootSobject.Value.Id,
               Stragegy = strategy.Value
            };

            layout.Sobjects.AddRange(sobjects.Select(x => x.Value));
            layout.Attractions.AddRange(attractions.Select(x => x.Value));
            layout.AttractionTrees.AddRange(attractionTrees.Select(x => x.Value));

            DA.SetData(0, new LayoutGoo(layout));
        }
        public override Guid ComponentGuid => new("E866DD2D-3A02-4540-8A05-F9C0387F7503");
        protected override Bitmap Icon => Resources.icon_construct_layout;
    }
}
﻿using System;
using System.Drawing;
using System.Linq;
using Grasshopper.Kernel;
using Semio.UI.Grasshopper.Goos;
using Semio.UI.Grasshopper.Params;
using Semio.UI.Grasshopper.Properties;

namespace Semio.UI.Grasshopper.Components.Model
{
    public class DeconstructDesignComponent : DeconstructComponent
    {
        public DeconstructDesignComponent()
          : base("Deconstruct Design", "DeDesign", "", "semio", "Model")
        {
        }
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
            pManager.AddParameter(new DesignParam());
        }
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
            pManager.AddParameter(new PrototypeParam(), "Prototypes", "PT", "", GH_ParamAccess.list);
            pManager.AddParameter(new ElementParam(),"Elements","E","",GH_ParamAccess.list);
        }
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            DesignGoo design = new();
            if (!DA.GetData(0, ref design)) return;
            if (design.Value.Prototypes.Any()) DA.SetDataList(0, design.Value.Prototypes.Select(p => new PrototypeGoo(p)));
            if (design.Value.Elements.Any()) DA.SetDataList(1, design.Value.Elements.Select(e=>new ElementGoo(e)));
        }
        protected override Bitmap Icon => Resources.icon_deconstruct_design;
        public override Guid ComponentGuid=>new ("452510D6-9554-4106-B740-363341BEDD0C");
    }
}
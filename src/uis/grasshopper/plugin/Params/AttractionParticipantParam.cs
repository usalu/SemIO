﻿// TODO Autogenerate
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grasshopper.Kernel;
using Semio.Model.V1;
using Semio.UI.Grasshopper.Goos;
using Semio.UI.Grasshopper.Properties;

namespace Semio.UI.Grasshopper.Params
{
    public class AttractionParticipantParam : GH_PersistentParam<AttractionParticipantGoo>
    {
        public AttractionParticipantParam() :
            base("Attraction Participant", "AP", "", "Semio", "Model")
        { }
        public override Guid ComponentGuid => new("61BEC70C-3BDB-4824-92FB-03E053253166");
        protected override GH_GetterResult Prompt_Singular(ref AttractionParticipantGoo value)
        {
            throw new NotImplementedException();
        }
        protected override GH_GetterResult Prompt_Plural(ref List<AttractionParticipantGoo> values)
        {
            throw new NotImplementedException();
        }
        public override GH_Exposure Exposure => GH_Exposure.primary;
        protected override Bitmap Icon => Resources.icon_attractionparticipant;
    }
}
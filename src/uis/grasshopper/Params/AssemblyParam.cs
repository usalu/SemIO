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
    public class AssemblyParam : SemioPersistentParam<AssemblyGoo>
    {
        public AssemblyParam() :
            base("Assembly", "A", "", "Semio", "Model")
        { }
        public override Guid ComponentGuid => new("02C84754-4800-4EB1-BF27-12FB84C5585E");
        protected override GH_GetterResult Prompt_Singular(ref AssemblyGoo value)
        {
            throw new NotImplementedException();
        }
        protected override GH_GetterResult Prompt_Plural(ref List<AssemblyGoo> values)
        {
            throw new NotImplementedException();
        }
        protected override Bitmap Icon => Resources.icon_assembly;
    }
}
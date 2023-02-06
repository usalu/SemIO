﻿using GH_IO.Serialization;
using Grasshopper.Kernel;
using Grasshopper.Kernel.Types;
using Rhino.Geometry;
using Semio.Model.V1;
using Semio.UI.Grasshopper.Utility;

namespace Semio.UI.Grasshopper.Goos
{
    public class PoseGoo : SemioGoo<Plane>
    {
        private Pose _pose = new();
        public Pose GetPose() => _pose;
        private void setValue(Plane plane)
        {
            _pose = Converter.Convert(plane);
            Value = plane;
        }
        private void setValue(Pose pose)
        {
            _pose = pose;
            Value = Converter.Convert(pose);
        }
        public PoseGoo()
        {
            setValue(Plane.WorldXY);
        }
        public PoseGoo(Plane plane)
        {
            setValue(plane);
        }

        public PoseGoo(Pose pose)
        {
            setValue(pose);
        }

        public override IGH_Goo Duplicate()=> new PoseGoo(_pose.Clone());

        public override string ToString() => _pose.ToString();
        public override bool CastTo<Q>(ref Q target)
        {
            if (typeof(Q).IsAssignableFrom(typeof(GH_Plane)))
            {
                object ptr = new GH_Plane(Value);
                target = (Q)ptr;
                return true;
            }
            return false;
        }
        public override bool CastFrom(object source)
        {
            if (source == null) return false;

            Plane plane = new();
            if (GH_Convert.ToPlane(source, ref plane, GH_Conversion.Both))
            {
                setValue(plane);
                return true;
            }
            return false;
        }
        public override string TypeName => "Pose";
        public override string TypeDescription => "A pose is an orientation.";

        public override bool Write(GH_IWriter writer)
        {
            writer.SetString("pose", _pose.ToString());
            return true;
        }
        public override bool Read(GH_IReader reader)
        {
            _pose = Pose.Parser.ParseJson(reader.GetString("pose"));
            Value = Converter.Convert(_pose);
            return true;
        }

    }
}

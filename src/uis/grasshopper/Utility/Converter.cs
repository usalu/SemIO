﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using Grasshopper.Documentation;
using Grasshopper.Kernel;
using Rhino.Geometry;
using Semio.Model.V1;
using Plane = Rhino.Geometry.Plane;
using SemioPoint = Semio.Model.V1.Point;
using Quaternion = Rhino.Geometry.Quaternion;
using SemioQuaternion = Semio.Model.V1.Quaternion;
using Grasshopper.Kernel.Geometry;
using Grasshopper.Kernel.Types;
using Rhino.FileIO;
using Rhino.Runtime;
using Semio.UI.Grasshopper.Goos;
using Encoding = Semio.Model.V1.Encoding;


namespace Semio.UI.Grasshopper.Utility
{
    public static class Converter
    {
        public static Quaternion ToQuaternion(SemioQuaternion quaternion) => new((float)quaternion.X, (float)quaternion.Y, (float)quaternion.Z, (float)quaternion.W);
        public static Vector3 ToVector(SemioPoint point) => new ((float)point.X, (float)point.Y, (float)point.Z);
        public static Vector3 ToVector(Point3d point) => new((float)point.X, (float)point.Y, (float)point.Z);
        public static string ToString(Representation representation)
        {
            string body = "";
            switch (representation.Encoding)
            {
                case Encoding.TextUft8:
                    body = representation.Body.ToStringUtf8();
                    break;
                case Encoding.TextUft16:
                    body = System.Text.Encoding.Unicode.GetString(representation.Body.ToByteArray());
                    break;
                case Encoding.TextUft32:
                    body = System.Text.Encoding.UTF32.GetString(representation.Body.ToByteArray());
                    break;
                case Encoding.TextAscii:
                    body = System.Text.Encoding.ASCII.GetString(representation.Body.ToByteArray());
                    break;
                case Encoding.TextBase64:
                    body = System.Text.Encoding.UTF8.GetString(System.Convert.FromBase64String(representation.Body.ToBase64()));
                    break;
            }
            return body;
        }
        public static string ToString(Value value)
        {
            string text;
            switch (value.ValueCase)
            {
                case Value.ValueOneofCase.NaturalNumber:
                    text = value.NaturalNumber.ToString();
                    break;
                case Value.ValueOneofCase.Number:
                    text = Math.Round(value.Number).ToString();
                    break;
                case Value.ValueOneofCase.IntegerNumber:
                    text = value.IntegerNumber.ToString();
                    break;
                case Value.ValueOneofCase.Text:
                    text = value.Text;
                    break;
                default:
                    throw new ArgumentException("This conversion is not possible or not (yet) implemented.");
            }
            return text;
        }

        public static int ToInteger(Value value)
        {
            int integer;
            switch (value.ValueCase)
            {
                case Value.ValueOneofCase.NaturalNumber:
                    integer = (int)value.NaturalNumber;
                    break;
                case Value.ValueOneofCase.Number:
                    integer = (int)Math.Round(value.Number);
                    break;
                case Value.ValueOneofCase.IntegerNumber:
                    integer = value.IntegerNumber;
                    break;
                case Value.ValueOneofCase.Text:
                    integer = (int)Math.Round(System.Convert.ToDouble(value.Text));
                    break;
                default:
                    throw new ArgumentException("This conversion is not possible or not (yet) implemented.");
            }
            return integer;
        }

        public static double ToDouble(Value value)
        {
            double number;
            switch (value.ValueCase)
            {
                case Value.ValueOneofCase.NaturalNumber:
                    number = value.NaturalNumber;
                    break;
                case Value.ValueOneofCase.Number:
                    number = value.Number;
                    break;
                case Value.ValueOneofCase.IntegerNumber:
                    number = value.IntegerNumber;
                    break;
                case Value.ValueOneofCase.Text:
                    number = System.Convert.ToDouble(value.Text);
                    break;
                default:
                    throw new ArgumentException("This conversion is not possible or not (yet) implemented.");
            }
            return number;
        }
        public static Quaternion Convert(SemioQuaternion quaternion) => new(quaternion.W, quaternion.X, quaternion.Y, quaternion.Z);

        public static SemioQuaternion Convert(Quaternion quaternion) => new()
        {
            W = quaternion.A, X = quaternion.B, Y = quaternion.C, Z = quaternion.D
        };

        public static SemioPoint Convert(Point3d point) => new()
        {
            X = point.X,
            Y = point.Y,
            Z = point.Z
        };
        public static Point3d Convert(SemioPoint point) => new()
        {
            X = point.X,
            Y = point.Y,
            Z = point.Z
        };
        public static Pose Convert(Plane plane)
        {
            Plane rotationPlane = plane.Clone();
            rotationPlane.Origin = Point3d.Origin;
            Transform rotationTransform = Transform.PlaneToPlane(Plane.WorldXY, rotationPlane);
            rotationTransform.GetQuaternion(out var quaternion);
            return new Pose()
            {
                PointOfView = Convert(plane.Origin),View = Convert(quaternion)
            };
        }
        public static Plane Convert(Pose pose)
        {
            Quaternion quaternion = Convert(pose.View);
            Transform transform = quaternion.MatrixForm();
            var xAxis = Vector3d.XAxis;
            xAxis.Transform(transform);
            var yAxis = Vector3d.YAxis;
            yAxis.Transform(transform);
            return new Plane(Convert(pose.PointOfView), xAxis, yAxis);
        }
        public static IEnumerable<GeometryBase> Convert (Representation representation)
        {
            File3dm file;
            switch (representation.Platform)
            {
                case Platform.Rhino:
                    file = File3dm.FromByteArray(representation.Body.ToByteArray());
                    break;
                default:
                    throw new ArgumentException($"The platform {representation.Platform} can't be converted (yet).");
            }
            return file.Objects.Select(o => o.Geometry);
        }
        public static IEnumerable<GeometryBase> Convert(Prototype prototype)
        {
            List<GeometryBase> geometries = new List<GeometryBase>();
            foreach (var representation in prototype.Representations)
            {
                try
                {
                    foreach (var geometry in Convert(representation))
                    {
                        //var poseTransform = Transform.PlaneToPlane(Plane.WorldXY, Convert(prototype.Pose));
                        //geometry.Transform(poseTransform);
                        geometries.Add(geometry);
                    }
                }
                catch (Exception e)
                {
                    //Console.WriteLine($"Representation {representation.Name} couldn't get converted to Rhino.\n" + e.ToString());
                }
            }
            return geometries;
        }
        public static IEnumerable<GeometryBase> Convert(Design design)
        {
            List<GeometryBase> geometries = new List<GeometryBase>();
            foreach (var prototype in design.Prototypes)
                geometries.AddRange(Convert(prototype));
            return geometries;
        }


    }
}

const CONSTANTS = {
    "DEFAULT_GATEWAY_PORT": 50001,
    "DEFAULT_MANAGER_PORT": 50002,
    "GENERAL_EXTENSIONS": [
      "txt",
      "json",
      "xml"
    ],
    "PLATFORMS": {
      "three": {
        "URL": "mrdoob/three",
        "DEFAULT_PORT": 59001,
        "FULL_NAME": "Three.js",
        "NAME": "three",
        "ABBREVIATION": "three",
        "EXTENSION": ".three.json",
        "NORMAL_EXTENSIONS": [
          ".json"
        ],
        "LEARN": "https://threejs.org/"
      },
      "sk": {
        "URL": "nortikin/sverchok",
        "DEFAULT_PORT": 59002,
        "FULL_NAME": "Sverchok",
        "NAME": "Sverchok",
        "ABBREVIATION": "sk",
        "EXTENSION": ".sk.json",
        "NORMAL_EXTENSIONS": [
          ".json",
          ".sk.json"
        ],
        "LEARN": "https://www.grasshopper3d.com/"
      },
      "ifcos": {
        "URL": "ifcopenshell/ifcopenshell",
        "DEFAULT_PORT": 59003,
        "FULL_NAME": "IfcOpenShell",
        "NAME": "ifcopenshell",
        "ABBREVIATION": "ifcos",
        "EXTENSION": ".ifcos",
        "NORMAL_EXTENSIONS": [
          ".cpp",
          ".py"
        ],
        "LEARN": "https://ifcopenshell.org/"
      },
      "cq": {
        "URL": "cadquery/cadquery",
        "DEFAULT_PORT": 59004,
        "FULL_NAME": "CadQuery",
        "NAME": "cadquery",
        "ABBREVIATION": "cq",
        "EXTENSION": ".cq",
        "NORMAL_EXTENSIONS": [
          ".py",
          ".cq.py"
        ],
        "LEARN": "https://github.com/CadQuery/cadquery/"
      },
      "fc": {
        "URL": "freecad/freecad",
        "DEFAULT_PORT": 59005,
        "FULL_NAME": "FreeCAD",
        "NAME": "freecad",
        "ABBREVIATION": "fc",
        "EXTENSION": ".fc",
        "NORMAL_EXTENSIONS": [
          ".FCMAcro",
          ".py"
        ],
        "LEARN": "https://github.com/FreeCAD/FreeCAD"
      },
      "os": {
        "URL": "openscad/openscad",
        "DEFAULT_PORT": 59006,
        "FULL_NAME": "OpenSCAD",
        "NAME": "freecad",
        "ABBREVIATION": "os",
        "EXTENSION": ".scad",
        "NORMAL_EXTENSIONS": [
          ".scad"
        ],
        "LEARN": "https://github.com/FreeCAD/FreeCAD"
      },
      "rhino": {
        "URL": "mcneel/rhino",
        "DEFAULT_PORT": 59101,
        "FULL_NAME": "Rhinoceros 3D",
        "NAME": "Rhino3D",
        "ABBREVIATION": "rhino",
        "EXTENSION": ".3dm",
        "NORMAL_EXTENSIONS": [
          ".3dm"
        ],
        "LEARN": "https://www.rhino3d.com/"
      },
      "gh": {
        "URL": "mcneel/rhino/grasshopper",
        "FULL_NAME": "Grasshopper 3D",
        "DEFAULT_PORT": 59102,
        "NAME": "Grasshopper",
        "ABBREVIATION": "gh",
        "EXTENSION": ".gh",
        "NORMAL_EXTENSIONS": [
          ".gh",
          ".ghx"
        ],
        "LEARN": "https://www.grasshopper3d.com/"
      },
      "rvt": {
        "URL": "autodesk/revit",
        "DEFAULT_PORT": 59103,
        "FULL_NAME": "Revit",
        "NAME": "revit",
        "ABBREVIATION": "rvt",
        "EXTENSION": ".rfa",
        "NORMAL_EXTENSIONS": [
          ".rfa"
        ],
        "LEARN": "https://www.autodesk.com/autodesk-university/class/Revit-Family-Creation-Step-Step-Introduction-Just-Beginners-2017"
      },
      "dyn": {
        "URL": "autodesk/revit/dynamo",
        "DEFAULT_PORT": 59104,
        "FULL_NAME": "Dynamo",
        "NAME": "dynamo",
        "ABBREVIATION": "dyn",
        "EXTENSION": ".dyn",
        "NORMAL_EXTENSIONS": [
          ".dyn"
        ],
        "LEARN": "https://primer2.dynamobim.org/"
      },
      "ac": {
        "URL": "graphisoft/archicad",
        "DEFAULT_PORT": 59105,
        "FULL_NAME": "ArchiCAD",
        "NAME": "archicad",
        "ABBREVIATION": "ac",
        "EXTENSION": ".gsl",
        "NORMAL_EXTENSIONS": [
          ".gdl",
          ".gsl"
        ],
        "LEARN": "https://gdl.graphisoft.com/"
      },
      "xl": {
        "URL": "microsoft/excel",
        "DEFAULT_PORT": 59106,
        "FULL_NAME": "Microsoft Excel",
        "NAME": "excel",
        "ABBREVIATION": "xl",
        "EXTENSION": ".xlsm",
        "NORMAL_EXTENSIONS": [
          ".xls",
          ".xlsm"
        ],
        "LEARN": "https://support.microsoft.com/en-us/office/use-the-name-manager-in-excel-4d8c4c2b-9f7d-44e3-a3b4-9f61bd5c64e4"
      },
      "ce": {
        "URL": "esri/arcgis/cityengine",
        "DEFAULT_PORT": 59107,
        "FULL_NAME": "ArcGIS CityEngine",
        "NAME": "cityengine",
        "ABBREVIATION": "ce",
        "EXTENSION": ".rpk",
        "NORMAL_EXTENSIONS": [
          ".rpk",
          ".cga"
        ],
        "LEARN": "https://esri.github.io/cityengine/"
      },
      "hpr": {
        "URL": "hypar/hypar",
        "DEFAULT_PORT": 59108,
        "FULL_NAME": "Hypar",
        "NAME": "hypar",
        "ABBREVIATION": "hpr",
        "EXTENSION": ".hpr",
        "NORMAL_EXTENSIONS": [
          ".json"
        ],
        "LEARN": "https://docs.hypar.io/getting-started"
      }
    }
}

export const DEFAULT_GATEWAY_PORT = CONSTANTS['DEFAULT_GATEWAY_PORT']
export const DEFAULT_MANAGER_PORT = CONSTANTS['DEFAULT_MANAGER_PORT']

const PLATFORMS = CONSTANTS['PLATFORMS']

export const THREE = PLATFORMS['three']
export const RHINO = PLATFORMS['rhino']
export const GRASSHOPPER = PLATFORMS['gh']
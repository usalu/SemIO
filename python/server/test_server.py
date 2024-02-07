from pytest import mark
from graphene.test import Client
from deepdiff import DeepDiff, Delta
from server import schema

createLocalKit = open("../../graphql/createLocalKit.graphql", "r").read()
updateLocalKitMetadata = open(
    "../../graphql/updateLocalKitMetadata.graphql", "r"
).read()
deleteLocalKit = open("../../graphql/deleteLocalKit.graphql", "r").read()
addTypeToLocalKit = open("../../graphql/addTypeToLocalKit.graphql", "r").read()
removeTypeFromLocalKit = open(
    "../../graphql/removeTypeFromLocalKit.graphql", "r"
).read()
addFormationToLocalKit = open(
    "../../graphql/addFormationToLocalKit.graphql", "r"
).read()
removeFormationFromLocalKit = open(
    "../../graphql/removeFormationFromLocalKit.graphql", "r"
).read()
formationToSceneFromLocalKit = open(
    "../../graphql/formationToSceneFromLocalKit.graphql", "r"
).read()


# @mark.skip
def test_integration_graphql_local_kit_crud(tmp_path):
    client = Client(schema)
    name = "metabolism"
    explanation = "For metabolistic architecture."
    icon = "🫀"
    url = "https://github.com/usalu/semio/tree/main/examples/metabolism"
    base = {
        "name": "base",
        "explanation": "A base with a public entrance and two towers that are on top of it.",
        "icon": "🏫",
        "representations": [
            {"url": "base/geometry.3dm", "lod": "1to100", "tags": ["simple"]}
        ],
        "ports": [
            {
                "plane": {
                    "origin": {"x": 0.0, "y": 0.0, "z": 0.0},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "specifiers": [
                    {"context": "tower", "group": "left"},
                ],
            },
            {
                "plane": {
                    "origin": {"x": 0.0, "y": 0.0, "z": 0.0},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "specifiers": [
                    {"context": "tower", "group": "right"},
                ],
            },
        ],
        "qualities": [
            {"name": "storeys", "value": "2", "unit": None},
        ],
    }
    baseId = {
        "name": "base",
        "qualities": [
            {"name": "storeys", "value": "2", "unit": None},
        ],
    }
    shaft = {
        "name": "shaft",
        "explanation": "A cuboid building core shaft with 10 storeys and a floor height of 3 meters.",
        "icon": "🛗",
        "representations": [
            {"url": "shaft/geometry.3dm", "lod": "1to100", "tags": ["simple"]}
        ],
        "ports": [
            {
                "plane": {
                    "origin": {"x": 0.0, "y": 0.0, "z": 0.0},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "specifiers": [
                    {"context": "facade", "group": "north"},
                    {"context": "floor", "group": "1"},
                    {"context": "door", "group": "0"},
                ],
            }
        ],
        "qualities": [
            {"name": "floor height", "value": "3", "unit": "m"},
            {"name": "storeys", "value": "10", "unit": None},
        ],
    }
    shaftId = {
        "name": "shaft",
        "qualities": [
            {"name": "floor height", "value": "3", "unit": "m"},
            {"name": "storeys", "value": "10", "unit": None},
        ],
    }
    capsule = {
        "name": "capsule",
        "explanation": "A capsule with the door in the back and window in the front.",
        "icon": "📦",
        "representations": [
            {
                "url": "capsules/standard/geometry.3dm",
                "lod": "1to100",
                "tags": ["simple"],
            }
        ],
        "ports": [
            {
                "plane": {
                    "origin": {"x": 0.0, "y": 0.0, "z": 0.0},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "specifiers": [{"context": "doors", "group": "front"}],
            }
        ],
        "qualities": [
            {"name": "door", "value": "behind", "unit": None},
            {"name": "window", "value": "front", "unit": None},
        ],
    }
    capsuleId = {
        "name": "capsule",
        "qualities": [
            {"name": "door", "value": "behind", "unit": None},
            {"name": "window", "value": "front", "unit": None},
        ],
    }
    mirroredCapsule = {
        "name": "capsule",
        "explanation": "A mirrored capsule with the door in the back and window in the front.",
        "icon": "📦^🪞",
        "representations": [
            {
                "url": "capsules/mirrored/geometry.3dm",
                "lod": "1to100",
                "tags": ["simple"],
            }
        ],
        "ports": [
            {
                "plane": {
                    "origin": {"x": 0.0, "y": 0.0, "z": 0.0},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "specifiers": [{"context": "doors", "group": "front"}],
            }
        ],
        "qualities": [
            {"name": "door", "value": "behind", "unit": None},
            {"name": "window", "value": "front", "unit": None},
            {"name": "mirrored", "value": "true", "unit": None},
        ],
    }
    mirroredCapsuleId = {
        "name": "capsule",
        "qualities": [
            {"name": "door", "value": "behind", "unit": None},
            {"name": "window", "value": "front", "unit": None},
            {"name": "mirrored", "value": "true", "unit": None},
        ],
    }
    types = [shaft, capsule, mirroredCapsule]
    nakaginCapsuleTower = {
        "name": "nakagin capsule tower",
        "explanation": "The Nakagin Capsule Tower.",
        "icon": "🏯",
        "pieces": [
            {
                "id": "s",
                "type": {
                    "name": "shaft",
                    "qualities": [
                        {"name": "floor height", "value": "3", "unit": "m"},
                        {"name": "storeys", "value": "10", "unit": None},
                    ],
                },
            },
            {
                "id": "c1",
                "type": {
                    "name": "capsule",
                    "qualities": [
                        {"name": "door", "value": "behind", "unit": None},
                        {"name": "window", "value": "front", "unit": None},
                    ],
                },
            },
            {
                "id": "c2",
                "type": {
                    "name": "capsule",
                    "qualities": [
                        {"name": "door", "value": "behind", "unit": None},
                        {"name": "window", "value": "front", "unit": None},
                        {"name": "mirrored", "value": "true", "unit": None},
                    ],
                },
            },
        ],
        "attractions": [
            {
                "attracting": {
                    "piece": {
                        "id": "s",
                        "type": {
                            "port": {
                                "specifiers": [
                                    {"context": "facade", "group": "north"},
                                    {"context": "floor", "group": "1"},
                                    {"context": "door", "group": "0"},
                                ]
                            }
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "c1",
                        "type": {
                            "port": {
                                "specifiers": [{"context": "doors", "group": "front"}]
                            }
                        },
                    }
                },
            }
        ],
        "qualities": [{"name": "storeys", "value": "12", "unit": None}],
    }
    kit = {
        "name": name,
        "explanation": explanation,
        "icon": icon,
        "url": url,
        "types": types,
        "formations": [nakaginCapsuleTower],
    }
    createResponse = client.execute(
        createLocalKit, variables={"directory": str(tmp_path), "kit": kit}
    )
    createResponseExpected = {
        "data": {
            "createLocalKit": {
                "kit": kit,
                "error": None,
            }
        }
    }
    createResponseDiff = DeepDiff(createResponse, createResponseExpected)
    assert not createResponseDiff, f"Response difference: {createResponseDiff}"
    removeShaftResponse = client.execute(
        removeTypeFromLocalKit,
        variables={"directory": str(tmp_path), "type": shaftId},
    )
    removeShaftResponseExpected = {
        "data": {
            "removeTypeFromLocalKit": {
                "error": {"code": "FORMATION_DEPENDS_ON_TYPE", "message": None},
            }
        }
    }
    removeShaftResponseDiff = DeepDiff(removeShaftResponse, removeShaftResponseExpected)
    assert (
        not removeShaftResponseDiff
    ), f"Response difference: {removeShaftResponseDiff}"
    addBaseResponse = client.execute(
        addTypeToLocalKit,
        variables={"directory": str(tmp_path), "type": base},
    )
    addBaseResponseExpected = {
        "data": {
            "addTypeToLocalKit": {
                "type": base,
                "error": None,
            }
        }
    }
    addBaseResponseDiff = DeepDiff(addBaseResponse, addBaseResponseExpected)
    assert not addBaseResponseDiff, f"Response difference: {addBaseResponseDiff}"


def test_integration_graphql_local_kit_formationToScene(tmp_path):
    #   ┌──────────┐ ┌──────────┐   │   xxxxxxxxxxxx xxxxxxxxxxxx
    #   │          │ │          │   │   x          x x          x
    # ┌─▼─┐        │ │        ┌─▼─┐ │ ┌───┐        x x        ┌───┐
    # │ a │       ┌┴─┴┐       │ b │ │ │ a │       ┌───┐       │ b │
    # └─▲─┘    ┌──►1ab◄──┐    └─▲─┘ │ └─▲─┘    ┌──►1ab│xxx    └─▲─┘
    #   │      │  └───┘  │      │   │   │      │  └───┘  x      │
    # ┌─┴─┐  ┌─┴─┐     ┌─┴─┐  ┌─┴─┐ │ ┌─┴─┐  ┌─┴─┐     ┌───┐  ┌─┴─┐
    # │1a1◄──┤1a │     │1b ├──►1b1│ │ │1a1◄──┤1a │     │1b ├──►1b1│
    # └───┘  └─▲─┘     └─▲─┘  └───┘ │ └───┘  └─▲─┘     └─▲─┘  └───┘
    #          │  ┌───┐  │          │          │  ┌───┐  │
    #          └──┤ 1 ├──┘          │          └──┤ 1 ├──┘
    #             └───┘             │             └───┘
    #             before            │             after
    client = Client(schema)
    type1 = {
        "name": "box",
        "explanation": None,
        "icon": None,
        "representations": [{"url": "box\\geometry.3dm", "lod": None, "tags": None}],
        "ports": [
            {
                "plane": {
                    "origin": {"x": 965.3356, "y": 600.1125, "z": 61.2654},
                    "xAxis": {"x": -0.5827684, "y": 0.796464264, "z": -0.161324874},
                    "yAxis": {"x": 0.5171522, "y": 0.210352287, "z": -0.8296418},
                },
                "specifiers": [{"context": "side", "group": "q"}],
            },
            {
                "plane": {
                    "origin": {"x": 402.17627, "y": 900.2018, "z": 403.443665},
                    "xAxis": {"x": -0.5171522, "y": -0.210352287, "z": 0.8296418},
                    "yAxis": {"x": -0.5827684, "y": 0.796464264, "z": -0.161324874},
                },
                "specifiers": [{"context": "side", "group": "r"}],
            },
            {
                "plane": {
                    "origin": {"x": 435.771759, "y": 384.711731, "z": 910.8186},
                    "xAxis": {"x": -0.5827684, "y": 0.796464264, "z": -0.161324874},
                    "yAxis": {"x": 0.5171522, "y": 0.210352287, "z": -0.8296418},
                },
                "specifiers": [{"context": "side", "group": "s"}],
            },
            {
                "plane": {
                    "origin": {"x": 998.9311, "y": 84.622406, "z": 568.6403},
                    "xAxis": {"x": -0.5171522, "y": -0.210352287, "z": 0.8296418},
                    "yAxis": {"x": -0.5827684, "y": 0.796464264, "z": -0.161324874},
                },
                "specifiers": [{"context": "side", "group": "t"}],
            },
        ],
        "qualities": None,
    }

    formation1 = {
        "name": "formation1",
        "explanation": None,
        "icon": None,
        "pieces": [
            {"id": "1", "type": {"name": "box", "qualities": None}},
            {"id": "1a", "type": {"name": "box", "qualities": None}},
            {"id": "1b", "type": {"name": "box", "qualities": None}},
            {"id": "1a1", "type": {"name": "box", "qualities": None}},
            {"id": "1b1", "type": {"name": "box", "qualities": None}},
            {"id": "a", "type": {"name": "box", "qualities": None}},
            {"id": "b", "type": {"name": "box", "qualities": None}},
            {"id": "1ab", "type": {"name": "box", "qualities": None}},
        ],
        "attractions": [
            {
                "attracting": {
                    "piece": {
                        "id": "1",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "s"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "1a",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "q"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1a",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "r"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "1ab",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "t"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1a1",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "r"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "a",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "t"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1ab",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "s"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "a",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "q"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "r"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "1b",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "t"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1a",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "s"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "1a1",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "q"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1ab",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "r"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "b",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "t"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1b",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "s"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "1ab",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "q"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1b",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "r"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "1b1",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "t"}]}
                        },
                    }
                },
            },
            {
                "attracting": {
                    "piece": {
                        "id": "1b1",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "s"}]}
                        },
                    }
                },
                "attracted": {
                    "piece": {
                        "id": "b",
                        "type": {
                            "port": {"specifiers": [{"context": "side", "group": "q"}]}
                        },
                    }
                },
            },
        ],
        "qualities": None,
    }

    formation1Id = {
        "name": "formation1",
    }
    scene1 = {
        "objects": [
            {
                "piece": {
                    "id": "1",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": 0.0, "y": 0.0, "z": 0.0},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": None,
            },
            {
                "piece": {
                    "id": "1a",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": -529.563843, "y": -215.400772, "z": 849.5532},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": {"piece": {"id": "1"}},
            },
            {
                "piece": {
                    "id": "1ab",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": -1126.31873, "y": 600.17865, "z": 684.356567},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": {"piece": {"id": "1a"}},
            },
            {
                "piece": {
                    "id": "a",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": -1655.88257, "y": 384.777863, "z": 1533.90979},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": {"piece": {"id": "1ab"}},
            },
            {
                "piece": {
                    "id": "b",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": -1723.07349, "y": 1415.758, "z": 519.1599},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": {"piece": {"id": "1ab"}},
            },
            {
                "piece": {
                    "id": "1a1",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": -1059.12769, "y": -430.801544, "z": 1699.10645},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": {"piece": {"id": "1a"}},
            },
            {
                "piece": {
                    "id": "1b",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": -596.7548, "y": 815.5794, "z": -165.19664},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": {"piece": {"id": "1"}},
            },
            {
                "piece": {
                    "id": "1b1",
                    "type": {
                        "representations": [
                            {"url": "box\\geometry.3dm", "lod": None, "tags": []}
                        ]
                    },
                },
                "plane": {
                    "origin": {"x": -1193.50964, "y": 1631.15881, "z": -330.39328},
                    "xAxis": {"x": 1.0, "y": 0.0, "z": 0.0},
                    "yAxis": {"x": 0.0, "y": 1.0, "z": 0.0},
                },
                "parent": {"piece": {"id": "1b"}},
            },
        ]
    }

    kit = {
        "name": "kit1",
        "types": [type1],
        "formations": [formation1],
    }
    createLocalKitResponse = client.execute(
        createLocalKit,
        variables={
            "directory": str(tmp_path),
            "kit": kit,
        },
    )
    assert not createLocalKitResponse.get("errors"), f"Errors: {createLocalKitResponse}"
    formation1ToSceneResponse = client.execute(
        formationToSceneFromLocalKit,
        variables={"directory": str(tmp_path), "formation": formation1Id},
    )
    formation1ToSceneResponseExpected = {
        "data": {
            "formationToSceneFromLocalKit": {
                "scene": scene1,
                "error": None,
            }
        }
    }
    formation1ToSceneResponseDiff = DeepDiff(
        formation1ToSceneResponse,
        formation1ToSceneResponseExpected,
        math_epsilon=0.0001,
        ignore_numeric_type_changes=True,
    )
    assert (
        not formation1ToSceneResponseDiff
    ), f"Response difference: {formation1ToSceneResponseDiff}"

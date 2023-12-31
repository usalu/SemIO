#!/usr/bin/env python

# semio
# Copyright (C) 2023 Ueli Saluz

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.

# You should have received a copy of the GNU Lesser General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

"""
API for semio.
"""

from os import remove
from pathlib import Path
from functools import lru_cache
import typing
from typing import Optional, Dict, Protocol
from enum import Enum
import decimal
import sqlalchemy
from sqlalchemy import (
    String,
    Text,
    Numeric,
    ForeignKey,
    create_engine,
    UniqueConstraint,
    CheckConstraint,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
    sessionmaker,
    Session,
)
import graphene
from graphene import Schema, Mutation, ObjectType, InputObjectType, Field, NonNull
from graphene_sqlalchemy import (
    SQLAlchemyObjectType,
    SQLAlchemyInterface,
)
from flask import Flask
from graphql_server.flask import GraphQLView

URL_LENGTH_MAX = 1000
NAME_LENGTH_MAX = 100
SYMBOL_LENGTH_MAX = 1
SCRIPT_KIND_LENGTH_MAX = 100
KIT_FILENAME = "kit.semio"


class SemioException(Exception):
    pass


class InvalidDatabase(SemioException):
    def __init__(self, message: str) -> None:
        self.message = message

    def __str__(self) -> str:
        return self.message + "\n This should not happen. Please report this bug."


# TODO: Refactor Protocol to ABC and make it work with SQLAlchemy
class Artifact(Protocol):
    name: str
    explanation: str
    symbol: str

    @property
    def parent(self):
        pass

    @property
    def children(self):
        pass

    @property
    def references(self):
        pass

    @property
    def referenced_by(self):
        pass

    @property
    def related_to(self):
        (
            ([self.parent] if self.parent else [])
            + self.children
            + self.references
            + self.referenced_by
        )


# SQLAlchemy


class Base(DeclarativeBase):
    pass


# Open-Closed Principle violation
class ScriptKind(Enum):
    PROTOTYPE = 1
    MODIFICATION = 2
    CHOREOGRAPHY = 11
    TRANSFORMATION = 12
    SYNTHESIS = 21


class Script(Base):
    __tablename__ = "script"

    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[Optional[str]] = mapped_column(String(URL_LENGTH_MAX))
    kind: Mapped[ScriptKind] = mapped_column(sqlalchemy.Enum(ScriptKind))

    __mapper_args__ = {"polymorphic_on": kind, "polymorphic_abstract": True}

    @property
    def parent(self) -> Artifact:
        return self.kit

    @property
    def children(self) -> typing.List[Artifact]:
        return []

    @property
    def references(self) -> typing.List[Artifact]:
        return []

    @property
    def related_to(self) -> typing.List[Artifact]:
        return [self.parent] + self.children + self.references + self.referenced_by


class PrototypeScript(Script):
    prototype_id: Mapped[Optional[int]] = mapped_column(ForeignKey("prototype.id"))
    prototype: Mapped[Optional["Prototype"]] = relationship(
        "Prototype", foreign_keys=[prototype_id]
    )

    __mapper_args__ = {"polymorphic_identity": ScriptKind.PROTOTYPE}

    def __repr__(self) -> str:
        return f"PrototypeScript(id={self.id!r}, name={self.name!r}, prototype_id={self.prototype_id!r})"

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return [self.prototype] if self.prototype else []


class Prototype(Base):
    __tablename__ = "prototype"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    explanation: Mapped[Optional[str]] = mapped_column(Text())
    types: Mapped[Optional[typing.List["Type"]]] = relationship(
        "Type",
        foreign_keys="[Type.prototype_id]",
        back_populates="prototype",
    )

    def __repr__(self) -> str:
        return f"Prototype(id={self.id!r}, name={self.name!r}, kit_id={self.kit_id!r})"

    @property
    def references(self) -> typing.List[Artifact]:
        return self.types


class Modification(Base):
    types: Mapped[Optional[typing.List["Type"]]] = relationship(
        "Type",
        foreign_keys="[Type.modification_id]",
        back_populates="modification",
    )

    def __repr__(self) -> str:
        return (
            f"Modification(id={self.id!r}, name={self.name!r}, kit_id={self.kit_id!r})"
        )

    @property
    def references(self) -> typing.List[Artifact]:
        return self.types


class Choreography(Base):
    formations: Mapped[Optional[typing.List["Formation"]]] = relationship(
        "Formation",
        foreign_keys="[Formation.choreography_id]",
        back_populates="choreography",
    )

    def __repr__(self) -> str:
        return (
            f"Choreography(id={self.id!r}, name={self.name!r}, kit_id={self.kit_id!r})"
        )

    @property
    def references(self) -> typing.List[Artifact]:
        return self.formations


class Transformation(Base):
    formations: Mapped[Optional[typing.List["Formation"]]] = relationship(
        "Formation",
        foreign_keys="[Formation.transformation_id]",
        back_populates="transformation",
    )

    def __repr__(self) -> str:
        return f"Transformation(id={self.id!r}, name={self.name!r}, kit_id={self.kit_id!r})"

    @property
    def references(self) -> typing.List[Artifact]:
        return self.formations


class Synthesis(Base):
    properties: Mapped[Optional[typing.List["Property"]]] = relationship(
        "Property",
        foreign_keys="[Property.synthesis_id]",
        back_populates="synthesis",
    )

    def __repr__(self) -> str:
        return f"Synthesis(id={self.id!r}, name={self.name!r}, kit_id={self.kit_id!r})"

    @property
    def references(self) -> typing.List[Artifact]:
        return self.properties


class PropertyDatatype(Enum):
    # 001 - 099: numbers
    DECIMAL = 1
    # 101 - 199: text
    DESCRIPTION = 101
    # 201 - 299: geometry
    BREP = 201
    # 1001 - 9999: files
    GLTF = 1001
    # 10001 - 10099: containers
    LIST = 10001


class Property(Base):
    __tablename__ = "property"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    datatype: Mapped[PropertyDatatype] = mapped_column(
        sqlalchemy.Enum(PropertyDatatype)
    )
    value: Mapped[str] = mapped_column(Text())
    synthesis_id: Mapped[Optional[int]] = mapped_column(ForeignKey("synthesis.id"))
    synthesis: Mapped[Optional[Synthesis]] = relationship(
        Synthesis, foreign_keys=[synthesis_id]
    )
    type_id: Mapped[Optional[int]] = mapped_column(ForeignKey("type.id"))
    type: Mapped[Optional["Type"]] = relationship("Type", back_populates="properties")
    port_id: Mapped[Optional[int]] = mapped_column(ForeignKey("port.id"))
    port: Mapped[Optional["Port"]] = relationship("Port", back_populates="properties")
    list_id: Mapped[Optional[int]] = mapped_column(ForeignKey("property.id"))
    list_index: Mapped[Optional[int]] = mapped_column(CheckConstraint("list_index>=0"))

    __mapper_args__ = {"polymorphic_on": datatype, "polymorphic_abstract": True}

    # Open-Closed Principle violation
    __table_args__ = (
        CheckConstraint(
            "(type_id IS NOT NULL AND port_id IS NULL AND list_id IS NULL) OR "
            "(type_id IS NULL AND port_id IS NOT NULL AND list_id IS NULL) OR "
            "(type_id IS NULL AND port_id IS NULL AND list_id IS NOT NULL)",
            name="owner_present_and_unique_constraint",
        ),
        CheckConstraint(
            "(list_id IS NOT NULL AND list_index IS NOT NULL) OR "
            "(list_id IS NULL AND list_index IS NULL)",
            name="list_index_present_per_list_constraint",
        ),
        UniqueConstraint(
            "list_id", "list_index", name="list_index_unique_per_list_constraint"
        ),
    )

    def __repr__(self) -> str:
        return f"Property(id={self.id!r}, name={self.name!r}, {self.owner_kind_name!r}_id={self.owner_id!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Property):
            return NotImplemented
        return (
            self.name == self.name
            and self.datatype == self.datatype
            and self.value == self.value
        )

    @property
    def owner_id(self) -> Artifact:
        if self.type_id is not None:
            return self.type_id
        if self.port_id is not None:
            return self.port_id
        if self.list_id is not None:
            return self.list_id
        raise InvalidDatabase(f"Property{self!r} has no owner.")

    @property
    def owner_kind_name(self) -> str:
        if self.type_id is not None:
            return "type"
        if self.port_id is not None:
            return "port"
        if self.list_id is not None:
            return "list"
        raise InvalidDatabase(f"Property{self!r} has no owner.")

    @property
    def parent(self) -> Artifact:
        if self.type_id is not None:
            return self.type
        if self.port_id is not None:
            return self.port
        if self.list_id is not None:
            return self.list
        raise InvalidDatabase(f"Property{self!r} has no owner.")

    @property
    def children(self) -> typing.List[Artifact]:
        return []

    @property
    def references(self) -> typing.List[Artifact]:
        return []

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return [self.synthesis] if self.synthesis else []

    @property
    def related_to(self) -> typing.List[Artifact]:
        return [self.parent] + self.children + self.references + self.referenced_by


class ScalarProperty(Property):
    __mapper_args__ = {"polymorphic_abstract": True}


class NumberProperty(ScalarProperty):
    __mapper_args__ = {"polymorphic_abstract": True}


class DecimalProperty(NumberProperty):
    __mapper_args__ = {
        "polymorphic_identity": PropertyDatatype.DECIMAL,
    }

    def __repr__(self) -> str:
        return f"Decimal(id={self.id!r}, name={self.name!r}, {self.owner_kind_name!r}_id={self.owner_id!r})"


class TextProperty(ScalarProperty):
    __mapper_args__ = {"polymorphic_abstract": True}


class DescriptionProperty(TextProperty):
    __mapper_args__ = {
        "polymorphic_identity": PropertyDatatype.DESCRIPTION,
    }

    def __repr__(self) -> str:
        return f"Description(id={self.id!r}, name={self.name!r}, {self.owner_kind_name!r}_id={self.owner_id!r})"


class GeometryProperty(ScalarProperty):
    __mapper_args__ = {"polymorphic_abstract": True}


class BrepProperty(GeometryProperty):
    __mapper_args__ = {
        "polymorphic_identity": PropertyDatatype.BREP,
    }

    def __repr__(self) -> str:
        return f"Brep(id={self.id!r}, name={self.name!r}, {self.owner_kind_name!r}_id={self.owner_id!r})"


class Container(Property):
    __mapper_args__ = {"polymorphic_abstract": True}


class List(Container):
    __mapper_args__ = {
        "polymorphic_identity": PropertyDatatype.LIST,
    }

    def __repr__(self) -> str:
        return f"List(id={self.id!r}, name={self.name!r}, {self.owner_kind_name!r}_id={self.owner_id!r})"


class Port(Base):
    __tablename__ = "port"

    id: Mapped[int] = mapped_column(primary_key=True)
    origin_x: Mapped[decimal.Decimal] = mapped_column(Numeric())
    origin_y: Mapped[decimal.Decimal] = mapped_column(Numeric())
    origin_z: Mapped[decimal.Decimal] = mapped_column(Numeric())
    x_axis_x: Mapped[decimal.Decimal] = mapped_column(Numeric())
    x_axis_y: Mapped[decimal.Decimal] = mapped_column(Numeric())
    x_axis_z: Mapped[decimal.Decimal] = mapped_column(Numeric())
    y_axis_x: Mapped[decimal.Decimal] = mapped_column(Numeric())
    y_axis_y: Mapped[decimal.Decimal] = mapped_column(Numeric())
    y_axis_z: Mapped[decimal.Decimal] = mapped_column(Numeric())
    z_axis_x: Mapped[decimal.Decimal] = mapped_column(Numeric())
    z_axis_y: Mapped[decimal.Decimal] = mapped_column(Numeric())
    z_axis_z: Mapped[decimal.Decimal] = mapped_column(Numeric())
    type_id: Mapped[int] = mapped_column(ForeignKey("type.id"))
    type: Mapped["Type"] = relationship("Type", back_populates="ports")
    properties: Mapped[Optional[typing.List[Property]]] = relationship(
        Property, back_populates="port", cascade="all, delete-orphan"
    )
    attractings: Mapped[Optional[typing.List["Attraction"]]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracting_piece_type_port_id]",
        back_populates="attracting_piece_type_port",
    )
    attracteds: Mapped[Optional[typing.List["Attraction"]]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracted_piece_type_port_id]",
        back_populates="attracted_piece_type_port",
    )

    def __repr__(self) -> str:
        return f"Port(id={self.id!r}, name={self.name!r}, type_id={self.type_id!r})"

    @property
    def parent(self) -> Artifact:
        return self.type

    @property
    def children(self) -> typing.List[Artifact]:
        return self.properties

    @property
    def references(self) -> typing.List[Artifact]:
        return []

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return self.attractings + self.attracteds

    @property
    def related_to(self) -> typing.List[Artifact]:
        return [self.parent] + self.children + self.references + self.referenced_by


class Type(Base):
    __tablename__ = "type"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    explanation: Mapped[Optional[str]] = mapped_column(Text())
    symbol: Mapped[Optional[str]] = mapped_column(String(SYMBOL_LENGTH_MAX))
    prototype_id: Mapped[Optional[int]] = mapped_column(ForeignKey("script.id"))
    prototype: Mapped[Optional[Prototype]] = relationship(
        Prototype, foreign_keys=[prototype_id]
    )
    modification_id: Mapped[Optional[int]] = mapped_column(ForeignKey("script.id"))
    modification: Mapped[Optional[Script]] = relationship(
        Script, foreign_keys=[modification_id]
    )
    kit_id: Mapped[int] = mapped_column(ForeignKey("kit.id"))
    kit: Mapped["Kit"] = relationship("Kit", back_populates="types")
    ports: Mapped[Optional[typing.List[Port]]] = relationship(
        "Port", back_populates="type"
    )
    properties: Mapped[Optional[typing.List[Property]]] = relationship(
        Property, back_populates="type", cascade="all, delete-orphan"
    )
    pieces: Mapped[Optional[typing.List["Piece"]]] = relationship(
        "Piece", back_populates="type"
    )

    def __repr__(self) -> str:
        return f"Type(id={self.id!r}, name={self.name!r}, kit_id={self.kit_id!r})"

    @property
    def parent(self) -> Artifact:
        return self.kit

    @property
    def children(self) -> typing.List[Artifact]:
        return self.ports + self.properties

    @property
    def references(self) -> typing.List[Artifact]:
        return []

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return (
            self.pieces
            + ([self.prototype] if self.prototype else [])
            + ([self.modification] if self.modification else [])
        )

    @property
    def related_to(self) -> typing.List[Artifact]:
        return [self.parent] + self.children + self.references + self.referenced_by


class Piece(Base):
    __tablename__ = "piece"

    id: Mapped[int] = mapped_column(primary_key=True)
    type_id: Mapped[int] = mapped_column(ForeignKey("type.id"))
    type: Mapped["Type"] = relationship("Type", back_populates="pieces")
    formation_id: Mapped[int] = mapped_column(ForeignKey("formation.id"))
    formation: Mapped["Formation"] = relationship("Formation", back_populates="pieces")
    attractings: Mapped[Optional[typing.List["Attraction"]]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracting_piece_id]",
        back_populates="attracting_piece",
    )
    attracteds: Mapped[Optional[typing.List["Attraction"]]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracted_piece_id]",
        back_populates="attracted_piece",
    )

    def __repr__(self) -> str:
        return f"Piece(id={self.id!r}, formation_id={self.formation_id!r})"

    @property
    def transient_id(self) -> str:
        return str(self.id)

    @property
    def parent(self) -> Artifact:
        return self.formation

    @property
    def children(self) -> typing.List[Artifact]:
        return []

    @property
    def references(self) -> typing.List[Artifact]:
        return self.type

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return self.attractings + self.attracteds

    @property
    def related_to(self) -> typing.List[Artifact]:
        return [self.parent] + self.children + self.references + self.referenced_by


class Attraction(Base):
    __tablename__ = "attraction"

    attracting_piece_id: Mapped[int] = mapped_column(
        ForeignKey("piece.id"), primary_key=True
    )
    attracting_piece: Mapped[Piece] = relationship(
        Piece, foreign_keys=[attracting_piece_id], back_populates="attractings"
    )
    attracting_piece_type_port_id = mapped_column(
        ForeignKey("port.id"), primary_key=True
    )
    attracting_piece_type_port: Mapped[Port] = relationship(
        Port,
        foreign_keys=[attracting_piece_type_port_id],
        back_populates="attractings",
    )
    attracted_piece_id: Mapped[int] = mapped_column(
        ForeignKey("piece.id"), primary_key=True
    )
    attracted_piece: Mapped[Piece] = relationship(
        Piece, foreign_keys=[attracted_piece_id], back_populates="attracteds"
    )
    attracted_piece_type_port_id = mapped_column(
        ForeignKey("port.id"), primary_key=True
    )
    attracted_piece_type_port: Mapped[Port] = relationship(
        Port,
        foreign_keys=[attracted_piece_type_port_id],
        back_populates="attracteds",
    )
    formation_id: Mapped[int] = mapped_column(
        ForeignKey("formation.id"), primary_key=True
    )
    formation: Mapped["Formation"] = relationship(
        "Formation", back_populates="attractions"
    )

    def __repr__(self) -> str:
        return f"Attraction(attracting_piece_id={self.attracting_piece_id!r}, attracted_piece_id={self.attracted_piece_id!r}, formation_id={self.formation_id!r})"

    @property
    def parent(self) -> Artifact:
        return self.formation

    @property
    def children(self) -> typing.List[Artifact]:
        return []

    @property
    def references(self) -> typing.List[Artifact]:
        return [
            self.attracting_piece,
            self.attracted_piece,
            self.attracting_piece_type_port,
            self.attracted_piece_type_port,
        ]

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return []

    @property
    def related_to(self) -> typing.List[Artifact]:
        return [self.parent] + self.children + self.references + self.referenced_by


class Formation(Base):
    __tablename__ = "formation"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    explanation: Mapped[Optional[str]] = mapped_column(Text())
    symbol: Mapped[Optional[str]] = mapped_column(String(SYMBOL_LENGTH_MAX))
    pieces: Mapped[Optional[typing.List[Piece]]] = relationship(
        back_populates="formation", cascade="all, delete-orphan"
    )
    attractions: Mapped[Optional[typing.List[Attraction]]] = relationship(
        back_populates="formation", cascade="all, delete-orphan"
    )
    choreography_id: Mapped[Optional[int]] = mapped_column(ForeignKey("script.id"))
    choreography: Mapped[Optional[Script]] = relationship(
        Script, foreign_keys=[choreography_id]
    )
    transformation_id: Mapped[Optional[int]] = mapped_column(ForeignKey("script.id"))
    transformation: Mapped[Optional[Script]] = relationship(
        Script, foreign_keys=[transformation_id]
    )
    kit_id: Mapped[int] = mapped_column(ForeignKey("kit.id"))
    kit: Mapped["Kit"] = relationship("Kit", back_populates="formations")

    def __repr__(self) -> str:
        return (
            f"Formation(id={self.id!r}, name = {self.name!r}, kit_id={self.kit_id!r})"
        )

    @property
    def parent(self) -> Artifact:
        return self.kit

    @property
    def children(self) -> typing.List[Artifact]:
        return self.pieces + self.attractions

    @property
    def references(self) -> typing.List[Artifact]:
        return []

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return ([self.choreography] if self.choreography else []) + (
            [self.transformation] if self.transformation else []
        )

    @property
    def related_to(self) -> typing.List[Artifact]:
        return [self.parent] + self.children + self.references + self.referenced_by


class Kit(Base):
    __tablename__ = "kit"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    explanation: Mapped[Optional[str]] = mapped_column(Text())
    symbol: Mapped[Optional[str]] = mapped_column(String(SYMBOL_LENGTH_MAX))
    url: Mapped[Optional[str]] = mapped_column(String(URL_LENGTH_MAX))
    scripts: Mapped[Optional[typing.List[Script]]] = relationship(
        back_populates="kit", cascade="all, delete-orphan"
    )
    types: Mapped[Optional[typing.List[Type]]] = relationship(
        back_populates="kit", cascade="all, delete-orphan"
    )
    formations: Mapped[Optional[typing.List[Formation]]] = relationship(
        back_populates="kit", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"Kit(id={self.id!r}, name={self.name!r})"

    @property
    def prototypes(self) -> typing.List[Prototype]:
        return [script for script in self.scripts if isinstance(script, Prototype)]

    @property
    def modifications(self) -> typing.List[Modification]:
        return [script for script in self.scripts if isinstance(script, Modification)]

    @property
    def choreographies(self) -> typing.List[Choreography]:
        return [script for script in self.scripts if isinstance(script, Choreography)]

    @property
    def transformations(self) -> typing.List[Transformation]:
        return [script for script in self.scripts if isinstance(script, Transformation)]

    @property
    def syntheses(self) -> typing.List[Synthesis]:
        return [script for script in self.scripts if isinstance(script, Synthesis)]

    @property
    def parent(self) -> Artifact:
        return None

    @property
    def children(self) -> typing.List[Artifact]:
        return self.scripts + self.types + self.formations

    @property
    def references(self) -> typing.List[Artifact]:
        return []

    @property
    def referenced_by(self) -> typing.List[Artifact]:
        return []

    @property
    def related_to(self) -> typing.List[Artifact]:
        return self.children + self.references + self.referenced_by


class DirectoryError(SemioException):
    def __init__(self, directory: String):
        self.directory = directory


class DirectoryDoesNotExist(DirectoryError):
    def __str__(self):
        return "Directory does not exist: " + self.directory


class DirectoryIsNotADirectory(DirectoryError):
    def __str__(self):
        return "Directory is not a directory: " + self.directory


def assertDirectory(directory: String) -> Path:
    directory = Path(directory)
    if not directory.exists():
        raise DirectoryDoesNotExist(directory)
    if not directory.is_dir():
        raise DirectoryIsNotADirectory(directory)
    return directory.resolve()


@lru_cache(maxsize=100)
def getLocalSession(directory: String) -> Session:
    directory = assertDirectory(directory)
    engine = create_engine("sqlite:///" + str(directory.joinpath(KIT_FILENAME)))
    Base.metadata.create_all(engine)
    # Create instance of session factory
    return sessionmaker(bind=engine)()


# Graphene


class ArtifactNode(graphene.Interface):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    parent = graphene.Field(lambda: ArtifactNode)
    children = NonNull(graphene.typing.List(NonNull(lambda: ArtifactNode)))
    references = NonNull(graphene.typing.List(NonNull(lambda: ArtifactNode)))
    referenced_by = NonNull(graphene.typing.List(NonNull(lambda: ArtifactNode)))
    related_to = NonNull(graphene.typing.List(NonNull(lambda: ArtifactNode)))

    @staticmethod
    def resolve_parent(artifact: "ArtifactNode", info):
        return artifact.parent

    @staticmethod
    def resolve_children(artifact: "ArtifactNode", info):
        return artifact.children

    @staticmethod
    def resolve_references(artifact: "ArtifactNode", info):
        return artifact.references

    @staticmethod
    def resolve_referenced_by(artifact: "ArtifactNode", info):
        return artifact.referenced_by

    @staticmethod
    def resolve_related_to(artifact: "ArtifactNode", info):
        return artifact.related_to


class ScriptNode(SQLAlchemyInterface):
    class Meta:
        model = Script
        # Breaks GraphiQL:
        # interfaces = (ArtifactNode,)
        exclude_fields = ("id", "kit_id")


class PrototypeNode(SQLAlchemyObjectType):
    class Meta:
        model = Prototype
        interfaces = (
            ArtifactNode,
            ScriptNode,
        )
        exclude_fields = ("id", "kit_id")


class ModificationNode(SQLAlchemyObjectType):
    class Meta:
        model = Modification
        interfaces = (
            ArtifactNode,
            ScriptNode,
        )
        exclude_fields = ("id", "kit_id")


class ChoreographyNode(SQLAlchemyObjectType):
    class Meta:
        model = Choreography
        interfaces = (
            ArtifactNode,
            ScriptNode,
        )
        exclude_fields = ("id", "kit_id")


class TransformationNode(SQLAlchemyObjectType):
    class Meta:
        model = Transformation
        interfaces = (
            ArtifactNode,
            ScriptNode,
        )
        exclude_fields = ("id", "kit_id")


class SynthesisNode(SQLAlchemyObjectType):
    class Meta:
        model = Synthesis
        interfaces = (
            ArtifactNode,
            ScriptNode,
        )
        exclude_fields = ("id", "kit_id")


class PropertyNode(SQLAlchemyObjectType):
    class Meta:
        model = Property
        exclude_fields = ("id", "synthesis_id", "type_id", "port_id")


class PortNode(SQLAlchemyObjectType):
    class Meta:
        model = Port
        exclude_fields = ("id", "type_id")


class TypeNode(SQLAlchemyObjectType):
    class Meta:
        model = Type
        interfaces = (ArtifactNode,)
        exclude_fields = (
            "id",
            "prototype_id",
            "modification_id",
            "kit_id",
        )


class PieceNode(SQLAlchemyObjectType):
    class Meta:
        model = Piece
        exclude_fields = ("id", "type_id", "formation_id")

    transient_id = graphene.String()

    @staticmethod
    def resolve_transient_id(piece: Piece, info):
        return piece.transient_id


class AttractionNode(SQLAlchemyObjectType):
    class Meta:
        model = Attraction
        exclude_fields = (
            "attracting_piece_id",
            "attracting_piece_type_port_id",
            "attracted_piece_id",
            "attracted_piece_type_port_id",
            "formation_id",
        )


class FormationNode(SQLAlchemyObjectType):
    class Meta:
        model = Formation
        interfaces = (ArtifactNode,)
        exclude_fields = (
            "id",
            "choreography_id",
            "transformation_id",
            "kit_id",
        )


class KitNode(SQLAlchemyObjectType):
    class Meta:
        model = Kit
        interfaces = (ArtifactNode,)
        exclude_fields = ("id",)

    prototypes = NonNull(graphene.typing.List(NonNull(PrototypeNode)))
    modifications = NonNull(graphene.typing.List(NonNull(ModificationNode)))
    choreographies = NonNull(graphene.typing.List(NonNull(ChoreographyNode)))
    transformations = NonNull(graphene.typing.List(NonNull(TransformationNode)))
    syntheses = NonNull(graphene.typing.List(NonNull(SynthesisNode)))

    @staticmethod
    def resolve_prototypes(kit: Kit, info):
        return kit.prototypes

    @staticmethod
    def resolve_modifications(kit: Kit, info):
        return kit.modifications

    @staticmethod
    def resolve_choreographies(kit: Kit, info):
        return kit.choreographies

    @staticmethod
    def resolve_transformations(kit: Kit, info):
        return kit.transformations

    @staticmethod
    def resolve_syntheses(kit: Kit, info):
        return kit.syntheses


class PrototypeInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    url = graphene.String()


class PrototypeIdInput(InputObjectType):
    name = NonNull(graphene.String)


class ModificationInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    url = graphene.String()


class ModificationIdInput(InputObjectType):
    name = NonNull(graphene.String)


class ChoreographyInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    url = graphene.String()


class ChoreographyIdInput(InputObjectType):
    name = NonNull(graphene.String)


class TransformationInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    url = graphene.String()


class TransformationIdInput(InputObjectType):
    name = NonNull(graphene.String)


class SynthesisInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    url = graphene.String()


class SynthesisIdInput(InputObjectType):
    name = NonNull(graphene.String)


class PropertyInput(InputObjectType):
    name = NonNull(graphene.String)
    datatype = NonNull(graphene.String)
    value = NonNull(graphene.String)
    synthesis = SynthesisIdInput()


class PortInput(InputObjectType):
    origin_x = NonNull(graphene.Decimal)
    origin_y = NonNull(graphene.Decimal)
    origin_z = NonNull(graphene.Decimal)
    x_axis_x = NonNull(graphene.Decimal)
    x_axis_y = NonNull(graphene.Decimal)
    x_axis_z = NonNull(graphene.Decimal)
    y_axis_x = NonNull(graphene.Decimal)
    y_axis_y = NonNull(graphene.Decimal)
    y_axis_z = NonNull(graphene.Decimal)
    z_axis_x = NonNull(graphene.Decimal)
    z_axis_y = NonNull(graphene.Decimal)
    z_axis_z = NonNull(graphene.Decimal)
    properties = graphene.typing.List(PropertyInput)


class PortIdInput(InputObjectType):
    properties = graphene.typing.List(PropertyInput)


class TypeInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    prototype = PrototypeIdInput()
    ports = graphene.typing.List(PortInput)
    properties = graphene.typing.List(PropertyInput)


class TypeIdInput(InputObjectType):
    name = NonNull(graphene.String)


class PieceInput(InputObjectType):
    transient_id = graphene.String()
    type = NonNull(TypeIdInput)


class PieceIdInput(InputObjectType):
    transient_id = NonNull(graphene.String)


class AttractionInput(InputObjectType):
    attracting_piece = NonNull(PieceIdInput)
    attracting_piece_type_port = PortIdInput
    attracted_piece = NonNull(PieceIdInput)
    attracted_piece_type_port = PortIdInput


class FormationInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    choreography = ChoreographyIdInput()
    transformation = TransformationIdInput()
    pieces = graphene.typing.List(PieceInput)
    attractions = graphene.typing.List(AttractionInput)


class KitInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    symbol = graphene.String()
    url = graphene.String()
    prototypes = graphene.typing.List(PrototypeInput)
    modifications = graphene.typing.List(ModificationInput)
    choreographies = graphene.typing.List(ChoreographyInput)
    transformations = graphene.typing.List(TransformationInput)
    syntheses = graphene.typing.List(SynthesisInput)
    types = graphene.typing.List(TypeInput)
    formations = graphene.typing.List(FormationInput)


class SpecificationError(SemioException):
    pass


class NotFound(SpecificationError):
    def __init__(self, id) -> None:
        self.id = id

    def __str__(self):
        return f"{self.id} not found."


class ArtifactNotFound(NotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Artifact({self.name}) not found."


class ScriptNotFound(NotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Script({self.name}) not found."


class PrototypeScriptNotFound(ScriptNotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Prototype({self.name}) not found."


class ModificationScriptNotFound(ScriptNotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Modification({self.name}) not found."


class ChoreographyScriptNotFound(ScriptNotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Choreography({self.name}) not found."


class TransformationScriptNotFound(ScriptNotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Transformation({self.name}) not found."


class SynthesisScriptNotFound(ScriptNotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Synthesis({self.name}) not found."


class PortNotFound(NotFound):
    def __init__(self, properties) -> None:
        super().__init__(properties)
        self.properties = properties

    def __str__(self):
        return f"Port({self.properties}) not found."


class TypeNotFound(NotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Type({self.name}) not found."


class FormationNotFound(NotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Formation({self.name}) not found."


class KitNotFound(NotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Kit({self.name}) not found."


class NoMainKit(KitNotFound):
    def __init__(self) -> None:
        super().__init__("main")

    def __str__(self):
        return f"Main kit not found."


class AlreadyExists(SemioException):
    def __init__(self, id, existing) -> None:
        self.id = id
        self.existing = existing

    def __str__(self):
        return f"{self.id} already exists: {str(self.existing)}"


class ArtifactAlreadyExists(AlreadyExists):
    def __init__(self, artifact) -> None:
        super().__init__(artifact.name, artifact)
        self.artifact = artifact

    def __str__(self):
        return f"Artifact ({self.artifact.name}) already exists: {str(self.artifact)}"


class ScriptAlreadyExists(AlreadyExists):
    def __init__(self, script) -> None:
        super().__init__(script.name, script)
        self.script = script

    def __str__(self):
        return f"Script ({self.script.name}) already exists: {str(self.script)}"


class PrototypeScriptAlreadyExists(ScriptAlreadyExists):
    def __init__(self, script) -> None:
        super().__init__(script)
        self.script = script

    def __str__(self):
        return f"Prototype ({self.script.name}) already exists: {str(self.script)}"


class ModificationScriptAlreadyExists(ScriptAlreadyExists):
    def __init__(self, script) -> None:
        super().__init__(script)
        self.script = script

    def __str__(self):
        return f"Modification ({self.script.name}) already exists: {str(self.script)}"


class ChoreographyScriptAlreadyExists(ScriptAlreadyExists):
    def __init__(self, script) -> None:
        super().__init__(script)
        self.script = script

    def __str__(self):
        return f"Choreography ({self.script.name}) already exists: {str(self.script)}"


class TransformationScriptAlreadyExists(ScriptAlreadyExists):
    def __init__(self, script) -> None:
        super().__init__(script)
        self.script = script

    def __str__(self):
        return f"Transformation ({self.script.name}) already exists: {str(self.script)}"


class SynthesisScriptAlreadyExists(ScriptAlreadyExists):
    def __init__(self, script) -> None:
        super().__init__(script)
        self.script = script

    def __str__(self):
        return f"Synthesis ({self.script.name}) already exists: {str(self.script)}"


class TypeAlreadyExists(AlreadyExists):
    def __init__(self, type) -> None:
        super().__init__(type.name, type)
        self.type = type

    def __str__(self):
        return f"Type ({self.type.name}) already exists: {str(self.type)}"


class FormationAlreadyExists(AlreadyExists):
    def __init__(self, formation) -> None:
        super().__init__(formation.name, formation)
        self.formation = formation

    def __str__(self):
        return (
            f"Formation ({self.formation.name}) already exists: {str(self.formation)}"
        )


class KitAlreadyExists(AlreadyExists):
    def __init__(self, kit) -> None:
        super().__init__(kit.name, kit)
        self.kit = kit

    def __str__(self):
        return f"Kit ({self.kit.name}) already exists: {str(self.kit)}"


def getMainKit(session: Session) -> Kit:
    kit = session.query(Kit).first()
    if not kit:
        raise NoMainKit()
    return kit


def getScriptByName(session: Session, kind: ScriptKind, name: String) -> Script:
    script = session.query(Script).filter_by(kind=kind, name=name).first()
    if not script:
        match kind:
            case ScriptKind.PROTOTYPE:
                raise PrototypeScriptNotFound(name)
            case ScriptKind.MODIFICATION:
                raise ModificationScriptNotFound(name)
            case ScriptKind.CHOREOGRAPHY:
                raise ChoreographyScriptNotFound(name)
            case ScriptKind.TRANSFORMATION:
                raise TransformationScriptNotFound(name)
            case ScriptKind.SYNTHESIS:
                raise SynthesisScriptNotFound(name)
    return script


def getPrototypeScriptByName(session: Session, name: String) -> Script:
    return getScriptByName(session, ScriptKind.PROTOTYPE, name)


def getModificationScriptByName(session: Session, name: String) -> Script:
    return getScriptByName(session, ScriptKind.MODIFICATION, name)


def getChoreographyScriptByName(session: Session, name: String) -> Script:
    return getScriptByName(session, ScriptKind.CHOREOGRAPHY, name)


def getTransformationScriptByName(session: Session, name: String) -> Script:
    return getScriptByName(session, ScriptKind.TRANSFORMATION, name)


def getSynthesisScriptByName(session: Session, name: String) -> Script:
    return getScriptByName(session, ScriptKind.SYNTHESIS, name)


def getTypeByName(session: Session, name: String) -> Type:
    type = session.query(Type).filter_by(name=name).first()
    if type is None:
        raise TypeNotFound(name)
    return type


# TODO: Fix this. Doesn't work. Need to implement proper comparison operators for properties.
def getPortByProperties(
    session: Session, properties: typing.List[PropertyInput]
) -> Port:
    port = session.query(Port).join(Port.properties)
    if len(properties) > 0:
        port = port.filter(
            Property.name.in_([property.name for property in properties])
        )
    port = port.first()
    if port is None:
        raise PortNotFound(properties)
    return port


def getFormationByName(session: Session, name: String) -> Formation:
    formation = session.query(Formation).filter_by(name=name).first()
    if formation is None:
        raise FormationNotFound(name)
    return formation


def addScriptInputToSession(
    session: Session,
    kit: Kit,
    kind: ScriptKind,
    scriptInput: PrototypeInput
    | ModificationInput
    | ChoreographyInput
    | TransformationInput
    | SynthesisInput,
    replace: bool = False,
) -> Script:
    script = session.query(Script).filter_by(kind=kind, name=scriptInput.name).first()
    if script:
        if replace:
            session.delete(script)
            script = None
        else:
            match kind:
                case ScriptKind.PROTOTYPE:
                    raise PrototypeScriptAlreadyExists(script)
                case ScriptKind.MODIFICATION:
                    raise ModificationScriptAlreadyExists(script)
                case ScriptKind.CHOREOGRAPHY:
                    raise ChoreographyScriptAlreadyExists(script)
                case ScriptKind.TRANSFORMATION:
                    raise TransformationScriptAlreadyExists(script)
                case ScriptKind.SYNTHESIS:
                    raise SynthesisScriptAlreadyExists(script)
    if not script:
        script = Script(name=scriptInput.name, kind=kind, kit_id=kit.id)
        session.add(script)
        session.flush()
    try:
        script.explanation = scriptInput.explanation
    except AttributeError:
        pass
    try:
        script.symbol = scriptInput.symbol
    except AttributeError:
        pass
    return script


def addPrototypeInputToSession(
    session: Session, kit: Kit, prototypeInput: PrototypeInput, replace: bool = False
) -> Script:
    return addScriptInputToSession(
        session, kit, ScriptKind.PROTOTYPE, prototypeInput, replace
    )


def addModificationInputToSession(
    session: Session,
    kit: Kit,
    modificationInput: ModificationInput,
    replace: bool = False,
) -> Script:
    return addScriptInputToSession(
        session, kit, ScriptKind.MODIFICATION, modificationInput, replace
    )


def addChoreographyInputToSession(
    session: Session,
    kit: Kit,
    choreographyInput: ChoreographyInput,
    replace: bool = False,
) -> Script:
    return addScriptInputToSession(
        session, kit, ScriptKind.CHOREOGRAPHY, choreographyInput, replace
    )


def addTransformationInputToSession(
    session: Session,
    kit: Kit,
    transformationInput: TransformationInput,
    replace: bool = False,
) -> Script:
    return addScriptInputToSession(
        session, kit, ScriptKind.TRANSFORMATION, transformationInput, replace
    )


def addSynthesisInputToSession(
    session: Session, kit: Kit, synthesisInput: SynthesisInput, replace: bool = False
) -> Script:
    return addScriptInputToSession(
        session, kit, ScriptKind.SYNTHESIS, synthesisInput, replace
    )


def addPropertyInputToSession(
    session: Session,
    owner: Type | Port,
    propertyInput: PropertyInput,
) -> Property:
    try:
        synthesisScriptId = getSynthesisScriptByName(
            session, propertyInput.synthesis.name
        ).id
    except (AttributeError, ScriptNotFound):
        synthesisScriptId = None
    if isinstance(owner, Type):
        typeId = owner.id
        portId = None
    elif isinstance(owner, Port):
        typeId = None
        portId = owner.id
    else:
        raise Exception("Unknown property owner")
    property = Property(
        name=propertyInput.name,
        datatype=propertyInput.datatype,
        value=propertyInput.value,
        synthesis_id=synthesisScriptId,
        type_id=typeId,
        port_id=portId,
    )
    session.add(property)
    session.flush()
    return property


def addPortInputToSession(session: Session, type: Type, portInput: PortInput) -> Port:
    port = Port(
        origin_x=portInput.origin_x,
        origin_y=portInput.origin_y,
        origin_z=portInput.origin_z,
        x_axis_x=portInput.x_axis_x,
        x_axis_y=portInput.x_axis_y,
        x_axis_z=portInput.x_axis_z,
        y_axis_x=portInput.y_axis_x,
        y_axis_y=portInput.y_axis_y,
        y_axis_z=portInput.y_axis_z,
        z_axis_x=portInput.z_axis_x,
        z_axis_y=portInput.z_axis_y,
        z_axis_z=portInput.z_axis_z,
        type_id=type.id,
    )
    session.add(port)
    session.flush()
    for propertyInput in portInput.properties or []:
        property = addPropertyInputToSession(session, port, propertyInput)
    return port


def addTypeInputToSession(
    session: Session, kit: Kit, typeInput: TypeInput, replace: bool = False
) -> Type:
    type = session.query(Type).filter_by(name=typeInput.name).first()
    if type:
        if replace:
            session.delete(type)
        else:
            raise TypeAlreadyExists(type)
    if not type:
        type = Type(name=typeInput.name, kit_id=kit.id)
        session.add(type)
        session.flush()
    try:
        type.explanation = typeInput.explanation
    except AttributeError:
        pass
    try:
        type.symbol = typeInput.symbol
    except AttributeError:
        pass
    try:
        type.prototype_id = getPrototypeScriptByName(
            session, typeInput.prototype.name
        ).id
    except AttributeError:
        pass
    for portInput in typeInput.ports or []:
        port = addPortInputToSession(session, type, portInput)
    for propertyInput in typeInput.properties or []:
        property = addPropertyInputToSession(session, type, propertyInput)
    return type


def addPieceInputToSession(
    session: Session, formation: Formation, pieceInput: PieceInput
) -> Piece:
    type = getTypeByName(session, pieceInput.type.name)
    piece = Piece(type_id=type.id, formation_id=formation.id)
    session.add(piece)
    session.flush()
    return piece


def addAttractionInputToSession(
    session: Session,
    formation: Formation,
    attractionInput: AttractionInput,
    transientIdToPiece: dict,
) -> Attraction:
    attractingPiece = transientIdToPiece[attractionInput.attracting_piece.transient_id]
    attractedPiece = transientIdToPiece[attractionInput.attracted_piece.transient_id]
    attractingPieceTypePort = getPortByProperties(
        session,
        attractionInput.attracting_piece_type_port.properties
        if attractionInput.attracting_piece_type_port
        else [],
    )
    attractedPieceTypePort = getPortByProperties(
        session,
        attractionInput.attracted_piece_type_port.properties
        if attractionInput.attracted_piece_type_port
        else [],
    )
    attraction = Attraction(
        attracting_piece_id=attractingPiece.id,
        attracting_piece_type_port_id=attractingPieceTypePort.id,
        attracted_piece_id=attractedPiece.id,
        attracted_piece_type_port_id=attractedPieceTypePort.id,
        formation_id=formation.id,
    )
    session.add(attraction)
    session.flush()
    return attraction


def addFormationInputToSession(
    session: Session, kit: Kit, formationInput: FormationInput, replace: bool = False
):
    formation = session.query(Formation).filter_by(name=formationInput.name).first()
    if formation:
        if replace:
            session.delete(formation)
            formation = None
        else:
            raise FormationAlreadyExists(formation)
    if not formation:
        formation = Formation(
            name=formationInput.name,
            kit_id=kit.id,
        )
        session.add(formation)
        session.flush()
    try:
        formation.explanation = formationInput.explanation
    except AttributeError:
        pass
    try:
        formation.symbol = formationInput.symbol
    except AttributeError:
        symbol = None
    try:
        formation.choreography_id = getChoreographyScriptByName(
            session, formationInput.choreography.name
        ).id
    except AttributeError:
        pass
    try:
        formation.transformation_id = getTransformationScriptByName(
            session, formationInput.transformation.name
        ).id
    except AttributeError:
        pass
    transientIdToPiece: Dict[str, Piece] = {}
    for pieceInput in formationInput.pieces or []:
        piece = addPieceInputToSession(session, formation, pieceInput)
        transientIdToPiece[pieceInput.transient_id] = piece
    for attractionInput in formationInput.attractions or []:
        attraction = addAttractionInputToSession(
            session, formation, attractionInput, transientIdToPiece
        )
    return formation


def addKitInputToSession(session: Session, kitInput: KitInput, replace: bool = False):
    try:
        kit = getMainKit(session)
    except NoMainKit:
        kit = Kit(
            name=kitInput.name,
        )
        session.add(kit)
        session.flush()
    try:
        kit.explanation = kitInput.explanation
    except AttributeError:
        pass
    try:
        kit.symbol = kitInput.symbol
    except AttributeError:
        pass
    for prototypeInput in kitInput.prototypes or []:
        prototype = addPrototypeInputToSession(session, kit, prototypeInput, replace)
    for modificationInput in kitInput.modifications or []:
        modification = addModificationInputToSession(
            session, kit, modificationInput, replace
        )
    for choreographyInput in kitInput.choreographies or []:
        choreography = addChoreographyInputToSession(
            session, kit, choreographyInput, replace
        )
    for transformationInput in kitInput.transformations or []:
        transformation = addTransformationInputToSession(
            session, kit, transformationInput, replace
        )
    for synthesisInput in kitInput.syntheses or []:
        synthesis = addSynthesisInputToSession(session, kit, synthesisInput, replace)
    for typeInput in kitInput.types or []:
        type = addTypeInputToSession(session, kit, typeInput, replace)
    for formationInput in kitInput.formations or []:
        formation = addFormationInputToSession(session, kit, formationInput, replace)
    return kit


class CreateLocalKitErrorCode(graphene.Enum):
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_ALREADY_CONTAINS_A_KIT = "directory_already_contains_a_kit"
    NO_PERMISSION_TO_CREATE_DIRECTORY = "no_permission_to_create_directory"
    NO_PERMISSION_TO_CREATE_KIT = "no_permission_to_create_kit"
    KIT_INPUT_IS_INVALID = "kit_input_is_invalid"


class CreateLocalKitErrorNode(ObjectType):
    code = NonNull(CreateLocalKitErrorCode)
    message = graphene.String()


disposed_engines = {}


class CreateLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)
        kitInput = NonNull(KitInput)

    kit = Field(KitNode)
    error = Field(CreateLocalKitErrorNode)

    def mutate(self, info, directory, kitInput):
        directory = Path(directory)
        if not directory.exists():
            try:
                directory.mkdir(parents=True)
            except PermissionError:
                return CreateLocalKitMutation(
                    error=CreateLocalKitErrorNode(
                        code=CreateLocalKitErrorCode.NO_PERMISSION_TO_CREATE_DIRECTORY
                    )
                )
            except OSError:
                return CreateLocalKitMutation(
                    error=CreateLocalKitErrorNode(
                        code=CreateLocalKitErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY
                    )
                )

        kitFile = directory.joinpath(KIT_FILENAME)
        if kitFile.exists():
            return CreateLocalKitMutation(
                error=CreateLocalKitErrorNode(
                    code=CreateLocalKitErrorCode.DIRECTORY_ALREADY_CONTAINS_A_KIT
                )
            )

        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't create a new kit in a directory where this process already deleted an engine. Restart the server and try again."
            )

        session = getLocalSession(directory)
        try:
            kit = addKitInputToSession(session, kitInput)
        except SpecificationError as e:
            session.rollback()
            return CreateLocalKitMutation(
                error=CreateLocalKitErrorNode(
                    code=CreateLocalKitErrorCode.KIT_INPUT_IS_INVALID, message=str(e)
                )
            )
        session.commit()
        return CreateLocalKitMutation(kit=kit, error=None)


class UpdateMode(graphene.Enum):
    REPLACE = "replace"
    APPEND = "append"


class UpdateLocalKitErrorCode(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_UPDATE_KIT = "no_permission_to_update_kit"
    ARTIFACT_ALREADY_EXISTS = "artifact_already_exists"
    KIT_INPUT_IS_INVALID = "kit_input_is_invalid"


class UpdateLocalKitErrorNode(ObjectType):
    code = NonNull(UpdateLocalKitErrorCode)
    message = graphene.String()


class UpdateLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)
        kitInput = NonNull(KitInput)
        mode = NonNull(UpdateMode, default_value=UpdateMode.REPLACE)

    kit = Field(KitNode)
    error = Field(UpdateLocalKitErrorNode)

    def mutate(self, info, directory, kitInput, mode):
        directory = Path(directory)
        if not directory.exists():
            return UpdateLocalKitMutation(
                error=UpdateLocalKitErrorNode(
                    code=UpdateLocalKitErrorCode.DIRECTORY_DOES_NOT_EXIST
                )
            )
        if not directory.is_dir():
            return UpdateLocalKitMutation(
                error=UpdateLocalKitErrorNode(
                    code=UpdateLocalKitErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY
                )
            )
        kitFile = directory.joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return UpdateLocalKitMutation(
                error=UpdateLocalKitErrorNode(
                    code=UpdateLocalKitErrorCode.DIRECTORY_HAS_NO_KIT
                )
            )
        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't update a kit in a directory where this process already deleted an engine. Restart the server and try again."
            )
        session = getLocalSession(directory)
        try:
            kit = addKitInputToSession(session, kitInput, mode == UpdateMode.REPLACE)
        except SpecificationError as e:
            session.rollback()
            return UpdateLocalKitMutation(
                error=UpdateLocalKitErrorNode(
                    code=UpdateLocalKitErrorCode.KIT_INPUT_IS_INVALID, message=str(e)
                )
            )
        except ArtifactAlreadyExists as e:
            session.rollback()
            return UpdateLocalKitMutation(
                error=UpdateLocalKitErrorNode(
                    code=UpdateLocalKitErrorCode.ARTIFACT_ALREADY_EXISTS,
                    message=str(e),
                )
            )
        session.commit()
        return UpdateLocalKitMutation(kit=kit, error=None)


class DeleteLocalKitError(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_DELETE_KIT = "no_permission_to_delete_kit"


class DeleteLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)

    error = DeleteLocalKitError()

    def mutate(self, info, directory):
        directory = Path(directory)
        if not directory.exists():
            return DeleteLocalKitError(
                error=DeleteLocalKitError.DIRECTORY_DOES_NOT_EXIST
            )
        kitFile = directory.joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return DeleteLocalKitError(error=DeleteLocalKitError.DIRECTORY_HAS_NO_KIT)
        kitFileFullPath = kitFile.resolve()
        disposed_engines[kitFileFullPath] = True
        try:
            remove(kitFileFullPath)
        except PermissionError:
            return DeleteLocalKitError(
                error=DeleteLocalKitError.NO_PERMISSION_TO_DELETE_KIT
            )
        return DeleteLocalKitError()


class ReadLocalKitError(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_READ_KIT = "no_permission_to_read_kit"


class ReadLocalKitResponse(ObjectType):
    kit = Field(KitNode)
    error = Field(ReadLocalKitError)


class Query(ObjectType):
    localScripts = graphene.typing.List(ScriptNode, directory=NonNull(graphene.String))
    localPrototypes = graphene.typing.List(
        PrototypeNode, directory=NonNull(graphene.String)
    )
    localModifications = graphene.typing.List(
        ModificationNode, directory=NonNull(graphene.String)
    )
    localChoreographies = graphene.typing.List(
        ChoreographyNode, directory=NonNull(graphene.String)
    )
    localTransformations = graphene.typing.List(
        TransformationNode, directory=NonNull(graphene.String)
    )
    localSyntheses = graphene.typing.List(
        SynthesisNode, directory=NonNull(graphene.String)
    )
    localTypes = graphene.typing.List(TypeNode, directory=NonNull(graphene.String))
    localFormations = graphene.typing.List(
        FormationNode, directory=NonNull(graphene.String)
    )
    localArtifacts = graphene.typing.List(
        ArtifactNode, directory=NonNull(graphene.String)
    )
    localKit = graphene.Field(ReadLocalKitResponse, directory=NonNull(graphene.String))

    def resolve_localScripts(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Script).all()

    def resolve_localPrototypes(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Prototype).all()

    def resolve_localModifications(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Modification).all()

    def resolve_localChoreographies(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Choreography).all()

    def resolve_localTransformations(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Transformation).all()

    def resolve_localSyntheses(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Synthesis).all()

    def resolve_localTypes(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Type).all()

    def resolve_localFormations(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        return session.query(Formation).all()

    def resolve_localArtifacts(self, info, directory: graphene.String):
        session = getLocalSession(directory)
        artifacts = []
        artifacts.extend(session.query(Prototype).all())
        artifacts.extend(session.query(Modification).all())
        artifacts.extend(session.query(Choreography).all())
        artifacts.extend(session.query(Transformation).all())
        artifacts.extend(session.query(Synthesis).all())
        artifacts.extend(session.query(Type).all())
        artifacts.extend(session.query(Formation).all())
        artifacts.extend(session.query(Kit).all())
        return artifacts

    def resolve_localKit(self, info, directory: graphene.String):
        directory = Path(directory)
        if not directory.exists():
            return ReadLocalKitResponse(
                kit=None,
                error=ReadLocalKitError(
                    code=ReadLocalKitError.DIRECTORY_DOES_NOT_EXIST
                ),
            )
        if not directory.is_dir():
            return ReadLocalKitResponse(
                kit=None,
                error=ReadLocalKitError(
                    code=ReadLocalKitError.DIRECTORY_IS_NOT_A_DIRECTORY
                ),
            )
        try:
            session = getLocalSession(directory)
        except PermissionError:
            return ReadLocalKitResponse(
                kit=None,
                error=ReadLocalKitError(
                    code=ReadLocalKitError.NO_PERMISSION_TO_READ_KIT
                ),
            )
        try:
            kit = getMainKit(session)
        except NoMainKit:
            return ReadLocalKitResponse(
                kit=None,
                error=ReadLocalKitError(code=ReadLocalKitError.DIRECTORY_HAS_NO_KIT),
            )
        return ReadLocalKitResponse(kit=kit, error=None)


class Mutation(ObjectType):
    createLocalKit = CreateLocalKitMutation.Field()
    updateLocalKit = UpdateLocalKitMutation.Field()
    deleteLocalKit = DeleteLocalKitMutation.Field()


schema = Schema(query=Query, mutation=Mutation)
with open("schema.graphql", "w") as f:
    f.write(str(schema))

app = Flask(__name__)
app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True,
    ),
)


def main():
    app.run()


if __name__ == "__main__":
    main()

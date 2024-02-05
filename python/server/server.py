#!/usr/bin/env python

# semio server.
# Copyright (C) 2024 Ueli Saluz

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.

# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

"""
semio server.
"""
# TODO: Refactoring Error handling by only exposing client__str__ and not __str__.
#       Write better error messages.
# TODO: Check if sqlmodel can replace SQLAlchemy:
#       ✅Constraints
#       ❔Polymorphism
#       ❔graphene_sqlalchemy
# TODO: Uniformize naming.
# TODO: Check graphene_pydantic until the pull request for pydantic>2 is merged.
# TODO: Add constraint to formations that at least 2 pieces and 1 attraction are required.

from collections import deque
from os import remove
from pathlib import Path
from functools import lru_cache
from typing import Optional, Dict, Protocol, List, Union
from datetime import datetime
from urllib.parse import urlparse
from networkx import DiGraph, Graph, bfs_tree, edge_bfs
from pint import UnitRegistry
from pydantic import BaseModel
from sqlalchemy import (
    String,
    Text,
    Float,
    DateTime,
    ForeignKey,
    create_engine,
    CheckConstraint,
    UniqueConstraint,
    and_,
    event,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
    sessionmaker,
    Session,
    validates,
)
from sqlalchemy.exc import IntegrityError
import graphene
from graphene import Schema, Mutation, ObjectType, InputObjectType, Field, NonNull
from graphene_sqlalchemy import (
    SQLAlchemyObjectType,
)
from graphene_pydantic import PydanticObjectType, PydanticInputObjectType
from flask import Flask
from graphql_server.flask import GraphQLView

NAME_LENGTH_MAX = 100
URL_LENGTH_MAX = 1000
KIT_FOLDERNAME = ".semio"
KIT_FILENAME = "kit.sqlite3"

ureg = UnitRegistry()


class SemioException(Exception):
    pass


class SpecificationError(SemioException):
    pass


class InvalidURL(ValueError, SpecificationError):
    def __init__(self, url: str) -> None:
        self.url = url

    def __str__(self) -> str:
        return f"{self.url} is not a valid URL."


class InvalidDatabase(SemioException):
    def __init__(self, message: str) -> None:
        self.message = message

    def __str__(self) -> str:
        return self.message + "\n The database is invalid. Please report this bug."


class InvalidBackend(SemioException):
    def __init__(self, message: str) -> None:
        self.message = message

    def __str__(self) -> str:
        return self.message + "\n The backend is invalid. Please report this bug."


class Artifact(Protocol):
    @property
    def parent(self) -> Union["Artifact", None]:
        return None

    @property
    def children(self) -> List["Artifact"]:
        return []

    @property
    def references(self) -> List["Artifact"]:
        return []

    @property
    def referenced_by(self) -> List["Artifact"]:
        return []

    @property
    def related_to(self) -> List["Artifact"]:
        return (
            ([self.parent] if self.parent else [])
            + self.children
            + self.references
            + self.referenced_by
        )

    def client__str__(self) -> str:
        ...


def list_client__str__(list) -> str:
    return f"[{', '.join([i.client__str__() for i in list])}]"


# TODO: Refactor Protocol to ABC and make it work with SQLAlchemy
class Document(Artifact):
    name: str
    explanation: str
    icon: str


class Base(DeclarativeBase):
    pass


class Tag(Base):
    __tablename__ = "tag"

    value: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX), primary_key=True)
    representation_id: Mapped[int] = mapped_column(
        ForeignKey("representation.id"), primary_key=True
    )
    representation: Mapped["Representation"] = relationship(
        "Representation", back_populates="_tags"
    )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Tag):
            raise NotImplementedError()
        return self.value == other.value

    def __hash__(self) -> int:
        return hash(self.value)

    def __repr__(self) -> str:
        return (
            f"Tag(value={self.value!r}, representation_id={self.representation_id!r})"
        )

    def __str__(self) -> str:
        return (
            f"Tag(value={self.value}, representation_id={str(self.representation_id)})"
        )

    def client__str__(self) -> str:
        return f"Tag(value={self.value})"

    @property
    def parent(self) -> Artifact:
        return self.representation

    @property
    def children(self) -> List[Artifact]:
        return []

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return []

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent]


class Representation(Base):
    __tablename__ = "representation"
    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[str] = mapped_column(String(URL_LENGTH_MAX))
    # level of detail
    lod: Mapped[Optional[str]] = mapped_column(String(NAME_LENGTH_MAX))
    type_id: Mapped[int] = mapped_column(ForeignKey("type.id"))
    type: Mapped["Type"] = relationship("Type", back_populates="representations")
    _tags: Mapped[List[Tag]] = relationship(
        Tag, back_populates="representation", cascade="all, delete-orphan"
    )

    __table_args__ = (UniqueConstraint("type_id", "url"),)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Representation):
            raise NotImplementedError()
        return self.url == other.url

    def __hash__(self) -> int:
        return hash(self.url)

    def __repr__(self) -> str:
        return f"Representation(id={self.id!r}, url={self.url!r}, lod={self.lod!r}, type_id={self.type_id!r}, tags={self.tags!r})"

    def __str__(self) -> str:
        return f"Representation(id={str(self.id)}, type_id={str(self.type_id)})"

    def client__str__(self) -> str:
        return f"Representation(url={self.url})"

    @validates("url")
    def validate_url(self, key: str, url: str):
        parsed = urlparse(url)
        if not parsed.path:
            raise InvalidURL(url)
        return url

    @property
    def tags(self) -> List[str]:
        return [tag.value for tag in self._tags or []]

    @tags.setter
    def tags(self, tags: List[str]):
        self._tags = [Tag(value=tag) for tag in tags]

    @property
    def parent(self) -> Artifact:
        return self.type

    @property
    def children(self) -> List[Artifact]:
        return self._tags  # type: ignore

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return []

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent] + self.children if self.children else []


class Specifier(Base):
    __tablename__ = "specifier"

    context: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX), primary_key=True)
    group: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    port_id: Mapped[int] = mapped_column(ForeignKey("port.id"), primary_key=True)
    port: Mapped["Port"] = relationship("Port", back_populates="specifiers")

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Specifier):
            raise NotImplementedError()
        return self.context == other.context and self.group == other.group

    def __hash__(self) -> int:
        return hash((self.context, self.group))

    def __repr__(self) -> str:
        return f"Specifier(context={self.context!r}, group={self.group!r}, port_id={self.port_id!r})"

    def __str__(self) -> str:
        return f"Specifier(context={self.context}, port_id={str(self.port_id)})"

    def client__str__(self) -> str:
        return f"Specifier(context={self.context})"

    @property
    def parent(self) -> Artifact:
        return self.port

    @property
    def children(self) -> List[Artifact]:
        return []

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return []

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent]


class Point(BaseModel):
    x: float
    y: float
    z: float

    def transform(self, transform: "Transform") -> "Point":
        return Point(
            x=transform.m00 * self.x
            + transform.m01 * self.y
            + transform.m02 * self.z
            + transform.m30,
            y=transform.m10 * self.x
            + transform.m11 * self.y
            + transform.m12 * self.z
            + transform.m31,
            z=transform.m20 * self.x
            + transform.m21 * self.y
            + transform.m22 * self.z
            + transform.m32,
        )


class Vector(BaseModel):
    x: float
    y: float
    z: float

    def transform(self, transform: "Transform") -> "Vector":
        return Vector(
            x=transform.m00 * self.x + transform.m01 * self.y + transform.m02 * self.z,
            y=transform.m10 * self.x + transform.m11 * self.y + transform.m12 * self.z,
            z=transform.m20 * self.x + transform.m21 * self.y + transform.m22 * self.z,
        )


class Plane(BaseModel):
    origin: Point
    x_axis: Vector
    y_axis: Vector

    @property
    def normal(self) -> Vector:
        return Vector(
            x=self.x_axis.y * self.y_axis.z - self.x_axis.z * self.y_axis.y,
            y=self.x_axis.z * self.y_axis.x - self.x_axis.x * self.y_axis.z,
            z=self.x_axis.x * self.y_axis.y - self.x_axis.y * self.y_axis.x,
        )

    def transform(self, transform: "Transform") -> "Plane":
        return Plane(
            origin=self.origin.transform(transform),
            x_axis=self.x_axis.transform(transform),
            y_axis=self.y_axis.transform(transform),
        )

    def toTransform(self) -> "Transform":
        return Transform.fromPlane(self)

    @staticmethod
    def XY() -> "Plane":
        return Plane(
            origin=Point(x=0, y=0, z=0),
            x_axis=Vector(x=1, y=0, z=0),
            y_axis=Vector(x=0, y=1, z=0),
        )


class Transform(BaseModel):
    m00: float
    m01: float
    m02: float
    m10: float
    m11: float
    m12: float
    m20: float
    m21: float
    m22: float
    m30: float
    m31: float
    m32: float

    def compose(self, other: "Transform") -> "Transform":
        return Transform(
            m00=self.m00 * other.m00 + self.m01 * other.m10 + self.m02 * other.m20,
            m01=self.m00 * other.m01 + self.m01 * other.m11 + self.m02 * other.m21,
            m02=self.m00 * other.m02 + self.m01 * other.m12 + self.m02 * other.m22,
            m10=self.m10 * other.m00 + self.m11 * other.m10 + self.m12 * other.m20,
            m11=self.m10 * other.m01 + self.m11 * other.m11 + self.m12 * other.m21,
            m12=self.m10 * other.m02 + self.m11 * other.m12 + self.m12 * other.m22,
            m20=self.m20 * other.m00 + self.m21 * other.m10 + self.m22 * other.m20,
            m21=self.m20 * other.m01 + self.m21 * other.m11 + self.m22 * other.m21,
            m22=self.m20 * other.m02 + self.m21 * other.m12 + self.m22 * other.m22,
            m30=self.m30 * other.m00
            + self.m31 * other.m10
            + self.m32 * other.m20
            + other.m30,
            m31=self.m30 * other.m01
            + self.m31 * other.m11
            + self.m32 * other.m21
            + other.m31,
            m32=self.m30 * other.m02
            + self.m31 * other.m12
            + self.m32 * other.m22
            + other.m32,
        )

    @staticmethod
    def identity() -> "Transform":
        return Transform(
            m00=1,
            m01=0,
            m02=0,
            m10=0,
            m11=1,
            m12=0,
            m20=0,
            m21=0,
            m22=1,
            m30=0,
            m31=0,
            m32=0,
        )

    @staticmethod
    def fromPlane(plane: Plane) -> "Transform":
        return Transform(
            m00=plane.x_axis.x,
            m01=plane.x_axis.y,
            m02=plane.x_axis.z,
            m10=plane.y_axis.x,
            m11=plane.y_axis.y,
            m12=plane.y_axis.z,
            m20=plane.normal.x,
            m21=plane.normal.y,
            m22=plane.normal.z,
            m30=plane.origin.x,
            m31=plane.origin.y,
            m32=plane.origin.z,
        )


class Port(Base):
    __tablename__ = "port"

    id: Mapped[int] = mapped_column(primary_key=True)
    origin_x: Mapped[float] = mapped_column(Float())
    origin_y: Mapped[float] = mapped_column(Float())
    origin_z: Mapped[float] = mapped_column(Float())
    x_axis_x: Mapped[float] = mapped_column(Float())
    x_axis_y: Mapped[float] = mapped_column(Float())
    x_axis_z: Mapped[float] = mapped_column(Float())
    y_axis_x: Mapped[float] = mapped_column(Float())
    y_axis_y: Mapped[float] = mapped_column(Float())
    y_axis_z: Mapped[float] = mapped_column(Float())
    type_id: Mapped[int] = mapped_column(ForeignKey("type.id"))
    type: Mapped["Type"] = relationship("Type", back_populates="ports")
    specifiers: Mapped[List[Specifier]] = relationship(
        Specifier, back_populates="port", cascade="all, delete-orphan"
    )
    attractings: Mapped[List["Attraction"]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracting_piece_type_port_id]",
        back_populates="attracting_piece_type_port",
    )
    attracteds: Mapped[List["Attraction"]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracted_piece_type_port_id]",
        back_populates="attracted_piece_type_port",
    )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Port):
            raise NotImplementedError()
        return set(self.qualities) == set(other.qualities)

    def __hash__(self) -> int:
        return hash(set(self.qualities))

    def __repr__(self) -> str:
        return f"Port(id={self.id!r}, origin_x={self.origin_x!r}, origin_y={self.origin_y!r}, origin_z={self.origin_z!r}, x_axis_x={self.x_axis_x!r}, x_axis_y={self.x_axis_y!r}, x_axis_z={self.x_axis_z!r}, y_axis_x={self.y_axis_x!r}, y_axis_y={self.y_axis_y!r}, y_axis_z={self.y_axis_z!r}, type_id={self.type_id!r}, specifiers={self.specifiers!r}, attractings={self.attractings!r}, attracteds={self.attracteds!r})"

    def __str__(self) -> str:
        return f"Port(id={str(self.id)}, type_id={str(self.type_id)})"

    def client__str__(self) -> str:
        return f"Port(specifiers={list_client__str__(self.specifiers)}])"

    @property
    def plane(self) -> Plane:
        return Plane(
            origin=Point(
                x=self.origin_x,
                y=self.origin_y,
                z=self.origin_z,
            ),
            x_axis=Vector(
                x=self.x_axis_x,
                y=self.x_axis_y,
                z=self.x_axis_z,
            ),
            y_axis=Vector(
                x=self.y_axis_x,
                y=self.y_axis_y,
                z=self.y_axis_z,
            ),
        )

    @plane.setter
    def plane(self, plane: Plane):
        self.origin_x = plane.origin.x
        self.origin_y = plane.origin.y
        self.origin_z = plane.origin.z
        self.x_axis_x = plane.x_axis.x
        self.x_axis_y = plane.x_axis.y
        self.x_axis_z = plane.x_axis.z
        self.y_axis_x = plane.y_axis.x
        self.y_axis_y = plane.y_axis.y
        self.y_axis_z = plane.y_axis.z

    @property
    def parent(self) -> Artifact:
        return self.type

    @property
    def children(self) -> List[Artifact]:
        return self.specifiers  # type: ignore

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return self.attractings + self.attracteds  # type: ignore

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent] + self.children + self.referenced_by


class Quality(Base):
    __tablename__ = "quality"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    value: Mapped[str] = mapped_column(Text())
    unit: Mapped[Optional[str]] = mapped_column(String(NAME_LENGTH_MAX))
    type_id: Mapped[Optional[int]] = mapped_column(ForeignKey("type.id"), nullable=True)
    type: Mapped["Type"] = relationship("Type", back_populates="qualities")
    formation_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("formation.id"), nullable=True
    )
    formation: Mapped["Formation"] = relationship(
        "Formation", back_populates="qualities"
    )

    __table_args__ = (
        CheckConstraint(
            "type_id IS NOT NULL AND formation_id IS NULL OR type_id IS NULL AND formation_id IS NOT NULL",
            name="type_or_formation_owner_constraint",
        ),
        UniqueConstraint("name", "type_id", "formation_id"),
    )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Quality):
            raise NotImplementedError()
        if self.name == other.name:
            if self.unit == other.unit:
                return self.value == other.value
            # TODO: use pint to compare values with different units
            raise NotImplementedError(
                "Comparing values with different units is not implemented yet."
            )

        return False

    def __hash__(self) -> int:
        # TODO: Implement unit normalization for consistent hashing
        return hash((self.name, self.value, self.unit))

    def __repr__(self) -> str:
        return f"Quality(id={self.id}, name={self.name!r}, value={self.value!r}, unit={self.unit!r}, type_id={self.type_id!r}, formation_id={self.formation_id!r})"

    def __str__(self) -> str:
        return f"Quality(id={self.id}, type_id={str(self.type_id)}, formation_id={str(self.formation_id)})"

    def client__str__(self) -> str:
        return f"Quality(name={self.name})"

    @property
    def parent(self) -> Artifact:
        return self.type if self.type_id else self.formation

    @property
    def children(self) -> List[Artifact]:
        return []

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return []

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent]


class Type(Base):
    __tablename__ = "type"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    explanation: Mapped[Optional[str]] = mapped_column(Text())
    icon: Mapped[Optional[str]] = mapped_column(Text())
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.utcnow, nullable=False
    )
    modified_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow
    )
    kit_id: Mapped[int] = mapped_column(ForeignKey("kit.id"))
    kit: Mapped["Kit"] = relationship("Kit", back_populates="types")
    representations: Mapped[List[Representation]] = relationship(
        Representation, back_populates="type", cascade="all, delete-orphan"
    )
    ports: Mapped[List[Port]] = relationship(
        "Port", back_populates="type", cascade="all, delete-orphan"
    )
    qualities: Mapped[List[Quality]] = relationship(
        Quality, back_populates="type", cascade="all, delete-orphan"
    )
    pieces: Mapped[List["Piece"]] = relationship("Piece", back_populates="type")

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Type):
            raise NotImplementedError()
        return self.name == other.name and set(self.qualities) == set(other.qualities)

    def __hash__(self) -> int:
        return hash((self.name, set(self.qualities)))

    def __repr__(self) -> str:
        return f"Type(id={self.id!r}, name={self.name!r}, explanation={self.explanation!r}, icon={self.icon!r}, kit_id={self.kit_id!r}, representations={self.representations!r}, ports={self.ports!r}, qualities={self.qualities!r}, pieces={self.pieces!r})"

    def __str__(self) -> str:
        return f"Type(id={str(self.id)}, kit_id={str(self.kit_id)})"

    def client__str__(self) -> str:
        return (
            f"Type(name={self.name}, qualities={list_client__str__(self.qualities)}])"
        )

    @property
    def parent(self) -> Artifact:
        return self.kit

    @property
    def children(self) -> List[Artifact]:
        return self.representations + self.ports + self.qualities  # type: ignore

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return [self.pieces]  # type: ignore

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent] + self.children + self.referenced_by


@event.listens_for(Representation, "after_update")
def receive_after_update(mapper, connection, target):
    target.type.modified_at = datetime.utcnow()


@event.listens_for(Port, "after_update")
def receive_after_update(mapper, connection, target):
    target.type.modified_at = datetime.utcnow()


class Piece(Base):
    __tablename__ = "piece"

    id: Mapped[int] = mapped_column(primary_key=True)
    local_id: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    type_id: Mapped[int] = mapped_column(ForeignKey("type.id"))
    type: Mapped["Type"] = relationship("Type", back_populates="pieces")
    formation_id: Mapped[int] = mapped_column(ForeignKey("formation.id"))
    formation: Mapped["Formation"] = relationship("Formation", back_populates="pieces")
    attractings: Mapped[List["Attraction"]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracting_piece_id]",
        back_populates="attracting_piece",
    )
    attracteds: Mapped[List["Attraction"]] = relationship(
        "Attraction",
        foreign_keys="[Attraction.attracted_piece_id]",
        back_populates="attracted_piece",
    )

    __table_args__ = (UniqueConstraint("local_id", "formation_id"),)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Piece):
            raise NotImplementedError()
        return self.local_id == other.local_id

    def __hash__(self) -> int:
        return hash(self.local_id)

    def __repr__(self) -> str:
        return f"Piece(id={self.id!r}, local_id={self.local_id!r}, type_id={self.type_id!r}, formation_id={self.formation_id!r}, attractings={self.attractings!r}, attracteds={self.attracteds!r})"

    def __str__(self) -> str:
        return f"Piece(id={str(self.id)}, local_id={str(self.local_id)}, type_id={str(self.type_id)}, formation_id={str(self.formation_id)})"

    def client__str__(self) -> str:
        return f"Piece(id={self.local_id})"

    @property
    def parent(self) -> Artifact:
        return self.formation

    @property
    def children(self) -> List[Artifact]:
        return []

    @property
    def references(self) -> List[Artifact]:
        return self.type  # type: ignore

    @property
    def referenced_by(self) -> List[Artifact]:
        return self.attractings + self.attracteds  # type: ignore

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent] + self.references + self.referenced_by


class TypePieceSide(BaseModel):
    class Config:
        arbitrary_types_allowed = True

    port: Port


class PieceSide(BaseModel):
    class Config:
        arbitrary_types_allowed = True

    id: str
    type: TypePieceSide


class Side(BaseModel):
    class Config:
        arbitrary_types_allowed = True

    piece: PieceSide


class Attraction(Base):
    __tablename__ = "attraction"

    attracting_piece_id: Mapped[int] = mapped_column(
        ForeignKey("piece.id"), primary_key=True
    )
    attracting_piece: Mapped[Piece] = relationship(
        Piece, foreign_keys=[attracting_piece_id], back_populates="attractings"
    )
    attracting_piece_type_port_id = mapped_column(ForeignKey("port.id"))
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
    attracted_piece_type_port_id = mapped_column(ForeignKey("port.id"))
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

    __table_args__ = (
        CheckConstraint(
            "attracting_piece_id != attracted_piece_id",
            name="attracting_and_attracted_piece_not_equal_constraint",
        ),
    )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Attraction):
            raise NotImplementedError()
        return (
            self.attracting_piece == other.attracting_piece
            and self.attracted_piece == other.attracted_piece
        )

    def __hash__(self) -> int:
        return hash((self.attracting_piece, self.attracted_piece))

    def __repr__(self) -> str:
        return f"Attraction(attracting_piece_id={self.attracting_piece_id!r}, attracting_piece_type_port_id={self.attracting_piece_type_port_id!r}, attracted_piece_id={self.attracted_piece_id!r}, attracted_piece_type_port_id={self.attracted_piece_type_port_id!r}, formation_id={self.formation_id!r})"

    def __str__(self) -> str:
        return f"Attraction(attracting_piece_id={str(self.attracting_piece_id)}, attracted_piece_id={str(self.attracted_piece_id)}, formation_id={str(self.formation_id)})"

    def client__str__(self) -> str:
        return f"Attraction(attracting_piece_id={self.attracting.piece.id}, attracted_piece_id={self.attracted.piece.id})"

    @property
    def attracting(self) -> Side:
        return Side(
            piece=PieceSide(
                id=self.attracting_piece.local_id,
                type=TypePieceSide(
                    port=self.attracting_piece_type_port,
                ),
            )
        )

    @property
    def attracted(self) -> Side:
        return Side(
            piece=PieceSide(
                id=self.attracted_piece.local_id,
                type=TypePieceSide(
                    port=self.attracted_piece_type_port,
                ),
            )
        )

    @property
    def parent(self) -> Artifact:
        return self.formation

    @property
    def children(self) -> List[Artifact]:
        return []

    @property
    def references(self) -> List[Artifact]:
        return [
            self.attracting_piece,
            self.attracted_piece,
            self.attracting_piece_type_port,
            self.attracted_piece_type_port,
        ]

    @property
    def referenced_by(self) -> List[Artifact]:
        return []

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent] + self.references


# TODO: Add complex validation before insert with networkx such as:
#       - only one root
#       - one connected component.
class Formation(Base):
    __tablename__ = "formation"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    explanation: Mapped[Optional[str]] = mapped_column(Text())
    icon: Mapped[Optional[str]] = mapped_column(Text())
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.utcnow, nullable=False
    )
    modified_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow
    )
    kit_id: Mapped[int] = mapped_column(ForeignKey("kit.id"))
    kit: Mapped["Kit"] = relationship("Kit", back_populates="formations")
    pieces: Mapped[List[Piece]] = relationship(
        back_populates="formation", cascade="all, delete-orphan"
    )
    attractions: Mapped[List[Attraction]] = relationship(
        back_populates="formation", cascade="all, delete-orphan"
    )
    qualities: Mapped[List[Quality]] = relationship(
        Quality, back_populates="formation", cascade="all, delete-orphan"
    )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Formation):
            raise NotImplementedError()
        return self.name == other.name and set(self.qualities) == set(other.qualities)

    def __hash__(self) -> int:
        return hash((self.name, set(self.qualities)))

    def __repr__(self) -> str:
        return f"Formation(id={self.id!r}, name={self.name!r}, explanation={self.explanation!r}, icon={self.icon!r}, kit_id={self.kit_id!r}, pieces={self.pieces!r}, attractions={self.attractions!r}, qualities={self.qualities!r})"

    def __str__(self) -> str:
        return f"Formation(id={str(self.id)}, kit_id={str(self.kit_id)})"

    def client__str__(self) -> str:
        return f"Formation(name={self.name}, qualities={list_client__str__(self.qualities)}])"

    @property
    def parent(self) -> Artifact:
        return self.kit

    @property
    def children(self) -> List[Artifact]:
        return self.pieces + self.attractions  # type: ignore

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return []

    @property
    def related_to(self) -> List[Artifact]:
        return [self.parent] + self.children


@event.listens_for(Piece, "after_update")
def receive_after_update(mapper, connection, target):
    target.formation.modified_at = datetime.utcnow()


@event.listens_for(Attraction, "after_update")
def receive_after_update(mapper, connection, target):
    target.formation.modified_at = datetime.utcnow()


# Both Type and Formation can own qualities
@event.listens_for(Quality, "after_update")
def receive_after_update(mapper, connection, target):
    if target.type_id:
        target.type.modified_at = datetime.utcnow()
    else:
        target.formation.modified_at = datetime.utcnow()


class Hierarchy(BaseModel):
    class Config:
        arbitrary_types_allowed = True

    piece: Piece
    transform: Transform
    children: Optional[List["Hierarchy"]]


class Object(BaseModel):
    class Config:
        arbitrary_types_allowed = True

    piece: Piece
    plane: Plane
    parent: Optional["Object"]


class Scene(BaseModel):
    objects: List[Object]


class Kit(Base):
    __tablename__ = "kit"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(NAME_LENGTH_MAX))
    explanation: Mapped[Optional[str]] = mapped_column(Text())
    icon: Mapped[Optional[str]] = mapped_column(Text())
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.utcnow, nullable=False
    )
    modified_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow
    )
    url: Mapped[Optional[str]] = mapped_column(String(URL_LENGTH_MAX))
    types: Mapped[List[Type]] = relationship(
        back_populates="kit", cascade="all, delete-orphan"
    )
    formations: Mapped[List[Formation]] = relationship(
        back_populates="kit", cascade="all, delete-orphan"
    )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Kit):
            raise NotImplementedError()
        return self.name == other.name

    def __hash__(self) -> int:
        return hash(self.name)

    def __repr__(self) -> str:
        return f"Kit(id={self.id!r}, name={self.name!r}), explanation={self.explanation!r}, icon={self.icon!r}, url={self.url!r}, types={self.types!r}, formations={self.formations!r})"

    def __str__(self) -> str:
        return f"Kit(id={str(self.id)})"

    def client__str__(self) -> str:
        return f"Kit(name={self.name})"

    @property
    def parent(self) -> None:
        return None

    @property
    def children(self) -> List[Artifact]:
        return self.types + self.formations  # type: ignore

    @property
    def references(self) -> List[Artifact]:
        return []

    @property
    def referenced_by(self) -> List[Artifact]:
        return []

    @property
    def related_to(self) -> List[Artifact]:
        return self.children


class DirectoryError(SemioException):
    def __init__(self, directory: str):
        self.directory = directory


class DirectoryDoesNotExist(DirectoryError):
    def __str__(self) -> str:
        return "Directory does not exist: " + self.directory


class DirectoryIsNotADirectory(DirectoryError):
    def __str__(self) -> str:
        return "Directory is not a directory: " + self.directory


def assertDirectory(directory: Union[Path, str]) -> Path:
    if isinstance(directory, str):
        directory = Path(directory)
    if not directory.exists():
        raise DirectoryDoesNotExist(directory)  # type: ignore
    if not directory.is_dir():
        raise DirectoryIsNotADirectory(directory)  # type: ignore
    return directory.resolve()


@lru_cache(maxsize=100)
def getLocalSession(directory: str) -> Session:
    directory_path = assertDirectory(directory)
    engine = create_engine(
        "sqlite:///"
        + str(directory_path.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)),
        # echo=True,
    )
    Base.metadata.create_all(engine)
    # Create instance of session factory
    return sessionmaker(bind=engine)()


class ArtifactNode(graphene.Interface):
    class Meta:
        name = "Artifact"

    name = NonNull(graphene.String)
    explanation = graphene.String()
    icon = graphene.String()
    parent = graphene.Field(lambda: ArtifactNode)
    children = NonNull(graphene.List(NonNull(lambda: ArtifactNode)))
    references = NonNull(graphene.List(NonNull(lambda: ArtifactNode)))
    referenced_by = NonNull(graphene.List(NonNull(lambda: ArtifactNode)))
    related_to = NonNull(graphene.List(NonNull(lambda: ArtifactNode)))

    def resolve_parent(artifact: "ArtifactNode", info):
        return artifact.parent

    def resolve_children(artifact: "ArtifactNode", info):
        return artifact.children

    def resolve_references(artifact: "ArtifactNode", info):
        return artifact.references

    def resolve_referenced_by(artifact: "ArtifactNode", info):
        return artifact.referenced_by

    def resolve_related_to(artifact: "ArtifactNode", info):
        return artifact.related_to


class RepresentationNode(SQLAlchemyObjectType):
    class Meta:
        model = Representation
        name = "Representation"
        exclude_fields = (
            "id",
            "_tags",
            "type_id",
        )

    tags = NonNull(graphene.List(NonNull(graphene.String)))

    def resolve_tags(representation: Representation, info):
        return representation.tags


class PointNode(PydanticObjectType):
    class Meta:
        model = Point
        name = "Point"


class VectorNode(PydanticObjectType):
    class Meta:
        model = Vector
        name = "Vector"


class SpecifierNode(SQLAlchemyObjectType):
    class Meta:
        model = Specifier
        name = "Specifier"
        exclude_fields = ("port_id",)


class PlaneNode(PydanticObjectType):
    class Meta:
        model = Plane
        name = "Plane"


class PortNode(SQLAlchemyObjectType):
    class Meta:
        model = Port
        name = "Port"
        exclude_fields = (
            "id",
            "origin_x",
            "origin_y",
            "origin_z",
            "x_axis_x",
            "x_axis_y",
            "x_axis_z",
            "y_axis_x",
            "y_axis_y",
            "y_axis_z",
            "type_id",
        )

    plane = graphene.Field(PlaneNode)

    def resolve_plane(port: Port, info):
        return port.plane


class QualityNode(SQLAlchemyObjectType):
    class Meta:
        model = Quality
        name = "Quality"
        exclude_fields = ("id", "type_id", "formation_id")


class TypeNode(SQLAlchemyObjectType):
    class Meta:
        model = Type
        name = "Type"
        interfaces = (ArtifactNode,)
        exclude_fields = (
            "id",
            "kit_id",
        )


class PieceNode(SQLAlchemyObjectType):
    class Meta:
        model = Piece
        name = "Piece"
        exclude_fields = ("id", "local_id", "type_id", "formation_id")

    id = graphene.Field(NonNull(graphene.String))

    def resolve_id(piece: Piece, info):
        return piece.local_id


class TypePieceSideNode(PydanticObjectType):
    class Meta:
        model = TypePieceSide
        name = "TypePieceSide"
        exclude_fields = ("port",)

    port = graphene.Field(PortNode)

    def resolve_port(root, info):
        return root.port


class PieceSideNode(PydanticObjectType):
    class Meta:
        name = "PieceSide"
        model = PieceSide


class SideNode(PydanticObjectType):
    class Meta:
        name = "Side"
        model = Side


class AttractionNode(SQLAlchemyObjectType):
    class Meta:
        model = Attraction
        name = "Attraction"
        exclude_fields = (
            "attracting_piece_id",
            "attracting_piece",
            "attracting_piece_type_port_id",
            "attracting_piece_type_port",
            "attracted_piece_id",
            "attracted_piece",
            "attracted_piece_type_port_id",
            "attracted_piece_type_port",
            "formation_id",
        )

    attracting = graphene.Field(NonNull(SideNode))
    attracted = graphene.Field(NonNull(SideNode))

    def resolve_attracting(attraction: Attraction, info):
        return attraction.attracting

    def resolve_attracted(attraction: Attraction, info):
        return attraction.attracted


class FormationNode(SQLAlchemyObjectType):
    class Meta:
        model = Formation
        name = "Formation"
        interfaces = (ArtifactNode,)
        exclude_fields = (
            "id",
            "kit_id",
        )


class ObjectNode(PydanticObjectType):
    class Meta:
        model = Object
        name = "Object"
        exclude_fields = ("piece", "plane", "parent")

    piece = graphene.Field(PieceNode)
    plane = graphene.Field(PlaneNode)
    parent = graphene.Field(lambda: ObjectNode)

    def resolve_piece(root, info):
        return root.piece

    def resolve_plane(root, info):
        return root.plane

    def resolve_parent(root, info):
        return root.parent


class SceneNode(PydanticObjectType):
    class Meta:
        model = Scene
        name = "Scene"


class KitNode(SQLAlchemyObjectType):
    class Meta:
        model = Kit
        name = "Kit"
        interfaces = (ArtifactNode,)
        exclude_fields = ("id",)


class RepresentationInput(InputObjectType):
    url = NonNull(graphene.String)
    lod = graphene.String()
    tags = graphene.List(NonNull(graphene.String))


class SpecifierInput(InputObjectType):
    context = NonNull(graphene.String)
    group = NonNull(graphene.String)


class PointInput(PydanticInputObjectType):
    class Meta:
        model = Point


class VectorInput(PydanticInputObjectType):
    class Meta:
        model = Vector


class PlaneInput(PydanticInputObjectType):
    class Meta:
        model = Plane


class PortInput(InputObjectType):
    plane = NonNull(PlaneInput)
    specifiers = graphene.List(NonNull(SpecifierInput))


class PortIdInput(InputObjectType):
    specifiers = graphene.List(NonNull(SpecifierInput))


class QualityInput(InputObjectType):
    name = NonNull(graphene.String)
    value = NonNull(graphene.String)
    unit = graphene.String()


class TypeInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    icon = graphene.String()
    representations = NonNull(graphene.List(NonNull(RepresentationInput)))
    ports = NonNull(graphene.List(NonNull(PortInput)))
    qualities = graphene.List(NonNull(QualityInput))


class TypeIdInput(InputObjectType):
    name = NonNull(graphene.String)
    qualities = graphene.List(NonNull(QualityInput))


class PieceInput(InputObjectType):
    id = NonNull(graphene.String)
    type = NonNull(TypeIdInput)


class TypePieceSideInput(InputObjectType):
    port = NonNull(PortIdInput)


class PieceSideInput(InputObjectType):
    id = NonNull(graphene.String)
    type = NonNull(TypePieceSideInput)


class SideInput(InputObjectType):
    piece = NonNull(PieceSideInput)


class AttractionInput(InputObjectType):
    attracting = NonNull(SideInput)
    attracted = NonNull(SideInput)


class FormationInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    icon = graphene.String()
    pieces = NonNull(graphene.List(NonNull(PieceInput)))
    attractions = NonNull(graphene.List(NonNull(AttractionInput)))
    qualities = graphene.List(NonNull(QualityInput))


class FormationIdInput(InputObjectType):
    name = NonNull(graphene.String)
    qualities = graphene.List(NonNull(QualityInput))


class KitInput(InputObjectType):
    name = NonNull(graphene.String)
    explanation = graphene.String()
    icon = graphene.String()
    url = graphene.String()
    types = graphene.List(NonNull(TypeInput))
    formations = graphene.List(NonNull(FormationInput))


class KitMetadataInput(InputObjectType):
    name = graphene.String()
    explanation = graphene.String()
    icon = graphene.String()
    url = graphene.String()


class NotFound(SpecificationError):
    def __init__(self, id) -> None:
        self.id = id

    def __str__(self):
        return f"{self.id} not found."


class RepresentationNotFound(NotFound):
    def __init__(self, type, url) -> None:
        super().__init__(url)
        self.type = type
        self.url = url

    def __str__(self):
        return f"Representation({self.url}) not found for type: {str(self.type)}"


class PortNotFound(NotFound):
    def __init__(self, qualities) -> None:
        super().__init__(qualities)
        self.qualities = qualities

    def __str__(self):
        return f"Port({self.qualities}) not found."


class TypeNotFound(NotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Type({self.name}) not found."


class QualitiesDontMatchType(TypeNotFound):
    def __init__(
        self, name, qualityInputs: List[QualityInput], types: List[Type]
    ) -> None:
        super().__init__(name)
        self.qualityInputs = qualityInputs
        self.types = types

    def __str__(self):
        return f"Qualities ({self.qualityInputs}) don't match any type with name {self.name}: {str(self.types)}"


class TooLittleQualitiesToMatchExcactlyType(QualitiesDontMatchType):
    def __str__(self):
        return f"Too little qualities ({self.qualityInputs}) to match exactly one type name {self.name}: {str(self.types)}"


class PieceNotFound(NotFound):
    def __init__(self, local_id) -> None:
        super().__init__(local_id)
        self.local_id = local_id

    def __str__(self):
        return f"Piece({self.local_id}) not found. Please check that the local id is correct and that the piece is part of the formation."


class FormationNotFound(NotFound):
    def __init__(self, name) -> None:
        super().__init__(name)
        self.name = name

    def __str__(self):
        return f"Formation({self.name}) not found."


class QualitiesDontMatchFormation(FormationNotFound):
    def __init__(
        self, name, qualityInputs: List[QualityInput], formations: List[Formation]
    ) -> None:
        super().__init__(name)
        self.qualityInputs = qualityInputs
        self.formations = formations

    def __str__(self):
        return f"Qualities ({self.qualityInputs}) don't match any formation with name {self.name}: {str(self.formations)}"


class TooLittleQualitiesToMatchExcactlyFormation(QualitiesDontMatchFormation):
    def __str__(self):
        return f"Too little qualities ({self.qualityInputs}) to match exactly one formation name {self.name}: {str(self.formations)}"


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


class AlreadyExists(SpecificationError):
    def __init__(self, id, existing) -> None:
        self.id = id
        self.existing = existing

    def __str__(self):
        return f"{self.id!r} already exists: {str(self.existing)}"


class RepresentationAlreadyExists(AlreadyExists):
    def __init__(self, representation) -> None:
        super().__init__(representation.url, representation)
        self.representation = representation

    def __str__(self):
        return f"Representation with url: {self.representation.url!r} already exists: {str(self.representation)}"


class PortAlreadyExists(AlreadyExists):
    def __init__(self, port) -> None:
        super().__init__(port.specifiers, port)
        self.port = port

    def __str__(self):
        return f"Port with specifiers: {self.port.specifiers!r} already exists: {str(self.port)}"


class DocumentAlreadyExists(AlreadyExists):
    def __init__(self, document) -> None:
        super().__init__(document.name, document)
        self.document = document

    def __str__(self):
        return f"Document ({self.document.name}) already exists: {str(self.document)}"


class TypeAlreadyExists(DocumentAlreadyExists):
    def __init__(self, type) -> None:
        super().__init__(type)
        self.type = type

    def __str__(self):
        return f"Type ({self.type.name}) already exists: {str(self.type)}"


class FormationAlreadyExists(DocumentAlreadyExists):
    def __init__(self, formation) -> None:
        super().__init__(formation)
        self.formation = formation

    def __str__(self):
        return (
            f"Formation ({self.formation.name}) already exists: {str(self.formation)}"
        )


class KitAlreadyExists(DocumentAlreadyExists):
    def __init__(self, kit) -> None:
        super().__init__(kit)
        self.kit = kit

    def __str__(self):
        return f"Kit ({self.kit.name}) already exists: {str(self.kit)}"


def getMainKit(session: Session) -> Kit:
    kit = session.query(Kit).first()
    if not kit:
        raise NoMainKit()
    return kit


def qualityInputToTransientQualityForEquality(qualityInput: QualityInput) -> Quality:
    return Quality(
        name=qualityInput.name,
        value=qualityInput.value,
        unit=qualityInput.unit,
    )


def specifierInputToTransientSpecifierForEquality(
    specifierInput: SpecifierInput,
) -> Specifier:
    return Specifier(
        context=specifierInput.context,
        group=specifierInput.group,
    )


def getRepresentationByUrl(session: Session, type: Type, url: str) -> Representation:
    representationsWithSameUrl = session.query(Representation).filter_by(url=url)
    match representationsWithSameUrl.count():
        case 0:
            raise RepresentationNotFound(type, url)
        case 1:
            return representationsWithSameUrl.first()
        case _:
            raise InvalidDatabase(
                f"Found multiple representations {representationsWithSameUrl.all()!r} for {str(type)} and url: {url}"
            )


def getTypeByNameAndQualities(
    session: Session, name: String, qualityInputs: List[QualityInput]
) -> Type:
    typesWithSameName = session.query(Type).filter_by(name=name)
    if typesWithSameName.count() < 1:
        raise TypeNotFound(name)
    typesWithSameName = typesWithSameName.all()
    qualities = (
        [
            qualityInputToTransientQualityForEquality(qualityInput)
            for qualityInput in qualityInputs
        ]
        if qualityInputs
        else []
    )
    typesWithSameQualities = [
        type
        for type in typesWithSameName
        if set(qualities).issubset(set(type.qualities))
    ]
    if len(typesWithSameQualities) < 1:
        raise QualitiesDontMatchType(name, qualityInputs, typesWithSameName)
    elif len(typesWithSameQualities) > 1:
        typesWithExactSameQualities = [
            type
            for type in typesWithSameQualities
            if set(type.qualities) == set(qualities)
        ]
        if len(typesWithExactSameQualities) < 1:
            raise TooLittleQualitiesToMatchExcactlyType(
                name, qualityInputs, typesWithSameQualities
            )
        elif len(typesWithExactSameQualities) > 1:
            raise InvalidDatabase(
                f"Found multiple types {typesWithExactSameQualities!r} for {name} and same qualities: {qualities}"
            )
        return typesWithExactSameQualities[0]
    return typesWithSameQualities[0]


def getFormationByNameAndQualities(
    session: Session, name: String, qualityInputs: List[QualityInput]
) -> Formation:
    formationsWithSameName = session.query(Formation).filter_by(name=name)
    if formationsWithSameName.count() < 1:
        raise FormationNotFound(name)
    formationsWithSameName = formationsWithSameName.all()
    qualities = (
        [
            qualityInputToTransientQualityForEquality(qualityInput)
            for qualityInput in qualityInputs
        ]
        if qualityInputs
        else []
    )
    formationsWithSameQualities = [
        formation
        for formation in formationsWithSameName
        if set(qualities).issubset(set(formation.qualities))
    ]
    if len(formationsWithSameQualities) < 1:
        raise QualitiesDontMatchFormation(name, qualityInputs, formationsWithSameName)
    elif len(formationsWithSameQualities) > 1:
        formationsWithExactSameQualities = [
            formation
            for formation in formationsWithSameQualities
            if set(formation.qualities) == set(qualities)
        ]
        if len(formationsWithExactSameQualities) < 1:
            raise TooLittleQualitiesToMatchExcactlyFormation(
                name, qualityInputs, formationsWithSameQualities
            )
        elif len(formationsWithExactSameQualities) > 1:
            raise InvalidDatabase(
                f"Found multiple formations {formationsWithExactSameQualities!r} for {name} and same qualities: {qualities}"
            )
        return formationsWithExactSameQualities[0]
    return formationsWithSameQualities[0]


def getPortBySpecifiers(
    session: Session, type: Formation, specifierInputs: List[SpecifierInput]
) -> Port:
    ports = session.query(Port).filter_by(type_id=type.id)
    specifiers = [
        specifierInputToTransientSpecifierForEquality(specifierInput)
        for specifierInput in specifierInputs
    ]
    portsWithSameSpecifier = [
        port for port in ports if set(port.specifiers) == set(specifiers)
    ]
    if len(portsWithSameSpecifier) != 1:
        raise PortNotFound(specifiers)
    return portsWithSameSpecifier[0]


def addRepresentationInputToSession(
    session: Session,
    type: Type,
    representationInput: RepresentationInput,
) -> Representation:
    try:
        representation = getRepresentationByUrl(session, type, representationInput.url)
        raise RepresentationAlreadyExists(representation)
    except RepresentationNotFound:
        pass
    representation = Representation(
        url=representationInput.url,
        type_id=type.id,
    )
    try:
        representation.lod = representationInput.lod
    except AttributeError:
        pass
    session.add(representation)
    session.flush()
    for tagInput in representationInput.tags or []:
        tag = Tag(
            value=tagInput,
            representation_id=representation.id,
        )
        session.add(tag)
        session.flush()
    return representation


def addSpecifierInputToSession(
    session: Session, port: Port, specifierInput: SpecifierInput
) -> Specifier:
    specifier = Specifier(
        context=specifierInput.context,
        group=specifierInput.group,
        port_id=port.id,
    )
    session.add(specifier)
    session.flush()
    return specifier


def addPortInputToSession(session: Session, type: Type, portInput: PortInput) -> Port:
    try:
        existingPort = getPortBySpecifiers(session, type, portInput.specifiers)
        raise PortAlreadyExists(existingPort)
    except PortNotFound:
        pass
    port = Port(
        origin_x=portInput.plane.origin.x,
        origin_y=portInput.plane.origin.y,
        origin_z=portInput.plane.origin.z,
        x_axis_x=portInput.plane.x_axis.x,
        x_axis_y=portInput.plane.x_axis.y,
        x_axis_z=portInput.plane.x_axis.z,
        y_axis_x=portInput.plane.y_axis.x,
        y_axis_y=portInput.plane.y_axis.y,
        y_axis_z=portInput.plane.y_axis.z,
        type_id=type.id,
    )
    session.add(port)
    session.flush()
    for specifierInput in portInput.specifiers or []:
        specifier = addSpecifierInputToSession(session, port, specifierInput)
    return port


def addQualityInputToSession(
    session: Session,
    owner: Type | Formation,
    qualityInput: QualityInput,
) -> Quality:
    typeId = owner.id if isinstance(owner, Type) else None
    formationId = owner.id if isinstance(owner, Formation) else None
    quality = Quality(
        name=qualityInput.name,
        value=qualityInput.value,
        type_id=typeId,
        formation_id=formationId,
    )
    try:
        quality.unit = qualityInput.unit
    except AttributeError:
        pass
    session.add(quality)
    session.flush()
    return quality


def addTypeInputToSession(session: Session, kit: Kit, typeInput: TypeInput) -> Type:
    try:
        existingType = getTypeByNameAndQualities(
            session, typeInput.name, typeInput.qualities
        )
        raise TypeAlreadyExists(existingType)
    except TypeNotFound:
        pass
    type = Type(name=typeInput.name, kit_id=kit.id)
    try:
        type.explanation = typeInput.explanation
    except AttributeError:
        pass
    try:
        type.icon = typeInput.icon
    except AttributeError:
        pass
    session.add(type)
    session.flush()
    for representationInput in typeInput.representations or []:
        representation = addRepresentationInputToSession(
            session, type, representationInput
        )
    for portInput in typeInput.ports or []:
        port = addPortInputToSession(session, type, portInput)
    for qualityInput in typeInput.qualities or []:
        quality = addQualityInputToSession(session, type, qualityInput)
    return type


def addPieceInputToSession(
    session: Session, formation: Formation, pieceInput: PieceInput
) -> Piece:
    type = getTypeByNameAndQualities(
        session, pieceInput.type.name, pieceInput.type.qualities
    )
    piece = Piece(local_id=pieceInput.id, type_id=type.id, formation_id=formation.id)
    session.add(piece)
    session.flush()
    return piece


def addAttractionInputToSession(
    session: Session,
    formation: Formation,
    attractionInput: AttractionInput,
    localIdToPiece: dict,
) -> Attraction:
    try:
        attractingPiece = localIdToPiece[attractionInput.attracting.piece.id]
    except KeyError:
        raise PieceNotFound(attractionInput.attracting.piece.id)
    try:
        attractedPiece = localIdToPiece[attractionInput.attracted.piece.id]
    except KeyError:
        raise PieceNotFound(attractionInput.attracted.piece.id)
    attractingPieceTypePort = getPortBySpecifiers(
        session,
        attractingPiece.type,
        attractionInput.attracting.piece.type.port.specifiers,
    )
    attractedPieceTypePort = getPortBySpecifiers(
        session,
        attractedPiece.type,
        attractionInput.attracted.piece.type.port.specifiers,
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
    session: Session, kit: Kit, formationInput: FormationInput
):
    try:
        existingFormation = getFormationByNameAndQualities(
            session, formationInput.name, formationInput.qualities
        )
        raise FormationAlreadyExists(existingFormation)
    except FormationNotFound:
        pass
    formation = Formation(
        name=formationInput.name,
        kit_id=kit.id,
    )
    try:
        formation.explanation = formationInput.explanation
    except AttributeError:
        pass
    try:
        formation.icon = formationInput.icon
    except AttributeError:
        pass
    session.add(formation)
    session.flush()
    localIdToPiece: Dict[str, Piece] = {}
    for pieceInput in formationInput.pieces or []:
        piece = addPieceInputToSession(session, formation, pieceInput)
        localIdToPiece[pieceInput.id] = piece

    for attractionInput in formationInput.attractions or []:
        attraction = addAttractionInputToSession(
            session, formation, attractionInput, localIdToPiece
        )
    for qualityInput in formationInput.qualities or []:
        quality = addQualityInputToSession(session, formation, qualityInput)
    return formation


def addKitInputToSession(session: Session, kitInput: KitInput):
    try:
        kit = getMainKit(session)
    except NoMainKit:
        kit = Kit(
            name=kitInput.name,
        )
    try:
        kit.explanation = kitInput.explanation
    except AttributeError:
        pass
    try:
        kit.icon = kitInput.icon
    except AttributeError:
        pass
    try:
        kit.url = kitInput.url
    except AttributeError:
        pass
    session.add(kit)
    session.flush()
    for typeInput in kitInput.types or []:
        type = addTypeInputToSession(session, kit, typeInput)
    for formationInput in kitInput.formations or []:
        formation = addFormationInputToSession(session, kit, formationInput)
    return kit


def updateKitMetadataInSession(session: Session, kitMetadata: KitMetadataInput):
    kit = getMainKit(session)
    try:
        kit.name = kitMetadata.name
    except AttributeError:
        pass
    try:
        kit.explanation = kitMetadata.explanation
    except AttributeError:
        pass
    try:
        kit.icon = kitMetadata.icon
    except AttributeError:
        pass
    try:
        kit.url = kitMetadata.url
    except AttributeError:
        pass
    return kit


def hierarchyFromFormationInSession(
    session: Session, formation: Formation
) -> Hierarchy:
    nodes = list((piece.local_id, {"piece": piece}) for piece in formation.pieces)
    edges = (
        (
            attraction.attracting.piece.id,
            attraction.attracted.piece.id,
            {"attraction": attraction},
        )
        for attraction in formation.attractions
    )
    G = DiGraph()
    G.add_nodes_from(nodes)
    G.add_edges_from(edges)
    root = [node for node, degree in G.in_degree() if degree == 0][0]
    rootHierarchy = Hierarchy(
        piece=G.nodes[root]["piece"], transform=Transform.identity(), children=[]
    )
    G.nodes[root]["hierarchy"] = rootHierarchy
    for parent, child in bfs_tree(G, source=root).edges():
        parentTransform = G[parent][child][
            "attraction"
        ].attracting.piece.type.port.plane.toTransform()
        childTransform = G[parent][child][
            "attraction"
        ].attracted.piece.type.port.plane.toTransform()
        transform = parentTransform.compose(childTransform)
        hierarchy = Hierarchy(
            piece=G.nodes[child]["piece"], transform=transform, children=[]
        )
        G.nodes[child]["hierarchy"] = hierarchy
        G.nodes[parent]["hierarchy"].children.append(hierarchy)
    return rootHierarchy


def addObjectsToSceneInSession(
    session: Session,
    scene: "Scene",
    parent: Object,
    hierarchy: Hierarchy,
    plane: Plane,
) -> None:
    plane = plane.transform(hierarchy.transform)
    object = Object(
        piece=hierarchy.piece,
        plane=plane,
        parent=parent,
    )
    scene.objects.append(object)
    for child in hierarchy.children:
        addObjectsToSceneInSession(session, scene, object, child, plane)


def sessionFromFormation(
    session: Session, formationIdInput: FormationIdInput
) -> "Scene":
    formation = getFormationByNameAndQualities(
        session, formationIdInput.name, formationIdInput.qualities
    )
    hierarchy = hierarchyFromFormationInSession(session, formation)
    plane = Plane.XY()
    scene = Scene(objects=[])
    addObjectsToSceneInSession(session, scene, None, hierarchy, plane)
    return scene


class CreateLocalKitErrorCode(graphene.Enum):
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_ALREADY_CONTAINS_A_KIT = "directory_already_contains_a_kit"
    NO_PERMISSION_TO_CREATE_DIRECTORY = "no_permission_to_create_directory"
    NO_PERMISSION_TO_CREATE_KIT = "no_permission_to_create_kit"
    KIT_INPUT_IS_INVALID = "kit_input_is_invalid"


class CreateLocalKitErrorNode(ObjectType):
    class Meta:
        name = "CreateLocalKitError"

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
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if kitFile.exists():
            return CreateLocalKitMutation(
                error=CreateLocalKitErrorNode(
                    code=CreateLocalKitErrorCode.DIRECTORY_ALREADY_CONTAINS_A_KIT
                )
            )
        else:
            kitFile.parent.mkdir(parents=True, exist_ok=True)

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
        return CreateLocalKitMutation(kit=kit)


class UpdateLocalKitMetadataErrorCode(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_UPDATE_KIT = "no_permission_to_update_kit"
    KIT_METADATA_IS_INVALID = "kit_metadata_is_invalid"


class UpdateLocalKitMetadataErrorNode(ObjectType):
    class Meta:
        name = "UpdateLocalKitMetadataError"

    code = NonNull(UpdateLocalKitMetadataErrorCode)
    message = graphene.String()


class UpdateLocalKitMetadataMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)
        kitMetadataInput = NonNull(KitMetadataInput)

    kit = Field(KitNode)
    error = Field(UpdateLocalKitMetadataErrorNode)

    def mutate(self, info, directory, kitMetadataInput, mode):
        directory = Path(directory)
        if not directory.exists():
            return UpdateLocalKitMetadataMutation(
                error=UpdateLocalKitMetadataErrorNode(
                    code=UpdateLocalKitMetadataErrorCode.DIRECTORY_DOES_NOT_EXIST
                )
            )
        if not directory.is_dir():
            return UpdateLocalKitMetadataMutation(
                error=UpdateLocalKitMetadataErrorNode(
                    code=UpdateLocalKitMetadataErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY
                )
            )
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return UpdateLocalKitMetadataMutation(
                error=UpdateLocalKitMetadataErrorNode(
                    code=UpdateLocalKitMetadataErrorCode.DIRECTORY_HAS_NO_KIT
                )
            )
        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't update a kit in a directory where this process already deleted an engine. Restart the server and try again."
            )
        session = getLocalSession(directory)
        try:
            kit = updateKitMetadataInSession(session, kitMetadataInput)
        except SpecificationError as e:
            session.rollback()
            return UpdateLocalKitMetadataMutation(
                error=UpdateLocalKitMetadataErrorNode(
                    code=UpdateLocalKitMetadataErrorCode.KIT_METADATA_IS_INVALID,
                    message=str(e),
                )
            )
        session.commit()
        return UpdateLocalKitMetadataMutation(kit=kit)


class DeleteLocalKitError(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_DELETE_KIT = "no_permission_to_delete_kit"


class DeleteLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)

    error = Field(DeleteLocalKitError)

    def mutate(self, info, directory):
        directory = Path(directory)
        if not directory.exists():
            return DeleteLocalKitMutation(
                error=DeleteLocalKitError.DIRECTORY_DOES_NOT_EXIST
            )
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return DeleteLocalKitMutation(
                error=DeleteLocalKitError.DIRECTORY_HAS_NO_KIT
            )
        kitFileFullPath = kitFile.resolve()
        disposed_engines[kitFileFullPath] = True
        try:
            remove(kitFileFullPath)
        except PermissionError:
            return DeleteLocalKitMutation(
                error=DeleteLocalKitError.NO_PERMISSION_TO_DELETE_KIT
            )
        return DeleteLocalKitMutation()


class AddTypeToLocalKitErrorCode(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_MODIFY_KIT = "no_permission_to_modify_kit"
    TYPE_INPUT_IS_INVALID = "type_input_is_invalid"


class AddTypeToLocalKitErrorNode(ObjectType):
    class Meta:
        name = "AddTypeToLocalKitError"

    code = NonNull(AddTypeToLocalKitErrorCode)
    message = graphene.String()


class AddTypeToLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)
        typeInput = NonNull(TypeInput)

    type = Field(TypeNode)
    error = Field(AddTypeToLocalKitErrorNode)

    def mutate(self, info, directory, typeInput):
        directory = Path(directory)
        if not directory.exists():
            return AddTypeToLocalKitMutation(
                error=AddTypeToLocalKitErrorNode(
                    code=AddTypeToLocalKitErrorCode.DIRECTORY_DOES_NOT_EXIST
                )
            )
        if not directory.is_dir():
            return AddTypeToLocalKitMutation(
                error=AddTypeToLocalKitErrorNode(
                    code=AddTypeToLocalKitErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY
                )
            )
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return AddTypeToLocalKitMutation(
                error=AddTypeToLocalKitErrorNode(
                    code=AddTypeToLocalKitErrorCode.DIRECTORY_HAS_NO_KIT
                )
            )
        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't update a kit in a directory where this process already deleted an engine. Restart the server and try again."
            )
        session = getLocalSession(directory)
        try:
            kit = getMainKit(session)
        except NoMainKit:
            raise Exception("Main kit not found.")
        try:
            type = addTypeInputToSession(session, kit, typeInput)
        except SpecificationError as e:
            session.rollback()
            return AddTypeToLocalKitMutation(
                error=AddTypeToLocalKitErrorNode(
                    code=AddTypeToLocalKitErrorCode.TYPE_INPUT_IS_INVALID,
                    message=str(e),
                )
            )
        session.commit()
        return AddTypeToLocalKitMutation(type=type)


class RemoveTypeFromLocalKitErrorCode(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_MODIFY_KIT = "no_permission_to_modify_kit"
    TYPE_DOES_NOT_EXIST = "type_does_not_exist"
    FORMATION_DEPENDS_ON_TYPE = "formation_depends_on_type"


class RemoveTypeFromLocalKitErrorNode(ObjectType):
    class Meta:
        name = "RemoveTypeFromLocalKitError"

    code = NonNull(RemoveTypeFromLocalKitErrorCode)
    message = graphene.String()


class RemoveTypeFromLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)
        typeId = NonNull(TypeIdInput)

    error = Field(RemoveTypeFromLocalKitErrorNode)

    def mutate(self, info, directory, typeId):
        directory = Path(directory)
        if not directory.exists():
            return RemoveTypeFromLocalKitMutation(
                error=RemoveTypeFromLocalKitErrorNode(
                    code=RemoveTypeFromLocalKitErrorCode.DIRECTORY_DOES_NOT_EXIST
                ),
            )
        if not directory.is_dir():
            return RemoveTypeFromLocalKitMutation(
                error=RemoveTypeFromLocalKitErrorNode(
                    code=RemoveTypeFromLocalKitErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY,
                )
            )
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return RemoveTypeFromLocalKitMutation(
                error=RemoveTypeFromLocalKitErrorNode(
                    code=RemoveTypeFromLocalKitErrorCode.DIRECTORY_HAS_NO_KIT,
                )
            )
        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't update a kit in a directory where this process already deleted an engine. Restart the server and try again."
            )
        session = getLocalSession(directory)
        try:
            kit = getMainKit(session)
        except NoMainKit:
            raise Exception("Main kit not found.")
        try:
            type = getTypeByNameAndQualities(session, typeId.name, typeId.qualities)
        except TypeNotFound:
            return RemoveTypeFromLocalKitMutation(
                error=RemoveTypeFromLocalKitErrorNode(
                    code=RemoveTypeFromLocalKitErrorCode.TYPE_DOES_NOT_EXIST
                ),
            )
        if type.pieces:
            return RemoveTypeFromLocalKitMutation(
                error=RemoveTypeFromLocalKitErrorNode(
                    code=RemoveTypeFromLocalKitErrorCode.FORMATION_DEPENDS_ON_TYPE
                ),
            )
        session.delete(type)
        session.commit()
        return RemoveTypeFromLocalKitMutation()


class AddFormationToLocalKitErrorCode(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_MODIFY_KIT = "no_permission_to_modify_kit"
    FORMATION_INPUT_IS_INVALID = "formation_input_is_invalid"


class AddFormationToLocalKitErrorNode(ObjectType):
    class Meta:
        name = "AddFormationToLocalKitError"

    code = NonNull(AddFormationToLocalKitErrorCode)
    message = graphene.String()


class AddFormationToLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)
        formationInput = NonNull(FormationInput)

    formation = Field(FormationNode)
    error = Field(AddFormationToLocalKitErrorNode)

    def mutate(self, info, directory, formationInput):
        directory = Path(directory)
        if not directory.exists():
            return AddFormationToLocalKitMutation(
                error=AddFormationToLocalKitErrorNode(
                    code=AddFormationToLocalKitErrorCode.DIRECTORY_DOES_NOT_EXIST
                )
            )
        if not directory.is_dir():
            return AddFormationToLocalKitMutation(
                error=AddFormationToLocalKitErrorNode(
                    code=AddFormationToLocalKitErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY
                )
            )
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return AddFormationToLocalKitMutation(
                error=AddFormationToLocalKitErrorNode(
                    code=AddFormationToLocalKitErrorCode.DIRECTORY_HAS_NO_KIT
                )
            )
        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't update a kit in a directory where this process already deleted an engine. Restart the server and try again."
            )
        session = getLocalSession(directory)
        try:
            kit = getMainKit(session)
        except NoMainKit:
            raise Exception("Main kit not found.")
        try:
            formation = addFormationInputToSession(session, kit, formationInput)
        except SpecificationError as e:
            session.rollback()
            return AddFormationToLocalKitMutation(
                error=AddFormationToLocalKitErrorNode(
                    code=AddFormationToLocalKitErrorCode.FORMATION_INPUT_IS_INVALID,
                    message=str(e),
                )
            )
        session.commit()
        return AddFormationToLocalKitMutation(formation=formation)


class RemoveFormationFromLocalKitErrorCode(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_MODIFY_KIT = "no_permission_to_modify_kit"
    FORMATION_DOES_NOT_EXIST = "formation_does_not_exist"


class RemoveFormationFromLocalKitErrorNode(ObjectType):
    class Meta:
        name = "RemoveFormationFromLocalKitError"

    code = NonNull(RemoveFormationFromLocalKitErrorCode)
    message = graphene.String()


class RemoveFormationFromLocalKitMutation(graphene.Mutation):
    class Arguments:
        directory = NonNull(graphene.String)
        formationId = NonNull(FormationIdInput)

    error = Field(RemoveFormationFromLocalKitErrorNode)

    def mutate(self, info, directory, formationId):
        directory = Path(directory)
        if not directory.exists():
            return RemoveFormationFromLocalKitMutation(
                error=RemoveFormationFromLocalKitErrorNode(
                    code=RemoveFormationFromLocalKitErrorCode.DIRECTORY_DOES_NOT_EXIST,
                )
            )
        if not directory.is_dir():
            return RemoveFormationFromLocalKitMutation(
                error=RemoveFormationFromLocalKitErrorNode(
                    code=RemoveFormationFromLocalKitErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY,
                )
            )
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return RemoveFormationFromLocalKitMutation(
                error=RemoveFormationFromLocalKitErrorNode(
                    code=RemoveFormationFromLocalKitErrorCode.DIRECTORY_HAS_NO_KIT
                ),
            )
        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't update a kit in a directory where this process already deleted an engine. Restart the server and try again."
            )
        session = getLocalSession(directory)
        try:
            kit = getMainKit(session)
        except NoMainKit:
            raise Exception("Main kit not found.")
        try:
            formation = getFormationByNameAndQualities(
                session, formationId.name, formationId.qualities
            )
        except FormationNotFound:
            return RemoveFormationFromLocalKitMutation(
                error=RemoveFormationFromLocalKitErrorNode(
                    code=RemoveFormationFromLocalKitErrorCode.FORMATION_DOES_NOT_EXIST
                ),
            )
        session.delete(formation)
        session.commit()
        return RemoveFormationFromLocalKitMutation()


class LoadLocalKitError(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_READ_KIT = "no_permission_to_read_kit"


class LoadLocalKitResponse(ObjectType):
    kit = Field(KitNode)
    error = Field(LoadLocalKitError)


class FormationToSceneFromLocalKitResponseErrorCode(graphene.Enum):
    DIRECTORY_DOES_NOT_EXIST = "directory_does_not_exist"
    DIRECTORY_IS_NOT_A_DIRECTORY = "directory_is_not_a_directory"
    DIRECTORY_HAS_NO_KIT = "directory_has_no_kit"
    NO_PERMISSION_TO_READ_KIT = "no_permission_to_read_kit"
    FORMATION_DOES_NOT_EXIST = "formation_does_not_exist"


class FormationToSceneFromLocalKitResponseErrorNode(ObjectType):
    class Meta:
        name = "RemoveFormationFromLocalKitError"

    code = NonNull(FormationToSceneFromLocalKitResponseErrorCode)
    message = graphene.String()


class FormationToSceneFromLocalKitResponse(ObjectType):
    scene = Field(SceneNode)
    error = Field(FormationToSceneFromLocalKitResponseErrorNode)


class Query(ObjectType):
    loadLocalKit = Field(LoadLocalKitResponse, directory=NonNull(graphene.String))
    formationToSceneFromLocalKit = Field(
        FormationToSceneFromLocalKitResponse,
        directory=NonNull(graphene.String),
        formationIdInput=NonNull(FormationIdInput),
    )

    def resolve_loadLocalKit(self, info, directory: graphene.String):
        directory = Path(directory)
        if not directory.exists():
            return LoadLocalKitResponse(
                error=LoadLocalKitError.DIRECTORY_DOES_NOT_EXIST
            )
        if not directory.is_dir():
            return LoadLocalKitResponse(
                error=LoadLocalKitError.DIRECTORY_IS_NOT_A_DIRECTORY
            )
        try:
            session = getLocalSession(directory)
        except PermissionError:
            return LoadLocalKitResponse(
                error=LoadLocalKitError.NO_PERMISSION_TO_READ_KIT
            )
        try:
            kit = getMainKit(session)
        except NoMainKit:
            return LoadLocalKitResponse(error=LoadLocalKitError.DIRECTORY_HAS_NO_KIT)
        return LoadLocalKitResponse(kit=kit)

    def resolve_formationToSceneFromLocalKit(self, info, directory, formationIdInput):
        directory = Path(directory)
        if not directory.exists():
            return FormationToSceneFromLocalKitResponse(
                error=FormationToSceneFromLocalKitResponseErrorNode(
                    code=FormationToSceneFromLocalKitResponseErrorCode.DIRECTORY_DOES_NOT_EXIST
                )
            )
        if not directory.is_dir():
            return FormationToSceneFromLocalKitResponse(
                error=FormationToSceneFromLocalKitResponseErrorNode(
                    code=FormationToSceneFromLocalKitResponseErrorCode.DIRECTORY_IS_NOT_A_DIRECTORY
                )
            )
        kitFile = directory.joinpath(KIT_FOLDERNAME).joinpath(KIT_FILENAME)
        if not kitFile.exists():
            return FormationToSceneFromLocalKitResponse(
                error=FormationToSceneFromLocalKitResponseErrorNode(
                    code=FormationToSceneFromLocalKitResponseErrorCode.DIRECTORY_HAS_NO_KIT
                )
            )
        kitFileFullPath = kitFile.resolve()
        if kitFileFullPath in disposed_engines:
            raise Exception(
                "Can't update a kit in a directory where this process already deleted an engine. Restart the server and try again."
            )
        session = getLocalSession(directory)
        try:
            scene = sessionFromFormation(session, formationIdInput)
        except FormationNotFound:
            return FormationToSceneFromLocalKitResponse(
                error=FormationToSceneFromLocalKitResponseErrorNode(
                    code=FormationToSceneFromLocalKitResponseErrorCode.FORMATION_DOES_NOT_EXIST
                )
            )
        return FormationToSceneFromLocalKitResponse(scene=scene)


class Mutation(ObjectType):
    createLocalKit = CreateLocalKitMutation.Field()
    updateLocalKitMetadata = UpdateLocalKitMetadataMutation.Field()
    deleteLocalKit = DeleteLocalKitMutation.Field()
    addTypeToLocalKit = AddTypeToLocalKitMutation.Field()
    removeTypeFromLocalKit = RemoveTypeFromLocalKitMutation.Field()
    addFormationToLocalKit = AddFormationToLocalKitMutation.Field()
    removeFormationFromLocalKit = RemoveFormationFromLocalKitMutation.Field()


schema = Schema(
    query=Query,
    mutation=Mutation,
)

app = Flask(__name__)
app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True,
    ),
)
if app.debug:
    with open("../../graphql/schema.graphql", "w") as f:
        f.write(str(schema))

    engine = create_engine("sqlite:///debug/semio.db")
    Base.metadata.create_all(engine)


def main():
    app.run()


if __name__ == "__main__":
    main()

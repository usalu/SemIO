import { Input } from 'postcss'

// Generated by: https://the-guild.dev/graphql/codegen with "Schema Types"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
    [_ in K]?: never
}
export type Incremental<T> =
    | T
    | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    /**
     * The `DateTime` scalar type represents a DateTime
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
    DateTime: { input: any; output: any }
}

export type Query = {
    __typename?: 'Query'
    loadLocalKit?: Maybe<LoadLocalKitResponse>
    designToSceneFromLocalKit?: Maybe<DesignToSceneFromLocalKitResponse>
}

export type QueryLoadLocalKitArgs = {
    directory: Scalars['String']['input']
}

export type QueryDesignToSceneFromLocalKitArgs = {
    directory: Scalars['String']['input']
    designIdInput: DesignIdInput
}

export type LoadLocalKitResponse = {
    __typename?: 'LoadLocalKitResponse'
    kit?: Maybe<Kit>
    error?: Maybe<LoadLocalKitError>
}

/** 🗃️ A kit is a collection of types and designs. */
export type Kit = {
    __typename?: 'Kit'
    name: Scalars['String']['output']
    description: Scalars['String']['output']
    icon: Scalars['String']['output']
    createdAt: Scalars['DateTime']['output']
    lastUpdateAt: Scalars['DateTime']['output']
    url: Scalars['String']['output']
    homepage: Scalars['String']['output']
    types: Array<Type>
    designs: Array<Design>
}

/** 🧩 A type is a reusable element that can be connected with other types over ports. */
export type Type = {
    __typename?: 'Type'
    name: Scalars['String']['output']
    description: Scalars['String']['output']
    icon: Scalars['String']['output']
    variant: Scalars['String']['output']
    unit: Scalars['String']['output']
    createdAt: Scalars['DateTime']['output']
    lastUpdateAt: Scalars['DateTime']['output']
    kit?: Maybe<Kit>
    representations: Array<Representation>
    ports: Array<Port>
    qualities: Array<Quality>
    pieces: Array<Piece>
}

/** 💾 A representation is a link to a resource that describes a type for a certain level of detail and tags. */
export type Representation = {
    __typename?: 'Representation'
    url: Scalars['String']['output']
    mime: Scalars['String']['output']
    lod: Scalars['String']['output']
    type?: Maybe<Type>
    tags: Array<Scalars['String']['output']>
}

/** 🔌 A port is a conceptual connection point (with a direction) of a type. */
export type Port = {
    __typename?: 'Port'
    type?: Maybe<Type>
    locators: Array<Locator>
    connecteds: Array<Connection>
    connectings: Array<Connection>
    id: Scalars['String']['output']
    point: Point
    direction: Vector
    plane: Plane
}

/** 🗺️ A locator is meta-data for grouping ports. */
export type Locator = {
    __typename?: 'Locator'
    group: Scalars['String']['output']
    subgroup: Scalars['String']['output']
    port?: Maybe<Port>
}

/** 🖇️ A bidirectional connection between two pieces of a design. */
export type Connection = {
    __typename?: 'Connection'
    gap: Scalars['Float']['output']
    rotation: Scalars['Float']['output']
    design?: Maybe<Design>
    connected: Side
    connecting: Side
}

/** 🏙️ A design is a collection of pieces that are connected. */
export type Design = {
    __typename?: 'Design'
    name: Scalars['String']['output']
    description: Scalars['String']['output']
    icon: Scalars['String']['output']
    variant: Scalars['String']['output']
    unit: Scalars['String']['output']
    createdAt: Scalars['DateTime']['output']
    lastUpdateAt: Scalars['DateTime']['output']
    kit?: Maybe<Kit>
    pieces: Array<Piece>
    connections: Array<Connection>
    qualities: Array<Quality>
}

/** ⭕ A piece is a 3d-instance of a type in a design. */
export type Piece = {
    __typename?: 'Piece'
    type?: Maybe<Type>
    design?: Maybe<Design>
    connectings: Array<Connection>
    connecteds: Array<Connection>
    id: Scalars['String']['output']
    root?: Maybe<PieceRoot>
    diagram: PieceDiagram
}

/** 🌱 The root indesign of a piece. */
export type PieceRoot = {
    __typename?: 'PieceRoot'
    plane: Plane
}

/** ◳ A plane is an origin (point) and an orientation (x-axis and y-axis). */
export type Plane = {
    __typename?: 'Plane'
    origin: Point
    xAxis: Vector
    yAxis: Vector
}

/** ✖️ A 3d-point (xyz) of floating point numbers. */
export type Point = {
    __typename?: 'Point'
    x: Scalars['Float']['output']
    y: Scalars['Float']['output']
    z: Scalars['Float']['output']
}

/** ➡️ A 3d-vector (xyz) of floating point numbers. */
export type Vector = {
    __typename?: 'Vector'
    x: Scalars['Float']['output']
    y: Scalars['Float']['output']
    z: Scalars['Float']['output']
}

/** ✏️ The diagram indesign of a piece. */
export type PieceDiagram = {
    __typename?: 'PieceDiagram'
    point: DiagramPoint
}

/** 📺 A 2d-point (xy) of integers in screen plane. */
export type DiagramPoint = {
    __typename?: 'DiagramPoint'
    x: Scalars['Int']['output']
    y: Scalars['Int']['output']
}

/** 📏 A quality is meta-data for decision making. */
export type Quality = {
    __typename?: 'Quality'
    name: Scalars['String']['output']
    value: Scalars['String']['output']
    unit: Scalars['String']['output']
    definition: Scalars['String']['output']
    type?: Maybe<Type>
    design?: Maybe<Design>
}

/** 🧱 A side of a piece in a connection. */
export type Side = {
    __typename?: 'Side'
    piece: SidePiece
}

/** ⭕ The piece indesign of a side. A piece is identified by an id (emtpy=default)). */
export type SidePiece = {
    __typename?: 'SidePiece'
    id: Scalars['String']['output']
    type: SidePieceType
}

/** 🧩 The type indesign of a piece of a side. */
export type SidePieceType = {
    __typename?: 'SidePieceType'
    port?: Maybe<Port>
}

export enum LoadLocalKitError {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToReadKit = 'NO_PERMISSION_TO_READ_KIT'
}

export type DesignToSceneFromLocalKitResponse = {
    __typename?: 'DesignToSceneFromLocalKitResponse'
    scene?: Maybe<Scene>
    error?: Maybe<DesignToSceneFromLocalKitResponseError>
}

/** 🌆 A scene is a collection of objects. */
export type Scene = {
    __typename?: 'Scene'
    objects: Array<Maybe<Object>>
    design?: Maybe<Design>
}

/** 🗿 An object is a piece with a plane and a parent object (unless the piece is a root). */
export type Object = {
    __typename?: 'Object'
    plane: Plane
    piece?: Maybe<Piece>
    parent?: Maybe<Object>
}

export type DesignToSceneFromLocalKitResponseError = {
    __typename?: 'DesignToSceneFromLocalKitResponseError'
    code: DesignToSceneFromLocalKitResponseErrorCode
    message?: Maybe<Scalars['String']['output']>
}

export enum DesignToSceneFromLocalKitResponseErrorCode {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToReadKit = 'NO_PERMISSION_TO_READ_KIT',
    DesignDoesNotExist = 'DESIGN_DOES_NOT_EXIST'
}

/** 🏙️ A design is identified by a name and optional variant. */
export type DesignIdInput = {
    name: Scalars['String']['input']
    variant?: InputMaybe<Scalars['String']['input']>
}

export type Mutation = {
    __typename?: 'Mutation'
    createLocalKit?: Maybe<CreateLocalKitMutation>
    updateLocalKitMetadata?: Maybe<UpdateLocalKitMetadataMutation>
    deleteLocalKit?: Maybe<DeleteLocalKitMutation>
    addTypeToLocalKit?: Maybe<AddTypeToLocalKitMutation>
    removeTypeFromLocalKit?: Maybe<RemoveTypeFromLocalKitMutation>
    addDesignToLocalKit?: Maybe<AddDesignToLocalKitMutation>
    removeDesignFromLocalKit?: Maybe<RemoveDesignFromLocalKitMutation>
}

export type MutationCreateLocalKitArgs = {
    directory: Scalars['String']['input']
    kitInput: KitInput
}

export type MutationUpdateLocalKitMetadataArgs = {
    directory: Scalars['String']['input']
    kitMetadataInput: KitMetadataInput
}

export type MutationDeleteLocalKitArgs = {
    directory: Scalars['String']['input']
}

export type MutationAddTypeToLocalKitArgs = {
    directory: Scalars['String']['input']
    typeInput: TypeInput
}

export type MutationRemoveTypeFromLocalKitArgs = {
    directory: Scalars['String']['input']
    typeId: TypeIdInput
}

export type MutationAddDesignToLocalKitArgs = {
    directory: Scalars['String']['input']
    designInput: DesignInput
}

export type MutationRemoveDesignFromLocalKitArgs = {
    directory: Scalars['String']['input']
    designId: DesignIdInput
}

export type CreateLocalKitMutation = {
    __typename?: 'CreateLocalKitMutation'
    kit?: Maybe<Kit>
    error?: Maybe<CreateLocalKitError>
}

export type CreateLocalKitError = {
    __typename?: 'CreateLocalKitError'
    code: CreateLocalKitErrorCode
    message?: Maybe<Scalars['String']['output']>
}

export enum CreateLocalKitErrorCode {
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryAlreadyContainsAKit = 'DIRECTORY_ALREADY_CONTAINS_A_KIT',
    NoPermissionToCreateDirectory = 'NO_PERMISSION_TO_CREATE_DIRECTORY',
    NoPermissionToCreateKit = 'NO_PERMISSION_TO_CREATE_KIT',
    KitInputIsInvalid = 'KIT_INPUT_IS_INVALID'
}

/** 🗃️ A kit is a collection of types and designs. */
export type KitInput = {
    name: Scalars['String']['input']
    description?: InputMaybe<Scalars['String']['input']>
    icon?: InputMaybe<Scalars['String']['input']>
    url?: InputMaybe<Scalars['String']['input']>
    homepage?: InputMaybe<Scalars['String']['input']>
    types?: InputMaybe<Array<TypeInput>>
    designs?: InputMaybe<Array<DesignInput>>
}

/** 🧩 A type is a reusable element that can be connected with other types over ports. */
export type TypeInput = {
    name: Scalars['String']['input']
    description?: InputMaybe<Scalars['String']['input']>
    icon?: InputMaybe<Scalars['String']['input']>
    variant?: InputMaybe<Scalars['String']['input']>
    unit: Scalars['String']['input']
    representations: Array<RepresentationInput>
    ports: Array<PortInput>
    qualities?: InputMaybe<Array<QualityInput>>
}

/** 💾 A representation is a link to a resource that describes a type for a certain level of detail and tags. */
export type RepresentationInput = {
    url: Scalars['String']['input']
    mime: InputMaybe<Scalars['String']['input']>
    lod?: InputMaybe<Scalars['String']['input']>
    tags?: InputMaybe<Array<Scalars['String']['input']>>
}

/** 🔌 A port is a conceptual connection point (with a direction) of a type. */
export type PortInput = {
    id?: InputMaybe<Scalars['String']['input']>
    point: PointInput
    direction: VectorInput
    locators?: InputMaybe<Array<LocatorInput>>
}

/** ✖️ A 3d-point (xyz) of floating point numbers. */
export type PointInput = {
    x?: InputMaybe<Scalars['Float']['input']>
    y?: InputMaybe<Scalars['Float']['input']>
    z?: InputMaybe<Scalars['Float']['input']>
}

/** ➡️ A 3d-vector (xyz) of floating point numbers. */
export type VectorInput = {
    x?: InputMaybe<Scalars['Float']['input']>
    y?: InputMaybe<Scalars['Float']['input']>
    z?: InputMaybe<Scalars['Float']['input']>
}

/** 🗺️ A locator is meta-data for grouping ports. */
export type LocatorInput = {
    group: Scalars['String']['input']
    subgroup?: InputMaybe<Scalars['String']['input']>
}

/** 📏 A quality is meta-data for decision making. */
export type QualityInput = {
    name: Scalars['String']['input']
    value?: InputMaybe<Scalars['String']['input']>
    unit?: InputMaybe<Scalars['String']['input']>
    definition?: InputMaybe<Scalars['String']['input']>
}

/** 🏙️ A design is a collection of pieces that are connected. */
export type DesignInput = {
    name: Scalars['String']['input']
    description?: InputMaybe<Scalars['String']['input']>
    icon?: InputMaybe<Scalars['String']['input']>
    variant?: InputMaybe<Scalars['String']['input']>
    unit: Scalars['String']['input']
    pieces: Array<PieceInput>
    connections: Array<ConnectionInput>
    qualities?: InputMaybe<Array<QualityInput>>
}

/** ⭕ A piece is a 3d-instance of a type in a design. */
export type PieceInput = {
    id: Scalars['String']['input']
    type: TypeIdInput
    root?: InputMaybe<PieceRootInput>
    diagram: PieceDiagramInput
}

/** 🧩 A type is identified by a name and variant (empty=default). */
export type TypeIdInput = {
    name: Scalars['String']['input']
    variant?: InputMaybe<Scalars['String']['input']>
}

/** 🌱 The root indesign of a piece. */
export type PieceRootInput = {
    plane: PlaneInput
}

/** ◳ A plane is an origin (point) and an orientation (x-axis and y-axis). */
export type PlaneInput = {
    origin: PointInput
    xAxis: VectorInput
    yAxis: VectorInput
}

/** ✏️ The diagram indesign of a piece. */
export type PieceDiagramInput = {
    point: DiagramPointInput
}

/** 📺 A 2d-point (xy) of integers in screen plane. */
export type DiagramPointInput = {
    x?: InputMaybe<Scalars['Int']['input']>
    y?: InputMaybe<Scalars['Int']['input']>
}

/** 🖇️ A bidirectional connection between two pieces of a design. */
export type ConnectionInput = {
    connecting: SideInput
    connected: SideInput
    gap?: InputMaybe<Scalars['Float']['input']>
    rotation?: InputMaybe<Scalars['Float']['input']>
}

/** 🧱 A side of a piece in a connection. */
export type SideInput = {
    piece: SidePieceInput
}

/** ⭕ The piece indesign of a side. A piece is identified by an id (emtpy=default)). */
export type SidePieceInput = {
    id: Scalars['String']['input']
    type?: InputMaybe<SidePieceTypeInput>
}

/** 🧩 The type indesign of a piece of a side. */
export type SidePieceTypeInput = {
    port?: InputMaybe<PortIdInput>
}

/** 🔌 A port is identified by an id (emtpy=default)). */
export type PortIdInput = {
    id?: InputMaybe<Scalars['String']['input']>
}

export type UpdateLocalKitMetadataMutation = {
    __typename?: 'UpdateLocalKitMetadataMutation'
    kit?: Maybe<Kit>
    error?: Maybe<UpdateLocalKitMetadataError>
}

export type UpdateLocalKitMetadataError = {
    __typename?: 'UpdateLocalKitMetadataError'
    code: UpdateLocalKitMetadataErrorCode
    message?: Maybe<Scalars['String']['output']>
}

export enum UpdateLocalKitMetadataErrorCode {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToUpdateKit = 'NO_PERMISSION_TO_UPDATE_KIT',
    KitMetadataIsInvalid = 'KIT_METADATA_IS_INVALID'
}

/** 🗃️ Meta-data of a kit. */
export type KitMetadataInput = {
    name?: InputMaybe<Scalars['String']['input']>
    description?: InputMaybe<Scalars['String']['input']>
    icon?: InputMaybe<Scalars['String']['input']>
    url?: InputMaybe<Scalars['String']['input']>
    homepage?: InputMaybe<Scalars['String']['input']>
}

export type DeleteLocalKitMutation = {
    __typename?: 'DeleteLocalKitMutation'
    error?: Maybe<DeleteLocalKitError>
}

export enum DeleteLocalKitError {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToDeleteKit = 'NO_PERMISSION_TO_DELETE_KIT'
}

export type AddTypeToLocalKitMutation = {
    __typename?: 'AddTypeToLocalKitMutation'
    type?: Maybe<Type>
    error?: Maybe<AddTypeToLocalKitError>
}

export type AddTypeToLocalKitError = {
    __typename?: 'AddTypeToLocalKitError'
    code: AddTypeToLocalKitErrorCode
    message?: Maybe<Scalars['String']['output']>
}

export enum AddTypeToLocalKitErrorCode {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
    TypeInputIsInvalid = 'TYPE_INPUT_IS_INVALID'
}

export type RemoveTypeFromLocalKitMutation = {
    __typename?: 'RemoveTypeFromLocalKitMutation'
    error?: Maybe<RemoveTypeFromLocalKitError>
}

export type RemoveTypeFromLocalKitError = {
    __typename?: 'RemoveTypeFromLocalKitError'
    code: RemoveTypeFromLocalKitErrorCode
    message?: Maybe<Scalars['String']['output']>
}

export enum RemoveTypeFromLocalKitErrorCode {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
    TypeDoesNotExist = 'TYPE_DOES_NOT_EXIST',
    DesignDependsOnType = 'DESIGN_DEPENDS_ON_TYPE'
}

export type AddDesignToLocalKitMutation = {
    __typename?: 'AddDesignToLocalKitMutation'
    design?: Maybe<Design>
    error?: Maybe<AddDesignToLocalKitError>
}

export type AddDesignToLocalKitError = {
    __typename?: 'AddDesignToLocalKitError'
    code: AddDesignToLocalKitErrorCode
    message?: Maybe<Scalars['String']['output']>
}

export enum AddDesignToLocalKitErrorCode {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
    DesignInputIsInvalid = 'DESIGN_INPUT_IS_INVALID'
}

export type RemoveDesignFromLocalKitMutation = {
    __typename?: 'RemoveDesignFromLocalKitMutation'
    error?: Maybe<RemoveDesignFromLocalKitError>
}

export type RemoveDesignFromLocalKitError = {
    __typename?: 'RemoveDesignFromLocalKitError'
    code: RemoveDesignFromLocalKitErrorCode
    message?: Maybe<Scalars['String']['output']>
}

export enum RemoveDesignFromLocalKitErrorCode {
    DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
    DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
    DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
    NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
    DesignDoesNotExist = 'DESIGN_DOES_NOT_EXIST'
}

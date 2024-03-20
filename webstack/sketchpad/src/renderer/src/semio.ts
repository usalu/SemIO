// Generated by: https://the-guild.dev/graphql/codegen with "Schema Types"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  loadLocalKit?: Maybe<LoadLocalKitResponse>;
  formationToSceneFromLocalKit?: Maybe<FormationToSceneFromLocalKitResponse>;
};


export type QueryLoadLocalKitArgs = {
  directory: Scalars['String']['input'];
};


export type QueryFormationToSceneFromLocalKitArgs = {
  directory: Scalars['String']['input'];
  formationIdInput: FormationIdInput;
};

export type LoadLocalKitResponse = {
  __typename?: 'LoadLocalKitResponse';
  kit?: Maybe<Kit>;
  error?: Maybe<LoadLocalKitError>;
};

export type Kit = {
  __typename?: 'Kit';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
  types: Array<Type>;
  formations: Array<Formation>;
};

export type Type = {
  __typename?: 'Type';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  kit?: Maybe<Kit>;
  representations: Array<Representation>;
  ports: Array<Port>;
  qualities: Array<Quality>;
  pieces: Array<Piece>;
};

export type Representation = {
  __typename?: 'Representation';
  url: Scalars['String']['output'];
  lod?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Type>;
  tags: Array<Scalars['String']['output']>;
};

export type Port = {
  __typename?: 'Port';
  type?: Maybe<Type>;
  specifiers: Array<Specifier>;
  attractings: Array<Attraction>;
  attracteds: Array<Attraction>;
  plane?: Maybe<Plane>;
};

export type Specifier = {
  __typename?: 'Specifier';
  context: Scalars['String']['output'];
  group: Scalars['String']['output'];
  port?: Maybe<Port>;
};

export type Attraction = {
  __typename?: 'Attraction';
  formation?: Maybe<Formation>;
  attracting: Side;
  attracted: Side;
};

export type Formation = {
  __typename?: 'Formation';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  kit?: Maybe<Kit>;
  pieces: Array<Piece>;
  attractions: Array<Attraction>;
  qualities: Array<Quality>;
};

export type Piece = {
  __typename?: 'Piece';
  type?: Maybe<Type>;
  formation?: Maybe<Formation>;
  attractings: Array<Attraction>;
  attracteds: Array<Attraction>;
  id: Scalars['String']['output'];
};

export type Quality = {
  __typename?: 'Quality';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
  unit?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Type>;
  formation?: Maybe<Formation>;
};

export type Side = {
  __typename?: 'Side';
  piece: PieceSide;
};

export type PieceSide = {
  __typename?: 'PieceSide';
  id: Scalars['String']['output'];
  type: TypePieceSide;
};

export type TypePieceSide = {
  __typename?: 'TypePieceSide';
  port?: Maybe<Port>;
};

export type Plane = {
  __typename?: 'Plane';
  origin: Point;
  xAxis: Vector;
  yAxis: Vector;
};

export type Point = {
  __typename?: 'Point';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
  z: Scalars['Float']['output'];
};

export type Vector = {
  __typename?: 'Vector';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
  z: Scalars['Float']['output'];
};

export enum LoadLocalKitError {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToReadKit = 'NO_PERMISSION_TO_READ_KIT'
}

export type FormationToSceneFromLocalKitResponse = {
  __typename?: 'FormationToSceneFromLocalKitResponse';
  scene?: Maybe<Scene>;
  error?: Maybe<FormationToSceneFromLocalKitResponseError>;
};

export type Scene = {
  __typename?: 'Scene';
  objects: Array<Maybe<Object>>;
};

export type Object = {
  __typename?: 'Object';
  piece?: Maybe<Piece>;
  plane?: Maybe<Plane>;
  parent?: Maybe<Object>;
};

export type FormationToSceneFromLocalKitResponseError = {
  __typename?: 'FormationToSceneFromLocalKitResponseError';
  code: FormationToSceneFromLocalKitResponseErrorCode;
  message?: Maybe<Scalars['String']['output']>;
};

export enum FormationToSceneFromLocalKitResponseErrorCode {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToReadKit = 'NO_PERMISSION_TO_READ_KIT',
  FormationDoesNotExist = 'FORMATION_DOES_NOT_EXIST'
}

export type FormationIdInput = {
  name: Scalars['String']['input'];
  qualities?: InputMaybe<Array<QualityInput>>;
};

export type QualityInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLocalKit?: Maybe<CreateLocalKitMutation>;
  updateLocalKitMetadata?: Maybe<UpdateLocalKitMetadataMutation>;
  deleteLocalKit?: Maybe<DeleteLocalKitMutation>;
  addTypeToLocalKit?: Maybe<AddTypeToLocalKitMutation>;
  removeTypeFromLocalKit?: Maybe<RemoveTypeFromLocalKitMutation>;
  addFormationToLocalKit?: Maybe<AddFormationToLocalKitMutation>;
  removeFormationFromLocalKit?: Maybe<RemoveFormationFromLocalKitMutation>;
};


export type MutationCreateLocalKitArgs = {
  directory: Scalars['String']['input'];
  kitInput: KitInput;
};


export type MutationUpdateLocalKitMetadataArgs = {
  directory: Scalars['String']['input'];
  kitMetadataInput: KitMetadataInput;
};


export type MutationDeleteLocalKitArgs = {
  directory: Scalars['String']['input'];
};


export type MutationAddTypeToLocalKitArgs = {
  directory: Scalars['String']['input'];
  typeInput: TypeInput;
};


export type MutationRemoveTypeFromLocalKitArgs = {
  directory: Scalars['String']['input'];
  typeId: TypeIdInput;
};


export type MutationAddFormationToLocalKitArgs = {
  directory: Scalars['String']['input'];
  formationInput: FormationInput;
};


export type MutationRemoveFormationFromLocalKitArgs = {
  directory: Scalars['String']['input'];
  formationId: FormationIdInput;
};

export type CreateLocalKitMutation = {
  __typename?: 'CreateLocalKitMutation';
  kit?: Maybe<Kit>;
  error?: Maybe<CreateLocalKitError>;
};

export type CreateLocalKitError = {
  __typename?: 'CreateLocalKitError';
  code: CreateLocalKitErrorCode;
  message?: Maybe<Scalars['String']['output']>;
};

export enum CreateLocalKitErrorCode {
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryAlreadyContainsAKit = 'DIRECTORY_ALREADY_CONTAINS_A_KIT',
  NoPermissionToCreateDirectory = 'NO_PERMISSION_TO_CREATE_DIRECTORY',
  NoPermissionToCreateKit = 'NO_PERMISSION_TO_CREATE_KIT',
  KitInputIsInvalid = 'KIT_INPUT_IS_INVALID'
}

export type KitInput = {
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<TypeInput>>;
  formations?: InputMaybe<Array<FormationInput>>;
};

export type TypeInput = {
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  representations: Array<RepresentationInput>;
  ports: Array<PortInput>;
  qualities?: InputMaybe<Array<QualityInput>>;
};

export type RepresentationInput = {
  url: Scalars['String']['input'];
  lod?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PortInput = {
  plane: PlaneInput;
  specifiers?: InputMaybe<Array<SpecifierInput>>;
};

export type PlaneInput = {
  origin: PointInput;
  xAxis: VectorInput;
  yAxis: VectorInput;
};

export type PointInput = {
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
  z: Scalars['Float']['input'];
};

export type VectorInput = {
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
  z: Scalars['Float']['input'];
};

export type SpecifierInput = {
  context: Scalars['String']['input'];
  group: Scalars['String']['input'];
};

export type FormationInput = {
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  pieces: Array<PieceInput>;
  attractions: Array<AttractionInput>;
  qualities?: InputMaybe<Array<QualityInput>>;
};

export type PieceInput = {
  id: Scalars['String']['input'];
  type: TypeIdInput;
};

export type TypeIdInput = {
  name: Scalars['String']['input'];
  qualities?: InputMaybe<Array<QualityInput>>;
};

export type AttractionInput = {
  attracting: SideInput;
  attracted: SideInput;
};

export type SideInput = {
  piece: PieceSideInput;
};

export type PieceSideInput = {
  id: Scalars['String']['input'];
  type: TypePieceSideInput;
};

export type TypePieceSideInput = {
  port: PortIdInput;
};

export type PortIdInput = {
  specifiers?: InputMaybe<Array<SpecifierInput>>;
};

export type UpdateLocalKitMetadataMutation = {
  __typename?: 'UpdateLocalKitMetadataMutation';
  kit?: Maybe<Kit>;
  error?: Maybe<UpdateLocalKitMetadataError>;
};

export type UpdateLocalKitMetadataError = {
  __typename?: 'UpdateLocalKitMetadataError';
  code: UpdateLocalKitMetadataErrorCode;
  message?: Maybe<Scalars['String']['output']>;
};

export enum UpdateLocalKitMetadataErrorCode {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToUpdateKit = 'NO_PERMISSION_TO_UPDATE_KIT',
  KitMetadataIsInvalid = 'KIT_METADATA_IS_INVALID'
}

export type KitMetadataInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteLocalKitMutation = {
  __typename?: 'DeleteLocalKitMutation';
  error?: Maybe<DeleteLocalKitError>;
};

export enum DeleteLocalKitError {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToDeleteKit = 'NO_PERMISSION_TO_DELETE_KIT'
}

export type AddTypeToLocalKitMutation = {
  __typename?: 'AddTypeToLocalKitMutation';
  type?: Maybe<Type>;
  error?: Maybe<AddTypeToLocalKitError>;
};

export type AddTypeToLocalKitError = {
  __typename?: 'AddTypeToLocalKitError';
  code: AddTypeToLocalKitErrorCode;
  message?: Maybe<Scalars['String']['output']>;
};

export enum AddTypeToLocalKitErrorCode {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
  TypeInputIsInvalid = 'TYPE_INPUT_IS_INVALID'
}

export type RemoveTypeFromLocalKitMutation = {
  __typename?: 'RemoveTypeFromLocalKitMutation';
  error?: Maybe<RemoveTypeFromLocalKitError>;
};

export type RemoveTypeFromLocalKitError = {
  __typename?: 'RemoveTypeFromLocalKitError';
  code: RemoveTypeFromLocalKitErrorCode;
  message?: Maybe<Scalars['String']['output']>;
};

export enum RemoveTypeFromLocalKitErrorCode {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
  TypeDoesNotExist = 'TYPE_DOES_NOT_EXIST',
  FormationDependsOnType = 'FORMATION_DEPENDS_ON_TYPE'
}

export type AddFormationToLocalKitMutation = {
  __typename?: 'AddFormationToLocalKitMutation';
  formation?: Maybe<Formation>;
  error?: Maybe<AddFormationToLocalKitError>;
};

export type AddFormationToLocalKitError = {
  __typename?: 'AddFormationToLocalKitError';
  code: AddFormationToLocalKitErrorCode;
  message?: Maybe<Scalars['String']['output']>;
};

export enum AddFormationToLocalKitErrorCode {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
  FormationInputIsInvalid = 'FORMATION_INPUT_IS_INVALID'
}

export type RemoveFormationFromLocalKitMutation = {
  __typename?: 'RemoveFormationFromLocalKitMutation';
  error?: Maybe<RemoveFormationFromLocalKitError>;
};

export type RemoveFormationFromLocalKitError = {
  __typename?: 'RemoveFormationFromLocalKitError';
  code: RemoveFormationFromLocalKitErrorCode;
  message?: Maybe<Scalars['String']['output']>;
};

export enum RemoveFormationFromLocalKitErrorCode {
  DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
  DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
  DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
  NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
  FormationDoesNotExist = 'FORMATION_DOES_NOT_EXIST'
}

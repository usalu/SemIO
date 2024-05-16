import './App.scss'
import tailwindConfig from '../../../tailwind.config.js'
import React, {
    useState,
    forwardRef,
    Ref,
    useMemo,
    Fragment,
    Suspense,
    useEffect,
    SVGProps,
    useImperativeHandle,
    useRef,
    ReactNode,
    createContext,
    useContext
} from 'react'
import { createPortal } from 'react-dom'
import { KBarAnimator, KBarPortal, KBarPositioner, KBarSearch } from 'kbar'
import { KBarResults, useMatches } from 'kbar'
import { ActionId, ActionImpl } from 'kbar'
import {
    Avatar,
    Breadcrumb,
    Button,
    Col,
    Collapse,
    ConfigProvider,
    Divider,
    Flex,
    Layout,
    Row,
    Select,
    Space,
    Tabs,
    message,
    MenuItem,
    Form,
    Radio,
    Input,
    FormProps,
    Tooltip,
    Modal,
    FloatButton,
    Badge
} from 'antd'
import enUS from 'antd/lib/calendar/locale/en_US'
import { Mesh, Line, Matrix4, MeshBasicMaterial, LineBasicMaterial, Color } from 'three'
import { Canvas, ThreeEvent, useLoader } from '@react-three/fiber'
import {
    OrbitControls,
    useGLTF,
    Select as ThreeSelect,
    GizmoHelper,
    GizmoViewport,
    TransformControls,
    Grid,
    Line as DreiLine,
    Cone as DreiCone,
    Box as DreiBox,
    Stage
} from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { INode, IEdge, IGraphInput, SelectionT, IPoint, GraphView } from 'react-digraph'
import SVG from 'react-inlinesvg'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import MinimizeSharpIcon from '@mui/icons-material/MinimizeSharp'
import FullscreenSharpIcon from '@mui/icons-material/FullscreenSharp'
import FullscreenExitSharpIcon from '@mui/icons-material/FullscreenExitSharp'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import FolderSharpIcon from '@mui/icons-material/FolderSharp'
import FileUploadSharpIcon from '@mui/icons-material/FileUploadSharp'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty'
import { DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
    Attraction,
    AttractionInput,
    Formation,
    FormationIdInput,
    FormationInput,
    Piece,
    PieceInput,
    Plane,
    PlaneInput,
    Point,
    Port,
    PortInput,
    Representation,
    Type,
    TypeIdInput,
    TypeInput,
    Vector
} from './semio.d'
import { convertPlaneToTransform, convertTransformToPlane, formationToHierarchies } from './semio'
import adjectives from './assets/adjectives'
import animals from './assets/animals'
import {
    RootState,
    addView,
    loadLocalKit,
    selectKit,
    selectTypes,
    selectViews,
    selectFormationView,
    FormationView,
    IArtifactView,
    ViewKind,
    selectView,
    TypeView,
    selectFormations,
    selectType,
    updateFormation,
    updateFormationSelection,
    selectPorts,
    ISelectionFormation
} from './store'
import { n } from 'vitest/dist/reporters-LqC_WI4d'
import { ThemeConfig } from 'antd/lib'

// Copilot
// export type Maybe<T> = T | null;
// export type InputMaybe<T> = Maybe<T>;
// export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
// export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
// export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
// export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
// export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

// export type Scalars = {
//   ID: { input: string; output: string; }
//   String: { input: string; output: string; }
//   Boolean: { input: boolean; output: boolean; }
//   Int: { input: number; output: number; }
//   Float: { input: number; output: number; }
//   /**
//    * The `DateTime` scalar type represents a DateTime
//    * value as specified by
//    * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
//    */
//   DateTime: { input: any; output: any; }
// };

// export type Query = {
//   __typename?: 'Query';
//   loadLocalKit?: Maybe<LoadLocalKitResponse>;
//   formationToSceneFromLocalKit?: Maybe<FormationToSceneFromLocalKitResponse>;
// };

// export type QueryLoadLocalKitArgs = {
//   directory: Scalars['String']['input'];
// };

// export type QueryFormationToSceneFromLocalKitArgs = {
//   directory: Scalars['String']['input'];
//   formationIdInput: FormationIdInput;
// };

// export type LoadLocalKitResponse = {
//   __typename?: 'LoadLocalKitResponse';
//   kit?: Maybe<Kit>;
//   error?: Maybe<LoadLocalKitError>;
// };

// export type Kit = {
//   __typename?: 'Kit';
//   name: Scalars['String']['output'];
//   description: Scalars['String']['output'];
//   icon: Scalars['String']['output'];
//   createdAt: Scalars['DateTime']['output'];
//   lastUpdateAt: Scalars['DateTime']['output'];
//   url: Scalars['String']['output'];
//   types: Array<Type>;
//   formations: Array<Formation>;
// };

// export type Type = {
//   __typename?: 'Type';
//   name: Scalars['String']['output'];
//   description: Scalars['String']['output'];
//   icon: Scalars['String']['output'];
//   variant: Scalars['String']['output'];
//   unit: Scalars['String']['output'];
//   createdAt: Scalars['DateTime']['output'];
//   lastUpdateAt: Scalars['DateTime']['output'];
//   kit?: Maybe<Kit>;
//   representations: Array<Representation>;
//   ports: Array<Port>;
//   qualities: Array<Quality>;
//   pieces: Array<Piece>;
// };

// export type Representation = {
//   __typename?: 'Representation';
//   url: Scalars['String']['output'];
//   lod: Scalars['String']['output'];
//   type?: Maybe<Type>;
//   tags: Array<Scalars['String']['output']>;
// };

// export type Port = {
//   __typename?: 'Port';
//   plane?: Maybe<Plane>;
//   type?: Maybe<Type>;
//   locators: Array<Locator>;
//   attractings: Array<Attraction>;
//   attracteds: Array<Attraction>;
//   id: Scalars['String']['output'];
// };

// export type Plane = {
//   __typename?: 'Plane';
//   port?: Maybe<Port>;
//   rootPiece?: Maybe<Piece>;
//   origin: Point;
//   xAxis: Vector;
//   yAxis: Vector;
// };

// export type Piece = {
//   __typename?: 'Piece';
//   type?: Maybe<Type>;
//   formation?: Maybe<Formation>;
//   attractings: Array<Attraction>;
//   attracteds: Array<Attraction>;
//   id: Scalars['String']['output'];
//   root: RootPiece;
//   diagram: DiagramPiece;
// };

// export type Formation = {
//   __typename?: 'Formation';
//   name: Scalars['String']['output'];
//   description: Scalars['String']['output'];
//   icon: Scalars['String']['output'];
//   variant: Scalars['String']['output'];
//   unit: Scalars['String']['output'];
//   createdAt: Scalars['DateTime']['output'];
//   lastUpdateAt: Scalars['DateTime']['output'];
//   kit?: Maybe<Kit>;
//   pieces: Array<Piece>;
//   attractions: Array<Attraction>;
//   qualities: Array<Quality>;
// };

// export type Attraction = {
//   __typename?: 'Attraction';
//   formation?: Maybe<Formation>;
//   attracting: Side;
//   attracted: Side;
// };

// /** A side of an attraction. */
// export type Side = {
//   __typename?: 'Side';
//   piece: PieceSide;
// };

// /** The piece of a side of an attraction. */
// export type PieceSide = {
//   __typename?: 'PieceSide';
//   id: Scalars['String']['output'];
//   type: TypePieceSide;
// };

// /** The port of a type of a piece of a side of an attraction. */
// export type TypePieceSide = {
//   __typename?: 'TypePieceSide';
//   port?: Maybe<Port>;
// };

// export type Quality = {
//   __typename?: 'Quality';
//   name: Scalars['String']['output'];
//   value: Scalars['String']['output'];
//   unit: Scalars['String']['output'];
//   type?: Maybe<Type>;
//   formation?: Maybe<Formation>;
// };

// /** The plane of the root piece of a formation. */
// export type RootPiece = {
//   __typename?: 'RootPiece';
//   plane: Plane;
// };

// /** The point of a diagram of a piece. */
// export type DiagramPiece = {
//   __typename?: 'DiagramPiece';
//   point: ScreenPoint;
// };

// export type ScreenPoint = {
//   __typename?: 'ScreenPoint';
//   x: Scalars['Int']['output'];
//   y: Scalars['Int']['output'];
// };

// export type Point = {
//   __typename?: 'Point';
//   x: Scalars['Float']['output'];
//   y: Scalars['Float']['output'];
//   z: Scalars['Float']['output'];
// };

// export type Vector = {
//   __typename?: 'Vector';
//   x: Scalars['Float']['output'];
//   y: Scalars['Float']['output'];
//   z: Scalars['Float']['output'];
// };

// export type Locator = {
//   __typename?: 'Locator';
//   group: Scalars['String']['output'];
//   subgroup: Scalars['String']['output'];
//   port?: Maybe<Port>;
// };

// export enum LoadLocalKitError {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToReadKit = 'NO_PERMISSION_TO_READ_KIT'
// }

// export type FormationToSceneFromLocalKitResponse = {
//   __typename?: 'FormationToSceneFromLocalKitResponse';
//   scene?: Maybe<Scene>;
//   error?: Maybe<FormationToSceneFromLocalKitResponseError>;
// };

// export type Scene = {
//   __typename?: 'Scene';
//   objects: Array<Maybe<Object>>;
//   formation?: Maybe<Formation>;
// };

// export type Object = {
//   __typename?: 'Object';
//   piece?: Maybe<Piece>;
//   plane?: Maybe<Plane>;
//   parent?: Maybe<Object>;
// };

// export type FormationToSceneFromLocalKitResponseError = {
//   __typename?: 'FormationToSceneFromLocalKitResponseError';
//   code: FormationToSceneFromLocalKitResponseErrorCode;
//   message?: Maybe<Scalars['String']['output']>;
// };

// export enum FormationToSceneFromLocalKitResponseErrorCode {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToReadKit = 'NO_PERMISSION_TO_READ_KIT',
//   FormationDoesNotExist = 'FORMATION_DOES_NOT_EXIST'
// }

// export type FormationIdInput = {
//   name: Scalars['String']['input'];
//   variant?: InputMaybe<Scalars['String']['input']>;
// };

// export type Mutation = {
//   __typename?: 'Mutation';
//   createLocalKit?: Maybe<CreateLocalKitMutation>;
//   updateLocalKitMetadata?: Maybe<UpdateLocalKitMetadataMutation>;
//   deleteLocalKit?: Maybe<DeleteLocalKitMutation>;
//   addTypeToLocalKit?: Maybe<AddTypeToLocalKitMutation>;
//   removeTypeFromLocalKit?: Maybe<RemoveTypeFromLocalKitMutation>;
//   addFormationToLocalKit?: Maybe<AddFormationToLocalKitMutation>;
//   removeFormationFromLocalKit?: Maybe<RemoveFormationFromLocalKitMutation>;
// };

// export type MutationCreateLocalKitArgs = {
//   directory: Scalars['String']['input'];
//   kitInput: KitInput;
// };

// export type MutationUpdateLocalKitMetadataArgs = {
//   directory: Scalars['String']['input'];
//   kitMetadataInput: KitMetadataInput;
// };

// export type MutationDeleteLocalKitArgs = {
//   directory: Scalars['String']['input'];
// };

// export type MutationAddTypeToLocalKitArgs = {
//   directory: Scalars['String']['input'];
//   typeInput: TypeInput;
// };

// export type MutationRemoveTypeFromLocalKitArgs = {
//   directory: Scalars['String']['input'];
//   typeId: TypeIdInput;
// };

// export type MutationAddFormationToLocalKitArgs = {
//   directory: Scalars['String']['input'];
//   formationInput: FormationInput;
// };

// export type MutationRemoveFormationFromLocalKitArgs = {
//   directory: Scalars['String']['input'];
//   formationId: FormationIdInput;
// };

// export type CreateLocalKitMutation = {
//   __typename?: 'CreateLocalKitMutation';
//   kit?: Maybe<Kit>;
//   error?: Maybe<CreateLocalKitError>;
// };

// export type CreateLocalKitError = {
//   __typename?: 'CreateLocalKitError';
//   code: CreateLocalKitErrorCode;
//   message?: Maybe<Scalars['String']['output']>;
// };

// export enum CreateLocalKitErrorCode {
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryAlreadyContainsAKit = 'DIRECTORY_ALREADY_CONTAINS_A_KIT',
//   NoPermissionToCreateDirectory = 'NO_PERMISSION_TO_CREATE_DIRECTORY',
//   NoPermissionToCreateKit = 'NO_PERMISSION_TO_CREATE_KIT',
//   KitInputIsInvalid = 'KIT_INPUT_IS_INVALID'
// }

// export type KitInput = {
//   name: Scalars['String']['input'];
//   description?: InputMaybe<Scalars['String']['input']>;
//   icon?: InputMaybe<Scalars['String']['input']>;
//   url?: InputMaybe<Scalars['String']['input']>;
//   types?: InputMaybe<Array<TypeInput>>;
//   formations?: InputMaybe<Array<FormationInput>>;
// };

// export type TypeInput = {
//   name: Scalars['String']['input'];
//   description?: InputMaybe<Scalars['String']['input']>;
//   icon?: InputMaybe<Scalars['String']['input']>;
//   variant?: InputMaybe<Scalars['String']['input']>;
//   unit: Scalars['String']['input'];
//   representations: Array<RepresentationInput>;
//   ports: Array<PortInput>;
//   qualities?: InputMaybe<Array<QualityInput>>;
// };

// export type RepresentationInput = {
//   url: Scalars['String']['input'];
//   lod?: InputMaybe<Scalars['String']['input']>;
//   tags?: InputMaybe<Array<Scalars['String']['input']>>;
// };

// export type PortInput = {
//   id?: InputMaybe<Scalars['String']['input']>;
//   plane: PlaneInput;
//   locators?: InputMaybe<Array<LocatorInput>>;
// };

// export type PlaneInput = {
//   origin: PointInput;
//   xAxis: VectorInput;
//   yAxis: VectorInput;
// };

// export type PointInput = {
//   x: Scalars['Float']['input'];
//   y: Scalars['Float']['input'];
//   z: Scalars['Float']['input'];
// };

// export type VectorInput = {
//   x: Scalars['Float']['input'];
//   y: Scalars['Float']['input'];
//   z: Scalars['Float']['input'];
// };

// export type LocatorInput = {
//   group: Scalars['String']['input'];
//   subgroup?: InputMaybe<Scalars['String']['input']>;
// };

// export type QualityInput = {
//   name: Scalars['String']['input'];
//   value?: InputMaybe<Scalars['String']['input']>;
//   unit?: InputMaybe<Scalars['String']['input']>;
// };

// export type FormationInput = {
//   name: Scalars['String']['input'];
//   description?: InputMaybe<Scalars['String']['input']>;
//   icon?: InputMaybe<Scalars['String']['input']>;
//   variant?: InputMaybe<Scalars['String']['input']>;
//   unit: Scalars['String']['input'];
//   pieces: Array<PieceInput>;
//   attractions: Array<AttractionInput>;
//   qualities?: InputMaybe<Array<QualityInput>>;
// };

// export type PieceInput = {
//   id: Scalars['String']['input'];
//   type: TypeIdInput;
//   root?: InputMaybe<RootPieceInput>;
//   diagram: DiagramPieceInput;
// };

// export type TypeIdInput = {
//   name: Scalars['String']['input'];
//   variant?: InputMaybe<Scalars['String']['input']>;
// };

// export type RootPieceInput = {
//   plane: PlaneInput;
// };

// export type DiagramPieceInput = {
//   point: ScreenPointInput;
// };

// export type ScreenPointInput = {
//   x: Scalars['Int']['input'];
//   y: Scalars['Int']['input'];
// };

// export type AttractionInput = {
//   attracting: SideInput;
//   attracted: SideInput;
// };

// export type SideInput = {
//   piece: PieceSideInput;
// };

// export type PieceSideInput = {
//   id: Scalars['String']['input'];
//   type?: InputMaybe<TypePieceSideInput>;
// };

// export type TypePieceSideInput = {
//   port?: InputMaybe<PortIdInput>;
// };

// export type PortIdInput = {
//   id?: InputMaybe<Scalars['String']['input']>;
// };

// export type UpdateLocalKitMetadataMutation = {
//   __typename?: 'UpdateLocalKitMetadataMutation';
//   kit?: Maybe<Kit>;
//   error?: Maybe<UpdateLocalKitMetadataError>;
// };

// export type UpdateLocalKitMetadataError = {
//   __typename?: 'UpdateLocalKitMetadataError';
//   code: UpdateLocalKitMetadataErrorCode;
//   message?: Maybe<Scalars['String']['output']>;
// };

// export enum UpdateLocalKitMetadataErrorCode {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToUpdateKit = 'NO_PERMISSION_TO_UPDATE_KIT',
//   KitMetadataIsInvalid = 'KIT_METADATA_IS_INVALID'
// }

// export type KitMetadataInput = {
//   name?: InputMaybe<Scalars['String']['input']>;
//   description?: InputMaybe<Scalars['String']['input']>;
//   icon?: InputMaybe<Scalars['String']['input']>;
//   url?: InputMaybe<Scalars['String']['input']>;
// };

// export type DeleteLocalKitMutation = {
//   __typename?: 'DeleteLocalKitMutation';
//   error?: Maybe<DeleteLocalKitError>;
// };

// export enum DeleteLocalKitError {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToDeleteKit = 'NO_PERMISSION_TO_DELETE_KIT'
// }

// export type AddTypeToLocalKitMutation = {
//   __typename?: 'AddTypeToLocalKitMutation';
//   type?: Maybe<Type>;
//   error?: Maybe<AddTypeToLocalKitError>;
// };

// export type AddTypeToLocalKitError = {
//   __typename?: 'AddTypeToLocalKitError';
//   code: AddTypeToLocalKitErrorCode;
//   message?: Maybe<Scalars['String']['output']>;
// };

// export enum AddTypeToLocalKitErrorCode {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
//   TypeInputIsInvalid = 'TYPE_INPUT_IS_INVALID'
// }

// export type RemoveTypeFromLocalKitMutation = {
//   __typename?: 'RemoveTypeFromLocalKitMutation';
//   error?: Maybe<RemoveTypeFromLocalKitError>;
// };

// export type RemoveTypeFromLocalKitError = {
//   __typename?: 'RemoveTypeFromLocalKitError';
//   code: RemoveTypeFromLocalKitErrorCode;
//   message?: Maybe<Scalars['String']['output']>;
// };

// export enum RemoveTypeFromLocalKitErrorCode {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
//   TypeDoesNotExist = 'TYPE_DOES_NOT_EXIST',
//   FormationDependsOnType = 'FORMATION_DEPENDS_ON_TYPE'
// }

// export type AddFormationToLocalKitMutation = {
//   __typename?: 'AddFormationToLocalKitMutation';
//   formation?: Maybe<Formation>;
//   error?: Maybe<AddFormationToLocalKitError>;
// };

// export type AddFormationToLocalKitError = {
//   __typename?: 'AddFormationToLocalKitError';
//   code: AddFormationToLocalKitErrorCode;
//   message?: Maybe<Scalars['String']['output']>;
// };

// export enum AddFormationToLocalKitErrorCode {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
//   FormationInputIsInvalid = 'FORMATION_INPUT_IS_INVALID'
// }

// export type RemoveFormationFromLocalKitMutation = {
//   __typename?: 'RemoveFormationFromLocalKitMutation';
//   error?: Maybe<RemoveFormationFromLocalKitError>;
// };

// export type RemoveFormationFromLocalKitError = {
//   __typename?: 'RemoveFormationFromLocalKitError';
//   code: RemoveFormationFromLocalKitErrorCode;
//   message?: Maybe<Scalars['String']['output']>;
// };

// export enum RemoveFormationFromLocalKitErrorCode {
//   DirectoryDoesNotExist = 'DIRECTORY_DOES_NOT_EXIST',
//   DirectoryIsNotADirectory = 'DIRECTORY_IS_NOT_A_DIRECTORY',
//   DirectoryHasNoKit = 'DIRECTORY_HAS_NO_KIT',
//   NoPermissionToModifyKit = 'NO_PERMISSION_TO_MODIFY_KIT',
//   FormationDoesNotExist = 'FORMATION_DOES_NOT_EXIST'
// }

const { Header, Content, Footer, Sider } = Layout

const {
    theme: { colors }
} = tailwindConfig

const sketchpadTheme = {
    // algorithm: [theme.darkAlgorithm],
    token: {
        // primary
        colorPrimary: colors.light,
        colorPrimaryBg: colors.light,
        colorPrimaryBgHover: colors.light,
        colorPrimaryBorder: colors.light,
        colorPrimaryBorderHover: colors.light,
        colorPrimaryHover: colors.light, // e.g. hover primary button
        colorPrimaryActive: colors.light,
        colorPrimaryText: colors.light,
        colorPrimaryTextHover: colors.light,
        colorPrimaryTextActive: colors.light,
        // text
        colorText: colors.light, // e.g. title of collapse, leaf of breadcrumb
        colorTextSecondary: colors.lightGrey,
        colorTextTertiary: colors.lightGrey, // e.g. x on close button of tab
        colorTextQuaternary: colors.lightGrey, // e.g. placeholder text
        // border
        colorBorder: colors.light,
        colorBorderSecondary: colors.light,
        // fill
        colorFill: colors.light,
        colorFillSecondary: colors.light,
        colorFillTertiary: colors.light,
        colorFillQuaternary: colors.darkGrey, // e.g. background of collapse title
        // background
        colorBgContainer: colors.darkGrey, // e.g. active tab, collapse content box
        colorBgElevated: colors.grey, // e.g. background selected menu
        colorBgLayout: colors.light,
        colorBgSpotlight: colors.grey, // e.g background of tooltip
        colorBgMask: colors.light,
        colorBgTextActive: colors.light,
        colorBgBase: colors.light,
        controlItemBgHover: colors.light,
        // special colors
        colorError: colors.danger,
        colorWarning: colors.warning,
        colorInfo: colors.info,
        colorSuccess: colors.success,
        fontFamily: 'Anta, sans-serif',
        boxShadow: 'none',
        boxShadowSecondary: 'none',
        boxShadowTertiary: 'none',
        wireframe: false,
        borderRadius: 0,
        lineType: 'none',
        lineWidth: 0,
        // TODO: Fast motion without modal freeze
        // motionUnit: 0.001, // Makes modal freeze somehow and overwriting it on Modal doesn't work.
    },
    components: {
        Button: {
            borderColorDisabled: colors.light,
            dangerColor: colors.light,
            defaultActiveBg: colors.light,
            defaultActiveBorderColor: colors.light,
            defaultActiveColor: colors.light,
            defaultBg: colors.light,
            defaultBorderColor: colors.light,
            defaultColor: colors.lightGrey, // e.g. normal state of buttons
            defaultGhostBorderColor: colors.light,
            defaultGhostColor: colors.light,
            defaultHoverBg: colors.darkGrey, // e.g. hover over window control buttons
            ghostBg: colors.light,
            linkHoverBg: colors.light,
            primaryColor: colors.light,
            textHoverBg: colors.light
        },
        FloatButton: {
        },
        Layout: {
            bodyBg: colors.dark,
            footerBg: colors.grey, //
            headerBg: colors.grey, // e.g. space between tabs and content
            headerColor: colors.light,
            lightSiderBg: colors.light,
            lightTriggerBg: colors.light,
            lightTriggerColor: colors.light,
            siderBg: colors.darkGrey, //
            triggerBg: colors.light,
            triggerColor: colors.light,
            headerPadding: '0px 0px'
        },
        Tabs: {
            cardBg: colors.grey, // background of unselected tabs
            inkBarColor: colors.light,
            itemActiveColor: colors.light,
            itemColor: colors.lightGrey, // text and fill of unselected tabs
            itemHoverColor: colors.light,
            itemSelectedColor: colors.light,
            cardGutter: 0,
            cardHeight: 38,
            cardPadding: '0 16px',
            verticalItemMargin: '0'
        },
        Divider: {
            lineWidth: 0.25,
            verticalMarginInline: 0
        },
        Avatar: {
            groupBorderColor: colors.light
        },
        Collapse: {
            headerBg: colors.darkGrey, //
            headerPadding: '0 0px',
            contentBg: colors.darkGrey, //
            contentPadding: '0 0px'
        },
        Select: {
            clearBg: colors.lightGrey,
            multipleItemBg: colors.darkGrey,
            optionActiveBg: colors.darkGrey,
            optionSelectedBg: colors.darkGrey,
            optionSelectedColor: colors.light,
            selectorBg: colors.darkGrey
        },
        Form: {
            labelColor: colors.lightGrey, // e.g. text of label
            labelRequiredMarkColor: colors.light
        },
        Radio: {
            buttonBg: colors.grey, //
            buttonCheckedBg: colors.lightGrey, //
            buttonCheckedBgDisabled: colors.light,
            buttonCheckedColorDisabled: colors.light,
            buttonColor: colors.lightGrey, // e.g. text of radio
            buttonSolidCheckedActiveBg: colors.light,
            buttonSolidCheckedColor: colors.light,
            buttonSolidCheckedHoverBg: colors.light,
            dotColorDisabled: colors.light
        },
        Tooltip: {},
    }
} as ThemeConfig

class SeededRandom {
    private seed: number

    constructor(seed: number) {
        this.seed = seed % 2147483647
        if (this.seed <= 0) this.seed += 2147483646
    }

    // Returns a pseudo-random number between 1 and 2^31 - 2
    next(): number {
        return (this.seed = (this.seed * 16807) % 2147483647)
    }

    // Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive)
    nextFloat(): number {
        return (this.next() - 1) / 2147483646
    }

    // Returns a pseudo-random number between 0 (inclusive) and max (exclusive)
    nextInt(max: number): number {
        return Math.floor(this.nextFloat() * max)
    }
}

class Generator {
    public static generateRandomId(seed: number | undefined): string {
        if (seed === undefined) {
            seed = Math.floor(Math.random() * 1000000)
        }
        const random = new SeededRandom(seed)

        let adjective = adjectives[random.nextInt(adjectives.length)]
        let animal = animals[random.nextInt(animals.length)]
        const number = random.nextInt(1000)

        adjective = adjective.charAt(0).toUpperCase() + adjective.slice(1)
        animal = animal.charAt(0).toUpperCase() + animal.slice(1)

        return `${adjective}${animal}${number}`
    }
}

const typeToString = (type: Type | TypeInput | TypeIdInput): string => {
    return `${type.name}##(${type.variant})`
}
const formationToString = (formation: Formation | FormationInput | FormationIdInput): string => {
    return `${formation.name}##(${formation.variant})`
}

function tinyKeyStringToHuman(string: string): string {
    return string
        .split('+')
        .map((key) => {
            if (key === '$mod') return 'Ctrl'
            if (key === 'Shift') return '⇧'
            return key
        })
        .join(' + ')
}

const ResultItem = forwardRef(
    (
        {
            action,
            active,
            currentRootActionId
        }: {
            action: ActionImpl
            active: boolean
            currentRootActionId: ActionId
        },
        ref: Ref<HTMLDivElement>
    ): JSX.Element => {
        const ancestors = useMemo(() => {
            if (!currentRootActionId) return action.ancestors
            const index = action.ancestors.findIndex(
                (ancestor) => ancestor.id === currentRootActionId
            )
            // +1 removes the currentRootAction; e.g.
            // if we are on the "Set theme" parent action,
            // the UI should not display "Set theme… > Dark"
            // but rather just "Dark"
            return action.ancestors.slice(index + 1)
        }, [action.ancestors, currentRootActionId])

        return (
            <div
                ref={ref}
                className={`flex justify-between px-4 rounded-md  ${active ? 'bg-primary text-dark' : 'bg-dark bg-opacity-50 text-light'}`}
            >
                <div className="description">
                    {action.icon && action.icon}
                    <div>
                        <div>
                            {ancestors.length > 0 &&
                                ancestors.map((ancestor) => (
                                    <Fragment key={ancestor.id}>
                                        <span>{ancestor.name}</span>
                                        <span>&rsaquo;</span>
                                    </Fragment>
                                ))}
                            <span>{action.name}</span>
                        </div>
                        {action.subtitle && <span>{action.subtitle}</span>}
                    </div>
                </div>
                {action.shortcut?.length ? (
                    <div className="shortcut">
                        {action.shortcut.map((sc) => (
                            <kbd key={sc}>{tinyKeyStringToHuman(sc)}</kbd>
                        ))}
                    </div>
                ) : null}
            </div>
        )
    }
)

ResultItem.displayName = 'ResultItem'

interface RenderResultsProps {
    className?: string
}

function RenderResults({ className }: RenderResultsProps): JSX.Element {
    const { results, rootActionId } = useMatches()

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className={active ? `${className} active` : className}>{item}</div>
                ) : (
                    <ResultItem action={item} active={active} currentRootActionId={rootActionId} />
                )
            }
        />
    )
}

function CommandBar(): JSX.Element {
    return (
        <KBarPortal>
            <KBarPositioner className="backdrop-blur-sm">
                <KBarAnimator className="w-2/3">
                    <KBarSearch className="w-full bg-light border-none p-4 rounded-2xl placeholder:text-dark focus:bg-primary focus:outline-none focus:placeholder:text-light selection:bg-secondary" />
                    <RenderResults className=" bg-light bg-opacity-50 rounded-md px-2 py-1 box-content" />
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    )
}

enum IconKind {
    Text,
    Svg,
    Image
}

function getIconData(dataUrl): [string, IconKind] {
    const svgStart = 'data:image/svg+xml;base64,'
    const pngStart = 'data:image/png;base64,'
    const jpegStart = 'data:image/jpeg;base64,'
    let kind
    let data
    if (dataUrl.startsWith(svgStart)) {
        kind = IconKind.Svg
        data = atob(dataUrl.substring(svgStart.length))
    } else if (dataUrl.startsWith(pngStart)) {
        kind = IconKind.Image
        // data = atob(dataUrl.substring(pngStart.length));
        data = dataUrl
    } else if (dataUrl.startsWith(jpegStart)) {
        kind = IconKind.Image
        // data = atob(dataUrl.substring(jpegStart.length));
        data = dataUrl
    } else {
        kind = IconKind.Text
        data = dataUrl
    }
    return [data, kind]
}

const turnBlackAndWhiteSvgSemiotic = (svgString: string, dark = false): string => {
    if (dark)
        return svgString
            .replace(/#000000/g, colors.light)
            .replace(/#000/g, colors.light)
            .replace(/black/g, colors.light)
            .replace(/#FFFFFF/g, colors.dark)
            .replace(/#FFF/g, colors.dark)
            .replace(/white/g, colors.dark)
    return svgString
        .replace(/#000000/g, colors.dark)
        .replace(/#000/g, colors.dark)
        .replace(/black/g, colors.dark)
        .replace(/#FFFFFF/g, colors.light)
        .replace(/#FFF/g, colors.light)
        .replace(/white/g, colors.light)
}

interface ArtifactAvatarProps {
    icon: string
    description?: ReactNode
    isSelected?: boolean
    draggableId?: string
}

const ArtifactAvatar = ({
    icon,
    description,
    isSelected,
    draggableId
}: ArtifactAvatarProps): JSX.Element => {
    const [data, kind] = getIconData(icon)
    const draggableProps = draggableId
        ? (() => {
              const { attributes, listeners, setNodeRef } = useDraggable({
                  id: draggableId
              })

              return {
                  ref: setNodeRef,
                  ...listeners,
                  ...attributes
              }
          })()
        : {}

    switch (kind) {
        case IconKind.Svg:
            return (
                <Tooltip placement="right" title={description}>
                    <Avatar
                        className={`font-sans cursor-pointer ${isSelected ? 'bg-primary text-light' : 'bg-light text-darkGrey'}`}
                        size={38}
                        {...draggableProps}
                    >
                        <SVG
                            src={turnBlackAndWhiteSvgSemiotic(data, isSelected)}
                            width="32"
                            height="32"
                        />
                    </Avatar>
                </Tooltip>
            )
        case IconKind.Image:
            return (
                <Tooltip placement="right" title={description}>
                    <Avatar
                        className={`cursor-pointer ${isSelected ? 'bg-primary opacity-50' : 'bg-light opacity-100'}`}
                        src={data}
                        size={38}
                        {...draggableProps}
                    ></Avatar>
                </Tooltip>
            )
        case IconKind.Text:
            return (
                <Tooltip placement="right" title={description}>
                    <Avatar
                        className={`font-sans cursor-pointer ${isSelected ? 'bg-primary text-light' : 'bg-light text-darkGrey'}`}
                        size={38}
                        {...draggableProps}
                    >
                        {data}
                    </Avatar>
                </Tooltip>
            )
    }
}


const getGroupNameFromClickEventGroupObject = (o: any): string => {
    if (o.name !== '') return o.name

    const childGroupWithId = o.children.find((element) => {
        if (element?.isGroup !== true) return false
        const childGroupId = getGroupNameFromClickEventGroupObject(element)
        return childGroupId !== ''
    })

    return childGroupWithId ? getGroupNameFromClickEventGroupObject(childGroupWithId) : ''
}

const Gizmo = (): JSX.Element => {
    return (
        <GizmoHelper
            alignment="bottom-right"
            margin={[80, 80]}
            >
            <GizmoViewport
                labels={['X', 'Z', '-Y']}
                axisColors={[colors.primary, colors.tertiary, colors.secondary]}
                // font="Anta"
                />
        </GizmoHelper>
)}

interface PlaneThreeProps {
    plane: Plane
    lineWidth?: number
    onSelect: (event: ThreeEvent<MouseEvent>) => void
}

const PlaneThree = ({ plane, lineWidth, onSelect }: PlaneThreeProps) => {
    if (!lineWidth) lineWidth = 1
    const groupRef = useRef();
    useEffect(() => {
        if (groupRef.current) {
            const transform = convertPlaneToTransform(plane, true)
            groupRef.current.applyMatrix4(transform)
        }
    }, [])
    return (
        <group name="plane" ref={groupRef}>
            <DreiLine
                // name="x-axis"
                points = {[[0, 0, 0],[1, 0, 0]]}
                color={colors.primary}
                lineWidth={lineWidth*2}
            />
            <DreiLine
                // name="y-axis"
                points = {[[0, 0, 0],[0, 0, -1]]}
                color={colors.secondary}
                lineWidth={lineWidth*2}
            />
            <DreiLine
                // name="z-axis"
                points = {[[0, 0, 0],[0, 1, 0]]}
                color={colors.tertiary}
                lineWidth={lineWidth*2}
            />
            <DreiLine
                points = {[[-1,0,-1],[1,0,-1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-1,0,-1],[-1,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-1,0,-0.666667],[1,0,-0.666667]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-1,0,-0.333333],[1,0,-0.333333]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-1,0,0.333333],[1,0,0.333333]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-1,0,0.666667],[1,0,0.666667]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-1,0,1],[1,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-0.666667,0,-1],[-0.666667,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-0.333333,0,-1],[-0.333333,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[0.333333,0,-1],[0.333333,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[0.666667,0,-1],[0.666667,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[1,0,-1],[1,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[0,0,0],[0,0,1]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiLine
                points = {[[-1,0,0],[0,0,0]]}	color={colors.grey}
                lineWidth={lineWidth}
            />
            <DreiBox
                args={[2.0, 1.0, 2.0]}
                position={[0, 0.5, 0]}
                material={new MeshBasicMaterial({ transparent: true, opacity: 0 })}
                onClick={(event) => {
                    onSelect(event)
                    event.stopPropagation()
                }}
            />
        </group>
    )
  }
  
interface PortThreeProps {
    port: Port | PortInput
    selected: boolean
    onSelect: (portId: string ,event: ThreeEvent<MouseEvent>) => void
}

const PortThree = ({ port, selected, onSelect }: PortThreeProps): JSX.Element => {
    const onSelectPlane = (event: ThreeEvent<MouseEvent>) : void => {
        onSelect(port.id, event)
    }
    return (
        <PlaneThree plane={port.plane} onSelect={onSelectPlane} lineWidth={selected ? 3 : 1}/>
    )
}

interface RepresentationThreeProps {
    representation: Representation
    color?: string
    id?: string
    plane?: Plane
}

const RepresentationThree = ({ representation, id, color, plane }: RepresentationThreeProps): JSX.Element => {
    const { blobUrls } = useContext(EditorContext)
    const representationThreeScene = useMemo(() => {
        const clone = useLoader(GLTFLoader, blobUrls[representation.url]).scene.clone()
        clone.traverse((object) => {
            if (object instanceof Mesh) {
                const meshColor = color ? new Color(color) : new Color(colors.lightGrey)
                object.material = new MeshBasicMaterial({ color: meshColor })
            }
            if (object instanceof Line) {
                const lineColor = new Color(colors.dark)
                object.material = new LineBasicMaterial({ color: lineColor })
            }
        })
        if (plane) {
            const transform = convertPlaneToTransform(plane)
            clone.applyMatrix4(transform)
        }
        return clone
    }, [representation.url, color, plane]);
    representationThreeScene.name = id
    return <primitive object={representationThreeScene} />
}

RepresentationThree.displayName = 'Representation'

interface PortSelectorProps {
    type: Type | TypeInput
    onChangePortId: (portId: string) => void
}

const PortSelector = ({ type, onChangePortId }: PortSelectorProps): JSX.Element => {
    const ports = type.ports

    const [selectedPortId, setSelectedPortId] = useState('')

    return (
        <div className="w-[350px] h-[350px]">
            <Canvas>
                <OrbitControls makeDefault />
                <Gizmo/>
                <RepresentationThree id={type.id} representation={type.representations.find((r) => r.url.endsWith('.glb'))} />
                {ports.map((port) => (
                    <PortThree
                        key={port.id}
                        port={port}
                        selected={selectedPortId === port.id}
                        onSelect={(portId, event) => {
                            setSelectedPortId(portId)
                            onChangePortId(portId)
                        }}
                    />
                ))}
            </Canvas>
        </div>
    )
}

interface AttractionPreview{
    attractingType: Type | TypeInput
    attractedType: Type | TypeInput
    attraction: Attraction | AttractionInput
}

const AttractionPreview = ({ attractingType, attractedType, attraction }: AttractionPreview): JSX.Element => {
    const attractingPort = 
        attraction ? attractingType.ports.find((port) => port.id === attraction.attracting.piece.type?.port?.id) : null
    const attractedPort = 
        attraction ? attractedType.ports.find((port) => port.id === attraction.attracted.piece.type?.port?.id) : null

    const parentTransform = attractingPort ? convertPlaneToTransform(attractingPort.plane) : new Matrix4()
    const childTransform = attractedPort ? convertPlaneToTransform(attractedPort.plane).invert() : new Matrix4()
    const attractedPlane = convertTransformToPlane(parentTransform.multiply(childTransform))
    return (
        <div className="w-[700px] h-[700px]">
            <Canvas>
                <OrbitControls makeDefault />
                <Gizmo/>
                { attraction ?
                <group>
                    { attractingPort ?
                        <RepresentationThree
                            id='attracting'
                            representation={attractingType.representations.find((r) => r.url.endsWith('.glb'))}
                        /> : null }
                    { attractedPort ?
                            <RepresentationThree
                                id='attracted'
                                representation={attractedType.representations.find((r) => r.url.endsWith('.glb'))}
                                plane = {attractedPlane}
                            /> : null }
                </group> : null}
            </Canvas>
        </div>
    )
}

interface AttractionBuilderProps {
    attractingType: Type | TypeInput
    attractedType: Type | TypeInput
    onAttractionChange: (attraction: AttractionInput) => void
}

const AttractionBuilder = ({ attractingType, attractedType, onAttractionChange }: AttractionBuilderProps): JSX.Element => {
    const [attractingPortId, setAttractingPortId] = useState('')
    const [attractedPortId, setAttractedPortId] = useState('')

    const attraction = {
        attracting: {
            piece: {
                type: {
                    name: attractingType.name,
                    variant: attractingType.variant ?? '',
                    port: {
                        id: attractingPortId
                    }
                }
            }
        },
        attracted: {
            piece: {
                type: {
                    name: attractedType.name,
                    variant: attractedType.variant ?? '',
                    port: {
                        id: attractedPortId
                    }
                }
            }
        }
    } as AttractionInput

    useEffect(() => {
        onAttractionChange(attraction)
    }, [attractingType, attractedType, attractingPortId, attractedPortId])

    return (
        <Flex>
            <Flex vertical>
                <PortSelector type={attractingType} onChangePortId={setAttractingPortId} />
                <Divider className="m-0"/>
                <PortSelector type={attractedType} onChangePortId={setAttractedPortId} />
            </Flex>
            <Divider className="h-auto" type="vertical" />
            <AttractionPreview attractingType={attractingType} attractedType={attractedType} attraction={attraction} />
        </Flex>
    )
}


const GraphConfig = {
    NodeTypes: {
        piece: {
            typeText: '',
            shapeId: '#piece',
            shape: (
                <symbol
                    className="piece"
                    viewBox="0 0 50 50"
                    height="40"
                    width="40"
                    id="piece"
                    key="0"
                >
                    <circle cx="25" cy="25" r="24"></circle>
                </symbol>
            )
        }
    },
    NodeSubtypes: {},
    EdgeTypes: {
        attraction: {
            shapeId: '#attraction',
            shape: (
                <symbol viewBox="0 0 50 50" id="attraction" key="0">
                    {/* <circle cx="25" cy="25" r="8" fill="currentColor"> </circle> */}
                </symbol>
            )
        }
    }
}

interface IPieceNode extends INode {
    piece: Piece | PieceInput
}

interface IAttractionEdge extends IEdge {
    attraction: Attraction | AttractionInput
}

export interface IDraft extends IGraphInput {
    name?: string
    description?: string
    icon?: string
    nodes: IPieceNode[]
    edges: IAttractionEdge[]
}

const NODE_KEY = 'id' // Allows D3 to correctly update DOM

const transformPieceToNode = (piece: Piece | PieceInput): IPieceNode => {
    return {
        id: piece.id,
        title: '',
        type: 'piece',
        x: piece.diagram.point.x,
        y: piece.diagram.point.y,
        piece
    }
}
const transformAttractionToEdge = (attraction: Attraction | AttractionInput): IAttractionEdge => {
    return {
        source: attraction.attracting.piece.id,
        target: attraction.attracted.piece.id,
        // label_from: attraction.attracting.piece.type?.port?.id === '' ? ' ' : attraction.attracting.piece.type?.port?.id,
        // label_to: attraction.attracted.piece.type?.port?.id === '' ? ' ' : attraction.attracted.piece.type?.port?.id,
        handleTooltipText: attraction.attracting.piece.type?.port?.id + ' -> ' + attraction.attracted.piece.type?.port?.id,
        type: 'attraction',
        attraction
    }
}

const transformFormationToGraph = (formation: Formation | FormationInput): IDraft => {
    const nodes = formation.pieces.map((piece) => transformPieceToNode(piece))

    const edges = formation.attractions.map((attraction) => transformAttractionToEdge(attraction))

    return {
        nodes,
        edges
    }
}

const transformSelectionToGraph = (formation: Formation | FormationInput, selection: ISelectionFormation): SelectionT => {
    const nodes = new Map<string, INode>()
    const edges = new Map<string, IEdge>()
    selection.piecesIds.forEach((pieceId) => {
        const piece = formation.pieces.find((p) => p.id === pieceId)
        if (piece) {
            nodes.set(piece.id, transformPieceToNode(piece))
        }
    })
    selection.attractionsPiecesIds.forEach(([sourceId, targetId]) => {
        const attraction = formation.attractions.find(
            (a) => a.attracting.piece.id === sourceId && a.attracted.piece.id === targetId
        )
        if (attraction) {
            edges.set(`${sourceId}_${targetId}`, transformAttractionToEdge(attraction))
        }
    })
    return { nodes, edges }
}

interface DiagramEditorProps {
    piece: PieceInput
    onPieceEdit: (piece: PieceInput) => Promise<PieceInput>
    onAttractionEdit: (attraction: AttractionInput) => AttractionInput
    className?: string
}

const DiagramEditor = forwardRef((props: DiagramEditorProps, ref) => {
    const { formationViewId, kitDirectory } = useContext(EditorContext)
    const dispatch = useDispatch()
    const types = useSelector((state: RootState) => selectTypes(state, kitDirectory))
    const formationView = useSelector((state: RootState) =>
        selectFormationView(state, formationViewId)
    )

    if (!formationView) return null

    const graph = useMemo(() => transformFormationToGraph(formationView.formation), [formationView.formation])
    const nodes = graph.nodes
    const edges = graph.edges

    const selected = useMemo(() => transformSelectionToGraph(formationView.formation, formationView.selection), [formationView.formation, formationView.selection])

    const graphViewRef = useRef(null)

    const { isOver, setNodeRef } = useDroppable({
        id: 'diagramEditor'
    })

    const [isAttractionBuilderOpen, setIsAttractionBuilderOpen] = useState(false);
    const [attractingType, setAttractingType] = useState<Type | TypeInput | null>(null)
    const [attractingPieceId, setAttractingPieceId] = useState<string | null>(null)
    const [attractedType, setAttractedType] = useState<Type | TypeInput | null>(null)
    const [attractedPieceId, setAttractedPieceId] = useState<string | null>(null)
    const [attraction, setAttraction] = useState<AttractionInput | null>(null)

    const zoomToFit = () => {
        if (graphViewRef.current) {
            graphViewRef.current.handleZoomToFit()
        }
    }

    useImperativeHandle(ref, () => ({
        onDropPiece,
        onDropFormationSnippet,
        zoomToFit
    }))

    const showAttractionBuilder = () => {
        setIsAttractionBuilderOpen(true)
    }
    
    const handleAttractionBuilderFinished = () => {
        dispatch(
            updateFormation({
                id: formationView.id,
                formation: {
                    ...formationView.formation,
                    attractions: [
                        ...formationView.formation.attractions,
                        {
                            ...attraction,
                            attracting: {
                                piece: {
                                    ...attraction.attracting.piece,
                                    id: attractingPieceId
                                }
                            },
                            attracted: {
                                piece: {
                                    ...attraction.attracted.piece,
                                    id: attractedPieceId
                                }
                            }
                        }
                    ]
                } as FormationInput
            })
        )
        setAttractingType(null)
        setAttractingPieceId(null)
        setAttractedType(null)
        setAttractedPieceId(null)
        setAttraction(null)
        setIsAttractionBuilderOpen(false)
    }
    
    const handleAttractionBuilderCanceled = () => {
        setAttractingType(null)
        setAttractingPieceId(null)
        setAttractedType(null)
        setAttractedPieceId(null)
        setAttraction(null)
        setIsAttractionBuilderOpen(false)
    }

    const onSelect = (newSelection: SelectionT, event?: any): void => {
        if (event == null && !newSelection.nodes && !newSelection.edges) {
            dispatch(updateFormationSelection(formationViewId, [],[]))
            return
        }
        // Remove the previously selected pieces and attractions from the selectionState if they are in the new selection.
        // Add the new selected pieces and attractions if they were not in the previous selection.
        const selectedPiecesIds = formationView.selection.piecesIds.slice()
        if (newSelection.nodes) {
            newSelection.nodes.forEach((node) => {
                if (formationView.selection.piecesIds.includes(node.id)) {
                    selectedPiecesIds.splice(selectedPiecesIds.indexOf(node.id), 1)
                } else {
                    selectedPiecesIds.push(node.id)
                }
            })
        }
        const selectedAttractionsIds = formationView.selection.attractionsPiecesIds.slice()
        if (newSelection.edges) {
            newSelection.edges.forEach((edge) => {
                if (
                    formationView.selection.attractionsPiecesIds.some(
                        ([source, target]) => source === edge.source && target === edge.target
                    )
                ) {
                    selectedAttractionsIds.splice(
                        selectedAttractionsIds.findIndex(
                            ([source, target]) => source === edge.source && target === edge.target
                        ),
                        1
                    )
                } else {
                    selectedAttractionsIds.push([edge.source, edge.target])
                }
            })
        }
        dispatch(updateFormationSelection(formationViewId, selectedPiecesIds, selectedAttractionsIds))
    }

    const onCreateNode = (x: number, y: number, event: any): void => {
        dispatch(
            updateFormation({
                id: formationView.id,
                formation: {
                    ...formationView.formation,
                    pieces: [
                        ...formationView.formation.pieces,
                        {
                            id: Generator.generateRandomId(x + y),
                            type: event.piece.type,
                            diagram: {
                                point: { x, y }
                            }
                        } as PieceInput
                    ]
                }
            })
        )
    }

    const onUpdateNode = (
        node: INode,
        updatedNodes?: Map<string, INode> | null,
        updatedNodePosition?: IPoint
    ): void | Promise<any> => {
        const piece = formationView.formation.pieces.find((p) => p.id === node.id)
        if (piece) {
            dispatch(
                updateFormation({
                    id: formationView.id,
                    formation: {
                        ...formationView.formation,
                        pieces: formationView.formation.pieces.map((p) =>
                            p.id === node.id
                                ? {
                                      ...p,
                                      diagram: {
                                          point: {
                                              x: updatedNodePosition?.x ?? node.x,
                                              y: updatedNodePosition?.y ?? node.y
                                          }
                                      }
                                  }
                                : p
                        )
                    } as FormationInput
                })
            )
        }
    }

    const onCreateEdge = (sourceNode: INode, targetNode: INode): void => {
        const attractingPieceType = types.get(sourceNode.piece.type.name).get(sourceNode.piece.type.variant ?? '')
        const attractedPieceType = types.get(targetNode.piece.type.name).get(targetNode.piece.type.variant ?? '')
        setAttractingType(attractingPieceType)
        setAttractingPieceId(sourceNode.id)
        setAttractedType(attractedPieceType)
        setAttractedPieceId(targetNode.id)
        showAttractionBuilder()
    }

    const onDeleteSelected = (selected: SelectionT) => {
        dispatch(updateFormationSelection(formationView.id, formationView.selection.piecesIds.filter((id) => !selected.nodes?.has(id))))
        dispatch(
            updateFormation({
                id: formationView.id,
                formation: {
                    ...formationView.formation,
                    pieces: formationView.formation.pieces.filter(
                        (piece) => !selected.nodes?.has(piece.id)
                    ),
                    attractions: formationView.formation.attractions.filter(
                        (attraction) =>
                            !selected.edges?.has(
                                `${attraction.attracting.piece.id}_${attraction.attracted.piece.id}`
                            ) && !selected.nodes?.has(attraction.attracting.piece.id) 
                            && !selected.nodes?.has(attraction.attracted.piece.id)
                    )
                } as FormationInput
            })
        )
    }

    const onCopySelected = () => {
        if (selected && selected.nodes) {
            const nodesToCopy = graph.nodes.filter((node) => selected.nodes?.has(node.id))
            const toppestNode = nodesToCopy.reduce((prev, curr) => (prev.y < curr.y ? prev : curr))
            const leftestNode = nodesToCopy.reduce((prev, curr) => (prev.x < curr.x ? prev : curr))
            const edgesToCopy = graph.edges.filter((edge) => selected.edges?.has(`${edge.source}_${edge.target}`))
            const formationSnippetToCopy = {
                pieces: nodesToCopy.map((node) => ({
                    ...node.piece,
                    diagram: {
                        point: {
                            x: node.x - leftestNode.x,
                            y: node.y - toppestNode.y
                        }
                    }
                })),
                attractions: edgesToCopy.map((edge) => edge.attraction)
            }
            navigator.clipboard
                .writeText(JSON.stringify(formationSnippetToCopy))
                .then(() => {
                })
                .catch((err) => {
                })
        }
    }

    const onPasteSelected = (selected?: SelectionT | null, xyCoords?: IPoint): void => {
        navigator.clipboard.readText().then((text) => {
            const formationSnippet = JSON.parse(text)
            const oldPieceToNewPiece = new Map<string, string>()
            const placedFormationSnippet = {
                pieces: formationSnippet.pieces.map((piece) => {
                    const x = xyCoords?.x + piece.diagram.point.x
                    const y = xyCoords?.y + piece.diagram.point.y
                    const id = Generator.generateRandomId((Math.floor(x) << 16) ^ Math.floor(y))
                    oldPieceToNewPiece.set(piece.id, id)
                    return {
                        ...piece,
                        id: id,
                        diagram: {
                            point: { x, y }
                        }
                    }
                }),
                attractions: formationSnippet.attractions.map((attraction) => ({
                    ...attraction,
                    attracting: {
                        ...attraction.attracting,
                        piece: {
                            ...attraction.attracting.piece,
                            id: oldPieceToNewPiece.get(attraction.attracting.piece.id)
                        }
                    },
                    attracted: {
                        ...attraction.attracted,
                        piece: {
                            ...attraction.attracted.piece,
                            id: oldPieceToNewPiece.get(attraction.attracted.piece.id)
                        }
                    }
                }))
            }
            const newPieceIds = placedFormationSnippet.pieces.map((piece) => piece.id)
            if (newPieceIds.length !== new Set(newPieceIds).size) {
                message.error('All pieces must have unique ids.')
                return
            }
            dispatch(
                updateFormation({
                    id: formationView.id,
                    formation: {
                        ...formationView.formation,
                        pieces: [
                            ...formationView.formation.pieces,
                            ...placedFormationSnippet.pieces
                        ],
                        attractions: [
                            ...formationView.formation.attractions,
                            ...placedFormationSnippet.attractions
                        ]
                    } as FormationInput
                } as FormationView)
            )
        })
    }

    const onSwapEdge = (sourceNode: INode, targetNode: INode, edge: IEdge): void => {
        console.log('onSwapEdge should not be possible', sourceNode, targetNode, edge)
        return
    }

    const canSwapEdge = (
        sourceNode: INode,
        hoveredNode: INode | null,
        swapEdge: IEdge
    ): boolean => {
        return false
    }

    const onContextMenu = (x: number, y: number, event: any): void => {}

    const renderNodeText = (
        data: IPieceNode,
        id: string | number,
        isSelected: boolean
    ): SVGProps<SVGGElement> => {
        const type = types.get(data.piece.type.name)?.get(data.piece.type.variant ?? '')
        return (
            <foreignObject x="-19" y="-19" width="38" height="38">
                <ConfigProvider locale={enUS} theme={sketchpadTheme}>
                    <ArtifactAvatar
                        icon={type.icon}
                        // description={
                        //     <>
                        //         {type?.variant ? `${type.name} - ${type.variant}` : type?.name}
                        //         <br />
                        //         {type?.description}
                        //     </>
                        // }
                        isSelected={isSelected}
                    />
                </ConfigProvider>
            </foreignObject>
        )
    }

    // Adaptation of: https://github.com/uber/react-digraph/issues/179
    const onDropPiece = (x: number, y: number, type: Type) => {
        if (graphViewRef.current) {
            const viewTransfrom = graphViewRef.current.state.viewTransform
            const svgX = -1 * ((viewTransfrom.x - x) / viewTransfrom.k)
            const svgY = -1 * ((viewTransfrom.y - y) / viewTransfrom.k)
            onCreateNode(svgX, svgY, {
                piece: {
                    type: {
                        name: type.name,
                        variant: type.variant
                    }
                }
            })
        }
    }

    const onDropFormationSnippet = (x: number, y: number, formationSnippet: Formation | FormationInput) => {
        if (graphViewRef.current) {
            const viewTransfrom = graphViewRef.current.state.viewTransform
            const svgX = -1 * ((viewTransfrom.x - x) / viewTransfrom.k)
            const svgY = -1 * ((viewTransfrom.y - y) / viewTransfrom.k)

            const idMap = new Map<string, string>()
            const newFormationPieces = formationSnippet.pieces.map((piece) => {
                const x = svgX + piece.diagram.point.x
                const y = svgY + piece.diagram.point.y
                const id = Generator.generateRandomId()
                idMap.set(piece.id, id)
                return {
                    ...piece,
                    id,
                    diagram: {
                        point: {
                            x: x,
                            y: y
                        }
                    }
                }
            })
            const newFormationAttractions = formationSnippet.attractions.map((attraction) => ({
                ...attraction,
                attracted: {
                    ...attraction.attracted,
                    piece: {
                        ...attraction.attracted.piece,
                        id: idMap.get(attraction.attracted.piece.id)
                    }
                },
                attracting: {
                    ...attraction.attracting,
                    piece: {
                        ...attraction.attracting.piece,
                        id: idMap.get(attraction.attracting.piece.id)
                    }
                }
            }))
            dispatch(
                updateFormation({
                    id: formationView.id,
                    formation: {
                        ...formationView.formation,
                        pieces: [...formationView.formation.pieces, ...newFormationPieces],
                        attractions: [...formationView.formation.attractions, ...newFormationAttractions]
                    }
                })
            )
        }
    }

    const NodeTypes = GraphConfig.NodeTypes
    const NodeSubtypes = GraphConfig.NodeSubtypes
    const EdgeTypes = GraphConfig.EdgeTypes

    return (
        <>
            <div
                id="formation-editor"
                className={'font-sans h-full ' + props.className + (isOver ? 'bg-dark' : 'bg-darkGrey')}
                ref={setNodeRef}
            >
                <GraphView
                    ref={graphViewRef}
                    nodeKey={NODE_KEY}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}
                    // layoutEngineType='HorizontalTree'
                    allowMultiselect={true}
                    // gridSpacing={20}
                    gridDotSize={0}
                    nodeSize={100}
                    edgeHandleSize={200}
                    edgeArrowSize={4}
                    // rotateEdgeHandle={false}
                    minZoom={0.1}
                    maxZoom={4}
                    showGraphControls={false}
                    canSwapEdge={canSwapEdge}
                    onSwapEdge={onSwapEdge}
                    onArrowClicked={(selectedEdge: IEdge): void => {}}
                    onSelect={onSelect}
                    onCreateNode={onCreateNode}
                    onUpdateNode={onUpdateNode}
                    onCreateEdge={onCreateEdge}
                    onDeleteSelected={onDeleteSelected}
                    onCopySelected={onCopySelected}
                    onPasteSelected={onPasteSelected}
                    onContextMenu={onContextMenu}
                    renderNodeText={renderNodeText}
                ></GraphView>
            </div>
            <Modal
                width={1200}
                title="New attraction"
                open={isAttractionBuilderOpen}
                onOk={handleAttractionBuilderFinished}
                onCancel={handleAttractionBuilderCanceled}
                mask={false}>
                {attractingType && attractedType ? (
                    <AttractionBuilder
                        attractingType={attractingType}
                        attractedType={attractedType}
                        onAttractionChange={setAttraction}
                    />
                ) : null}
            </Modal>
        </>
    )
})

DiagramEditor.displayName = 'DiagramEditor'

// 3D Editor

interface IEditorContext {
    formationViewId: string
    kitDirectory: string
    blobUrls: { [key: string]: string }
}

const EditorContext = createContext<IEditorContext>({} as IEditorContext)

interface PieceThreeProps {
    piece: PieceInput
    selected: boolean
}

const PieceThree = ({ piece, selected }: PieceThreeProps) => {
    const { formationViewId, kitDirectory } = useContext(EditorContext)
    const dispatch = useDispatch()
    const formationView = useSelector((state: RootState) =>
        selectFormationView(state, formationViewId)
    )
    const type = useSelector((state: RootState) =>
        selectType(state, kitDirectory, piece.type.name, piece.type.variant ?? '')
    )
    const isSelected = formationView.selection.piecesIds.includes(piece.id)
    return (
        <ThreeSelect
            multiple
            box
            border="1px solid #fff"
            // onChange={(selected): void => {
            //         console.log('selection starting', selected)
            //     }}
            // onChangePointerUp={(e) => {
            //     if (isSelectionBoxActive) {
            //         setIsSelectionBoxActive(false)
            //         console.log('selection ending', e)
            //     }
            // }}
            onClick={(e) => {
                const pieceId = getGroupNameFromClickEventGroupObject(e.eventObject)
                if (formationView.selection.piecesIds.includes(pieceId)) {
                    dispatch(
                        updateFormationSelection(formationViewId, 
                            formationView.selection.piecesIds.filter(
                                (id) => id !== pieceId
                            ),
                            formationView.selection.attractionsPiecesIds
                        )
                    )
                } else {
                    dispatch(
                        updateFormationSelection(formationViewId, 
                            [...formationView.selection.piecesIds, pieceId],
                            formationView.selection.attractionsPiecesIds
                        )
                    )
                }

                e.stopPropagation()
            }}
        >
            <RepresentationThree
                id={piece.id}
                representation={type.representations.find((representation) =>
                    representation.url.endsWith('.glb')
                )}
                color={selected ? colors.primary : undefined}
            />
        </ThreeSelect>
)
}

PieceThree.displayName = 'PieceThree'

interface HierarchyThreeProps {
    hierarchy: Hierarchy
}

const HierarchyThree = ({ hierarchy }: HierarchyThreeProps) => {
    const { formationViewId } = useContext(EditorContext)
    const formationView = useSelector((state: RootState) =>
        selectFormationView(state, formationViewId)
    )
    const piece = formationView.formation.pieces.find((p) => p.id === hierarchy.pieceId)
    const selected = formationView.selection.piecesIds.includes(piece.id)
    if (!piece) return null

    const groupRef = useRef();
    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.applyMatrix4(hierarchy.transform)
        }
    }, [])

    return (
        <group name={piece.id} ref={groupRef}>
            <PieceThree piece={piece} selected={selected} />
            {hierarchy.children.map((child, i) => (
                <HierarchyThree key={i} hierarchy={child} />
            ))}
        </group>
    )
}

HierarchyThree.displayName = 'HierarchyThree'

interface FormationThreeProps {
    transformationMode?: string
}

const FormationThree = ({ transformationMode='translate' }: FormationThreeProps) => {
    const dispatch = useDispatch()
    const { formationViewId, kitDirectory } = useContext(EditorContext)
    const formationView = useSelector((state: RootState) => selectFormationView(state, formationViewId))
    const ports = useSelector((state: RootState) => selectPorts(state, kitDirectory))
    if (!formationView) return null
    if (!ports) return null
    const selectedHierarchyRootPiecesIds = formationView.selection.piecesIds
    const hierarchies = useMemo(() => {
        return formationToHierarchies(formationView.formation, ports);
    }, [formationView.formation, ports]);
    const transformControlRef = useRef(null)

    return (
        <group name={formationToString(formationView.formation)} >
            {hierarchies.map((hierarchy, i) => (
                selectedHierarchyRootPiecesIds.includes(hierarchy.pieceId) ? (
                        <TransformControls 
                            key={i}
                            ref={transformControlRef}
                            mode={transformationMode}
                            onMouseUp={(event) => {
                                const transformControlMatrix = new Matrix4();
                                switch (transformationMode) {
                                    case 'translate':
                                        transformControlMatrix.setPosition(transformControlRef.current.offset);
                                        break;
                                    case 'rotate':
                                        transformControlMatrix.makeRotationFromQuaternion(transformControlRef.current.tempQuaternion);
                                        break;
                                    default:
                                        break;
                                }
                                dispatch(updateFormation({
                                    id: formationViewId,
                                    formation: {
                                        ...formationView.formation,
                                        pieces: formationView.formation.pieces.map((piece) =>
                                            selectedHierarchyRootPiecesIds.includes(piece.id)
                                                ? {
                                                      ...piece,
                                                      root: {
                                                          plane: convertTransformToPlane(
                                                            convertPlaneToTransform(
                                                                    piece.root?.plane ?? {
                                                                        origin: { x: 0, y: 0, z: 0 },
                                                                        xAxis: { x: 1, y: 0, z: 0 },
                                                                        yAxis: { x: 0, y: 1, z: 0 }
                                                                })
                                                            .premultiply(transformControlMatrix))
                                                      }
                                                  }
                                                : piece
                                        )
                                    }
                                }))
                                }
                            }
                        >
                            <HierarchyThree hierarchy={hierarchy} />
                        </TransformControls>
                    ) : (
                        <HierarchyThree key={i} hierarchy={hierarchy} />
                    )
                
            ))}
        </group>
    )
}

FormationThree.displayName = 'FormationThree'

interface ShapeEditorProps {
}

const ShapeEditor = ({}: ShapeEditorProps) => {
    const { formationViewId } = useContext(EditorContext)
    const dispatch = useDispatch()

    const [transformationMode, setTransformationMode] = useState('translate')

    return (
        <div className="h-full relative">
            <FloatButton.Group className="absolute right-4 top-4" >
            {/* TODO: Fix hacky repositioning of icons */}
            <FloatButton 
                icon={
                    <div className="-ml-[2.5px]">
                        <OpenWithIcon />
                    </div>
                } 
                badge={{ dot:transformationMode==='translate', color: colors.primary }}
                onClick={() => setTransformationMode('translate')}
            />
            <FloatButton 
                icon={
                    <div className="-ml-[2.5px]">
                        <ThreeSixtyIcon />
                    </div>
                } 
                badge={{ dot:transformationMode==='rotate', color: colors.primary }}
                onClick={() => setTransformationMode('rotate')}
            />
            </FloatButton.Group>
            <Canvas
                // shadows
                // orthographic={true}
                onPointerMissed={() => dispatch(updateFormationSelection(formationViewId, [],[]))}
            >
                <Suspense fallback={null}>
                    {/* <Stage contactShadow={{ opacity: 1, blur: 2 }}>
                    </Stage> */}
                    <FormationThree transformationMode={transformationMode} />
                    {/* <ambientLight color={colors.light} intensity={1} /> */}
                </Suspense>
                <OrbitControls makeDefault />
                <Gizmo/>
                <Grid infiniteGrid={true} sectionColor={colors.lightGrey}/>
            </Canvas>
        </div>
    )
}

ShapeEditor.displayName = 'ShapeEditor'

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

const SemioIcon = (props) => (
    <svg width={48} height={48} overflow="visible" viewBox="0 0 99.95 99.921" {...props}>
        {'-->'}
        <g
            style={{
                stroke: '#000',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeOpacity: 1
            }}
        >
            <g
                style={{
                    fill: '#fa9500',
                    fillOpacity: 1,
                    stroke: '#000',
                    strokeWidth: 1,
                    strokeDasharray: 'none',
                    strokeOpacity: 1
                }}
            >
                <path
                    fillOpacity={0}
                    stroke="none"
                    d="M94.789 41.727v77.939l19.984-19.985V41.727Z"
                    style={{
                        fill: '#fa9500',
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 0.489687,
                        strokeDasharray: 'none',
                        strokeOpacity: 1
                    }}
                    transform="translate(-94.789 -19.745)"
                />
            </g>
            <g
                fillOpacity={0}
                stroke="none"
                style={{
                    fill: '#ff344f',
                    fillOpacity: 1,
                    stroke: '#000',
                    strokeWidth: 1,
                    strokeDasharray: 'none',
                    strokeOpacity: 1
                }}
            >
                <path
                    d="m194.71 119.666.03-98.535-19.985 19.979-.03 78.556zM94.789 19.745h98.51l-19.984 19.984H94.79Z"
                    style={{
                        fill: '#ff344f',
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 0.489687,
                        strokeDasharray: 'none',
                        strokeOpacity: 1
                    }}
                    transform="translate(-94.789 -19.745)"
                />
            </g>
            <g
                fillOpacity={0}
                stroke="none"
                style={{
                    fill: '#00a69d',
                    fillOpacity: 1,
                    stroke: '#000',
                    strokeWidth: 1,
                    strokeDasharray: 'none',
                    strokeOpacity: 1
                }}
            >
                <path
                    d="m134.757 119.666 19.984-19.985h17.987v19.985zM134.757 79.697l19.984-19.984h17.987v19.984z"
                    style={{
                        fill: '#00a69d',
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 0.489687,
                        strokeDasharray: 'none',
                        strokeOpacity: 1
                    }}
                    transform="translate(-94.789 -19.745)"
                />
            </g>
        </g>
    </svg>
)

const DesignIcon = (props) => (
    <svg width={48} height={48} {...props}>
        <defs>
            <marker
                id="a"
                markerHeight={0.6}
                markerWidth={0.6}
                orient="auto-start-reverse"
                preserveAspectRatio="xMidYMid"
                refX={0}
                refY={0}
                style={{
                    overflow: 'visible'
                }}
                viewBox="0 0 1 1"
            >
                <path
                    d="m5.77 0-8.65 5V-5Z"
                    style={{
                        fill: colors.light,
                        fillRule: 'evenodd',
                        stroke: colors.light,
                        strokeWidth: '1pt'
                    }}
                    transform="scale(.5)"
                />
            </marker>
        </defs>
        <circle
            cx={15.031}
            cy={10.763}
            r={5.007}
            style={{
                fill: 'none',
                stroke: colors.light,
                strokeWidth: 0.733,
                strokeDasharray: 'none',
                strokeOpacity: 1
            }}
        />
        <circle
            cx={15.031}
            cy={35.829}
            r={5.007}
            style={{
                fill: 'none',
                stroke: colors.light,
                strokeWidth: 0.733,
                strokeDasharray: 'none',
                strokeOpacity: 1
            }}
        />
        <circle
            cx={34.916}
            cy={24}
            r={5.007}
            style={{
                fill: 'none',
                stroke: colors.light,
                strokeWidth: 0.733,
                strokeDasharray: 'none',
                strokeOpacity: 1
            }}
        />
        <path
            d="M15.03 30.822V17.878"
            style={{
                fill: 'none',
                fillRule: 'evenodd',
                stroke: colors.light,
                strokeWidth: '.927333px',
                strokeLinecap: 'butt',
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                strokeOpacity: 1,
                markerEnd: 'url(#a)'
            }}
        />
    </svg>
)

const FormationIcon = (props) => (
    <svg width={48} height={48} {...props}>
        <defs>
            <marker
                id="a"
                markerHeight={0.6}
                markerWidth={0.6}
                orient="auto-start-reverse"
                preserveAspectRatio="xMidYMid"
                refX={0}
                refY={0}
                style={{
                    overflow: 'visible'
                }}
                viewBox="0 0 1 1"
            >
                <path
                    d="m5.77 0-8.65 5V-5Z"
                    style={{
                        fill: colors.light,
                        fillRule: 'evenodd',
                        stroke: colors.light,
                        strokeWidth: '1pt'
                    }}
                    transform="scale(.5)"
                />
            </marker>
        </defs>
        <circle
            cx={24}
            cy={11.739}
            r={5.007}
            style={{
                fill: 'none',
                stroke: colors.light,
                strokeWidth: 0.733,
                strokeDasharray: 'none',
                strokeOpacity: 1
            }}
        />
        <circle
            cx={24}
            cy={36.806}
            r={5.007}
            style={{
                fill: 'none',
                stroke: colors.light,
                strokeWidth: 0.733,
                strokeDasharray: 'none',
                strokeOpacity: 1
            }}
        />
        <path
            d="M24 31.799V18.855"
            style={{
                fill: 'none',
                fillRule: 'evenodd',
                stroke: colors.light,
                strokeWidth: '.927333px',
                strokeLinecap: 'butt',
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                strokeOpacity: 1,
                markerEnd: 'url(#a)'
            }}
        />
    </svg>
)

const TypeIcon = (props) => (
    <svg width={48} height={48} {...props}>
        <circle
            cx={24}
            cy={24}
            r={5.007}
            style={{
                fill: 'none',
                stroke: colors.light,
                strokeWidth: 0.733,
                strokeDasharray: 'none',
                strokeOpacity: 1
            }}
        />
    </svg>
)

interface FormationWindowProps {
    viewId: string
    kitDirectory: string
}

const FormationWindow = ({ viewId, kitDirectory }: FormationWindowProps): JSX.Element => {
    const formationView = useSelector((state: RootState) => selectFormationView(state, viewId))
    const kit = useSelector((state: RootState) => selectKit(state, kitDirectory))
    const types = useSelector((state: RootState) => selectTypes(state, kitDirectory))
    const formations = useSelector((state: RootState) => selectFormations(state, kitDirectory))

    const [blobUrls, setBlobUrls] = useState<{ [key: string]: string }>({})
    useEffect(() => {
        kit?.types.forEach((type) => {
            const representation = type.representations.find((representation) =>
                representation.url.endsWith('.glb')
            )
            if (!representation) return
            window.electron.ipcRenderer
                .invoke('get-file-buffer', representation.url, kitDirectory)
                .then(
                    (buffer) => {
                        const blob = new Blob([buffer], { type: 'model/gltf-binary' })
                        const url = URL.createObjectURL(blob)
                        useGLTF.preload(url)
                        setBlobUrls((prev) => ({ ...prev, [representation.url]: url }))
                    },
                    (error) => {
                        console.error(error)
                    }
                )
        })
    }, [kit])

    const [activeDraggedArtifactId, setActiveDraggedArtifactId] = useState('')
    const [activeDraggedArtifact, setActiveDraggedArtifact] = useState<Type | Formation>()
    const [activeDraggedArtifactKind, setActiveDraggedArtifactKind] = useState('') // type, formation or ''

    useEffect(() => {
        const separatorIndex = activeDraggedArtifactId.indexOf('##')
        const artifactType = activeDraggedArtifactId.substring(0, separatorIndex)
        const artifactId = activeDraggedArtifactId.substring(separatorIndex + 2)
        switch (artifactType) {
            case 'type': {
                const typeNameSeparatorIndex = artifactId.indexOf('##')
                const typeName = artifactId.substring(0, typeNameSeparatorIndex)
                const typeVariant = artifactId.substring(typeNameSeparatorIndex + 2)
                const type = types.get(typeName)?.get(typeVariant ?? '')
                setActiveDraggedArtifact(type)
                setActiveDraggedArtifactKind('type')
                break
            }
            case 'formation': {
                const formationNameSeparatorIndex = artifactId.indexOf('##')
                const formationName = artifactId.substring(0, formationNameSeparatorIndex)
                const formationVariant = artifactId.substring(formationNameSeparatorIndex + 2)
                const formation = formations.get(formationName)?.get(formationVariant ?? '')
                setActiveDraggedArtifact(formation)
                setActiveDraggedArtifactKind('formation')
                break
            }
        }
    }, [activeDraggedArtifactId])

    const diagramEditorRef = useRef(null)

    const onDragStart = (event: DragStartEvent) => {
        setActiveDraggedArtifactId(event.active.id)
    }

    const onDragEnd = (event: DragEndEvent) => {
        if (event.over && event.over.id === 'diagramEditor') {
            // relative coordinates in the diagram editor
            const relativeX = event.activatorEvent.pageX + event.delta.x - event.over.rect.left
            const relativeY = event.activatorEvent.pageY + event.delta.y - event.over.rect.top
            switch (activeDraggedArtifactKind) {
                case 'type': {
                    diagramEditorRef.current.onDropPiece(relativeX, relativeY, {
                        name: activeDraggedArtifact.name,
                        variant: activeDraggedArtifact?.variant ?? ''
                    })
                    break
                }
                case 'formation': {
                    const formationToDrop = formations.get(activeDraggedArtifact.name)?.get(activeDraggedArtifact?.variant ?? '')
                    if (formationToDrop) {
                        diagramEditorRef.current.onDropFormationSnippet(relativeX, relativeY, formationToDrop)
                    }
                }
            }
        }
        setActiveDraggedArtifactId('')
    }

    if (!kit) {
        return <div>Kit not found</div>
    }

    if (!formationView) {
        return <div>Formation not found</div>
    }

    return (
        <>
            <Row className="items-center justify-between flex h-[47px] w-full bg-darkGrey border-b-thin border-lightGrey">
                <Col className="flex items-center">
                    {/* TODO: Add icons for main menu and tools */}
                </Col>
                <Col className="flex items-center">
                    <Breadcrumb>
                        <Breadcrumb.Item>{kit.name}</Breadcrumb.Item>
                        <Breadcrumb.Item>Formations</Breadcrumb.Item>
                        <Breadcrumb.Item>{formationView?.formation.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col className="flex items-center">{/* TODO: Add icons for sharing, etc */}</Col>
            </Row>
            <Layout style={{ flex: 1 }}>
                <Layout>
                    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                        <Sider width="240px" className="border-r-thin border-lightGrey">
                            <Collapse
                                className="p-3 border-b-thin border-lightGrey font-thin uppercase"
                                defaultActiveKey={['types', 'formations']}
                                items={[
                                    {
                                        key: 'types',
                                        label: 'Types',
                                        children: (
                                            <Collapse
                                                className="p-2 font-normal text-lightGrey normal-case"
                                                defaultActiveKey={Array.from(types.keys())}
                                                items={Array.from(types.entries())
                                                    .sort()
                                                    .map(([typeName, typeVariants], index) => ({
                                                        key: typeName,
                                                        label: typeName,
                                                        children: (
                                                            <Space
                                                                className="h-auto overflow-auto grid grid-cols-[auto-fill] min-w-[40px] auto-rows-[40px] p-1"
                                                                direction="vertical"
                                                                size={10}
                                                                style={{
                                                                    gridTemplateColumns:
                                                                        'repeat(auto-fill, minmax(40px, 1fr))',
                                                                    gridAutoRows: '40px'
                                                                }}
                                                            >
                                                                {Array.from(typeVariants.entries())
                                                                    .sort()
                                                                    .map(
                                                                        (
                                                                            [typeVariant, type],
                                                                            index
                                                                        ) => (
                                                                            <ArtifactAvatar
                                                                                key={
                                                                                    'type' +
                                                                                    '##' +
                                                                                    typeName +
                                                                                    '##' +
                                                                                    typeVariant
                                                                                }
                                                                                icon={type.icon}
                                                                                description={
                                                                                    typeVariant ? (
                                                                                        <>
                                                                                            {`Variant: ${typeVariant}`}
                                                                                            <br />
                                                                                            {
                                                                                                type.description
                                                                                            }
                                                                                        </>
                                                                                    ) : (
                                                                                        type.description
                                                                                    )
                                                                                }
                                                                                draggableId={
                                                                                    'type' +
                                                                                    '##' +
                                                                                    typeName +
                                                                                    '##' +
                                                                                    typeVariant
                                                                                }
                                                                            ></ArtifactAvatar>
                                                                        )
                                                                    )}
                                                            </Space>
                                                        )
                                                    }))}
                                            />
                                        )
                                    },
                                    {
                                        key: 'formations',
                                        label: 'Formations',
                                        children: (
                                            <Collapse
                                                className="p-2 font-normal text-lightGrey normal-case"
                                                defaultActiveKey={Array.from(formations.keys())}
                                                items={Array.from(formations.entries())
                                                    .sort()
                                                    .map(
                                                        (
                                                            [formationName, formationVariants],
                                                            index
                                                        ) => ({
                                                            key: formationName,
                                                            label: formationName,
                                                            children: (
                                                                <Space
                                                                    className="h-auto overflow-auto grid grid-cols-[auto-fill] min-w-[40px] auto-rows-[40px] p-1"
                                                                    direction="vertical"
                                                                    size={10}
                                                                    style={{
                                                                        gridTemplateColumns:
                                                                            'repeat(auto-fill, minmax(40px, 1fr))',
                                                                        gridAutoRows: '40px'
                                                                    }}
                                                                >
                                                                    {Array.from(
                                                                        formationVariants.entries()
                                                                    )
                                                                        .sort()
                                                                        .map(
                                                                            (
                                                                                [
                                                                                    formationVariant,
                                                                                    formation
                                                                                ],
                                                                                index
                                                                            ) => (
                                                                                <ArtifactAvatar
                                                                                    key={
                                                                                        'formation' +
                                                                                        '##' +
                                                                                        formationName +
                                                                                        '##' +
                                                                                        formationVariant
                                                                                    }
                                                                                    draggableId={
                                                                                        'formation' +
                                                                                        '##' +
                                                                                        formationName +
                                                                                        '##' +
                                                                                        formationVariant
                                                                                    }
                                                                                    icon={
                                                                                        formation.icon
                                                                                    }
                                                                                    description={
                                                                                        formationVariant ? (
                                                                                            <>
                                                                                                {`Variant: ${formationVariant}`}
                                                                                                <br />
                                                                                                {
                                                                                                    formation.description
                                                                                                }
                                                                                            </>
                                                                                        ) : (
                                                                                            formation.description
                                                                                        )
                                                                                    }
                                                                                ></ArtifactAvatar>
                                                                            )
                                                                        )}
                                                                </Space>
                                                            )
                                                        })
                                                    )}
                                            />
                                        )
                                    }
                                ]}
                            />
                        </Sider>
                        <EditorContext.Provider value={{kitDirectory, formationViewId:viewId, blobUrls}}>
                            <Content>
                                <DiagramEditor
                                    ref={diagramEditorRef}
                                />
                            </Content>
                            <Divider className="h-full top-0" type="vertical" />
                            <Content>
                                <ShapeEditor/>
                            </Content>
                            {createPortal(
                                <DragOverlay>
                                    {activeDraggedArtifactId && (
                                        <ArtifactAvatar
                                            draggableId={activeDraggedArtifactId}
                                            icon={activeDraggedArtifact?.icon ?? ''}
                                        />
                                    )}
                                </DragOverlay>,
                                document.body
                            )}
                        </EditorContext.Provider>
                    </DndContext>
                </Layout>
                <Sider className="border-l-thin border-lightGrey" width="240">
                    <Collapse
                        className="p-3 border-b-thin border-lightGrey font-thin uppercase"
                        defaultActiveKey={['scene']}
                        items={[
                            {
                                key: 'scene',
                                label: 'Scene',
                                children: (
                                    <Flex
                                        vertical={true}
                                        className="p-2 font-normal text-lightGrey normal-case"
                                    >
                                        <div className="p-0">Level of Details</div>
                                        <Select
                                            className="p-1"
                                            mode="multiple"
                                            allowClear
                                            placeholder="Select"
                                            options={[
                                                {
                                                    label: '1to500',
                                                    value: '1to500'
                                                },
                                                {
                                                    label: '1to200',
                                                    value: '1to200'
                                                }
                                            ]}
                                        />
                                        <div className="p-0">Tags</div>
                                        <Select
                                            className="p-1"
                                            mode="multiple"
                                            allowClear
                                            placeholder="Select"
                                            options={[
                                                {
                                                    label: 'volume',
                                                    value: 'volume'
                                                },
                                                {
                                                    label: 'floor plan',
                                                    value: 'floor plan'
                                                }
                                            ]}
                                        />
                                    </Flex>
                                )
                            },
                            {
                                key: 'properties',
                                label: 'Properties',
                                children: (
                                    <Flex
                                        vertical={true}
                                        className="p-2 text-lightGrey normal-case"
                                    >
                                        <div className="p-0">
                                            This will change based on the Selection.
                                        </div>
                                    </Flex>
                                )
                            }
                        ]}
                    />
                </Sider>
            </Layout>
            {/* <Footer className='p-0'>
                    <div style={{ height: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="flex items-center">
                        </div>
                    </div>
                </Footer> */}
        </>
    )
}

interface ArtifactWizardProps {
    onOpenDirectory: () => Promise<string>
    onOpenFile: () => Promise<string>
    onFinish: () => FormProps<IArtifactView>['onFinish']
}

const ArtifactWizard = ({
    onOpenDirectory,
    onOpenFile,
    onFinish
}: ArtifactWizardProps): JSX.Element => {
    const [form] = Form.useForm()
    const kitDirectory = Form.useWatch('kitDirectory', form)

    const [onOpenDirectoryStatus, setOnOpenDirectoryStatus] = useState('idle') // idle, loading
    const [onOpenFileStatus, setOnOpenFileStatus] = useState('idle') // idle, loading

    const onOpenDirectoryFromButton = async () => {
        setOnOpenDirectoryStatus('loading')
        const selectedKitDirectory = await onOpenDirectory()
        form.setFieldsValue({
            kitDirectory: selectedKitDirectory
        })
        setOnOpenDirectoryStatus('idle')
    }
    const onOpenFileFromButton = async () => {
        setOnOpenFileStatus('loading')
        const selectedFile = await onOpenFile()
        form.setFieldsValue({
            icon: selectedFile
        })
        setOnOpenFileStatus('idle')
    }

    return (
        <Form
            className="p-3"
            form={form}
            name="Artifact Wizard"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<IArtifactView>
                label="Kind"
                name="kind"
                rules={[{ required: true, message: 'What artifact do you want to create?' }]}
                initialValue={ViewKind.Formation}
            >
                <Radio.Group>
                    <Radio.Button value={ViewKind.Type}>Type</Radio.Button>
                    <Radio.Button value={ViewKind.Formation}>Formation</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item<IArtifactView>
                label="Kit Directory"
                name="kitDirectory"
                rules={[{ required: true, message: 'In what directory is the kit?' }]}
            >
                <Button onClick={onOpenDirectoryFromButton} icon={<FolderSharpIcon />}>
                    {kitDirectory
                        ? kitDirectory
                        : onOpenDirectoryStatus === 'loading'
                          ? 'Loading...'
                          : 'Open Directory'}
                </Button>
            </Form.Item>
            <Form.Item<IArtifactView>
                label="Name"
                name="name"
                initialValue={'Untitled'}
                rules={[{ required: true, message: 'Every artifacts needs a name.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IArtifactView> label="Description" name="description">
                <Input />
            </Form.Item>
            <Form.Item<IArtifactView> label="Icon" name="icon">
                <Button onClick={onOpenFileFromButton} icon={<FileUploadSharpIcon />}>
                    {onOpenFileStatus === 'loading' ? 'Loading...' : 'Upload Icon'}
                </Button>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="bg-lightGrey text-dark">
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}

interface ArtifactWindowProps {
    viewId: string
    onOpenDirectory: () => Promise<string>
    onOpenFile: () => Promise<string>
}

const ArtifactWindow = ({
    viewId,
    onOpenDirectory,
    onOpenFile
}: ArtifactWindowProps): JSX.Element => {
    const dispatch = useDispatch()
    const artifactView = useSelector((state: RootState) => selectView(state, viewId))

    const onFinish: FormProps<IArtifactView>['onFinish'] = (artifactView) => {
        dispatch(loadLocalKit(artifactView.kitDirectory))
        artifactView.id = viewId
        switch (artifactView.kind) {
            case ViewKind.Type:
                dispatch(
                    addView({
                        kind: ViewKind.Type,
                        kitDirectory: artifactView.kitDirectory,
                        id: artifactView.id,
                        type: {
                            name: artifactView.name,
                            description: artifactView.description,
                            icon: artifactView.icon,
                            variant: '',
                            unit: 'm',
                            representations: [],
                            ports: [],
                            qualities: []
                        } as TypeInput
                    } as TypeView)
                )
                return
            case ViewKind.Formation:
                dispatch(
                    addView({
                        kind: ViewKind.Formation,
                        kitDirectory: artifactView.kitDirectory,
                        id: artifactView.id,
                        formation: {
                            name: artifactView.name,
                            description: artifactView.description,
                            icon: artifactView.icon,
                            variant: '',
                            unit: 'm',
                            pieces: [],
                            attractions: [],
                            qualities: []
                        } as FormationInput
                    } as FormationView)
                )
                return
            default:
                break
        }
    }

    return artifactView ? (
        <>
            {(() => {
                switch (artifactView.kind) {
                    case ViewKind.Type:
                        // return <TypeWindow viewId={viewId} kitDirectory={artifactView.kitDirectory} />
                        return <div>Soon you can create types here🥳</div>
                    case ViewKind.Formation:
                        return (
                            <FormationWindow
                                viewId={viewId}
                                kitDirectory={artifactView.kitDirectory}
                            />
                        )
                    default:
                        return null
                }
            })()}
        </>
    ) : (
        <ArtifactWizard
            onFinish={onFinish}
            onOpenDirectory={onOpenDirectory}
            onOpenFile={onOpenFile}
        />
    )
}

interface AppProps {
    onWindowMinimize: () => void
    onWindowMaximize: () => void
    onWindowClose: () => void
    onOpenDirectory: () => Promise<string>
    onOpenFile: () => Promise<string>
}

const App = ({
    onWindowMinimize,
    onWindowMaximize,
    onWindowClose,
    onOpenDirectory,
    onOpenFile
}: AppProps): JSX.Element => {
    const views = useSelector((state: RootState) => selectViews(state))
    const [fullScreen, setFullScreen] = useState(false)
    const [openTabs, setOpenTabs] = useState([])
    const [activeTab, setActiveTab] = useState('home')

    // const actions = [
    //     {
    //         id: 'open-kit',
    //         name: 'Open Kit',
    //         shortcut: ['$mod+o'],
    //         keywords: 'new',
    //         section: 'Files',
    //         perform: () => {
    //             onOpenKit('').then((kit) => {
    //                 // TODO: Set kit over redux
    //                 // setKit(kit)
    //             })
    //         }
    //     },
    //     {
    //         id: 'reload-kit',
    //         name: 'Reload Kit',
    //         shortcut: ['$mod+r'],
    //         keywords: 'update',
    //         section: 'Files',
    //         perform: () => {
    //             onReloadKit().then((kit) => {
    //                 // TODO: Set kit over redux
    //                 // setKit(kit)
    //             })
    //         }
    //     },
    //     {
    //         id: 'open-draft',
    //         name: 'Open Draft',
    //         shortcut: ['$mod+Shift+o'],
    //         keywords: 'load session',
    //         section: 'Files',
    //         perform: () => {
    //             onOpenDraft('').then((draftJson) => {
    //                 diagramEditorRef.current.setDraft(JSON.parse(draftJson))
    //             })
    //         }
    //     },
    //     {
    //         id: 'save-draft',
    //         name: 'Save draft',
    //         shortcut: ['$mod+s'],
    //         keywords: 'store session',
    //         section: 'Files',
    //         perform: () => {
    //             onSaveDraft(diagramEditorRef.current.getDraft()).then((url) => {
    //                 console.log('Draft saved under: ', url)
    //             })
    //         }
    //     },
    //     {
    //         id: 'zoom-to-fit',
    //         name: 'Zoom to Fit',
    //         shortcut: ['$mod+t'],
    //         keywords: 'formation',
    //         section: 'Navigation',
    //         perform: () => {
    //             if (diagramEditorRef.current) {
    //                 diagramEditorRef.current.zoomToFit()
    //             }
    //         }
    //     }
    // ]

    // useEffect(() => {
    //     if (kit) {
    //         ;[
    //             'c:\\git\\semio\\2.x\\examples\\metabolism\\representations\\capsule_1_1to200_volume_wireframe.glb'
    //         ].forEach((path) => {
    //             window.electron.ipcRenderer.invoke('get-file-buffer', path).then((buffer) => {
    //                 const name = 'representations/capsule_1_1to200_volume_wireframe.glb'
    //                 const blob = new Blob([buffer], { type: 'model/gltf-binary' })
    //                 const url = URL.createObjectURL(blob)
    //                 useGLTF.preload(url)
    //                 setBlobUrls((prev) => ({ ...prev, [name]: url }))
    //             })
    //         })
    //     }
    // }, [kit])

    return (
        <div className="h-screen w-screen">
            <ConfigProvider locale={enUS} theme={sketchpadTheme}>
                <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <Header style={{ height: 'auto' }}>
                        <div
                            style={{
                                height: '38px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                WebkitAppRegion: 'drag'
                            }}
                        >
                            <Tabs
                                className="p-0 flex items-center"
                                type="editable-card"
                                style={{
                                    WebkitAppRegion: 'no-drag'
                                }}
                                activeKey={activeTab}
                                onChange={(key) => setActiveTab(key)}
                                onEdit={(targetKey, action) => {
                                    if (action === 'add') {
                                        const id = nanoid()
                                        setOpenTabs([...openTabs, id])
                                        setActiveTab(id)
                                    } else if (action === 'remove') {
                                        setOpenTabs(openTabs.filter((t) => t !== targetKey))
                                        if (activeTab === targetKey) setActiveTab('home')
                                    }
                                }}
                                defaultActiveKey="home"
                                items={[
                                    {
                                        key: 'home',
                                        label: <HomeSharpIcon />,
                                        closable: false
                                    },
                                    ...openTabs.map((tab, index) => {
                                        const view = views.find((v) => v.id === tab)
                                        if (view)
                                            return {
                                                key: view?.id,
                                                label:
                                                    view.kind === ViewKind.Type
                                                        ? view.type.name +
                                                          (view.type.variant
                                                              ? ` (${view.type.variant})`
                                                              : '')
                                                        : view.formation.name +
                                                          (view.formation.variant
                                                              ? ` (${view.formation.variant})`
                                                              : '')
                                            }
                                        return {
                                            key: tab,
                                            label: 'New Artifact'
                                        }
                                    })
                                ]}
                            />
                            <Space />
                            <div
                                style={{
                                    display: 'flex',
                                    height: '100%',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    WebkitAppRegion: 'no-drag'
                                }}
                            >
                                <Button
                                    onClick={onWindowMinimize}
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <MinimizeSharpIcon />
                                </Button>
                                <Button
                                    onClick={onWindowMaximize}
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    {fullScreen ? (
                                        <FullscreenExitSharpIcon />
                                    ) : (
                                        <FullscreenSharpIcon />
                                    )}
                                </Button>
                                <Button
                                    onClick={onWindowClose}
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CloseSharpIcon />
                                </Button>
                            </div>
                        </div>
                    </Header>
                    {activeTab === 'home' ? (
                        <div className="h-full flex items-center justify-center text-lightGrey text-2xl">
                            Click + to add a new artifact.
                        </div>
                    ) : (
                        <ArtifactWindow
                            viewId={activeTab}
                            onOpenDirectory={onOpenDirectory}
                            onOpenFile={onOpenFile}
                        />
                    )}
                </Layout>
            </ConfigProvider>
        </div>
    )
}
export default App

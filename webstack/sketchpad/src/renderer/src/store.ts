import { enableMapSet } from 'immer'
enableMapSet()

import { PayloadAction, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Formation, FormationInput, Kit, Type, TypeInput } from './semio'

// export const loadLocalKit = createAsyncThunk('loadLocalKit', async (directory: string) => {
//     if (!directory) {
//         return
//     }
//     const response = await client.request<Kit>(LOAD_LOCAL_KIT, { directory })
//     return response
// })

export const loadLocalKit = createAsyncThunk('loadLocalKit', async (directory: string) => {
    if (!directory) {
        return
    }
    // TODO: Inject the ipcRenderer into the store to allow the store to work outside of electron
    const response = await window.electron.ipcRenderer.invoke('load-local-kit', directory)
    return {
        directory,
        kit: response.loadLocalKit.kit as Kit
    }
})

export const kitsSlice = createSlice({
    name: 'kits',
    initialState: {
        kits: new Map<string, Kit>()
    },
    reducers: {
        loadKit: {
            reducer: (state, action) => {
                const { directory, reload } = action.payload
                if (!directory) {
                    return
                }
                const kit = state.kits.get(directory)
                if (kit && !reload) {
                    return
                }
                state.kits.set(directory, kit)
            },
            prepare: (directory, reload = false) => {
                return { payload: { directory, reload } }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadLocalKit.fulfilled, (state, action) => {
            if (action.payload.error) {
                console.error(action.payload.error)
                return
            }
            state.kits.set(action.payload.directory, action.payload.kit)
        })
    }
})

export const { loadKit } = kitsSlice.actions

export const selectKits = (state: { kits: { kits: Map<string, Kit> } }): Map<string, Kit> =>
    state.kits.kits

export const selectKit = (state: { kits: { kits: Map<string, Kit> } }, directory: string): Kit => {
    const kits = state.kits.kits
    return kits.get(directory)
}

export const selectTypes = (
    state: { kits: { kits: Map<string, Kit> } },
    directory: string
): Map<string, Map<string, Type>> => {
    const kit = selectKit(state, directory)
    const types = new Map<string, Map<string, Type>>()
    if (kit && kit.types) {
        kit.types.forEach((type) => {
            if (!types.has(type.name)) {
                types.set(type.name, new Map<string, Type>())
            }
            types.get(type.name).set(type.variant, type)
        })
    }
    return types
}

export const selectFormations = (
    state: { kits: { kits: Map<string, Kit> } },
    directory: string
): Map<string, Map<string, Formation>> => {
    const kit = selectKit(state, directory)
    const formations = new Map<string, Map<string, Formation>>()
    if (kit && kit.formations) {
        kit.formations.forEach((formation) => {
            if (!formations.has(formation.name)) {
                formations.set(formation.name, new Map<string, Formation>())
            }
            formations.get(formation.name).set(formation.variant, formation)
        })
    }
    return formations
}

export enum ViewKind {
    Type,
    Formation
}

export interface IArtifactView {
    kind: ViewKind
    id: string
    readonly name: string
    readonly description: string
    readonly icon: string
    kitDirectory: string
    toObject(): object
}

export class TypeView implements IArtifactView {
    kind: ViewKind = ViewKind.Type
    id: string
    kitDirectory: string
    type: TypeInput
    constructor(
        id: string,
        kitDirectory: string,
        type: TypeInput = {
            name: 'Unsaved Type',
            variant: '',
            unit: 'm',
            representations: [],
            ports: [],
            qualities: []
        }
    ) {
        this.id = id
        this.kitDirectory = kitDirectory
        this.type = type
    }
    get name(): string {
        return this.type.name
    }
    get description(): string {
        return this.type.description ?? ''
    }
    get icon(): string {
        return this.type.icon ?? ''
    }
    toObject() {
        return {
            kind: this.kind,
            id: this.id,
            kitDirectory: this.kitDirectory,
            type: this.type
        }
    }
}

export interface ISelectionFormation {
    piecesIds: string[]
    attractionsPiecesIds: [string, string][] // [attractingPieceId, attractedPieceId]
}

export class FormationView implements IArtifactView {
    kind: ViewKind = ViewKind.Formation
    id: string
    kitDirectory: string
    formation: FormationInput
    selection: ISelectionFormation
    constructor(
        id: string,
        kitDirectory: string,
        formation: FormationInput = {
            name: 'Unsaved Formation',
            variant: '',
            unit: 'm',
            pieces: [],
            attractions: []
        },
        selection: ISelectionFormation = { piecesIds: [], attractionsPiecesIds: [] }
    ) {
        this.id = id
        this.kitDirectory = kitDirectory
        this.formation = formation
        this.selection = selection
    }
    get name(): string {
        return this.formation.name
    }
    get description(): string {
        return this.formation.description ?? ''
    }
    get icon(): string {
        return this.formation.icon ?? ''
    }
    toObject() {
        return {
            kind: this.kind,
            id: this.id,
            kitDirectory: this.kitDirectory,
            formation: this.formation,
            selection: this.selection
        }
    }
}

export const viewsSlice = createSlice({
    name: 'views',
    initialState: {
        views: []
    },
    reducers: {
        addView: {
            reducer: (
                state,
                action: PayloadAction<{
                    id: string
                    kitDirectory: string
                    viewKind: ViewKind
                    formation?: FormationInput
                    type?: TypeInput
                    selection?: ISelectionFormation
                }>
            ) => {
                const { id, kitDirectory, viewKind, formation, type, selection } = action.payload
                if (viewKind === ViewKind.Type) {
                    state.views.push(new TypeView(id, kitDirectory, type))
                } else if (viewKind === ViewKind.Formation) {
                    state.views.push(new FormationView(id, kitDirectory, formation, selection))
                }
            },
            prepare: (view: IArtifactView) => {
                return {
                    payload: {
                        viewKind: view.kind,
                        kitDirectory: view.kitDirectory,
                        id: view.id,
                        formation:
                            view.kind === ViewKind.Formation
                                ? (view as FormationView).formation
                                : undefined,
                        type: view.kind === ViewKind.Type ? (view as TypeView).type : undefined,
                        selection:
                            view.kind === ViewKind.Formation
                                ? (view as FormationView).selection
                                : undefined
                    }
                }
            }
        },
        removeView: (state, action: PayloadAction<string>) => {
            state.views = state.views.filter((view) => view.id !== action.payload)
        }
    }
})

export const { addView, removeView } = viewsSlice.actions

export const selectViews = (state: { views: { views: IArtifactView[] } }): IArtifactView[] =>
    state.views.views

export const selectView = (
    state: { views: { views: IArtifactView[] } },
    id: string
): IArtifactView | undefined => state.views.views.find((view) => view.id === id)

export const selectFormationView = (
    state: { views: { views: IArtifactView[] } },
    id: string
): FormationView | undefined => {
    const view = state.views.views.find((view) => view.id === id)
    if (view && view.kind === ViewKind.Formation) {
        return view as FormationView
    }
    return undefined
}

export const store = configureStore({
    reducer: {
        kits: kitsSlice.reducer,
        views: viewsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

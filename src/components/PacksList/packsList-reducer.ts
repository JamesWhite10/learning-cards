import {
    addCardsPackDataType,
    cardsPackType,
    getPacksAPIParamsType,
    PacksListAPI,
} from "../../api/api";
import {AppThunkType, GetAppStateType} from "../../state/redux-store";
import {Dispatch} from "redux";

type InitialStateType = {
    cardPacks:cardsPackType[]
    packsParams:getPacksAPIParamsType
    cardPacksTotalCount: number
    success: boolean
}

export const initialState: InitialStateType = {
    cardPacks: [] as cardsPackType[],
    packsParams: {
        min: 0,
        max: 20,
        page: 1,
        pageCount: 15,
        sortPacks: '0updated',
        packName: ''
    },
    cardPacksTotalCount: 0,
    success: false,
}

//types
type GetPacksListAT = ReturnType<typeof GetPacksListAC>
type setPageNumber = ReturnType<typeof setPageNumberAC>
type setTotalPacksCountAC = ReturnType<typeof setTotalPacksCountAC>
type setPageCountAC = ReturnType<typeof setPageCountAC>
type setPackNameAT = ReturnType<typeof setPackNameAC>
type SetSuccessAT = ReturnType<typeof SetSuccessAC>
// type AddPackAT = ReturnType<typeof AddPackAC>

export type actionPacksListType = GetPacksListAT | SetSuccessAT | setPageNumber | setTotalPacksCountAC | setPackNameAT | setPageCountAC

//actionC
export const GetPacksListAC = (packs: Array<cardsPackType>) => ({type: 'packList/GET-PACKSLIST', packs} as const)
export const setPageNumberAC =  (page:number) => ({type:'packList/SET-PAGE-NUMBER' , page} as const)
export const setTotalPacksCountAC = (cardPacksTotalCount: number)  => ({type: 'packList/SET-PACKS-TOTAL-COUNT', cardPacksTotalCount} as const)
export const setPageCountAC = (pageCount: number) => ({type: `packList/SET-PAGE-COUNT`, pageCount} as const)
export const setPackNameAC = (packName: string) => ({type: `packList/SET-PACK-NAME`, packName} as const)
export const SetSuccessAC = (success: boolean) => ({type: 'packList/SET-SUCCESS', success} as const)


//export const AddPackAC = (payload: addCardsPackDataType) => ({type: "packList/ADD-PACK", payload} as const)

export const packsListReducer = (state = initialState, action: actionPacksListType): InitialStateType => {
    switch (action.type) {
        case "packList/GET-PACKSLIST":
            return ({
                ...state,
                cardPacks:action.packs
            })
        case 'packList/SET-PAGE-NUMBER': {
            return ({
                ...state,
                packsParams: {...state.packsParams, page: action.page}
            })
        }
        case 'packList/SET-PACKS-TOTAL-COUNT': {
            return ({
                ...state,
                cardPacksTotalCount: action.cardPacksTotalCount
            })
        }
        case 'packList/SET-PAGE-COUNT': {
            return ({
                ...state,
                packsParams: {...state.packsParams, pageCount: action.pageCount}
            })
        }
        case "packList/SET-PACK-NAME": {
            return ({
                ...state,
                packsParams: {...state.packsParams, packName: action.packName}
            })
        }
        case "packList/SET-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

//thunkC
export const getPackList = (params: getPacksAPIParamsType): AppThunkType => async (dispatch: Dispatch<actionPacksListType>, getStore: GetAppStateType) => {
    const {page} = getStore().packsList.packsParams
    try {
        const response = await PacksListAPI.getPacks({...params,page})
        dispatch(GetPacksListAC(response.data.cardPacks))
        dispatch(setTotalPacksCountAC(response.data.cardPacksTotalCount))
        dispatch(SetSuccessAC(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(SetSuccessAC(false))
    } finally {
    }
}

export const addPack = (data: addCardsPackDataType): AppThunkType => async (dispatch: Dispatch<actionPacksListType>,getState:GetAppStateType) => {
    const {sortPacks, min, max, page, user_id, pageCount, packName} = getState().packsList.packsParams
    try {
        const responseAdd = await PacksListAPI.addCardsPack(data)
        const response = await PacksListAPI.getPacks({pageCount, user_id, page, max, min, sortPacks, packName})
        dispatch(GetPacksListAC(response.data.cardPacks))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

export const deletePack = (params: {id: string}): AppThunkType => async (dispatch: Dispatch<actionPacksListType>,getState:GetAppStateType) => {
    const {sortPacks, min, max, page, pageCount, packName} = getState().packsList.packsParams
    const _id = getState().profile.profile._id
    try {
        const responseDelete = await PacksListAPI.deleteCardsPack(params)
        const response = await PacksListAPI.getPacks({pageCount, user_id: _id, page, max, min, sortPacks, packName})
        dispatch(GetPacksListAC(response.data.cardPacks))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

export const updatePack = (data: { cardsPack: { _id: string, name?: string } }): AppThunkType => async (dispatch: Dispatch<actionPacksListType>,getState:GetAppStateType) => {
    const {sortPacks, min, max, page, user_id, pageCount, packName} = getState().packsList.packsParams
    const _id = getState().profile.profile._id
    try {
        const responseUpdate = await PacksListAPI.changeCardsPack(data)
        const response = await PacksListAPI.getPacks({pageCount, user_id, page, max, min, sortPacks, packName})
        dispatch(GetPacksListAC(response.data.cardPacks))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

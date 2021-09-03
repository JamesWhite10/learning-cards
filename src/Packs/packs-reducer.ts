import {
    loadingRequest,
    setServerErrorMessageRegistration
} from '../Registration/registration-reducer';
import {authAPI, loginAPI, packsAPI, PacksResponseType, PackType} from '../api/api';
import {AppThunkType} from '../state/store';


const initialState: Array<PackType> = []

export const packsReducer = (state = initialState, action: ActionsPacksType): Array<PackType> => {
    switch (action.type) {
        case 'PACKS/REMOVE-PACK':
            return {...state.filter(t => t._id != action.packId)}
        case 'PACKS/ADD-PACK':
            return [{...action.pack}, ...state]
        case 'PACKS/UPDATE-PACK':
            return action.packs
        case 'PACKS/SET-PACK':
            return action.packs
        default:
            return state
    }
}

// actions
export const removePack = (packId: string) =>
    ({type: 'PACKS/REMOVE-PACK', packId} as const)

export const addPack = (pack: PackType) =>
    ({type: 'PACKS/ADD-PACK', pack} as const)

export const updatePack = (packs: Array<PackType>) =>
    ({type: 'PACKS/UPDATE-PACK', packs} as const)

export const setPacks = (packs: Array<PackType>) =>
    ({type: 'PACKS/SET-PACK', packs} as const)

// thunks
// export const fetchPacks = (todolistId: string): AppThunkType => async (dispatch) => {
//     dispatch(loadingRequest(true))
//     await packsAPI.getPacks()
//     dispatch(setPacks())
//     dispatch(loadingRequest(false))
// }
// export const setLogin = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch) => {
//     dispatch(loadingRequest(true))
//     try {
//         await loginAPI.login(email, password, rememberMe)
//         dispatch(setIsLoggedIn(true))
//     } catch (e) {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setServerErrorMessageRegistration(error))
//     } finally {
//         dispatch(loadingRequest(false))
//     }
// }
//
// export const logout = (): AppThunkType => async (dispatch) => {
//     dispatch(loadingRequest(true))
//     try {
//         await authAPI.logout()
//         dispatch(setIsLoggedIn(false))
//         dispatch(loadingRequest(false))
//     } catch (e) {
//         const error = e.response
//             ? e.response.data.error
//             : (e.message + ', more details in the console');
//         dispatch(setServerErrorMessageRegistration(error))
//     }
// }

// types
export type ActionsPacksType = ReturnType<typeof removePack>
    | ReturnType<typeof addPack>
    | ReturnType<typeof updatePack>
    | ReturnType<typeof setPacks>

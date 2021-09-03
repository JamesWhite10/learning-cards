import {
    loadingRequest,
    setServerErrorMessageRegistration
} from '../Registration/registration-reducer';
import {authAPI, loginAPI, PackType} from '../api/api';
import {AppThunkType} from '../state/store';


const initialState: Array<PackType> = []

export const packsReducer = (state = initialState, action: ActionsPacksType): Array<PackType> => {
    switch (action.type) {
        // case 'PACKS/REMOVE-PACK':
        //     return {...state.filter(t => t._id != action.packId)}
        // case 'PACKS/ADD-PACK':
        //     return {...state, action.pack}
        // case 'PACKS/UPDATE-PACK':
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.packId]
        //             .map(t => t.id === action.packId ? {...t, ...action.model} : t)
        //     }
        // case 'PACKS/SET-PACK':
        //     return {...state, action.packs}
        default:
            return state
    }
}

// actions
export const removePack = (packId: string) =>
    ({type: 'PACKS/REMOVE-PACK', packId} as const)

export const addPack = (pack: PackType) =>
    ({type: 'PACKS/ADD-PACK', pack} as const)

export const updatePack = (packId: string) =>
    ({type: 'PACKS/UPDATE-PACK', packId} as const)

export const setPacks = (packs: Array<PackType>, packId: string) =>
    ({type: 'PACKS/SET-PACK', packs, packId} as const)

// thunks
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

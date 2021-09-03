import {Dispatch} from "redux";
import {AppThunkType} from "../state/store";
import {authAPI} from "../api/api";


const initialStateProfile = {
    profile: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,
    } as ProfileResponseType,
    loadingRequest: false
}

export const profileReducer = (state: initialProfileType = initialStateProfile, action: ActionsProfileType): initialProfileType => {
    switch (action.type) {
        case 'PROFILE/SET_PROFILE_DATA': {
            return {...state, ...action.payload}
        }
        case 'PROFILE/LOADING-REQUEST':
            return {...state, ...action.payload}
        case 'PROFILE/UPDATE-PROFILE':
            return {
                ...state,
                profile: {...state.profile, ...action.payload}
            }
        default:
            return state
    }
}

//actionC
export const setProfileAC = (profile: ProfileResponseType) => {
    return {
        type: "PROFILE/SET_PROFILE_DATA",
        payload: {profile}
    } as const
}
const loadingRequestAC = (loadingRequest: boolean) => {
    return {
        type: 'PROFILE/LOADING-REQUEST',
        payload: {loadingRequest}
    } as const
}
export const updateProfileAC = (avatar: string, name: string) => ({
    type: 'PROFILE/UPDATE-PROFILE',
    payload: {avatar, name}
} as const)


//thunkC
export const updateProfile = (avatar: string, name: string): AppThunkType => async (dispatch: Dispatch<ActionsProfileType>) => {
    dispatch(loadingRequestAC(true))
    try {
        const response = await authAPI.updateProfile(avatar, name)
        dispatch(updateProfileAC(response.data.updatedUser.avatar, response.data.updatedUser.name))
    } catch (e) {
        /*const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setServerErrorMessageRegistration(error))*/
    } finally {
        dispatch(loadingRequestAC(false))
    }
}

export const setProfile = (): AppThunkType => async (dispatch: Dispatch<ActionsProfileType>) => {
    try {
        const response = await authAPI.me()
        dispatch(setProfileAC(response.data))
    } catch (e) {
    }
}

//types
type initialProfileType = typeof initialStateProfile

export type ActionsProfileType =
    | ReturnType<typeof loadingRequestAC>
    | ReturnType<typeof updateProfileAC>
    | ReturnType<typeof setProfileAC>

export type ProfileResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
}
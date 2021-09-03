import {authAPI, loginAPI, loginResponseType} from "../../api/api";
import {AppThunkType} from "../../state/redux-store";
import {setProfileAC} from "../Profile/profile-reducer";

const initialStateLogin: initialLoginType = {
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
    error: '',
    loadingRequest: false,
    logIn: false
}

export const loginReducer = (state: initialLoginType = initialStateLogin, action: actionsLoginType): initialLoginType => {
    switch (action.type) {
        case 'LOGIN/LOGIN-USER':
            return {...state, ...action.payload}
        case 'LOGIN/SET-ERROR':
            return {...state, ...action.payload}
        case 'LOGIN/LOADING-REQUEST':
            return {...state, ...action.payload}
        case 'LOGIN/LOG-IN':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actionC
export const loginUser = (userData: loginResponseType) => {
    return {
        type: 'LOGIN/LOGIN-USER',
        payload: {...userData}
    } as const
}
const loadingRequest = (loadingRequest: boolean) => {
    return {
        type: 'LOGIN/LOADING-REQUEST',
        payload: {loadingRequest}
    } as const
}
export const logIn = (logIn: boolean) => {
    return {
        type: 'LOGIN/LOG-IN',
        payload: {logIn}
    } as const
}
export const setServerErrorMessageLogin = (error: string) => {
    return {
        type: 'LOGIN/SET-ERROR',
        payload: {error}
    } as const
}


//thunkC
export const loginUserTC = (emailValue: string, passwordValue: string): AppThunkType => async (dispatch) => {
    dispatch(loadingRequest(true))

    try {
        const response = await loginAPI.logIn(emailValue, passwordValue)
        dispatch(loginUser(response.data))
        dispatch(logIn(true))

    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setServerErrorMessageLogin(error))
    } finally {
        dispatch(loadingRequest(false))
    }
}

export const AuthUser = (): AppThunkType => async (dispatch) => {
    dispatch(loadingRequest(true))
    try {
        const response = await authAPI.me()

        dispatch(logIn(true))
        dispatch(setProfileAC(response.data))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setServerErrorMessageLogin(error))
    } finally {
        dispatch(loadingRequest(false))
    }
}

export const logOutUser = (): AppThunkType => async (dispatch) => {
    try {
        const response = await authAPI.logOut()
        dispatch(logIn(false))
    } catch (e) {
        console.log(e)
    }
}

//types
export type initialLoginType = {
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
    error: string
    loadingRequest: boolean
    logIn: boolean
}
export type actionsLoginType = ReturnType<typeof loginUser>
    | ReturnType<typeof loadingRequest>
    | ReturnType<typeof logIn>
    | ReturnType<typeof setServerErrorMessageLogin>
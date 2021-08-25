import {
    loadingRequest,
    setServerErrorMessageRegistration
} from '../Registration/registration-reducer';
import {loginAPI} from '../api/api';
import {AppThunkType} from "../state/store";


const initialState = {
    login: false
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: actionsLoginType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN':
            return {...state, login: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedIn = (value: boolean) =>
    ({type: 'LOGIN/SET-LOGIN', value} as const)

// thunks
export const setLogin = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch) => {
    dispatch(loadingRequest(true))
    try {
        await loginAPI.login(email, password, rememberMe)
        dispatch(setIsLoggedIn(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setServerErrorMessageRegistration(error))
    } finally {
        dispatch(loadingRequest(false))
    }
}

export const logout = (): AppThunkType => async (dispatch) => {
    dispatch(loadingRequest(true))
    try {
        await loginAPI.logout()
        dispatch(setIsLoggedIn(false))
        dispatch(loadingRequest(false))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setServerErrorMessageRegistration(error))
    }
}

// types
export type actionsLoginType = ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof loadingRequest>
    | ReturnType<typeof setServerErrorMessageRegistration>

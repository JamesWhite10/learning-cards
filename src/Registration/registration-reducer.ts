import {Dispatch} from "redux";
import {AppThunkType} from "../state/store";
import {registrationAPI} from "../api/api";

const initialStateRegistration = {
    isRegistration: false,
    loadingRequest: false,
    error: ''
}

export const registrationReducer = (state: InitialRegistrationType = initialStateRegistration, action: ActionsRegistrationType): InitialRegistrationType => {
    switch (action.type) {
        case 'REGISTRATION/SET-REGISTRATION':
            return {...state, ...action.payload}
        case 'REGISTRATION/LOADING-REQUEST':
            return {...state, ...action.payload}
        case 'LOGIN/INCORRECT-DATA-LOG-IN':
            return {...state, ...action.payload}
        default: return state
    }
}

//actionCreator
export const setRegistrationAC = (isRegistration: boolean) => ({
    type: 'REGISTRATION/SET-REGISTRATION', payload: {isRegistration}
} as const)
export const loadingRequest = (loadingRequest: boolean) => ({
    type: 'REGISTRATION/LOADING-REQUEST',
    payload: {loadingRequest}
} as const)
export const setServerErrorMessageRegistration = (error: string) => {
    return {
        type: 'LOGIN/INCORRECT-DATA-LOG-IN',
        payload: {error}
    } as const
}

//thunkCreator
export const setRegistration = (email: string, password: string): AppThunkType => async (dispatch: Dispatch<ActionsRegistrationType>) => {
    dispatch(loadingRequest(true))

    try {
        await registrationAPI.register(email, password);
        dispatch(setRegistrationAC(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setServerErrorMessageRegistration(error))
    } finally {
        dispatch(loadingRequest(false))
    }
}

//types
export type InitialRegistrationType = typeof initialStateRegistration
export type ActionsRegistrationType = ReturnType<typeof setRegistrationAC>
    | ReturnType<typeof loadingRequest>
    | ReturnType<typeof setServerErrorMessageRegistration>
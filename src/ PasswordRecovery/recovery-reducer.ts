import {AppThunkType} from "../state/store";
import {passwordRecoveryAPI, RecoveryRequestType} from "../api/api";
import {EmailDataType} from "./PasswordRecovery";

const initialRecoveryReducerState = {
    error: "",
    success: false,
}


export const recoveryReducer =
    (state: InitialRecoveryReducerType = initialRecoveryReducerState, action: ActionRecoveryReducerTypes)
        : InitialRecoveryReducerType => {
        switch (action.type) {
            case "PASSWORD-RECOVERY/SUCCESS" :
                return {...state, ...action.payload}
            default:
                return state
        }
    }
//======ActionC=======

export const setSuccessAC = (success: boolean) => ({
    type: "PASSWORD-RECOVERY/SUCCESS",
    payload: {success}
} as const)

// const setFAC = (f: any) => ({
//     type: "AAA",
//     payload: {f}
// } as const)


//=======ThunkC=======
export const recoveryThunk = (data:EmailDataType): AppThunkType =>
    async (dispatch) => {
        try {
            await passwordRecoveryAPI.forgot(data)
            dispatch(setSuccessAC(true))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + `, more information in console`);

            dispatch(setSuccessAC(false))
        }


    }

export const newPassThunk = (data:RecoveryRequestType): AppThunkType =>
    async dispatch => {
    try {
        await passwordRecoveryAPI.recovery(data)
    } catch(e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + `, more information in console`);
    }
    }
//=======Types========
export type InitialRecoveryReducerType = typeof initialRecoveryReducerState
export type ActionRecoveryReducerTypes = ReturnType<typeof setSuccessAC>

// function async(dispatch: any) {
//     throw new Error("Function not implemented.");
// }


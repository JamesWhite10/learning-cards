import {AppThunkType} from "../state/store";
import {PasswordRecoveryAPI} from "../api/api";

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
export const recoveryThunk = (email: string): AppThunkType =>
    async (dispatch) => {
        try {
            await PasswordRecoveryAPI.forgot(email)
            dispatch(setSuccessAC(true))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + `, more information in console`);

            dispatch(setSuccessAC(false))
        }


    }


//=======Types========
export type InitialRecoveryReducerType = typeof initialRecoveryReducerState
export type ActionRecoveryReducerTypes = ReturnType<typeof setSuccessAC>

// function async(dispatch: any) {
//     throw new Error("Function not implemented.");
// }


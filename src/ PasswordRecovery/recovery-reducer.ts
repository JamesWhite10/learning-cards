
const initialState = {
    error: ""
}

export type InitialStateType = typeof initialState

export const recoveryReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (1) {
        default:
            return {...state}
    }
}
//======ActionC=======

/*const setFAC = (f:any)=>({
    type: "AAA",
    payload: {f}
} as const)

const setFAC = (f:any)=>({
    type: "AAA",
    payload: {f}
} as const)

const setFAC = (f:any)=>({
    type: "AAA",
    payload: {f}
} as const)*/


//=======ThunkC=======





//=======Types========
type ActionTypes = any

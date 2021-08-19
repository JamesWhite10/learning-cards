
const initialState = {}

export type InitialStateType = typeof initialState

export const recoveryReducer = (state: InitialStateType = initialState): InitialStateType => {
    switch (1) {
        default:
            return {...state}
    }
}
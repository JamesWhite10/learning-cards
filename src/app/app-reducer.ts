
const initialState = {}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState): InitialStateType => {
    switch (1) {
        default:
            return {...state}
    }
}
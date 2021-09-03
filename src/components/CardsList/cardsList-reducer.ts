import {addCardDataType, CardsListAPI, cardType, getCardsAPIParamsType,} from "../../api/api";
import {AppThunkType, GetAppStateType} from "../../state/redux-store";
import {Dispatch} from "redux";

const initialState = {
    arrayCard: [] as Array<cardType>,
    grade: 0,
    sortCards: "" as string,
    maxGrade: 1000 as number | undefined,
    minGrade: 0 as number | undefined,
    page: 1,
    pageCount: 5,
    cardsTotalCount: 100,
    cardsPack_id: "",
    searchVal: "",
    sort: "",
    question: "",
    searchCardQuestion: "" as string | undefined,
    success: false
}

//types
type initialStateType = typeof initialState
type GetCardsListAT = ReturnType<typeof GetCardsListAC>
type setGradeCardAT = ReturnType<typeof setGradeCardAC>
type SetSuccessAT = ReturnType<typeof SetSuccessAC>

export type actionCardsListType = GetCardsListAT | SetSuccessAT | setGradeCardAT


//actionC
export const GetCardsListAC = (params: Array<cardType>) => ({type: 'cardList/GET-CARDSLIST', params} as const)
export const SetSuccessAC = (success: boolean) => ({type: 'cardList/SET-SUCCESS', success} as const)
export const setGradeCardAC = (grade: number) => ({ type: "SET-GRADE", grade } as const);

export const cardsListReducer = (state = initialState, action: actionCardsListType): initialStateType => {
    switch (action.type) {
        case "cardList/GET-CARDSLIST":
            return {...state, arrayCard: action.params.map(cl => ({...cl}))}
        case "cardList/SET-SUCCESS":
            return {...state, success: action.success}
        case "SET-GRADE": {
            return { ...state, grade: action.grade };
        }
        default:
            return state
    }
}

//thunkC
export const getCardsList = (params: getCardsAPIParamsType): AppThunkType => async (dispatch: Dispatch<actionCardsListType>, getStore: GetAppStateType) => {

    try {
        const response = await CardsListAPI.getCards({...params})
        dispatch(GetCardsListAC(response.data.cards))
        dispatch(SetSuccessAC(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(SetSuccessAC(false))
    } finally {
    }
}

export const addCard = (data: addCardDataType): AppThunkType => async (dispatch: Dispatch<actionCardsListType>) => {

    try {
        const responseAdd = await CardsListAPI.addCard(data)
        const response = await CardsListAPI.getCards({cardPack_id: data.card.cardsPack_id})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

export const deleteCard = (params: {id: string, cardPack_id: string}): AppThunkType => async (dispatch: Dispatch<actionCardsListType>) => {

    try {
        const responseDelete = await CardsListAPI.deleteCard(params)
        const response = await CardsListAPI.getCards({cardPack_id: params.cardPack_id})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    } finally {
    }
}

export const gradeCardTC = (grade:number, card_id:string) => async (dispatch: Dispatch<actionCardsListType>) => {

    try {
        await CardsListAPI.setCardGrade(grade, card_id)
    } catch (e) {
        console.log('GRADE_CARD_ERROR: ', {...e})
    } finally {
    }
}



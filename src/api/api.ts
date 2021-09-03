import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/'
})


//API
export const loginAPI = {
    logIn(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<loginResponseType>('auth/login', {email, password, rememberMe})
    }
}
export const PasswordRecoveryAPI = {
    forgot(email: string) {
        return instance.post<PasswordRecoveryDataType>('/auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                        <a href='https://JamesWhite10.github.io/learning-cards#/new-password/$token$'>link</a></div>`
        })
    }
}
export const registrationAPI = {
    register(email: string, password: string) {
        return instance.post<registrationResponseType>('auth/register', {email, password})
    }
}
export const SetNewPasswordAPI = {
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<SetNewPasswordDataType>("/auth/set-new-password", {
            password,
            resetPasswordToken,
        })
    }
}
export const authAPI = {
    me() {
        return instance.post<loginResponseType>('auth/me', {})
    },
    updateProfile(avatar: string, name: string) {
        return instance.put<profileResponseType>('auth/me', {avatar, name})
    },
    logOut() {
        return instance.delete<logOutType>('auth/me')
    }
}
export const PacksListAPI = {
    getPacks(params: getPacksAPIParamsType) {
        const {page, max, min, packName, pageCount, user_id} = params
        const user__id = user_id !== undefined ? `&user_id=${user_id}` : ''
        return instance.get<resultGetPacksAPIType>(`cards/pack?page=${page}&pageCount=${pageCount}&packName=${packName}&min=${min}&max=${max}${user__id}`)
    },
    addCardsPack(data: addCardsPackDataType) {
        return instance.post<Array<cardsPackType>>('/cards/pack', data)
    },
    deleteCardsPack(params: { id: string }) {
        return instance.delete<Array<cardsPackType>>('/cards/pack', {params})
    },
    changeCardsPack(data: { cardsPack:{ _id: string, name?: string } }) {
        return instance.put<Array<cardsPackType>>('/cards/pack', data)
    },
}

export const CardsListAPI = {
    getCards(params: getCardsAPIParamsType) {
        return instance.get<resultGetCardsAPIType>(`/cards/card?cardsPack_id=${params.cardPack_id}`
            + "&pageCount=50")
    },
    addCard(data: addCardDataType) {
        return instance.post<Array<cardType>>('/cards/card', data)
    },
    deleteCard(params: { id: string }) {
        return instance.delete<Array<cardType>>('/cards/card', {params})
    },
    changeCard(data: { _id: string, question?: string, comments?: string }) {
        return instance.put<Array<cardType>>('/cards/card', data)
    },
    setCardGrade(grade: number, card_id: string) {
        return instance.put<SetGradeResponseType>('/cards/grade', {grade, card_id})
    },
}

//TYPES=====

//loginAPI
export type loginResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: ''
    updated: ''
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
}

//profileAPI
export type profileResponseType = {
    updatedUser: loginResponseType
    error?: string
    token: string
    tokenDeathTime: number
}

//authAPI
type logOutType = {
    info: string,
    error: string
}

//PasswordRecoveryAPI
export type PasswordRecoveryDataType = {
    error: string;
}

//SetNewPasswordAPI
export type SetNewPasswordDataType = {
    info: string
    error: string
}

//registrationAPI
type registrationResponseType = {
    addedUser: addedUserType
    error?: string
}

type addedUserType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: 0,
    created: string,
    updated: string,
    __v: number
}

//PacksListAPI
type cardAndPackType = "pack" | "folder" | "card"

export type cardsPackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    path?: string
    cardsCount: number
    grade?: number
    shots?: number
    rating?: number
    type?: cardAndPackType
    created: string
    updated: string
    __v?: number

}
export type getPacksAPIParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type resultGetPacksAPIType = {
    cardPacks: Array<cardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
}
export type addCardsPackDataType = {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}

//CardsListAPI
export type cardType = {
    answer?: string
    question?: string
    cardsPack_id: string
    grade: number
    rating?: number
    shots?: number
    type?: cardAndPackType
    more_id: string
    user_id: string
    created?: string
    updated?: string
    comment: string,
    __v?: number
    _id: string
}

export type getCardsAPIParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type resultGetCardsAPIType = {
    cards: Array<cardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type addCardDataType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        type?: cardAndPackType
    }
}

//LearnAPI
type SetGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}
import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/'
})

//API

export const registrationAPI = {
    register(email: string, password: string) {
        return instance.post<RegistrationResponseType>('auth/register', {email, password})
    }
}

export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/me')
    }
}

export const passwordRecoveryAPI = {
    forgot(email: string) {
        return instance.post<RecoveryResponseType>('auth/recovery', {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
                            password recovery link: 
                            <!--нужен путь к токену Максаб но я не врубаюсь пока что к чему-->
                        <a href='https://localhost:3000/#/new-password/$token$'>link</a></div>`
        })
    }
}
                       /* <a href='https://JamesWhite10.github.io/learning-cards#/new-password/$token$'>link</a></div>`*/

//=======TYPES=====

//registrationAPI
type RegistrationResponseType = {
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

//loginAPI
type LoginResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string
}
type LogoutResponseType = {
    info: 'logOut success —ฅ/ᐠ.̫ .ᐟฅ—',
    error: string
}

//recovery password API
type RecoveryResponseType = {
    email: string
    from: string
    message: any
}
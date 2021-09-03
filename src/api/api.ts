import axios from 'axios'
import {EmailDataType} from "../ PasswordRecovery/PasswordRecovery";

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
    }
}

export const passwordRecoveryAPI = {
    forgot(data:EmailDataType) {
        return instance.post<RecoveryResponseType>('auth/forgot', data)
    },
    recovery(data:RecoveryRequestType) {
        return instance.post<RecoveryResponseType>('auth/set-new-password', data)
    }
}

export const authAPI = {
    me() {
        return instance.post<LoginResponseType>('auth/me', {})
    },
    updateProfile(avatar: string, name: string) {
        return instance.put<ProfileResponseType>('auth/me', {avatar, name})
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/me')
    }
}


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

//profileAPI
export type ProfileResponseType = {
    updatedUser: LoginResponseType
    error?: string
    token: string
    tokenDeathTime: number
}

//recovery password API
type RecoveryResponseType = {
    email: string
    from: string
    message: any
}

export type RecoveryRequestType = {
    password: string
    resetPasswordToken: string
}

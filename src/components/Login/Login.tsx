import React, {ChangeEvent, useEffect, useState} from "react";
import s from './Login.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {loginUserTC, setServerErrorMessageLogin} from "./login-reducer";
import {AppStateType} from "../../state/redux-store";
import {NavLink, Redirect} from "react-router-dom";
import {InputContainer} from "../../common/InputContainer/InputContainer";
import {emailValidation} from "../../common/validation/EmailValidation";
import {HeaderEnterApp} from "../../common/HeaderEnterApp/HeaderEnterApp";
import {MainActionButton} from "../../common/MainActionButton/MainActionButton";
import {PasswordValidation} from "../../common/validation/passwordValidation";

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>(process.env.REACT_APP_EMAIL || '')
    const [passwordValue, setPasswordValue] = useState<string>(process.env.REACT_APP_PASSWORD || '')

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const isLogIn = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const serverErrorMessage = useSelector<AppStateType, string>(state => state.login.error)

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')

    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
        setErrorEmailMessage('')
        serverErrorMessage && dispatch(setServerErrorMessageLogin(''))
    }
    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
        serverErrorMessage && dispatch(setServerErrorMessageLogin(''))
        setErrorPasswordMessage('')
    }

    const checkLoginUser = () => {
        if (!emailValidation(emailValue)) {
            setErrorEmailMessage('Incorrect email')
        } else if (!PasswordValidation(passwordValue)) {
            setErrorPasswordMessage('Minimum 8 characters')
        } else {
            dispatch(loginUserTC(emailValue, passwordValue))
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setServerErrorMessageLogin(''))
        }
    }, [])


    if (isLogIn) {
        return <Redirect to={'/profile'}/>
    }
    const disabledBtnSubmit = !emailValue || !passwordValue

    return (
        <div className={s.authPageContainer}>
            <HeaderEnterApp title={'Sign In'}/>

            <div className={s.emailPasswordLoginContainer}>
                <InputContainer
                    title={'Email'}
                    typeInput={'email'}
                    value={emailValue}
                    changeValue={changeEmailValue}
                    errorMessage={errorEmailMessage}
                />
                <InputContainer
                    title={'Password'}
                    typeInput={'password'}
                    value={passwordValue}
                    changeValue={changePasswordValue}
                    errorMessage={errorPasswordMessage}
                />

                <div className={s.forgotPasswordBtn}>
                    <NavLink to="/password-recovery">Forgot Password</NavLink>
                </div>
            </div>

            <div className={s.btnFooterLoginContainer}>
                <span className={s.errorMessageContainer}>{serverErrorMessage}</span>
                <div className={s.blueBtnContainer}>
                    <MainActionButton actionClick={checkLoginUser}
                                disabledBtnSubmit={disabledBtnSubmit}
                                loadingStatus={loadingStatus}
                                title={'login'}
                    />
                </div>
                <p className={s.DifferentAccountBtn}>Don't have an account</p>
                <NavLink to="/registration" className={s.footerBtn}>Sing Up</NavLink>
            </div>
        </div>
    )
}


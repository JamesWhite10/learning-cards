import React, {ChangeEvent, useState} from 'react';
import {InputContainer} from '../common/InputContainer/InputContainer';
import {MainActionButton} from '../common/MainActionButton/MainActionButton';
import s from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import SuperCheckbox from '../HomemadeInpButCheck/common/c3-SuperCheckbox/SuperCheckbox';
import {emailValidation} from '../common/validation/EmailValidation';
import {PasswordValidation} from '../common/validation/passwordValidation';
import {loginUserTC, setServerErrorMessageLogin} from './login-reducer';
import {AppRootStateType} from "../state/store";
import {HeaderEnterApp} from "../common/HeaderEnterApp/HeaderEnterApp";
import style from "../ PasswordRecovery/PasswordRecovery.module.css";

export const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const disabledBtnSubmit = !email || !password

    const dispatch = useDispatch()
    const login = useSelector<AppRootStateType, boolean>(state => state.login.logIn)
    const loadingStatus = useSelector<AppRootStateType, boolean>(state => state.login.loadingRequest)
    const serverErrorMessage = useSelector<AppRootStateType, string>(state => state.registration.error)

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setErrorEmailMessage('')
        serverErrorMessage && dispatch(setServerErrorMessageLogin(''))
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        serverErrorMessage && dispatch(setServerErrorMessageLogin(''))
        setErrorPasswordMessage('')
    }

    const onChangeRememberMe = () => {
        setRememberMe(!rememberMe)
    }

    const onLogin = () => {
        if (!emailValidation(email)) {
            setErrorEmailMessage('Incorrect email')
        } else if (!PasswordValidation(password)) {
            setErrorPasswordMessage('Minimum 8 characters')
        } else {
            dispatch(loginUserTC(email, password, rememberMe))
        }
    }

    if (login) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.authPageContainer}>
            <HeaderEnterApp title={'Sign In'}/>

            <div className={s.emailPasswordLoginContainer}>
                <InputContainer
                    title={'Email'}
                    typeInput={'email'}
                    value={email}
                    changeValue={onChangeEmail}
                    errorMessage={errorEmailMessage}
                />
                <InputContainer
                    title={'Password'}
                    typeInput={'password'}
                    value={password}
                    changeValue={onChangePassword}
                    errorMessage={errorPasswordMessage}
                />
                <SuperCheckbox
                    checked={rememberMe}
                    onChangeChecked={onChangeRememberMe}>
                    Remember Me
                </SuperCheckbox>
                <div className={s.forgotPasswordBtn}>
                    <NavLink to="/password-recovery">Forgot Password</NavLink>
                </div>
            </div>

            <div className={s.btnFooterLoginContainer}>
                <span className={s.errorMessageContainer}>{serverErrorMessage}</span>
                <div className={s.blueBtnContainer}>
                    <MainActionButton actionClick={onLogin}
                                      disabledBtnSubmit={disabledBtnSubmit}
                                      title={'Login'}
                                      loadingStatus={loadingStatus}
                    />
                </div>
                <p className={s.DifferentAccountBtn}>Don't have an account</p>
                <NavLink to="/registration" className={style.footerBtn}>Sing Up</NavLink>
            </div>
        </div>
    )
}
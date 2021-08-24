import React, {ChangeEvent, useState} from 'react';
import {InputContainer} from '../common/InputContainer/InputContainer';
import {MainActionButton} from '../common/MainActionButton/MainActionButton';
import s from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {
    setServerErrorMessageRegistration
} from '../Registration/registration-reducer';
import SuperCheckbox from '../HomemadeInpButCheck/common/c3-SuperCheckbox/SuperCheckbox';
import {emailValidation} from '../common/validation/EmailValidation';
import {PasswordValidation} from '../common/validation/passwordValidation';
import {setLogin} from './login-reducer';
import {AppRootStateType} from "../state/store";

export const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')

    const disabledBtnSubmit = !email || !password

    const dispatch = useDispatch()
    const login = useSelector<AppRootStateType, boolean>(state => state.login.login)
    const loadingStatus = useSelector<AppRootStateType, boolean>(state => state.registration.loadingRequest)
    const serverErrorMessage = useSelector<AppRootStateType, string>(state => state.registration.error)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorEmailMessage('')
        setEmail(e.currentTarget.value)
        serverErrorMessage && dispatch(setServerErrorMessageRegistration(''))
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage('')
        setPassword(e.currentTarget.value)
        serverErrorMessage && dispatch(setServerErrorMessageRegistration(''))
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
            dispatch(setLogin(email, password, rememberMe))
        }
    }

    const goBack = () => {
        window.history.go(-1);
    }

    if (login) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.registrationContainer}>
            <div className={s.inputFields}>
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
                    onChangeChecked={onChangeRememberMe}
                >
                    Remember Me
                </SuperCheckbox>
            </div>

            <div className={s.positionButtonAndError}>
                <span className={s.errorMessageContainer}>{serverErrorMessage}</span>

                <div className={s.button}>
                    <a className={s.btnCancel} onClick={goBack}>Cancel</a>
                    <div className={s.blueBtnContainer}>
                        <MainActionButton
                            actionClick={onLogin}
                            disabledBtnSubmit={disabledBtnSubmit}
                            title={'Login'}
                            loadingStatus={loadingStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
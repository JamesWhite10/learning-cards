import React, {ChangeEvent, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import s from './Registration.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setRegistration, setRegistrationAC, setServerErrorMessageRegistration} from "./registration-reducer";
import {emailValidation} from "../common/validation/EmailValidation";
import {PasswordValidation} from "../common/validation/passwordValidation";
import {AppRootStateType} from "../app/store";
import { InputContainer } from "../common/InputContainer/InputContainer";
import {MainActionButton} from "../common/MainActionButton/MainActionButton";

export const Registration = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')

    const disabledBtnSubmit = !email || !password || !checkPassword

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppRootStateType, boolean>(state => state.registration.loadingRequest)
    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistration)
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

    const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage('')
        setCheckPassword(e.currentTarget.value)
        serverErrorMessage && dispatch(setServerErrorMessageRegistration(''))
    }

    const onRegistration = () => {
        if (!emailValidation(email)) {
            setErrorEmailMessage('Incorrect email')
        } else if (!PasswordValidation(password)) {
            setErrorPasswordMessage('Minimum 8 characters')
        } else if (password !== checkPassword) {
            setErrorPasswordMessage('Enter the same password')
        } else {
            dispatch(setRegistration(email, password))
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setServerErrorMessageRegistration(''))
            dispatch(setRegistrationAC(false))
        }
    }, [dispatch])

    if (isRegistration) {
        return <Redirect to={'/login'}/>
    }

    const goBack = () => {
        window.history.go(-1);
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
                <InputContainer
                    title={'Confirm password'}
                    typeInput={'password'}
                    value={checkPassword}
                    changeValue={onChangeCheckPassword}
                    errorMessage={errorPasswordMessage}
                />
            </div>

            <div className={s.positionButtonAndError}>
                <span className={s.errorMessageContainer}>{serverErrorMessage}</span>

                <div className={s.button}>
                    <a className={s.btnCancel} onClick={goBack}>Cancel</a>
                    <div className={s.blueBtnContainer}>
                        <MainActionButton
                            actionClick={onRegistration}
                            disabledBtnSubmit={disabledBtnSubmit}
                            title={'Register'}
                            loadingStatus={loadingStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./PasswordRecovery.module.css";
import {InputContainer} from "../common/InputContainer/InputContainer";
import {NavLink, Redirect} from "react-router-dom";
import {MainActionButton} from "../common/MainActionButton/MainActionButton";
import {useDispatch, useSelector} from "react-redux";
import { HeaderEnterApp } from "../common/HeaderEnterApp/HeaderEnterApp";
import {AppRootStateType} from "../state/store";
import {recoveryThunk, setSuccessAC} from "./recovery-reducer";

export const PasswordRecovery = () => {

    const [email, setEmail] = useState<string>("")
    const [error, setError]= useState<string>("")
    const disabledBtnSubmit = !email

    const dispatch = useDispatch()
    const success = useSelector<AppRootStateType, boolean>(state => state.recovery.success)
    const login = useSelector<AppRootStateType, boolean>(state => state.login.logIn)

    const inputEmail = (event:ChangeEvent<HTMLInputElement>) => {
        setError('')
        setEmail(event.currentTarget.value)

    }
    const emailData = {
        email,
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
            password recovery link:	<a href='http://localhost:3000/#/new-password/$token$'>link</a>
            </div>`
    }
    const sendInstruction = () => {
        dispatch(recoveryThunk(emailData))
    }
    useEffect(()=> {
        return ()=>{
            dispatch(setSuccessAC(false))
        }

    }, [])

    if(success){
        return <Redirect to={'/login/'}/> //заглушка пока
    }

    if (login) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={style.passwordRecoveryContainer}>
            <HeaderEnterApp title={'Forgot your password?'}/>
            <div className={style.inputField}>
                <InputContainer
                    placeholder={'Email'}
                    value={email}
                    changeValue={inputEmail}
                    errorMessage={error}
                    typeInput={"email"}
                />
                <p>Enter your email address and we will send you further instructions</p>
            </div>

            <div className={style.positionButtonAndError}>

                <MainActionButton
                    actionClick={sendInstruction}
                    disabledBtnSubmit={disabledBtnSubmit}
                    title={"Get Instructions"}
                    loadingStatus={false}
                />
                <p>Did you remember your password?</p>
                <NavLink to="/login" className={style.footerBtn}>Try again</NavLink>

            </div>

        </div>
    )
}

export type EmailDataType = {
    email:string
    from: string
    message: string
}
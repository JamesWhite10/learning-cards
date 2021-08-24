import React, {ChangeEvent, useState} from "react";
import style from "./PasswordRecovery.module.css";
import {InputContainer} from "../common/InputContainer/InputContainer";
import {NavLink} from "react-router-dom";
import {MainActionButton} from "../common/MainActionButton/MainActionButton";
import {useDispatch} from "react-redux";
import { HeaderEnterApp } from "../common/HeaderEnterApp/HeaderEnterApp";

export const PasswordRecovery = () => {

    const [email, setEmail] = useState<string>("")
    const [error, setError]= useState<string>("")
    const disabledBtnSubmit = !email

    const dispatch = useDispatch()

    const inputEmail = (event:ChangeEvent<HTMLInputElement>) => {
        setError('')
        setEmail(event.currentTarget.value)

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
                    actionClick={()=>{}}
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
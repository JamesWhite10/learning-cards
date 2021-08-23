import React, {useState} from "react";
import style from "./PasswordRecovery.module.css";
import {InputContainer} from "../common/InputContainer/InputContainer";
import {NavLink} from "react-router-dom";

export const PasswordRecovery = () => {


    const [email, setEmail] = useState<string>("")
    const [error, setError]= useState<string>("")

    const inputEmail = () => {}

    return (
        <div className={style.passwordRecoveryContainer}>
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

                <button >Get Instructions</button>
                <p>Did you remember your password?</p>
                <NavLink to="/login" >Try again</NavLink>

            </div>

        </div>
    )
}
import React from "react";
import s from './Password-recovery.module.scss'
import checkEmail from '../../media/password/checkEmail.svg'
import {useParams} from "react-router-dom";

export const CheckEmail = () => {
    const {email} = useParams<{ email: string }>()

    return (
        <div className={s.containerCheckEmail}>
            <p className={s.headerCheckEmail}>It-incubator</p>
            <div className={s.imageCheckEmail}>
                <img src={checkEmail} alt={'Check email'}/>
            </div>
            <p className={s.titleCheckEmail}>Check Email</p>
            <p className={s.textActionCheckEmail}>We’ve sent an Email with instructions to {email}</p>
        </div>
    )
}
import React, {useState} from 'react'
import {newPassThunk} from "./recovery-reducer";
import {useDispatch} from "react-redux";
import {MyTextInput} from "../NikComponents/MyTextInput";
import {useParams} from "react-router";
import {Redirect} from "react-router-dom";


export const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [recovery, setRecovery] = useState(false)

    const dispatch = useDispatch()
    const {token} = useParams<{token:string}>()// запомнить чит код доставания переменной из урла. Смотри роуты

    const changePass = async () =>{
        await dispatch(newPassThunk({password, resetPasswordToken:token}))
        setRecovery(true)
    }
    if(recovery) {
        return <Redirect to='/login/' />
    }
    return <>
        <MyTextInput value={password} onChangeText={setPassword} placeholder={'Password'}/>
        <button onClick={changePass}> change password</button>
    </>
}
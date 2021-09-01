import React from "react";
import {logout} from '../Login/login-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from "../state/store";
import s from './Profile.module.css'

export const Profile = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.login)

    const logoutHandler = () => {
        dispatch(logout())
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <h1>TEST</h1>
            {isAuth && <button className={s.btnLogout} onClick={logoutHandler}>Logout</button>}
        </div>
    )
}
import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {Redirect} from "react-router-dom";


export const Cards = () => {

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.logIn)

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>

        </div>
    )
}
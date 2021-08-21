import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../Main/Routes/Routes";
import s from "../Main/Header/Header.module.css";

export const Registration = () => {
    return (
        <div>
            <div><input type="text"/></div>
            <div><input type="text"/></div>
            <div><input type="text"/></div>
            <div><button>sign up</button></div>
            <div>
                <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>
            </div>
        </div>
    )
}
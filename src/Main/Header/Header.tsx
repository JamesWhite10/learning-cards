import React from 'react'
import {NavLink} from 'react-router-dom'
import s from "./Header.module.css"
import {PATH} from "../Routes/Routes";

function Header() {
    return (
        <div className={s.header}>
            <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
            <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION} className={s.link} activeClassName={s.active}>Registration</NavLink>
            <div className={s.block}/>
        </div>
    )
}

export default Header
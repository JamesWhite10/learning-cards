import React from 'react'
import {NavLink} from 'react-router-dom'
import s from "./Header.module.css"
import {PATH} from "../Routes/Routes";
import menu from "../../media/menu/menu.png"

function Header() {
    return (
        <div className={s.header}>
            <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
            <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Entrance</NavLink>
            <NavLink to={PATH.REGISTRATION} className={s.link} activeClassName={s.active}>Registration</NavLink>
            <NavLink to={PATH.RECOVERY} className={s.link} activeClassName={s.active}>Password recovery</NavLink>
            <div><img src={menu} className={s.block} alt={menu}/></div>
        </div>
    )
}

export default Header
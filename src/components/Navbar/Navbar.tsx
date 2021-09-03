import React from "react";
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/login" activeClassName={s.activeLink}>Login</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/password-recovery" activeClassName={s.activeLink}>Password recovery</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/registration" activeClassName={s.activeLink}>Registration</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/packs-list" activeClassName={s.activeLink}>Packs list</NavLink>
            </div>
        </nav>
    )
}

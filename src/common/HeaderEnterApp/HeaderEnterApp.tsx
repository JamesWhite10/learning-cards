import s from "./HeaderEnterApp.module.scss";
import React from "react";

type HeaderEnterAppType = {
    title?: string
}
export const HeaderEnterApp = ({title}: HeaderEnterAppType) => {
    return (
        <div>
            <div className={s.logo}>It-incubator</div>
            <h1>{title}</h1>
        </div>
    )
}
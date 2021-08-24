import s from "./HeaderEnterApp.module.css";
import React from "react";

type HeaderEnterAppType = {
    title?: string
}
export const HeaderEnterApp = ({title}: HeaderEnterAppType) => {
    return (
        <div>
            <div className={s.logo}>Learning cards</div>
            <h2>{title}</h2>
        </div>
    )
}
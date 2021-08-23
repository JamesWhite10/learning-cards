import s from "./MainActionButton.module.css";
import {Preloader} from "../Preloader/Preloader";
import React from "react";

type MainActionButton = {
    actionClick: () => void
    loadingStatus?: boolean
    disabledBtnSubmit?: boolean
    title: string
}

export const MainActionButton = (props: MainActionButton) => {
    return (
        <button className={s.blueBtn}
                onClick={props.actionClick}
                disabled={props.loadingStatus || props.disabledBtnSubmit}>{props.loadingStatus ? <Preloader/> : props.title}</button>
    )
}
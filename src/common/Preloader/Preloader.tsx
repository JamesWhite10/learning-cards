import React from "react";
import loadingProgress from '../../media/loadings/loadingBtn.svg'
import st from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={st.PreloaderContainer}>
            <img alt={'preloader'} src={loadingProgress} />
        </div>
    )
}
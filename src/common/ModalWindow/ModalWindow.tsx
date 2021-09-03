import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import s from "./ModalWindow.module.scss";
import {ModalWindowPropsType} from "./ModalWindowAdd";

type DefaultDivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type CommonModalWindowPropsType = DefaultDivPropsType & ModalWindowPropsType

export const ModalWindow: React.FC<ModalWindowPropsType> = ({showModal, setShowModal, children}) => {
    const finalModal = showModal ? `${s.modalWindow} ${s.visibilityWindow}` : `${s.modalWindow}`
    const finalBackgroundModal = showModal ? `${s.backgroundModal} ${s.visibilityWindow}` : `${s.backgroundModal}`

    return (
        <div className={s.modalContainer}>
            <div className={finalBackgroundModal} onClick={() => setShowModal(false)}></div>
            <div className={finalModal}>
                <button className={s.closeModalAdd} onClick={() => setShowModal(false)}>X</button>
                {children}
            </div>
        </div>
    )
}
import {ModalWindow} from "./ModalWindow";
import {InputContainer} from "../InputContainer/InputContainer";
import s from "../../components/PacksList/PacksList.module.scss";
import {MainActionButton} from "../MainActionButton/MainActionButton";
import React, {ChangeEvent, useState} from "react";
import {addPack, updatePack} from "../../components/PacksList/packsList-reducer";
import {useDispatch} from "react-redux";

export type ModalWindowPropsType = {
    packId: string
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

export const ModalWindowUpdate: React.FC<ModalWindowPropsType> = (props) => {
    const [packNameTitle, setPackNameTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch();

    const changePackName = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setPackNameTitle(e.target.value)
    }

    const updatePackFun = () => {
        const trimmedPackName = packNameTitle.trim()
        if (trimmedPackName) {
            dispatch(updatePack({cardsPack:{_id: props.packId, name: trimmedPackName}}))
        } else {
            setError("Title is required")
        }
        setPackNameTitle("")
        props.setShowModal(false)
    }

    return <ModalWindow showModal={props.showModal} setShowModal={props.setShowModal}>
        <InputContainer
            placeholder={"New pack name"}
            changeValue={changePackName}
            errorMessage={""}
            typeInput={"text"}
            value={packNameTitle}
        />
        <div className={s.addModalAdd}>
            <MainActionButton actionClick={updatePackFun}
                              title={"UPDATE"}
            />
        </div>
    </ModalWindow>;
}
import {ModalWindow} from "./ModalWindow";
import {InputContainer} from "../InputContainer/InputContainer";
import s from "../../components/PacksList/PacksList.module.scss";
import {MainActionButton} from "../MainActionButton/MainActionButton";
import React, {ChangeEvent, useState} from "react";
import {addPack} from "../../components/PacksList/packsList-reducer";
import {useDispatch} from "react-redux";

export type ModalWindowPropsType = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

export const ModalWindowAdd: React.FC<ModalWindowPropsType> = (props) => {
    const [packNameTitle, setPackNameTitle] = useState<string>("")
    const [gradeTitle, setGradeTitle] = useState<number>(0)
    const [ratingTitle, setRatingTitle] = useState<number>(0)
    const [checkedPrivate, setCheckedPrivate] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch();

    const changePackName = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setPackNameTitle(e.target.value)
    }
    const changeGrade = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        if (Number(e.target.value) > 5 || Number(e.target.value) < 0) {
            setError('Enter a value between 0 and 5')
        } else {
            setGradeTitle(Number(e.target.value))
        }
    }
    const changeRating = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        if (Number(e.target.value) > 5 || Number(e.target.value) < 0) {
            setError('Enter a value between 0 and 5')
        } else {
            setRatingTitle(Number(e.target.value))
        }
    }

    const addPackFun = () => {
        const trimmedPackName = packNameTitle.trim()
        if (trimmedPackName) {
            setCheckedPrivate(false)
            dispatch(addPack({cardsPack: {name: trimmedPackName, grade: gradeTitle, rating: ratingTitle, private: checkedPrivate}}))
        } else {
            setError("Title is required")
        }
        setPackNameTitle("")
        setGradeTitle(0)
        setRatingTitle(0)
        props.setShowModal(false)
    }

    return <ModalWindow showModal={props.showModal} setShowModal={props.setShowModal}>
        <InputContainer
            placeholder={"Pack name"}
            changeValue={changePackName}
            errorMessage={""}
            typeInput={"text"}
            value={packNameTitle}
        />
        <InputContainer
            placeholder={"Grade"}
            changeValue={changeGrade}
            errorMessage={""}
            typeInput={"text"}
            value={gradeTitle.toString()}
        />
        <InputContainer
            placeholder={"Rating"}
            changeValue={changeRating}
            errorMessage={""}
            typeInput={"text"}
            value={ratingTitle.toString()}
        />
        <div className={s.addModalAdd}>
            <MainActionButton actionClick={addPackFun}
                              title={"ADD"}/>
        </div>
    </ModalWindow>;
}
import s from './CardsList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {addCard, deleteCard, getCardsList} from "./cardsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardType} from "../../api/api";
import {Redirect, useParams} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ManageCardsButton} from "./ManageCardsButton";
import {MainActionButton} from "../../common/MainActionButton/MainActionButton";

export const CardsList = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success)
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (!idUser) {
            dispatch(AuthUser())
        } else {
            dispatch(getCardsList({cardPack_id: id}))
        }
    }, [dispatch, id])

    const cardsList = useSelector<AppStateType, Array<cardType>>(state => state.cardsList.arrayCard)

    const addCardFun = () => {
        dispatch(addCard({card: {cardsPack_id: id}}))
    }

    const deleteCardFun = (id: string, cardPack_id: string) => {
        dispatch(deleteCard({id, cardPack_id}))
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    if (!success) {
        return <Preloader/>
    }

    return (
        <table className={s.table}>
            <tr className={s.tableRow}>
                <th className={s.tableHeader}>{"QUESTION"}</th>
                <th className={s.tableHeader}>{"ANSWER"}</th>
                <th className={s.tableHeader}>{"GRADE"}</th>
                <th className={s.tableHeader}>{"UPDATED"}</th>
                <th>
                    <MainActionButton actionClick={addCardFun}
                                      title={"ADD"}/>
                </th>
            </tr>
            {cardsList.map((card) => (
                <tr key={card._id} className={s.tableRow}>
                    <td className={s.tableCol}>{card.question}</td>
                    <td className={s.tableCol}>{card.answer}</td>
                    <td className={s.tableCol}>{card.grade}</td>
                    <td className={s.tableCol}>{card.updated}</td>
                    <ManageCardsButton _id={card._id} cardPack_id={card.cardsPack_id} deleteCardFun={deleteCardFun}/>
                </tr>
            ))}
        </table>
    )
}
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {AppStateType} from "../../state/redux-store";
import {Preloader} from "../../common/Preloader/Preloader";
import {cardType} from "../../api/api";
import {getRandomCard} from "../../common/random";
import {getCardsList, gradeCardTC} from "../CardsList/cardsList-reducer";
import {useParams} from "react-router-dom";


const grades = ["Didn't know", 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

export const Learn= () => {

    const loadingStatus = useSelector<AppStateType, boolean>(state => state.packsList.success);
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success);
    const {id} = useParams<{ id: string }>();
    const {
        arrayCard} = useSelector((state: AppStateType) => state.cardsList)

    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<cardType>({
        answer: 'answer fake',
        question: 'question fake',
        cardsPack_id: '',
        grade: 0,
        rating: 0,
        shots: 0,
        type: 'card',
        user_id: '',
        created: '',
        updated: '',
        __v: 0,
        _id: 'fake',
        comment: '',
        more_id: ''
    });

    useEffect(() => {
        if (first) {
            dispatch(getCardsList({cardPack_id: id}));
            setFirst(false);
        }
        if (arrayCard.length > 0) setCard(getRandomCard(arrayCard));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, arrayCard, first]);

    const onNext = () => {
        setIsChecked(false);

        if (arrayCard.length > 0) {
            // dispatch
            setCard(getRandomCard(arrayCard));
        } else {

        }
    }

    const sendGrade = (grade: number) => {
        dispatch(gradeCardTC(grade, card._id))
    }
    if (!success) {
        return <Preloader/>
    }

    return   (
        <div>
            LearnPage

            <div>{card.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>check</button>
            </div>
            <div>
                <button onClick={onNext}>next</button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i} onClick={() => sendGrade(i + 1)}>{g}</button>
                    ))}
                </>
            )}
        </div>
)
}
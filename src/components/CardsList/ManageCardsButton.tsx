import React from "react";
import {MainActionButton} from "../../common/MainActionButton/MainActionButton";

type ManageButtonPropsType = {
    _id: string
    cardPack_id: string
    deleteCardFun: (id: string, cardPack_id: string) => void
}

export const ManageCardsButton: React.FC<ManageButtonPropsType> = (props) => {
    return (
        <>
            <td>
                <MainActionButton actionClick={() => props.deleteCardFun(props._id, props.cardPack_id)}
                                  title={"DELETE"}/>
            </td>
            <td>
                <MainActionButton actionClick={() => {}}
                                  title={"UPDATE"}/>
            </td>
        </>
    )
}
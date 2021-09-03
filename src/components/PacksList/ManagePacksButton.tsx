import React, {useState} from "react";
import {MainActionButton} from "../../common/MainActionButton/MainActionButton";
import {ModalWindowUpdate} from "../../common/ModalWindow/ModalWindowUpdate";

type ManageButtonPropsType = {
    _id: string
    deletePackFun: (id: string) => void
}

export const ManagePacksButton: React.FC<ManageButtonPropsType> = (props) => {
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

    const updatePack = () => {
        setShowModalUpdate(true)
    }

    return (
        <>
            <td>
                <MainActionButton actionClick={() => props.deletePackFun(props._id)}
                                  title={"DELETE"}/>
            </td>
            <td>
                <MainActionButton actionClick={updatePack}
                                  title={"UPDATE"}/>
            </td>
            <ModalWindowUpdate packId={props._id} showModal={showModalUpdate} setShowModal={setShowModalUpdate} />
        </>
    )
}
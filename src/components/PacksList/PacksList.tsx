import s from './PacksList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {deletePack, getPackList, setPackNameAC, setPageNumberAC} from "./packsList-reducer";
import {AppStateType} from "../../state/redux-store";
import {cardsPackType, getPacksAPIParamsType} from "../../api/api";
import {NavLink, Redirect, useHistory} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {Pagination} from "../../common/Pagination/Pagination";
import {ManagePacksButton} from './ManagePacksButton';
import {InputContainer} from "../../common/InputContainer/InputContainer";
import {ModalWindowAdd} from "../../common/ModalWindow/ModalWindowAdd";
import {MainActionButton} from "../../common/MainActionButton/MainActionButton";

export const PacksList = (props: { user_id?: string }) => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const success = useSelector<AppStateType, boolean>(state => state.packsList.success)
    const loadingRequest = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const [searchTitle, setSearchTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false)
    const dispatch = useDispatch();

    const {
        page = 1, pageCount = 10, min = 0, max = 10, packName, sortPacks
    } = useSelector<AppStateType, getPacksAPIParamsType>(state => state.packsList.packsParams);

    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount);

    const packsList = useSelector<AppStateType, Array<cardsPackType>>(state => state.packsList.cardPacks)

    const onPageChangedHandler = useCallback((currentPage: number): void => {
        dispatch(setPageNumberAC(currentPage))
    }, [page])


    let history = useHistory();

    function onLearnButtonClick(id: string) {
        history.push(`/learn/${id}`);
    }

    useEffect(() => {
        if (!idUser) {
            if (!loadingRequest) {
                dispatch(AuthUser())
            }
        } else {
            getPrivatePacks()
        }
    }, [dispatch, page, pageCount, sortPacks, min, max, packName])

    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setSearchTitle(e.currentTarget.value)
    }

    const setSearch = () => {
        const trimmedSearch = searchTitle.trim()
        if (trimmedSearch) {
            dispatch(setPackNameAC(trimmedSearch))
            getPrivatePacks()
        } else {
            setError("Title is required")
        }
        setSearchTitle("")
    }

    const deletePackFun = (pack_id: string) => {
        dispatch(deletePack({id: pack_id}))
    }

    const getPrivatePacks = () => {
        if (props.user_id) {
            dispatch(getPackList({pageCount, min, max, page, packName, user_id: props.user_id}))
        } else {
            dispatch(getPackList({pageCount, min, max, page, packName}))
        }
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    if (!success) {
        return <Preloader/>
    }

    return (
        <>
            <div className={s.flex}>
                {props.user_id && <div className={s.private}>
                    <input type="checkbox" className="toggle_input" onChange={getPrivatePacks}
                           checked={false}/>
                    <label>private</label>
                </div>}
                <div className={s.search}>
                    <div className={s.containerInputSearch}>
                        <InputContainer
                            placeholder={'Search'}
                            changeValue={changeSearch}
                            errorMessage={''}
                            typeInput={'text'}
                            value={searchTitle}
                        />
                        <button onClick={() => {
                            dispatch(setPackNameAC(''))
                        }}>X
                        </button>
                    </div>
                    <button onClick={setSearch}>SEARCH</button>
                </div>
                <table className={s.table}>
                    <tr className={s.tableRow}>
                        <th className={s.tableHeader}>{"NAME"}</th>
                        <th className={s.tableHeader}>{"CARDS COUNT"}</th>
                        <th className={s.tableHeader}>{"USER NAME"}</th>
                        <th className={s.tableHeader}>{"RATING"}</th>
                        <th className={s.tableHeader}>{"GRADE"}</th>
                        <th className={s.tableHeader}>{"UPDATED"}</th>
                        {props.user_id && <th>
                            <MainActionButton actionClick={() => setShowModalAdd(true)}
                                              title={"ADD"}/>
                        </th>}
                    </tr>
                    {packsList.map((pack) => (
                        <tr key={pack._id} className={s.tableRow}>
                            <td className={s.tableCol}>{pack.name}</td>
                            <td className={s.tableCol}>{pack.cardsCount}</td>
                            <td className={s.tableCol}>{pack.user_name}</td>
                            <td className={s.tableCol}>{pack.rating}</td>
                            <td className={s.tableCol}>{pack.grade}</td>
                            <td className={s.tableCol}>{pack.updated}</td>
                            {(props.user_id) && <ManagePacksButton _id={pack._id} deletePackFun={deletePackFun} />}
                            <td><NavLink to={`/cards-list/${pack._id}`} className={s.card} activeClassName={s.activeLink}>Cards
                                list</NavLink>
                                <NavLink to={`/learn/${pack._id}`} className={s.learn} activeClassName={s.activeLink}>Learn</NavLink>
                            </td>

                        </tr>
                    ))}
                </table>
                <Pagination totalItemsCount={cardPacksTotalCount}
                            pageSize={pageCount}
                            portionSize={10}
                            currentPage={page}
                            onPageChanged={onPageChangedHandler}
                />
            </div>
            <ModalWindowAdd showModal={showModalAdd} setShowModal={setShowModalAdd} />
        </>
    )
}

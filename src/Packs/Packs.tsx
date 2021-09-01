import React from 'react';
import SuperCheckbox from '../HomemadeInpButCheck/common/c3-SuperCheckbox/SuperCheckbox';
import s from './Packs.module.css'

export const Packs = () => {

    return (
        <div className={s.container}>
            <h2>Packs</h2>
            <div>
                <SuperCheckbox
                    checked={false}
                    onChangeChecked={() => {
                    }}>
                    My Packs
                </SuperCheckbox>
                <div className={s.table}>
                    <div className={s.tableHeader}>
                        <div className={s.tableCell}>Name</div>
                        <div className={s.tableCell}>Cards Count</div>
                        <div className={s.tableCell}>Created</div>
                        <div className={s.tableCell}>Updated</div>
                        <div className={s.tableCell}>
                            <button className={s.btnAdd}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className={s.tableList}>
                        <div className={s.tableRow}>
                            <div className={s.tableCell}>Name</div>
                            <div className={s.tableCell}>Cards Count</div>
                            <div className={s.tableCell}>Created</div>
                            <div className={s.tableCell}>Updated</div>
                            <div className={s.tableCell}>
                                <button className={s.btnAction}>
                                    Delete
                                </button>
                                <button className={s.btnAction}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
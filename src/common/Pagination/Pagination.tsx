import React, {useState} from 'react';
import styles from './Pagination.module.scss';
import cn from 'classnames';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

export const Pagination: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (<div className={styles.pagination}>


        <div className={styles.pagePanel}>
            {portionNumber > 1 &&
            <button onClick={ () => { setPortionNumber(portionNumber - 1) } }
            >Previous
            </button>}

            {pages
                .filter(el => (el >= leftPortionPageNumber && el <= rightPortionPageNumber))
                .map(p => {
                    return <span className={ cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber) }
                                 onClick={() => {onPageChanged(p)}}
                                 key={p}
                    >
                        {p}
                    </span>
                })
            }
            {portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>
            }
        </div>

    </div>)
}

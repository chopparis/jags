import React, { useState, useEffect } from 'react';
import styles from '../style.module.scss';

const FilterChip =(props)=>{
    const onDeleteFilter =()=>{
        props.deleteFilter(props.chipObj , props.ind);
    }
    return(
        <div>
            <div className={styles.chipWraper}>
                <span>{props.chipObj.name.replace('_', ' ')}</span><div className={styles.filterCloseBtn} onClick={onDeleteFilter}><span>X</span></div>
            </div>
        </div>
    )
}

export default FilterChip;
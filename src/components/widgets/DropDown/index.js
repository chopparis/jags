import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

const DropDown = (props) => {



    return (

        <div className={styles.dropDownWraper}>
            
           


            <select className={styles.minimal} value="select question">

                {props.questionsLit && props.questionsLit.map((item, i) => {
                                return (<option key={i} value={item.value}>{item.label}</option>);
                            })}
            </select>


        </div>

    )
}
export default DropDown;

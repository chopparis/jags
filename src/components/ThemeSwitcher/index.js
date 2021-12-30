import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';


const ThemeSwitcher =(props)=>{

    const [isSlide, setSlideVal] = useState(true);

    const setSlide =()=>{
        setSlideVal(!isSlide);
        props.customMethod();
    }
    return (
        <div className={styles.switch_wraper} onClick={setSlide}>
            <input type="checkbox" defaultChecked={isSlide} />
            <span className={`${styles.slider} ${styles.round}  `}></span>
        </div>
    )
}
export default ThemeSwitcher;
import React, { useState, useEffect } from 'react';
import styles from '../style.module.scss';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
// import styles from './style.module.scss';

const OverView = () => {
    return (
        <div className={styles.accWraper}>Over view
            <div className={styles.heading}>
                <FontAwesomeIcon icon={faUserCircle} className={styles.accSection_icon} />
                <div className={`${styles.blue_color_font} ${styles.my_ac_lable}  `} >MY ACCOUNT</div>
            </div>
            <div className={styles.blue_box_container} >
                <div className={styles.text_area}>
                    <h3 className={styles.text_heading}><span className={styles.blue_label}>Hello,</span><span>Johnsmith</span></h3>
                    <span className={styles.content_label}><span className={styles.blue_label}>Last Login: </span>22 NOV 2021 <span className={styles.blue_label}>at </span>11:46:55</span>
                </div>
            </div>
            <div className={styles.blue_box_container} >
                <div className={styles.summary_box}>
                    <h3 className={styles.text_heading}><span>Summary</span></h3>
                    <div className={styles.summary_box_container}>
                        <div className={`${styles.summary_box_item} ${styles.full_width_mobile}  `} >
                            <div className={styles.label}>BALANCE</div>
                            <span className={`${styles.value} ${styles.float_left}  `} >$0.00</span>
                            <span className={`${styles.plus_icon} ${styles.float_right}  `} ><span>+</span></span>
                        </div>
                        <div className={styles.summary_box_item}>
                            <div className={styles.label}>BONUS</div>
                            <span className={styles.value}>$0.00</span>
                        </div>
                        <div className={styles.summary_box_item}>
                            <div className={styles.label}>WITHDRAWALS</div>
                            <span className={styles.value}>1</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.img_container}>
                <div className={styles.img_1}>
                    {/* <Image className={styles.bg_img} src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"} 
                    quality={100}
                    layout="fill"
                    alt="Casino games Logo"
                     /> */}

                    <Image 
                   className={styles.bg_img} 
                   src={"/images/DGTESTSITE/6x/9.jpg" + "?v=9999"}
                    quality={100}
                    layout="fill"
                    alt="Casino games Logo"
                />

                    <div className={styles.overlay}>
                        {/* <img className={styles.claim_logo} src="./claimlogo.svg" alt="Claim Bonus" /> */}
                        <div className={styles.text_content}>
                            <div><span className={styles.main_content}>200%</span></div>
                            <div><span className={styles.sub_content}>First Deposit Bonus</span></div>
                            <div><span className={styles.text_content}> +25 FREE spins </span></div>
                            <button className={styles.claim_button}> Claim Bonus</button>
                        </div>
                    </div>
                    {/* <button className={styles.tc_apply_button}> T&Cs Apply </button> */}

                </div>
                {/* <div className={styles.img_2}>
                    <img className={styles.bg_img} src="./buffalo.svg" alt="Buffalo Bounty" />
                </div> */}
            </div>
        </div>
    )
}

export default OverView;
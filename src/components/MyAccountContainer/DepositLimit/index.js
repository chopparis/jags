import React, { useState, useEffect } from 'react';
// import styles from './style.module.scss';
import styles from '../style.module.scss';
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
// import styles from './style.module.scss';

const DepositLimit = () => {
    return (
        <div className={styles.accWraper}>
        <div className={styles.accHeaderLable}><FontAwesomeIcon icon={faShieldAlt} className={styles.accSection_icon} />
            <span className={`${styles.blue_color_font} ${styles.text_label}  `}>MY ACCOUNT</span>
        </div>
        <div className={styles.heading}>
            <h2>Deposit Limit</h2>
        </div>
        <div className={styles.mobileTitle}><FontAwesomeIcon icon={faShieldAlt} className={styles.mobileMenuIcon}/><span>Deposit Limit</span></div>

        <div className={styles.form_contanier}>
            <div className={styles.vagas_logo}><Image
                src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"}
                quality={100}
                layout="fill"
                alt="Casino games Logo"
            /></div>

            <div className={styles.form_group}>
                <label className={`${styles.blue_color_font} ${styles.input_label}  `} >  Dialy Limit</label>
                <input type="text" className={`${styles.form_control} ${styles.grey_font}  `}  placeholder="Dialy Limit" />
                {/* <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye} /></span> */}
            </div>
             <div className={styles.form_group}>
                <label className={`${styles.blue_color_font} ${styles.input_label}  `} >  Weekly Limit</label>
                <input type="text" className={`${styles.form_control} ${styles.grey_font}  `} placeholder=" Weekly Limit" />
                {/* <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye} /></span> */}
            </div>
            <div className={styles.form_group}>
                <label className={`${styles.blue_color_font} ${styles.input_label}  `} >  Monthly Limit</label>
                <input type="text" className={`${styles.form_control} ${styles.grey_font}  `}  placeholder="Monthly Limit" />
                {/* <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye} /></span> */}
            </div>
            <div className={styles.form_group}>
                <button className={styles.update_button}>Save Changes</button>
            </div>
        </div>

    </div>

        // <div className={styles.changePsw_container}>
        //     <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />

        //     <span className={`${styles.blue_color_font} ${styles.text_label}  `}>MY ACCOUNT</span>
        //     <div className={styles.heading}>
        //         <h2>Change Password</h2>
        //     </div>
        //     <div className={styles.form_contanier}>
        //         <div className={styles.vagas_logo}><Image
        //             src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"}
        //             quality={100}
        //             layout="fill"
        //             alt="Casino games Logo"
        //         /></div>

        //         <div className={styles.form_group}>
        //             <label className={`${styles.blue_color_font} ${styles.input_label}  `} > Dialy Limit</label>
        //             <input type="password" className={`${styles.form_control} ${styles.grey_font}  `} id="oldpassword" aria-describedby="oldPasswordHelp" placeholder="Daily Limit" />
        //             {/* <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye}/></span> */}
        //         </div>
        //         <div className={styles.form_group}>
        //             <label className={`${styles.blue_color_font} ${styles.input_label}  `} > Weekly Limit</label>
        //             <input type="password" className={`${styles.form_control} ${styles.grey_font}  `} id="newpassword" aria-describedby="newPasswordHelp" placeholder=" Weekly Limit" />
        //             {/* <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye}/></span> */}
        //         </div>
        //         <div className={styles.form_group}>
        //             <label className={`${styles.blue_color_font} ${styles.input_label}  `} >  Monthly Limit</label>
        //             <input type="password" className={`${styles.form_control} ${styles.grey_font}  `} id="confirmpassword" aria-describedby="newPasswordHelp" placeholder="Monthly Limit" />
        //             {/* <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye}/></span> */}
        //         </div>
        //         <div className={styles.form_group}>
        //             <button className={styles.update_button}>Save Changes</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default DepositLimit;
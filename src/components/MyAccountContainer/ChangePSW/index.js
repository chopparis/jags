import React, { useState, useEffect } from 'react';
// import styles from './style.module.scss';
import styles from '../style.module.scss';
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
// import styles from './style.module.scss';

const ChangePSW = () => {
    return (

        <div className={styles.accWraper}>
            <div className={styles.accHeaderLable}><FontAwesomeIcon icon={faLock} className={styles.accSection_icon} />
                <span className={`${styles.blue_color_font} ${styles.text_label}  `}>MY ACCOUNT</span>
            </div>
            <div className={styles.heading}>
                <h2>Change Password</h2>
            </div>
            <div className={styles.mobileTitle}><FontAwesomeIcon icon={faLock} className={styles.mobileMenuIcon}/><span>Change Password</span></div>

            <div className={styles.form_contanier}>
                <div className={styles.vagas_logo}><Image
                    src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"}
                    quality={100}
                    layout="fill"
                    alt="Casino games Logo"
                /></div>

                <div className={styles.form_group}>
                    <label className={`${styles.blue_color_font} ${styles.input_label}  `} > *OLD PASSWORD</label>
                    <input type="password" className={`${styles.form_control} ${styles.grey_font}  `} id="oldpassword" aria-describedby="oldPasswordHelp" placeholder="Enter Old Password" />
                    <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye} /></span>
                </div>
                 <div className={styles.form_group}>
                    <label className={`${styles.blue_color_font} ${styles.input_label}  `} >  *NEW PASSWORD</label>
                    <input type="password" className={`${styles.form_control} ${styles.grey_font}  `} id="newpassword" aria-describedby="newPasswordHelp" placeholder="Enter New Password" />
                    <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye} /></span>
                </div>
                <div className={styles.form_group}>
                    <label className={`${styles.blue_color_font} ${styles.input_label}  `} >  *CONFIRM PASSWORD</label>
                    <input type="password" className={`${styles.form_control} ${styles.grey_font}  `} id="confirmpassword" aria-describedby="newPasswordHelp" placeholder="Enter Confirm Password" />
                    <span className={styles.toggle_password} ><FontAwesomeIcon icon={faEye} /></span>
                </div>
                <div className={styles.form_group}>
                    <button className={styles.update_button}>Update Password</button>
                </div>
            </div>

        </div>
        
    )
}

export default ChangePSW;
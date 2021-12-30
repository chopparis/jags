import React, { useState, useEffect } from 'react';
import styles from '../style.module.scss';
import request from "../../../../utils/request";

import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as moment from "moment";
const MyDetails = () => {

    const [isEditable, setEditable] = useState(true);
    const [userProfile, setUserProfile] = useState({});

    const emailnRef = React.createRef();
    const addressRef = React.createRef();
    const cityRef = React.createRef();
    const stateRef = React.createRef();
    const zipRef = React.createRef();
    const contactRef = React.createRef();

    const onEditDetails = () => {
        setEditable(false);
    }


    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    useEffect(() => {
        emailnRef.current.focus();
        // addressRef.current.focus();
        // cityRef.current.focus();
        // stateRef.current.focus();
        // zipRef.current.focus();
        // contactRef.current.focus();


    }, [isEditable]);

    const onSaveChanges = () => {
        if (validateEmail(emailnRef.current.value)) {
            //
        } else {
            console.log("Valid email adreeses required")
        }
    }
    const getDateFormate = (dateFormate) => {
        let str = moment("2021-06-09T00:00:00").format('MM/DD/YYYY');

        console.log(str, "__________-dd");
        return str;
        //return moment("2021-06-09T00:00:00").format('MM/DD/YYYY');
    }
    useEffect(async () => {
        const userObj = await request(`/api/player/profile`, {});
        console.log(userObj)
        //if(userObj && userObj.result){
        let obj = {
            "username": "casino123",
            "password": "$2b$12$BEqxAAglP9sff02/OSRRBOEVPuzuBWx2t3i.8k8dQpgbA1SU9rMBe",
            "first_name": "srinivas",
            "last_name": "choppari",
            "email": "casino@123.com",
            "phone": "(+297)8523008879",
            "acct_status": "ACTIVE",
            "depositor": false,
            "currency": "USD",
            "last_login": "2021-11-16T05:20:35",
            "in_house": 0,
            "site_code": "DGTESTSITE",
            "dob": "2021-06-09T00:00:00",
            "account_id": 32
        }
        //  setUserProfile(userProfile.result);
        setUserProfile(obj);
        //}else{
        //--->
        // }
    }, []);


    return (
        <div className={styles.accWraper}>
            <div className={styles.accHeaderLable}><FontAwesomeIcon icon={faAddressCard} className={styles.accSection_icon} />
                <span className={`${styles.blue_color_font} ${styles.text_label}  `}>MY ACCOUNT</span>
            </div>

            <div className={styles.heading}>
                <h2>My Details</h2>
                <div className={styles.content}>
                    Below you will be able to update your personal details. Simply select the <span className={styles.blue_color_font}>"Edit Details”</span> button to make your changes. Be sure to select the <span className={styles.blue_color_font}>“Save”</span> button when you’ve finished making your changes. To change your name, nationality or country of residence, please contact our <span className={styles.blue_color_font}>Customer Service</span> team.
                </div>
                <div className={styles.current_blnc_container}>
                    <h2>Current Balance</h2>
                    <div className={styles.current_blnc}>
                        <label className={styles.balance_label}>
                            <i className={styles.fa_solid}></i>
                            <span className={`${styles.blue_color_font} ${styles.text_label}  `} >Balance</span>
                            <span>$0.00</span>
                            <span className={styles.plus_sign} ></span>
                        </label>
                        <label className={styles.balance_label} >
                            <span className={`${styles.blue_color_font} ${styles.text_label}  `} >Bonus</span>
                            <span>$0.00</span>
                        </label>
                    </div>

                    <div className={styles.mobileTitle}><FontAwesomeIcon icon={faAddressCard} className={styles.mobileMenuIcon}/><span>My Details</span></div>
                    <div className={styles.personal_details}>

                        <h2> Personal Details</h2>
                        <div className={styles.form_group}>
                            <label className={styles.blue_color_font} >USER NAME</label>
                            <input type="text" className={`${styles.form_control_disable} ${styles.grey_font}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.username} disabled={true} />
                        </div>
                        <div className={styles.form_group}>
                            <label className={styles.blue_color_font} >FIRST NAME</label>
                            <input type="text" className={`${styles.form_control_disable} ${styles.grey_font}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.first_name} disabled={true} />
                        </div>
                        <div className={styles.form_group}>
                            <label className={styles.blue_color_font} >LAST NAME</label>
                            <input type="text" className={`${styles.form_control_disable} ${styles.grey_font}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.last_name} disabled={true} />
                        </div>

                        <div className={styles.form_group}>
                            <label className={styles.blue_color_font} >DATE OF BIRTH</label>
                            <input type="date" className={`${styles.form_control_disable} ${styles.grey_font}  `} aria-describedby="emailHelp" value={userProfile && getDateFormate(userProfile.dob)} disabled={true} />
                        </div>
                        <div className={styles.form_group}>
                            <label className={styles.blue_color_font}>GENDER</label>
                            <input type="text" className={`${styles.form_control_disable} ${styles.grey_font}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.account_id} disabled={true} />
                        </div><br />
                        <hr />
                        <div className={styles.form_group}>
                            <label className={styles.blue_color_font}  >EMAIL</label>
                            <input type="text" className={`${styles.form_control} ${!isEditable ? styles.form_control_enable : styles.form_control}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.email} ref={emailnRef} disabled={(isEditable) ? "disabled" : ""} />
                        </div>

                        <div className={styles.form_group} disabled={true}>
                            <label className={styles.blue_color_font}>COUNTRY</label>
                            <select name="country" id="contries" disabled={true}>
                                <option value="volvo">{userProfile && userProfile.account_id} </option>
                            </select>
                        </div>

                        <div className={`${styles.form_group} ${styles.address_box}  `}>
                            <label className={styles.blue_color_font} >ADDRESS</label>
                            <input type="text" className={`${styles.form_control} ${!isEditable ? styles.form_control_enable : styles.form_control}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.account_id} disabled={(isEditable) ? "disabled" : ""} />
                        </div>
                        <div className={styles.form_group} >
                            <label className={styles.blue_color_font} >CITY</label>
                            <input type="text" className={`${styles.form_control} ${!isEditable ? styles.form_control_enable : styles.form_control}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.account_id} ref={cityRef} disabled={(isEditable) ? "disabled" : ""} />
                        </div>

                        <div className={styles.form_group} >
                            <label className={styles.blue_color_font} >STATE</label>
                            <input type="text" className={`${styles.form_control} ${!isEditable ? styles.form_control_enable : styles.form_control}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.account_id} ref={stateRef} disabled={(isEditable) ? "disabled" : ""} />
                        </div>


                        <div className={styles.form_group} >
                            <label className={styles.blue_color_font} >ZIP CODE</label>
                            <input type="text" className={`${styles.form_control} ${!isEditable ? styles.form_control_enable : styles.form_control}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.account_id} ref={zipRef} disabled={(isEditable) ? "disabled" : ""} />
                        </div>

                        <div className={styles.form_group} >
                            <label className={styles.blue_color_font} >CONTACT NUMBER</label>
                            <input type="text" className={`${styles.form_control} ${!isEditable ? styles.form_control_enable : styles.form_control}  `} aria-describedby="emailHelp" placeholder={userProfile && userProfile.phone} ref={contactRef} disabled={(isEditable) ? "disabled" : ""} />
                        </div>



                        <div className={styles.form_group} >
                            <button className={styles.save_button} onClick={onSaveChanges}>Save</button>
                        </div>
                        <div className={styles.form_group} > <button className={styles.edit_deatails} onClick={onEditDetails}>Edit Deatails</button></div>
                    </div>


                </div>




            </div>


        </div>
    )
}

export default MyDetails;
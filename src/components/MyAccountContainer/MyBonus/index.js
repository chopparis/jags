import React, { useState, useEffect } from 'react';
// import styles from './style.module.scss';
import styles from '../style.module.scss';
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';

const MyBonus = () => {

    const bunus_accordion = React.useRef(null);
    const [userDetails, setuserDetails] = useState({
        "currency": "USD",
        "token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "account_id": 1
    }
    )
    const [bonuses, setAllBonus] = useState([{
        "bonus_balance_id": "818987c0-228e-45b8-9037-fd2259104d44",
        "bonus_name": "Deposit Free Rounds",
        "bonus_type": "manual",
        "bonus_amount": 10000.00,
        "initial_wagering_requirement": 6000.00,
        "remaining_wagering_requirement": 1200.00,
        "granted_date": "2021-11-22 05:12:49",
        "expiry_date": "2022-01-11 05:12:49"
    }, {
        "bonus_balance_id": "818987c0-228e-45b8-9037-fd2259104d44",
        "bonus_name": "Deposit Free Rounds2",
        "bonus_type": "released",
        "bonus_amount": 9000.00,
        "initial_wagering_requirement": 5000.00,
        "remaining_wagering_requirement": 1100.00,
        "granted_date": "2021-11-22 05:12:49",
        "expiry_date": "2022-01-11 05:12:49"
    }
    ]);



    const onPanelExpand = event => {

        console.log(event.current, event.currentTarget)
        event.currentTarget.classList.toggle("active");

        var panel = event.currentTarget.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    };

    // const onHelpPageLaunch = event =>{

    // }


    return (
        <div className={styles.accWraper}>
            <div className={styles.accHeaderLable}><FontAwesomeIcon icon={faMedal} className={styles.accSection_icon} />
                <span className={`${styles.blue_color_font} ${styles.text_label}  `}>MY ACCOUNT</span>
                <div className={styles.heading} >
                    <h3>My Bonuses</h3>
                </div>
            </div>
            <div className={styles.form_contanier}>

                <div className={styles.vagas_logo}><Image
                    src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"}
                    quality={100}
                    layout="fill"
                    alt="Casino games Logo"
                /></div>
                <div className={styles.mobileTitle}><FontAwesomeIcon icon={faMedal} className={styles.mobileMenuIcon} /><span>My Bonuses</span></div>
                <div className={styles.heading_blcok}>

                    <div className={styles.heading} >
                        <h3>Active Bonuses</h3>
                    </div>
                </div>

                <div className={styles.accordion}>

                    <div>

                        {bonuses && bonuses.map((bonusObj, b) =>
                            <div key={b} className={styles.accordion_row} ><button className={styles.collapsible} onClick={onPanelExpand} ref={bunus_accordion}><FontAwesomeIcon icon={faMedal} className={styles.my_bonusIcon} />
                                <span className={styles.accordion_heading}>{bonusObj.bonus_name}</span></button>
                                <div className={styles.panel_content}>
                                    <ul className={styles.list_items}>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Name</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} >{bonusObj.bonus_name}</label>
                                        </li>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Id</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} >{bonusObj.bonus_balance_id}</label>
                                        </li>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >type</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > {bonusObj.bonus_type}</label>
                                        </li>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Amount</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > {userDetails.currency + " " + bonusObj.bonus_amount}</label>
                                        </li>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Initial Wagering Requirement</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > {userDetails.currency + " " + bonusObj.initial_wagering_requirement}</label>
                                        </li>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Remaining Wagering Requirement</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > {userDetails.currency + " " + bonusObj.remaining_wagering_requirement}</label>
                                        </li>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Granted Date</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > {bonusObj.granted_date}</label>
                                        </li>
                                        <li className={styles.list_item}>
                                            <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Expiry Date</label>
                                            <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > {bonusObj.expiry_date}</label>
                                        </li>
                                    </ul>
                                    <button type="button" className={styles.forfeit_button}>
                                        <span>Forfeit</span>
                                    </button>
                                </div></div>
                        )}


                    </div>

                </div>


            </div>
        </div>
        // <div className={styles.MyBonus_container}>
        //     <div className={styles.page_container} >

        //         <div  className={styles.my_bonusIcon_top}><FontAwesomeIcon icon={faMedal} /></div>
        //         <span className={`${styles.blue_color_font} ${styles.my_ac_lable} ${styles.text_label} `}>MY ACCOUNT</span>
        //         <div className={styles.heading} >
        //             <h3>My Bonuses</h3>
        //         </div>
        //         <div className={styles.form_contanier}>
        //             <div className={styles.myBonus_vagas_logo}><Image
        //                 src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"}
        //                 quality={100}
        //                 layout="fill"
        //                 alt="Casino games Logo"
        //             /></div>
        //             <div className={styles.heading_blcok}>

        //                 <div className={styles.heading} >
        //                     <h3>Active Bonuses</h3>
        //                 </div>
        //             </div>



        //             <div className={styles.accordion}>

        //                 <div>

        //                     {bonuses && bonuses.map((bonusObj, b) =>
        //                         <div key={b} className={styles.accordion_row} ><button  className={styles.collapsible}   onClick={onPanelExpand} ref={bunus_accordion}><FontAwesomeIcon icon={faMedal} className={styles.my_bonusIcon} />
        //                             <span className={styles.accordion_heading}>Boost 25% up to 100</span></button>
        //                             <div className={styles.panel_content}>
        //                                 <ul className={styles.list_items}>
        //                                     <li className={styles.list_item}>
        //                                         <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Name</label>
        //                                         <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} >Boost 25% up to 100</label>
        //                                     </li>
        //                                     <li className={styles.list_item}>
        //                                         <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >type</label>
        //                                         <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > 100</label>
        //                                     </li>
        //                                     <li className={styles.list_item}>
        //                                         <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Amount</label>
        //                                         <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > 100</label>
        //                                     </li>
        //                                     <li className={styles.list_item}>
        //                                         <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Initial Wagering Requirement</label>
        //                                         <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > 100</label>
        //                                     </li>
        //                                     <li className={styles.list_item}>
        //                                         <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Granted Date</label>
        //                                         <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > 100</label>
        //                                     </li>
        //                                     <li className={styles.list_item}>
        //                                         <label className={`${styles.blue_color_font} ${styles.input_label} ${styles.form_group_40}  `} >Expiry Date</label>
        //                                         <label className={`${styles.input_label} ${styles.text_align_right} ${styles.form_group_60}  `} > 100</label>
        //                                     </li>
        //                                 </ul>
        //                                 <button type="button" className={styles.forfeit_button}>
        //                                     <span>Forfeit</span>
        //                                 </button>
        //                             </div></div>
        //                     )}


        //                 </div>

        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default MyBonus;
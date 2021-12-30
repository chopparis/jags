import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';

const myFiles = () => {

    return (
        <div className={styles.myFile_container}>
            <div className={styles.page_container} >
                <div className={styles.file_heading} >
                    <div className={styles.my_uploadIcon_top}><FontAwesomeIcon icon={faFileUpload} /></div>
                    <span className={`${styles.blue_color_font} ${styles.my_ac_lable} ${styles.text_label} `}>MY ACCOUNT</span>
                    <div className={styles.heading} >
                        <h2 className={styles.main_heading}>File Upload</h2>
                        <div className={styles.sub_header}> Upload the required documents below </div>
                    </div>
                </div>
                <div className={styles.form_contanier}>
                    <div className={styles.myFiles_vagas_logo}><Image
                        src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"}
                        quality={100}
                        layout="fill"
                        alt="Casino games Logo"
                    /></div>
                    <div className={styles.form_group}>
                        <label className={`${styles.blue_color_font} ${styles.input_label} `}> DOCUMENT TYPE</label>
                        <select className={`${styles.input_label} ${styles.align_center} `} id="documenttype">
                            <option>Choose Your Bonus</option>
                            <option> Bonus1</option>
                            <option> Bonus2</option>
                        </select>

                    </div>
                    <div className={`${styles.form_group} ${styles.file_formate} `}> Supports JPG,PNG or PDF </div>
                    <div className={styles.form_group}>
                        <div className={styles.form_group}>
                            <div className={styles.file_dummy}>
                                {/* <img className="file_upload_icon" src="./logo.svg" /> */}
                                <div className={styles.success}>drop your file here, or <a href="/"> browse</a></div>
                            </div>
                        </div>
                        <div className={styles.form_group}>
                            <label className={`${styles.blue_color_font} ${styles.input_label} `}> Upload Files</label>

                            <div className={styles.card_row}>
                                <div className={`${styles.card_contanier} ${styles.card_border} `}>
                                    {/* <img className="file_upload_icon" src="./logo.svg" /> */}
                                    <div className={styles.file_upload_name} ><span className={styles.blue_color_font} >jhonsmith.pdf</span></div>
                                </div>
                                {/* <a className={styles.edit} >
                                    <span>E</span>
                                   
                                </a> */}
                                <a className={styles.delete} >
                                    <span><FontAwesomeIcon icon={faTrashAlt} /></span>
                                    {/* <img className="edit_delete_icons" src="./logo.svg" /> */}
                                </a>
                            </div>
                            <div className={styles.card_row}>
                                <div className={`${styles.card_contanier} ${styles.card_border} `}>
                                    {/* <img className="file_upload_icon" src="./logo.svg" /> */}
                                    <div className={styles.file_upload_name} ><span className={styles.blue_color_font} >jhonsmith.pdf</span></div>
                                </div>
                                {/* <a className={styles.edit} >
                                    <span>E</span>
                                    
                                </a> */}
                                <a className={styles.delete} >
                                    <span><FontAwesomeIcon icon={faTrashAlt} /></span>
                                    {/* <img className="edit_delete_icons" src="./logo.svg" /> */}
                                </a>
                            </div>
                            <div className={styles.card_row}>
                                <div className={`${styles.card_contanier} ${styles.card_border} `}>
                                    {/* <img className="file_upload_icon" src="./logo.svg" /> */}
                                    <div className={styles.file_upload_name} ><span className={styles.blue_color_font} >jhonsmith.pdf</span></div>
                                </div>
                                {/* <a className={styles.edit} >
                                    <span>E</span>
                                    
                                </a> */}
                                <a className={styles.delete} >
                                    <span><FontAwesomeIcon icon={faTrashAlt} /></span>
                                    {/* <img className="edit_delete_icons" src="./logo.svg" /> */}
                                </a>
                            </div>
                        </div>
                        <div className={styles.form_group}>
                            <label className={`${styles.blue_color_font} ${styles.input_label} `}> File NAME</label>
                            <div className={styles.file_upload_progress}>
                                <div className={styles.progres_bar_block}>
                                    <div><label className={`${styles.blue_color_font} ${styles.input_label} `}> jhonsmith.pdf</label></div>
                                    <progress id="progressBar" value="0" max="100"></progress>
                                    <span id="status" className={`${styles.blue_color_font} ${styles.progress_bar_status} `}>0%</span>
                                    {/* <p id="loaded_n_total"></p>
                    js link : https://codepen.io/PerfectIsShit/pen/zogMXP
                    */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_group}>
                            <button className={styles.save_button}>Save</button>
                            <button className={styles.add_button}>Add Another File</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default myFiles;
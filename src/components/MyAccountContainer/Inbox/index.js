import React, { useState, useEffect } from 'react';
// import styles from './style.module.scss';
import styles from '../style.module.scss';
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

const Inbox = () => {
    return (
        <div className={styles.accWraper}>
            <div className={styles.accHeaderLable}><FontAwesomeIcon icon={faEnvelopeOpenText} className={styles.accSection_icon} />
                {/* <span className={`${styles.blue_color_font} ${styles.text_label}  `}>MY ACCOUNT</span> */}
                {/* <div className={styles.heading} >
                    <h3>My Notifications</h3>
                </div> */}
            </div>
            <div className={styles.form_contanier}>
                <div className={styles.hide_heading_mobile}>
                    <div className={`${styles.form_group} ${styles.hide_heading_mobile}  `}>

                        <div className={styles.vagas_logo}><Image
                            src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=9999"}
                            quality={100}
                            layout="fill"
                            alt="Casino games Logo"
                        /></div>
                    </div>
                    <div className={`${styles.heading} ${styles.form_group_40}  `}>
                        <h2 className={styles.main_heading}>Notifications</h2>
                        <span>You have <span className={styles.blue_color_font}>2 unread </span>Notifications</span>
                    </div>
                </div>
                <div className={`${styles.form_group_60} ${styles.delete_mark_button}`}>
                    <button className={styles.delete_button}><span className={styles.buton_icon}> <FontAwesomeIcon icon={faTrashAlt} className={styles.mobileMenuIcon} /></span>Delete</button>
                    <button className={styles.mark_button}><span className={styles.buton_icon}><FontAwesomeIcon icon={faFlag} className={styles.mobileMenuIcon} /></span>Mark as Read</button>
                </div>
            </div>
            <div className={styles.notification_list_container}>
                <div className={styles.notification_table}>
                    <div className={`${styles.table_tr} ${styles.table_th_row}`}>
                        <div className={`${styles.table_td} ${styles.table_th}`}>
                            <input type="checkbox" className={styles.checkbox_item} /> FROM
                        </div>
                        <div className={`${styles.table_td} ${styles.table_th}`}> SUBJECT  </div>
                        <div className={`${styles.table_td} ${styles.table_th}`}> DATE  </div>
                        <div className={`${styles.table_td} ${styles.table_th}`}> STATUS  </div>
                    </div>
                    <div className={styles.table_tr}>
                        <div className={styles.table_td}>
                            <input type="checkbox" className={styles.checkbox_item} /> Sender
                        </div>
                        <div className={styles.table_td}> your new deposite  </div>
                        <div className={styles.table_td}> MM-DD-YYYY  </div>
                        <div className={styles.table_td}> unread  </div>
                    </div>
                  
                    <div className={styles.table_tr}>
                        <div className={styles.table_td}>
                            <input type="checkbox" className={styles.checkbox_item} /> Sender
                        </div>
                        <div className={styles.table_td}> your new deposite  </div>
                        <div className={styles.table_td}> MM-DD-YYYY  </div>
                        <div className={styles.table_td}> unread  </div>
                    </div>
                    <div className={styles.table_tr}>
                        <div className={styles.table_td}>
                            <input type="checkbox" className={styles.checkbox_item} /> Sender
                        </div>
                        <div className={styles.table_td}> your new deposite  </div>
                        <div className={styles.table_td}> MM-DD-YYYY  </div>
                        <div className={styles.table_td}> unread  </div>
                    </div>

                </div>
            </div>
            {/* <div className={styles.form_contanier}>

                <div className={styles.form_group}>
                    <button className={styles.load_button}>Load More</button>
                </div>
            </div> */}
        </div>

    )
}

export default Inbox;
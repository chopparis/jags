import React, { useState, useEffect } from 'react';
// import styles from './style.module.scss';
import styles from '../style.module.scss';
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

const TransactionHistory = () => {
  return (

    <div className={styles.transaction_contanier}>
      <div className={`${styles.form_contanier} ${styles.bg_color} `}>
        <div className={styles.heading}>
          <h2>Transaction Summary</h2>
        </div>
        <div className={styles.summary_block}>
          <div className={`${styles.summary_block_content} ${styles.form_group_50} `}>
            <FontAwesomeIcon icon={faDonate} className={styles.my_HistryIcon} />
            <div className={styles.content_block}>
              <span className={styles.blue_color_font}>DEPOSITS</span>
              <span>$0,000.00</span>
            </div>
          </div>
          <div className={`${styles.summary_block_content} ${styles.form_group_50} `}>
            <FontAwesomeIcon icon={faHandHoldingUsd} className={styles.my_HistryIcon} />
            <div className={styles.content_block}>
              <span className={styles.blue_color_font}>WITHDRAWALS</span>
              <span>$0,000.00</span>
            </div>
          </div>
          <div className={`${styles.summary_block_content} ${styles.form_group_50} `}>
            <FontAwesomeIcon icon={faMedal} className={styles.my_HistryIcon} />
            <div className={styles.content_block}>
              <span className={styles.blue_color_font}>BONUSES</span>
              <span>$0,000.00</span>
            </div>
          </div>
          <div className={`${styles.summary_block_content} ${styles.form_group_50} `}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} className={styles.my_HistryIcon} />
            <div className={styles.content_block}>
              <span className={styles.blue_color_font}>TOTAL FOR THIS PERIOD</span>
              <span>$0,000.00</span>
            </div>
          </div>
        </div>
      </div>
      <h2 className={`${styles.blue_color_font} ${styles.heading}`}>TRANSACTIONS</h2>
      {/* <h5 className={styles.blue_color_font}></h5> */}
      <div className={`${styles.transaction_table} ${styles.desktop_device} `}>
        <div className={styles.form_contanier}>
          <div className={styles.table_header}>
            <div className={styles.tr}>
              <div className={styles.th}>
                <span className={styles.blue_color_font}>DATE/TIME</span>
              </div>
              <div className={styles.th}>
                <span className={styles.blue_color_font}>ID</span>
              </div>
              <div className={styles.th}>
                <span className={styles.blue_color_font}>AMOUNT</span>
              </div>
              <div className={styles.th}>
                <span className={styles.blue_color_font}>TYPE</span>
              </div>
              <div className={styles.th}>
                <span className={styles.blue_color_font}>METHOD</span>
              </div>
              <div className={styles.th}>
                <span className={styles.blue_color_font}>STATUS</span>
              </div>
            </div>
          </div>
          <div className={styles.table_body}>
            <div className={styles.tr}>
              <div className={`${styles.td} ${styles.date_time} `}>
                <span>11AUG2021 11:26:45</span>
              </div>
              <div className={styles.td}>
                <span>00000</span>
              </div>
              <div className={styles.td}>
                <span>$100.00</span>
              </div>
              <div className={styles.td}>
                <span>Withdraw</span>
              </div>
              <div className={styles.td}>
                <span>Wire Transfer</span>
              </div>
              <div className={`${styles.td} ${styles.orange} `}>
                <span>Pending</span>
              </div>
              <div className={`${styles.td} ${styles.button_td} `}>
                <div className={styles.cancel_button}>cancel</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.transaction_table} ${styles.mobile_device} `}>

        <div className={styles.form_contanier}>
          <div className={styles.table_container}>
            <div className={styles.tr}>
              <span className={styles.blue_color_font}>DATE/TIME</span>
              <span className={styles.tr_value}>11AUG2021 11:26:45</span>
            </div>
            <div className={styles.tr}>
              <span className={styles.blue_color_font}>ID</span>
              <span className={styles.tr_value}>00000</span>
            </div>
            <div className={styles.tr}>
              <span className={styles.blue_color_font}>AMOUNT</span>
              <span className={styles.tr_value}>$100.00</span>
            </div>
            <div className={styles.tr}>
              <span className={styles.blue_color_font}>TYPE</span>
              <span className={styles.tr_value}>Withdraw</span>
            </div>
            <div className={styles.tr}>
              <span className={styles.blue_color_font}>METHOD</span>
              <span className={styles.tr_value}>Wire Transfer</span>
            </div>
            <div className={styles.tr}>
              <span className={styles.blue_color_font}>STATUS</span>
              <span className={`${styles.orange} ${styles.tr_value} `} >Pending</span>
            </div>
            <div className={styles.button_td}>
              <div className={styles.mobile_cancel_button}><span>Cancel</span></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default TransactionHistory;
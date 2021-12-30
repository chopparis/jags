import React, { useState, useEffect } from 'react';
// import styles from './style.module.scss';
import styles from '../style.module.scss';
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BetHistory = () => {

  const [userHistry, hi_setuserDetails] = useState({
    "currency": "USD",
    "token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "account_id": 1,
    "total_bets": 12.00,
    "total_winnings": 100.00,

  }
  )
  const [totalHistoryInfo, setAllBetHistory] = useState([{
    "transaction_id": "c4aa8379-6ee7-48fd-89f9-d244af7ad962",
    "game_title": "Safari Stampede",
    "transaction_type": "debit",
    "sub_transaction_type": "win",
    "value": 1.00,
    "game_round_id": 7996103840,
    "creation_time": "2021-11-17 19:22:47"
  }, {
    "transaction_id": "95ead862-5a8c-4a2b-acd7-a12fb28d1c1a",
    "game_title": "Twin Dragons",
    "transaction_type": "debit",
    "sub_transaction_type": "wager",
    "value": 2.00,
    "game_round_id": 7996103840,
    "creation_time": "2021-11-17 19:22:47"
  }

  ]);

  return (

    <div>

      <div className={`${styles.form_contanier} ${styles.bg_color} `}>
        <div className={styles.heading}>
          <h2>Bets Summary</h2>
        </div>
        <div className={styles.summary_block}>
          <div className={`${styles.summary_block_content} ${styles.form_group_50} `}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} className={styles.my_HistryIcon} />
            <div className={styles.content_block}>
              <span className={styles.blue_color_font}>Total Bets</span>
              <span>{userHistry.currency + " " + userHistry.total_bets}</span>
            </div>
          </div>
          <div className={`${styles.summary_block_content} ${styles.form_group_50} `}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} className={styles.my_HistryIcon} />
            <div className={styles.content_block}>
              <span className={styles.blue_color_font}>Total Winnings</span>
              <span>{userHistry.currency + " " + userHistry.total_winnings}</span>
            </div>
          </div>

        </div>
      </div>
      {totalHistoryInfo && totalHistoryInfo.map((historyObj, b) =>
        <div>

          <h5 className={styles.blue_color_font}>{historyObj.game_title}</h5>
          <div className={styles.transaction_table}>
            <div className={styles.form_contanier}>
              <div className={styles.table_header}>
                <div className={styles.tr}>
                  <div className={styles.th}>
                    <span className={styles.blue_color_font}>DATE/TIME</span>
                  </div>
                  <div className={styles.th}>
                    <span className={styles.blue_color_font}>BET</span>
                  </div>
                  <div className={styles.th}>
                    <span className={styles.blue_color_font}>WIN</span>
                  </div>
                  <div className={styles.th}>
                    <span className={styles.blue_color_font}>BALANCE</span>
                  </div>
                </div>
              </div>
              <div className={styles.table_body}>
                <div className={styles.tr}>
                  <div className={`${styles.td} ${styles.date_time} `}>
                    <span>22</span>
                  </div>
                  <div className={styles.td}>
                    <span>{historyObj.value}</span>
                  </div>
                  <div className={styles.td}>
                    <span>{historyObj.value}</span>
                  </div>
                  <div className={styles.td}>
                    <span>{historyObj.value}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BetHistory;
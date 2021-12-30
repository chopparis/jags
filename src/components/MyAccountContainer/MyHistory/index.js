import React, { useState, useEffect } from 'react';
// import styles from './style.module.scss';
import styles from '../style.module.scss';
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import TransactionHistory from './TransactionHistory';
import BetHistory from './BetHistory';



const MyHistory = () => {

  const [historyState, setHistoryState] = useState("transaction");

  const onTransactionState = () => {
    setHistoryState("transaction");
  }

  const onHistoryState = () => {
    setHistoryState("betHistory");
  }
  const onSearchHistory = () => {

  }

  return (
    <div className={styles.accWraper}>



      <div className={`${styles.heading} ${styles.historyBtnsAlign}  `}>
        <div className={styles.acc_historyLable}><FontAwesomeIcon icon={faClock} className={styles.accSection_icon} />
          {historyState == "transaction" ? <h2 className={styles.main_heading}>Transaction History</h2> : <h2 className={styles.main_heading}>Bet History</h2>}
          {/* <span className={`${styles.blue_color_font} ${styles.text_label}  `}>MY ACCOUNT</span> */}
        </div>



        {/* {historyState == "transaction" ? <div className={styles.mobileTitle}><FontAwesomeIcon icon={faClock} className={styles.mobileMenuIcon}/><span>Transaction History</span></div> :
         <div className={styles.mobileTitle}><FontAwesomeIcon icon={faClock} className={styles.mobileMenuIcon}/><span>Bet History</span></div> } */}


        <div className={styles.history_buttons}>

          <button type="button" className={styles.transaction_history} onClick={onTransactionState}>
            <span>Transaction History</span>
          </button>
          <button type="button" className={styles.bet_history} onClick={onHistoryState}>
            <span>Bet History</span>
          </button>
        </div>

      </div>



      <div className={styles.dates_search}>
        <div className={`${styles.form_group} ${styles.form_group_30} `}>
          <label className={`${styles.from_date_label} ${styles.input_label} ${styles.blue_color_font} `} >FROM</label>
          <input type="date" className={`${styles.from_date} ${styles.form_control} `} id="from_date" />
        </div>
        <div className={`${styles.form_group} ${styles.form_group_30} `}>
          <label className={`${styles.from_date_label} ${styles.input_label} ${styles.blue_color_font} `} >TO</label>
          <input type="date" className={`${styles.to_date} ${styles.form_control} `} id="to_date" />
        </div>
        <div className={`${styles.form_group} ${styles.form_group_30} ${styles.search_button}`}>

          <button type="button" className={styles.transaction_history} onClick={onSearchHistory}>
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* <FontAwesomeIcon icon={faClock} className={styles.my_HistryclockIcon} />
        <span className={`${styles.blue_color_font} ${styles.my_ac_lable} ${styles.text_label} `}>MY ACCOUNT</span> */}

      {/* <div className={styles.heading}>
          {historyState == "transaction" ? <h2 className={styles.main_heading}>Transaction History</h2> : <h2 className={styles.main_heading}>Bet History</h2>}


          <div className={styles.history_buttons}>

            <button type="button" className={styles.transaction_history} onClick={onTransactionState}>
              <span>Transaction History</span>
            </button>
            <button type="button" className={styles.bet_history} onClick={onHistoryState}>
              <span>Bet History</span>
            </button>
          </div>
        </div> */}


      {/* <div className={styles.dates_search}>
          <div className={`${styles.form_group} ${styles.form_group_30} `}>
            <label className={`${styles.from_date_label} ${styles.input_label} ${styles.blue_color_font} `} >FROM</label>
            <input type="date" className={`${styles.from_date} ${styles.form_control} `} id="from_date" />
          </div>
          <div className={`${styles.form_group} ${styles.form_group_30} `}>
            <label className={`${styles.from_date_label} ${styles.input_label} ${styles.blue_color_font} `} >TO</label>
            <input type="date" className={`${styles.to_date} ${styles.form_control} `} id="to_date" />
          </div>
          <div className={`${styles.form_group} ${styles.form_group_30} ${styles.search_button}`}>

            <button type="button" className={styles.transaction_history} onClick={onSearchHistory}>
              <span>Search</span>
            </button>
          </div>
        </div> */}
      {historyState == "transaction" ? <TransactionHistory/> :  <BetHistory/>}  
    </div >
  )
}

export default MyHistory;
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

const DepositPopup = (props) => {
    return (
        <div>
            <div className={styles.depositPopup}>
                <div className={styles.popupBody}>
                    <div className={styles.commonWrap}>
                        <div className={styles.popupHeader}>
                            <div className={styles.popupLogo}><img src="images/logo.svg" /></div>
                            <div className={styles.close}><i>X</i></div>
                        </div>

                        <form className={`${styles.popupBody} ${styles.depositPop}  `}>
                            <div className={styles.scrollData}>
                                <div className={styles.label}>
                                    {/* <i class="fa fa-credit-card-alt" aria-hidden="true"></i> */}
                                    <span className={styles.name}>Deposit</span>
                                </div>

                                <div className={styles.depositTypeSelect}>

                                    <select id="deposit_type" name="deposit_type">
                                        <option>Select a deposit method</option>
                                        <option value="deposit_type">deposit method</option>
                                    </select>
                                    <span className={styles.imgOption}>
                                        <i className="fa fa-cc-mastercard" aria-hidden="true"></i>
                                        <i className="fa fa-cc-paypal" aria-hidden="true"></i>
                                        <i className="fa fa-cc-visa" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div className={styles.label}>
                                    <span className="name">
                                        Amount</span>
                                </div>

                                <div className={styles.depositAmt}>
                                    <input type="text" className={styles.selected} value="$25" readonly />
                                    <input type="text" value="$50" readonly />
                                    <input type="text" value="$100" readonly />
                                    <input type="text" className="amount" value="" placeholder="Enter Amount" />
                                </div>

                                <div className={styles.bonus}>
                                    <input type="radio" checked id="bonus" name="bonus" value="bonus" />
                                    <label >Yes, I'd Like a Bonus!</label>

                                    <select id="bonus_type" name="bonus_type">
                                        <option>Choose a Bonus Value</option>
                                        <option value="bonus_type">Bonus Type</option>
                                    </select>
                                    <input type="text" className={styles.bonus_code} value="" placeholder="Enter Bonus Code" />

                                </div>

                            </div>

                            <input type="button" value="continue" />
                <div className="cta-txt">Set a <span class="text-black">Deposit limit</span> within <span
                        class="text-black"> My
                        Account.</span></div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    )

}

export default DepositPopup;
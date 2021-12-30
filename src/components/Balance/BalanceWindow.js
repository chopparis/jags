import styles from './style.module.scss';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import globalStyles from '../../../styles/Global.module.scss';
import PubSub from 'pubsub-js';
import Container from '@material-ui/core/Container';
import useTranslation from 'next-translate/useTranslation';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

const BalanceWindow = (props) => {
    const { t, lang } = useTranslation('common');
    const [isOPen, setOverlay] = useState(true);
    const [responsiveWidth, setResponsiveWidth] = useState("sm");

    const onCloseWindow = () => {
        props.windowClosed();
        setOverlay(false);
    }
    useEffect(() => {
        if (isMobile) {
            setResponsiveWidth("xs")
        } else {
            setResponsiveWidth("sm")
        }
    }, []);

    const onOutSideBalaClicked = (msg, data) => {
        if (data.includes("-avoid")) {
            props.windowClosed();
            setOverlay(false);
        }
    }

    // PubSub.subscribe('OpenLogBalanceWindow', onOpenBalanceWindow);
    PubSub.subscribe("clickedOutSide", onOutSideBalaClicked);

    const getBalance = (type) => {
        let currency_val = props.balanceObj.currency ? props.balanceObj.currency : "";
        let currency_cash = props.balanceObj.cash ? props.balanceObj.cash : "0.00";
        let currency_bonus = props.balanceObj.bonus ? props.balanceObj.bonus : "0.00";

        if (type == "cash") {
            return (currency_val + " " + currency_cash);
        } else if (type == "bonus") {
            return (currency_val + " " + currency_bonus);
        }

    }

    return (
        <div id="balance-avoid" className={isOPen ? globalStyles.overlay : globalStyles.unSetOverlay}>
            <Container component="main" maxWidth={responsiveWidth} >
                <div className={styles.balanceWindow} >

                    <div className={styles.sectionOne}>
                        <div className={styles.logoHolder} onClick={() => router.push("/")}>
                            <Image
                                // src="/images/logo.svg"
                                src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=" + props.imgVersion}
                                quality={100}
                                alt="Casino games Logo"
                                layout="fill"
                            />

                        </div>
                        {/* <div className={styles.closeBtn} onClick={onCloseWindow}><span>CLOSE</span></div> */}

                    </div>
                    <div onClick={onCloseWindow} className={styles.closeBtn}><span>X</span></div>

                    <div className={styles.sectionTwo}>

                        <div><span>{t("deposit")}</span></div>

                        <div className={styles.blanceStrip}>

                            <div className={styles.wBalanceWraper}>
                                {/* <span><AccountCircleIcon fontSize="inherit"></AccountCircleIcon></span> */}
                                <div>
                                    <div className={styles.wTxtColor}><span>{t("balance")}</span></div>
                                    <div><span>{getBalance("cash")}</span></div>
                                </div>
                            </div>


                        </div>

                        <div className={styles.blanceStrip}>
                            <div className={styles.wBalanceWraper}>
                                {/* <span><AccountCircleIcon fontSize="inherit"></AccountCircleIcon></span> */}
                                <div>
                                    <div className={styles.wTxtColor}><span>{t("bonus")}</span></div>
                                    <div><span>{getBalance("bonus")}</span></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={styles.sectionThree}>
                        <div><span>{t("card_end_with")}</span></div>

                        <div className={styles.amtInput}>
                            <input
                                type="text"
                                name="userName"
                                placeholder={t("enter_amt")}
                            />
                               <input
                                type="password"
                                name="userName"
                                placeholder={t("enter_cvv")}
                            />
                        </div>
                        {/* <div className={styles.amtInput}>
                         
                        </div> */}


                        <div className={styles.depositAmt}><span>{t("deposit")}</span></div>
                        <div className={styles.depositAmt}><span>{t("manage_card")}</span></div>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default BalanceWindow;
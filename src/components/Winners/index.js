import React, { useEffect, useState } from 'react';
// import styles from '../../../styles/Home.module.scss';
import styles from './style.module.scss';
// import Image from 'next/image';
// import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
// import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/router";

import request from "../../../utils/request";
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

const Winners = (props) => {
    const router = useRouter();

    const { t, lang } = useTranslation('common')
    // const [gList, setGList] = useState(["blueprint.svg", "evolution.svg", "netent.svg", "play-n-go.svg", "pragmatic-play.svg", "quickspin.svg", "red-tiger.svg", "swintt.svg", "red-tiger.svg", "12.webp", "pragmatic-play.svg"]);
    const [totalWiners, setWinnersList] = useState([]);


    const phoneInputRef = React.useRef(null);
    const cardRef = React.useRef(null);

    const [leftArrow, setLeftArrow] = useState(true);
    const [rightArrow, setRightArrow] = useState(false);



    const getWinnersList = async () => {

        let obj = {
            params: {
                // "api_key": process.env.NEXT_PUBLIC_API_KEY
            }
        }
        const res = await request(`/api/getWinners`, obj);

        if (res.error != undefined && res.error && res.error.code) {
        } else if (res.result) {
            let winnersList = res.result;
            if (winnersList.length > 0) {
                setWinnersList(winnersList);
                //   console.log(winnersList , "________----winnersList"); 
            }
        }
    }


    useEffect(() => {
        getWinnersList();
    }, []);

    const onLeftMove = () => {
        let movableCard = 5;
        let cardWidth = cardRef.current.offsetWidth;
        let gap = (10 * movableCard);

        let moveVal = (movableCard * cardWidth) + gap;
        //  console.log(  phoneInputRef.current.scrollLeft , "_____________" , phoneInputRef.current.width)
        phoneInputRef.current.scrollLeft -= moveVal;



    }

    const handleScroll = (e) => {
        if ((phoneInputRef.current.scrollLeft + phoneInputRef.current.clientWidth) == phoneInputRef.current.scrollWidth) {
            // if ( phoneInputRef.current.offsetWidth  == phoneInputRef.current.scrollWidth ) {
            setRightArrow(true)
            setLeftArrow(false)
        }

        if (phoneInputRef.current.scrollLeft == 0) {
            setLeftArrow(true)
            setRightArrow(false)
        }
    }

    const onRightMove = () => {
        // console.log(  phoneInputRef.current.scrollLeft , "_____________" , phoneInputRef.current.width)
        let movableCard = 5;
        let cardWidth = cardRef.current.offsetWidth;
        let gap = (10 * movableCard);

        let moveVal = (movableCard * cardWidth) + gap;
        phoneInputRef.current.scrollLeft += moveVal;

    }

    const validateSession = async () => {
        const isValidSession = await request(`/api/player/validateSession`, {});
        
        if (isValidSession && isValidSession.result && isValidSession.result.is_valid) {
            return true;
        } else {
           // console.log(isValidSession , "____winn__---isValidSession" , isValidSession.status)
            return false;
        }

    }

    const onGameOpen = (gameObj) => async (e) => {
        // console.log(data , "_______--datadata");
        e.preventDefault();
        let isValid = await validateSession();

        if (isValid) {
            let gameURL = "/igw/" + (gameObj && gameObj.game_type) + "/" + (gameObj && gameObj.game_name.replace(/ /g, "-").toLowerCase()) + "/" + (gameObj && gameObj.game_config_id);
            router.push(gameURL);
        } else {
            // reset to login and show login window
            PubSub.publish('OpenLoginWndow', "");
        }

    }

    return (

        <div className={styles.winnerSection} >
            {/* <div className={styles.winers_navBtnsHolder}> */}
            <div className={styles.wBtnsHolder}>
                <div className={`${leftArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.wnavBtns}`} onClick={onLeftMove}><FontAwesomeIcon icon={faAngleLeft} /></div>
                <div className={`${rightArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.wnavBtns}`} onClick={onRightMove}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
            {/* </div> */}
            <div className={styles.wtitle}>
                <div><span>{t("winners")}</span></div>
                {/* <div className={styles.wBtnsHolder}>
                    <div className={`${leftArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.wnavBtns}`} onClick={onLeftMove}><ArrowBackSharpIcon fontSize="inherit" /></div>
                    <div className={`${rightArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.wnavBtns}`} onClick={onRightMove}><ArrowForwardSharpIcon fontSize="inherit" /></div>
                </div> */}
            </div>


            <div className={styles.winnerItems} ref={phoneInputRef} onScroll={handleScroll}>

                {totalWiners && totalWiners.map((obj, k) => <div key={k} className={styles.wCard} >
                    <div className={styles.winnerLogo} ref={cardRef} onClick={onGameOpen(obj)}>
                        {/* <Image
                        src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/6x/" + obj.game_config_id + ".jpg" + "?v=" + props.versionNum}
                        alt="slots image"
                        quality={100}
                        layout="fill"
                    />  */}
                        <a className={styles.winnersGameLogo}
                            style={{ backgroundImage: `url(${props.domain_cdn + "/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/6x/" + obj.game_config_id + ".jpg" + "?v=" + props.versionNum})` }}
                        ></a>

                    </div>
                    <div className={styles.winnertxt}>
                        <div><span className={styles.nameTxt}>{` @ ${obj.name} `}</span>
                            <span>{"Just collected"}</span></div>
                        <span >{` ${(obj.currency + " " + obj.amount)} , ${obj.game_name} `}</span>

                        <span className={styles.winAmtTxt}>  <Link href="/">

                            <a>{"Make a desposit"}</a>
                        </Link></span>
                    </div>

                </div>)}



            </div>
        </div>

    )
}
export default Winners;

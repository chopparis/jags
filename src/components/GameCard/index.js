import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
// import styles from '../../../styles/Home.module.scss';
import styles from './style.module.scss';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
// import ReactLogo from './play-icon.svg';
// import {ReactComponent as ReactLogo} from './play-icon.svg';
import ReactLogo from './play-icon.svg';
import PubSub from 'pubsub-js';
// import { Home } from '@material-ui/icons';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';

import { faHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameCard = (props) => {
    const [isCardFav, setCardFav] = useState(false);
    const [isFallBack , setFallBack] = useState(false);
    const [imgSrc , setImageSrc] = useState("");
    //  const router = useRouter();
    const { t, lang } = useTranslation('common');


    const onSetFaviourate = () =>{
        setCardFav(false);
    }

    PubSub.subscribe('unsetFav', onSetFaviourate);

    const onHandleGame = (e) => {
        //  e.preventDefault();
        // console.log(e.target.id , "__________________" , e.currentTarget.id)
        // if (e.target.id.includes("gameCard") || e.currentTarget.id.includes("gameCard")) {
        e.preventDefault();
        let gameURL = "/igw/" + (props.gameObj && props.gameObj.game_type) + "/" + (props.gameObj && props.gameObj.game_name.replace(/ /g, "-").toLowerCase()) + "/" + (props.gameObj && props.gameObj.game_config_id);
        props.onOpenGame(gameURL, props.gameObj);
        //}

    }

    // const onOpenGame = e => {
    //     console.log(e.target)
    //   }

    const onSelectFav = () => {
        setCardFav(!isCardFav);
        props.updateFavSelection(props.gameObj , isCardFav);
    }

    // const getRouteURL = () => {
    //     let routeObj = {};

    //     if (!localStorage.tocken) {
    //         routeObj = {
    //             pathname: "/",
    //             query: { id: "login" }
    //         }
    //     } else {
    //         routeObj = {
    //             pathname: "/igw/" + (props.gameObj && props.gameObj.game_type) + "/" + (props.gameObj && props.gameObj.game_name.replace(/ /g, "-")) + "/" + (props.gameObj && props.gameObj.game_config_id)
    //         }
    //     }

    //     return routeObj;

    // }

    useEffect(() => {
        let img_src =  "/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/" + props.gameType + "/" + props.gameObj.image + "?v=" + props.versNum
        setImageSrc(img_src);
        setCardFav(props.gameObj.favourite);
    }, [props.gameObj]);



    useEffect(() => {
        //let img_src =  "/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/" + props.gameType + "/" + props.gameObj.image + "?v=" + props.versNum
       // setImageSrc(img_src);
    }, [isFallBack]);


    return (
        // <div  className={styles.gameCards} style={props.cWidth}>
        <div className={styles.gameCards}   className={`${styles.gameCards} ${props.pageType=="homepage" ? styles.normalWidth : styles.moreGamesWidth}  `}>

            <div className={styles.favHolder}>
            <div className={styles.favIcon}><FontAwesomeIcon className={isCardFav ? styles.favSelect : styles.favUnSelect} icon={faHeart} onClick={onSelectFav}/>
                {/* <div className={`${styles.favIcon} ${(isCardFav ? styles.favSelect : styles.favUnSelect)}`}><FavoriteTwoToneIcon fontSize="inherit" onClick={onSelectFav} /> */}
                </div>
            </div>

            <div className={styles.gameCardOverlayBtn} onClick={onHandleGame}></div>

            <div className={styles.CardOverlayBtn} onClick={onHandleGame}>



                <div className={styles.playIcon}>
                    {/* <PlayButton onGameClick={onOpenGame}>{t('playnow')}</PlayButton> */}
                    {/* <div className={styles.MymoreInfo}>MoreInfo</div> */}
                    {/* <PlayCircleFilledTwoToneIcon fontSize="inherit" /> */}

                    {/* <Link href={"/igw/" + props.gameObj && props.gameObj.game_name.replace(" ", "")}> */}
                    {/* <Link
                        href={getRouteURL()} >
                        <a> <ReactLogo></ReactLogo></a>
                    </Link> */}

                    <a> <ReactLogo></ReactLogo></a>
                </div>

                {/* <div className={styles.gameName}><span>Play with CLEO</span> <InfoTwoToneIcon className={styles.infoIcon} fontSize="inherit" /></div> */}


            </div >
            <div  onClick={onHandleGame}><Image 
                //src={"/images/" + props.gameObj.gameType + "/" + props.gameObj.imagePath + "?v=" + props.versNum}
                //src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/" + props.gameType + "/" + props.gameObj.image + "?v=" + props.versNum}
                src={imgSrc || "1.jpg"}
                //src={"/200"}
                alt={props.gameObj.game_name}
                quality={100}
                layout="fill"
                objectFit="cover"
                onError={() => {
                    setFallBack(true);
                }}
            /></div>



            {props.showInfo ? <div className={styles.infoIcon}><InfoTwoToneIcon fontSize="inherit" /></div> : ""}

            <div className={`${styles.jackPotAmt} ${props.gameObj.jackpot ? styles.jackpotEnable : styles.jackpotDisable}  `} >
                <span >{props.gameObj.jackpot ? ( props.currency + " " + props.gameObj.jackpot_amount )  : "000.00"}</span>
            </div>


{/* <div className={styles.jackPotAmt}  >
                <span>{"2.222222"}</span>
            </div> */}


            <div className={styles.gameNameWraper} onClick={onHandleGame}>
                <div className={styles.gameName} >
                    {/* <Link href={getRouteURL()}>
                        <a>{props.gameObj.game_name}</a>
                    </Link> */}
                    <a>{props.gameObj.game_name}</a>
                </div>
            </div>

            <div className={styles.cardTags}>
                {props.gameObj.tags && props.gameObj.tags.map((obj, indx) =>
                    <span key={indx} className={obj.toUpperCase() == "TRENDING" ? styles.hotTag : styles.newTag} >{obj.toUpperCase()}</span>

                )}
                {/* 
                <span className={styles.newTag}>TRENDING</span> 
                  <span className={styles.hotTag}>HOT</span> */}
            </div>


        </div>
    )
}

export default GameCard;
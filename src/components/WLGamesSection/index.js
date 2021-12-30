import React, { useEffect, useState } from 'react';
// import styles from '../../../styles/Home.module.scss';
import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { updateGamesList } from '../../../redux/actions/config';
// import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
// import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import request from "../../../utils/request";
import PubSub from 'pubsub-js';
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";
import GameCard from '../GameCard';
import Link from 'next/link';

const WLGamesSection = (props) => {
    //  const [isCardFav, setCardFav] = useState(false);
    const dispatch = useDispatch();

    const router = useRouter();
    const { t, lang } = useTranslation('common')
    const [allGames, setAllGames] = useState([]);
    const [currentChunck, setCurrentChunk] = useState({});
    const [minMax, setMinMax] = useState({ "min": 0, "max": 16, "totalCount": 0, "currency": "" });
    const [leftArrow, setLeftArrow] = useState(false);
    // const [rightArrow, setRightArrow] = useState(false);
    const [rightArrow, setRightArrow] = useState(false);
    const [versNum, setVersionNum] = useState(0);
    const [iscookieValid  ,setSession] = useState(false);
    // const [moveVal , setMoveVal] = useState(0);

    const cardsWraperRef = React.useRef(null);
    const cardRef = React.useRef(null);
    const movableCard = props.categryObj.no_of_tiles;
    const cardGap = 14; // Card has marginRight 14 px

    const getMovableValue = () => {
        // let movableCard = 6;
        let cardWidth = cardRef.current.offsetWidth;
        let gap = (cardGap * movableCard);
        return (movableCard * cardWidth) + gap;
    }

    const onLeftMove = (e) => {
        e.preventDefault();
        // setRightArrow(false);
        cardsWraperRef.current.scrollLeft -= getMovableValue();
    }

    const handleDisableScroll = () => {
        // setRightArrow(true);
    }

    const handleScroll = (e) => {
        if ((cardsWraperRef.current.scrollLeft + cardsWraperRef.current.clientWidth) == cardsWraperRef.current.scrollWidth) {
           // console.log(minMax.min, "__min<_____" ,  minMax.max, "<Max__",minMax.totalCount);
            if(minMax.min <= minMax.totalCount){
                getGameChunks(minMax.min, minMax.max, minMax.totalCount, "");
            }
        //    getGameChunks(minMax.min, minMax.max, minMax.totalCount, "");
           
        }
        // if (cardsWraperRef.current.scrollLeft == 0) { setLeftArrow(true); }
    }

    const onRightMove = (e) => {
        // setLeftArrow(false);
        e.preventDefault();
        cardsWraperRef.current.scrollLeft += getMovableValue();
        //  getGameChunks(minMax.min , minMax.max , minMax.totalCount , "");
    }

    const validateSession = async() =>{
        const isValidSession = await request(`/api/player/validateSession`, {});
      
        if(isValidSession && isValidSession.result && isValidSession.result.is_valid){
            return true;
        }else{
           // console.log(isValidSession.status , "_______---isValidSession")
            return false;
        }
 
    }

    const onOpenGame = async(gameURL, gameData) => {
        // let gameInfo = {...gameData};
        // gameInfo.versionNum = props.versionNum;
        // PubSub.publish('OPenGameWindow', gameInfo);

       // const isValidSession = await request(`/api/player/validateSession`, {});
        let isValid = await validateSession();
    
        if(isValid){
            // router.push(gameURL, undefined, {
            //     scroll: true
            //  });
            router.push(gameURL);
        }else{
            // reset to login and show login window
            PubSub.publish('OpenLoginWndow', "");
        }
        //console.log(isValidSession.result.is_valid , "___ddd___----isValidSessionisValidSession");


        // if (localStorage.tocken) {
        //     // router.push(gameURL, undefined, {
        //     //     scroll: true
        //     //  });
        //     router.push(gameURL);
        // } else {
        //     PubSub.publish('OpenLoginWndow', "");
        // }
    }

    const OpenMoreGames = () => {
        // router.push("/games?id=slots")
    }

    const getGameChunks = async (min, max, totalLeng, requestMode) => {

      //  let isValid = await validateSession();
       // console.log(isValidSession , "______----isValidSessionisValidSession");

        // console.log(min , "<min>max>" , max , "<<totalLeng>>" , totalLeng);
        if (min > totalLeng) {
            handleDisableScroll();
            // return;
        }

        let obj = {
            params: {
                "category_ids": [props.categryObj.id],
                "start_limit": min,
                "end_limit": max
            }
        }
        const res = await request(`/api/getGames`, obj);

        if (res.error != undefined && res.error && res.error.code) {
        } else if (res.result) {
            let gamesList = res.result;
            if (gamesList.games.length > 0) {
                //  console.log(requestMode , "________----gamesListgamesList");
                setCurrentChunk(gamesList);
                if (requestMode == "initRequest") {
                    // categery ID based games storing in cache
                    dispatch(updateGamesList({cachegamesList : gamesList , cetegoryID:props.categryObj.id}));
                }

            }
        }
    }

    useEffect(() => {
        if (currentChunck && currentChunck.games && currentChunck.games.length > 0) {
            let totalGames = allGames.concat(currentChunck.games);
            setAllGames(totalGames);
            setMinMax({ "min": (minMax.max), "max": (minMax.max + movableCard), "totalCount": currentChunck.total_count, "currency": currentChunck.currency });
        };

    }, [currentChunck]);

    useEffect(async () => {
        // let isValid = await validateSession();
        // setSession(isValid);
        //getting cache games based on categery ID
    //    console.log(props.cacheGamesList[props.categryObj.id], "____________CACHELIST")
        if(props.cacheGamesList[props.categryObj.id] && props.cacheGamesList[props.categryObj.id].games && props.cacheGamesList[props.categryObj.id].games.length > 0){
            setCurrentChunk(props.cacheGamesList[props.categryObj.id]);

        }else{
            getGameChunks(0, 16 , minMax.totalCount , "initRequest");
        }
        localStorage && localStorage.setItem("backRoute", router.asPath);
    }, []);

    const updateFavSelection = async (gameObj , isFav) => {
        
        let isValid = await validateSession();
    
        if(isValid){
            let obj = {
                params: {
                    "game_config_id": gameObj.game_config_id,
                    "game_type": gameObj.game_type,
                    "is_favourite": !isFav,
                    // "session_id": localStorage && localStorage.tocken,
                    // "api_key": process.env.NEXT_PUBLIC_API_KEY
                }
            }
            const res = await request(`/api/favouriates`, obj);
    
            if (res.error != undefined && res.error && res.error.code) {
            } else if (res.result) {
    
            }
        }else{
            // reset to login and show login window
           // setSession(false);
            PubSub.publish('unsetFav', "");
            PubSub.publish('OpenLoginWndow', "");
            
        }

      

    }

    // const getClassName =()=>{
    //     return {"styles.sixCard"} 
    // }

    return (

        <div className={styles.HgamesSection} >
             {minMax.totalCount > props.categryObj.no_of_tiles ? <div className={styles.navBtnsHolder}>
                    <div disabled className={`${leftArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.home_navBtns}`} onClick={onLeftMove}><FontAwesomeIcon icon={faAngleLeft} /></div>
                    <div className={`${rightArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.home_navBtns}`} onClick={onRightMove}><FontAwesomeIcon icon={faAngleRight} /></div>
             </div> : "" }
            <div className={styles.title}>
                <div><span><span>{props.categryObj.display_name}</span></span></div>
                {minMax.totalCount > props.categryObj.no_of_tiles ? <div className={styles.BtnsHolder}>
                    <div className={styles.moreGamesBtn} onClick={OpenMoreGames}>

                        <Link href={"/games/" + props.categryObj.permalink}>
                            <span><a>{t("moregames")}</a></span>
                            {/* <a>{props.propObj.display_name}</a> */}
                        </Link>
                    </div>
                    {/* <div disabled className={`${leftArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.home_navBtns}`} onClick={onLeftMove}><ArrowBackSharpIcon fontSize="inherit" /></div>
                    <div className={`${rightArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.home_navBtns}`} onClick={onRightMove}><ArrowForwardSharpIcon fontSize="inherit" /></div> */}

                </div> : ""}
            </div>
            

            {props.categryObj.no_of_tiles == "6" ?

                <div className={styles.MitemsHolder} ref={cardsWraperRef} onScroll={handleScroll}>
                    {allGames && allGames.map((obj, indx) =>

                        <div key={indx} className={styles.sixCard}
                            ref={cardRef}>
                            <GameCard key={indx} gameObj={obj} versNum={props.versionNum} gameType="6x" updateFavSelection={updateFavSelection} onOpenGame={onOpenGame} showInfo={props.showInfo} currency={minMax.currency} />
                        </div>

                    )}
                </div> : ""}

            {props.categryObj.no_of_tiles == "8" ?

                <div className={styles.MitemsHolder} ref={cardsWraperRef} onScroll={handleScroll}>
                   
                    {allGames && allGames.map((obj, indx) =>

                        <div key={indx} className={styles.eightCard}
                            ref={cardRef}>
                            <GameCard key={indx} gameObj={obj} versNum={props.versionNum} gameType="6x" updateFavSelection={updateFavSelection} onOpenGame={onOpenGame} showInfo={props.showInfo} currency={minMax.currency} pageType={"homepage"}/>
                        </div>

                    )}
                </div> : ""}

        </div>

    )
}

export default WLGamesSection;
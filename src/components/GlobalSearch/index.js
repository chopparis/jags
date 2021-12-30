import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import PubSub from 'pubsub-js'
import Image from 'next/image';
import { useRouter } from "next/router";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useTranslation from 'next-translate/useTranslation';
import request from "../../../utils/request";
// import UtilityValidateSession from "../../../utils/utility";
import _ from "lodash";
//import debounce from 'lodash.debounce';

const GlobalSearch = (props) => {
    const router = useRouter();
    const { t, lang } = useTranslation('common');
    const [searchresults, setSearchResult] = useState([])
    const [isOPen, setOverlay] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");

    const onOpenSearchWindow = (msg, data) => {
        // setInfoTxt(data);
        setOverlay(true);
    }

    const onOutSideGSearchClicked = (msg, data) => {
        if (data.includes("-avoid")) {
            setOverlay(false);
        }
    }

    PubSub.subscribe('OpenSearchWindow', onOpenSearchWindow);
    PubSub.subscribe("clickedOutSide", onOutSideGSearchClicked);

    const onClose = () => {
        setOverlay(false);
    }

    const onGlobalSearch = (e) => {
        setSearchTxt(e.target.value)
    }


    const setBonuceupdate = () => {
        getGlobalGames(searchTxt);
    }



    const getGlobalGames = async (searchKey) => {
        let obj = {
            //     params:  {
            //     "category_id": props.gameObj.id,
            //     "game_type": "",
            //     "search_key": "",
            //     "game_provider": "",
            //     "session_id": "",
            //      "start_limit": min,
            //      "end_limit": max,
            //      "api_key": "zmh9D2UN6AtC@3S#HdfJ"
            //    }

            params: {
                "start_limit": 0,
                "end_limit": 8,
                "search_key": searchKey,
                // "api_key": "zmh9D2UN6AtC@3S#HdfJ"
            }
        }
        const res = await request(`/api/getGames`, obj);

        if (res.error != undefined && res.error && res.error.code) {
        } else if (res.result) {
            let gamesList = res.result;
            if (gamesList.games.length > 0) {
                setSearchResult(gamesList.games);
            }
        }
    }

    const debounceTime = _.debounce(setBonuceupdate, 1000);

    React.useEffect(() => {
        if (searchTxt != "") {
            debounceTime();
        } else {
            getGlobalGames(searchTxt);
        }
    }, [searchTxt]);

    // useEffect(() => {
    //    // getGlobalGames("");
    // }, []);

    const validateSession = async() =>{
        const isValidSession = await request(`/api/player/validateSession`, {});
       
        if(isValidSession && isValidSession.result && isValidSession.result.is_valid){
            return true;
        }else{
           // console.log(isValidSession.status , "____globl search___---isValidSession")
            return false;
        }
 
    }

const onGameSelection = (obj,indx)=>async(event)=>{
   
    // console.log(game_url , "________---game_url");
    setOverlay(false);
   let isUserActive = await validateSession();
     //let isUserActive = UtilityValidateSession();
  //  console.log(isUserActive , "__________-isUserActive")
    if (isUserActive) {
        let game_url = "/igw/" + (obj && obj.game_type) + "/" + (obj && obj.game_name.replace(/ /g, "-").toLowerCase()) + "/" + (obj && obj.game_config_id) ;
        router.push(game_url);
    } else {
        PubSub.publish('OpenLoginWndow', "");
    }

}
    return (

        // <div className={isOPen ? globalStyles.overlay : globalStyles.unSetOverlay}>
        // <Container component="main" maxWidth= { responsiveWidth} >

        <div id="globalSearch-avoid" className={isOPen ? styles.searhcOverLay : styles.closesearhcOverLay}>

            <div className={styles.globalSearchHolder}>

                <div className={styles.searchHeader}>
                    <input type="text" placeholder={t("search_games")} onChange={onGlobalSearch} />
                    <div className={styles.closeBtbn} onClick={onClose}>

                        <HighlightOffIcon fontSize="inherit" />


                    </div>
                </div>

                <section className={styles.gameItemsSection}>
                    {/* {searchresults && searchresults.length == 0 ? <div className={styles.noGamesInfo}>{t("no_games")}</div> : ""} */}

                    {searchresults && searchresults.length > 0 && searchresults.map((obj, indx) =>
                              <div key={indx} onClick={onGameSelection(obj,indx)}>   <a className={styles.searchItem} key={indx}>
                   
                            <div className={styles.imgHolder}>
                                {/* <Image src={"/images/" + obj.iconPath} quality={100} layout="fill" /> */}

                                <Image

                                    src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/6x/" + obj.image + "?v=" + props.versionNum}
                                    alt={obj.game_name}
                                    quality={100}
                                    layout="fill"
                                    objectFit="cover"
                                //objectFit="contain"
                                />

                            </div >
                            <div className={styles.gameInfo}>
                                <div> <span className={styles.gameTitle}>{obj.game_name}</span>
                                    <span className={styles.gameVendor}>{obj.game_provider}</span></div>
                                {/* <span className={`${styles.icon} ${styles.icn_next} `}></span> */}
                                <div className={styles.Arrowicon}><ArrowForwardIosIcon fontSize="inherit" /></div>
                            </div>
                           
                        </a> </div>
                    )}

                </section>
            </div>
            {/* </Container> */}
        </div>
    )
}

export default GlobalSearch;
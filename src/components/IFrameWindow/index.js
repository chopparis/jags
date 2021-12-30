import React, { useState, useEffect } from 'react';
import request from "../../../utils/request";
import { useRouter } from "next/router";
import ErrorHandling from "../../..//utils/utility";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import ArrowLeftOutlinedIcon from '@material-ui/icons/ArrowLeftOutlined';
import Image from 'next/image';
import PubSub from 'pubsub-js';
import styles from './style.module.scss';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

const IFrameWindow = (props) => {

    const [gameURL, setLaunchURL] = useState("");
    const [screenMode, setScreenMode] = useState(false);
    const [isOpenOptions, setSpeedDail] = useState(false);
    const [recentgames, setRecentGames] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [gurls, setGURLS] = useState(["slots/buffalo-bounty/16", "slots/twin-dragons/2", "slots/i-scream/3", "slots/panda-play-time/4",
        "slots/fruity-feast/5", "slots/winning-vegas/6", "slots/lucky-macau/7", "slots/gold-heist/8"
    ])

    const systemHealthFrame = React.createRef();
    // const mountNode =contentRef?.contentWindow?.document?.body

    const router = useRouter();
    //console.log(props.systemIP , "_

    // componentDidMount(){
    //     if (this.systemHealthFrame && this.systemHealthFrame.current) {
    //         this.systemHealthFrame.current.style.height = (window.innerHeight - this.systemHealthFrame.current.offsetTop - 35) + "px";
    //     }
    // }

    const triggerAppData = (props) => {
        // let { theme, language_code, productVersionInfo } = props;

        // if (systemHealthFrame && systemHealthFrame.current) {
        //     systemHealthFrame.current.contentWindow.postMessage({
        //         message: "hmssettings", value: {
        //             game_id,
        //             site_id,
        //             message
        //         }
        //     }, "*");
        // }

    }

    // window.addEventListener('message_from_gameProvider', function(e) {
    //    // const data = JSON.parse(e.data);
    //     // Where does the message come from
    //    // const channel = data.channel;
    //   });

    // React.useEffect(() => {
    //     //  window.addEventListener('message_from_gameProvider', handleKeyDown);

    //     // cleanup this component
    //     //  return () => {
    //     //   window.removeEventListener('message_from_gameProvider', handleKeyDown);
    //     //  };


    // }, []);
    const handleClickOutside = (e) => {
        //  console.log(e.target.id,"<<clicked..ifr.!!" ,e.currentTarget.id, "<<<<<<<<<<<")
        PubSub.publish("clickedOutSide", e.target.id)
    }

    // useEffect(() => {
    //     getGameURL();
    //     console.log(" on route change!!!! router")
    // }, [router]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        // setRecentGames(_.shuffle(recentgames));
        // if (!localStorage.tocken) {
        //     PubSub.publish('OpenLoginWndow', "");
        //     return;
        // }
        //  getGameURL();

        

    }, []);

    useEffect(() => {
        getGameURL(router.query.index[2]);
    }, [router.query]);

    const getGameURL = async (gameID) => {

        // if (!localStorage.tocken) {
        //     PubSub.publish('OpenLoginWndow', "");
        //     return;
        // }

        let tempObj = {
            // "session_id": localStorage && localStorage.tocken,
            // "provider": "dragongaming",
            "game_type": "slots",
            "game_config_id": gameID,
            "platform": isMobile ? "mobile" : "desktop",
            "language": "en"
        }
        // let obj = { "jsonrpc": "2.0", "id": 0, method: "game_launch", params: { ...tempObj } }
        let obj = { params: { ...tempObj } }
        // const userBalance = await request(`../../../api/balance/getBalance`, obj)
        const res = await request(`../../../api/gamelauncher/getGameURL`, obj);

        if (res.error) {
            let errType = ErrorHandling(res.error.code);
            if (errType.code == 5000) {
                // show login
                PubSub.publish('OpenLoginWndow', "");
            } else {
                // console.log(res.error.code , "_______---res.errorres.errorres.error")
                let errStr = "Error code " + res.error.code + " :: Message :: " + res.error.message
                PubSub.publish("OpenStatusWindow", errStr);
            }
            return
        }
        if (res && res.result) {
            setLaunchURL(res.result.url)
        } else {
            // error
            return
        }
    }


    const onFullScreen = () => {

        setScreenMode(!screenMode);

    }

    const addToFaviourates = () => {

    }
    const onCloseGameWindow = () => {
        router.push('/');
    }
    const onNavigateBack = () => {
        let backPath = "/";
        if (localStorage && localStorage.getItem("backRoute")) {
            backPath = localStorage.getItem("backRoute");
        }
        router.push(backPath);
    }


    const OPenOptions = () => {
        setSpeedDail(!isOpenOptions)
    }

    const launchRecentGames = (indx) => () => {
         // router.push(gurls[indx]);
    }
    return (

        <div className={`${styles.playWindow} ${screenMode ? styles.setPlayWindow : styles.unSetPlayWindow}`}>

            {!screenMode ? <div className={styles.games_section}>
                <div className={styles.gamesTitle}><span>Recently Played games</span></div>
                <div>
                    <div className={styles.gameList} >


                        {recentgames && recentgames.map((ind) =>

                            <div id="firstGame" key={ind} className={styles.gameThumb} onClick={launchRecentGames(ind)}>
                                {/* <Image
                                    src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/6x/" + ind + ".jpg"}
                                    alt="slot game image"
                                    quality={100}
                                    layout="fill"
                                    objectFit="cover"
                                /> */}

                                <a className={styles.recentGameLogo}
                                    style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN + "/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/6x/" + ind + ".jpg" + "?v=" + "0123453"})` }}
                                ></a>

                            </div>

                        )}

                    </div></div>
            </div> : ""}
            <div className={`${styles.IframeplayWindow} ${screenMode ? styles.setScreenMode : styles.unSetScreenMode}`} >



                <div className={styles.gameBody} >
                    {/* <h2>{"gameData.name"}</h2>  */}

                    <iframe onLoad={() => { triggerAppData({}); }} className={styles.game_area} ref={systemHealthFrame} src={gameURL} title="Casino Games" sandbox="allow-same-origin allow-scripts allow-forms allow-storage-access-by-user-activation" scrolling="no" ></iframe>
                </div>



                <div className={styles.speedDail} onClick={OPenOptions}><ArrowLeftOutlinedIcon fontSize="inherit" /></div>

                <div className={`${styles.optionsHolder_m} ${isOpenOptions ? styles.optionsHolder_m_xepand : styles.optionsHolder_m}`}>
                    <div className={styles.iconBg_m} onClick={onFullScreen}>{screenMode ? <FullscreenExitRoundedIcon className={styles.iconProps} /> : <FullscreenOutlinedIcon className={styles.iconProps} />} </div>
                    <div className={styles.iconBg_m}><FavoriteIcon className={styles.iconProps} onClick={addToFaviourates} /></div>
                    <div className={styles.iconBg_m}><CancelRoundedIcon className={styles.cancelBtn} onClick={onCloseGameWindow} /></div>
                    <div className={styles.iconBg_m}><ArrowBackSharpIcon className={styles.iconProps} onClick={onNavigateBack} /></div>
                </div>

                <div className={`${styles.optionsHolder} ${screenMode ? styles.setOptions : styles.unSetOptions}`}>
                    <div className={styles.iconBg} onClick={onFullScreen}>{screenMode ? <FullscreenExitRoundedIcon className={styles.iconProps} /> : <FullscreenOutlinedIcon className={styles.iconProps} />} </div>
                    <div className={styles.iconBg}><FavoriteIcon className={styles.iconProps} onClick={addToFaviourates} /></div>
                    <div className={styles.iconBg}><CancelRoundedIcon className={styles.cancelBtn} onClick={onCloseGameWindow} /></div>
                    <div className={styles.iconBg}><ArrowBackSharpIcon className={styles.iconProps} onClick={onNavigateBack} /></div>
                </div>



            </div>

        </div>
    )
}
export default IFrameWindow;
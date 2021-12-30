import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Image from 'next/image';
import PubSub from 'pubsub-js';
import Container from '@material-ui/core/Container';
import { useRouter } from "next/router";
// import PlayButton from '../PlayButton/';
// import CloseButton from '../CloseButton/';
import useTranslation from 'next-translate/useTranslation';
// import styles from '../../../styles/Home.module.scss'
import { openModelWindow, closeModelWindow } from "../../../redux/actions/config";
import styles from './style.module.scss'
import globalStyles from '../../../styles/Global.module.scss'

const GameInfoPopUp = (props) => {

    const { t, lang } = useTranslation('common');

    const { children } = props;
    const router = useRouter();
    // console.log(props.gameData , "____gd")
    const dispatch = useDispatch();

    const [isOPen, setOverlay] = useState(false);
    const [gameData, setImgData] = useState({});

    // let gameData = {};


    const onOpenGame = async(e) => {

        const isValidSession = await request(`/api/player/validateSession`, {});
        
        if(isValidSession && isValidSession.result && isValidSession.result.is_valid){
            setOverlay(false)
            PubSub.publish('OpenPlayGameWindow', gameData);
        }else{
           // console.log(isValidSession.status , "____Game popup___---isValidSession")
            setOverlay(false)
            PubSub.publish('OpenLoginWndow', "");
        }


    }

   
    useEffect(() => {
        setOverlay(false);
    }, [props.openWind]);


    const onClose = () => {
        // dispatch(closeModelWindow(false));
        //PubSub.publish('CloseGameWindow', 'hello world!');
        setOverlay(false)
    }


    const onOpenGameWindow = (msg, data) => {
        setOverlay(true);
        setImgData(data)
    }
    PubSub.subscribe('OPenGameWindow', onOpenGameWindow);

    return (
        <div className={isOPen ? globalStyles.overlay : globalStyles.unSetOverlay}>
            {/* {console.log(gameData , "___Game data ")} */}

            <Container component="main" maxWidth="md">


                <div className={styles.gamePopHolder}>

                    {/* <div className={styles.closeBtnstrip}><CloseButton onClose={onClose}><h2>X</h2></CloseButton></div> */}


                    <div className={styles.gameLogoHolder}>

                        <div className={styles.gameLogo}>
                       
<Image
                //src={"/images/" + props.gameObj.gameType + "/" + props.gameObj.imagePath + "?v=" + props.versNum}
                src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/" + "6x"+ "/" + gameData.image + "?v=" + gameData.versionNum}
                //src={"/200"}
                alt={gameData.game_name}
                quality={100}
                layout="fill"
                objectFit="cover"
            //objectFit="contain"
            />

                        </div>
                        <div className={styles.gameinfo}>
                            <h1>{gameData && gameData.name}</h1>
                            <h2>{t('gametype')}  {" : "} {gameData.gameType} </h2>
                            <h3>{t('gameprovider')} {" : Blue Print"}</h3>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>

                        </div>



                    </div>
                    {/* <div className={styles.gameInformation}>
                    
                        <h1>{gameData && gameData.name}</h1>
                        <span>{t('gametype') }  {" : "} {gameData.gameType} </span> <br />
                        <div className={styles.gameProvider}><span>{t('gameprovider')} {" : "}</span>
                            <div> <Image
                                src={"gameproviders/63.jpg"}
                                alt={gameData.name}
                                width={80}
                                height={24}
                            /></div></div>

                    </div> */}


                    <div className={styles.btnGrp}>
                        {/* <PlayButton>ADD TO FAVIOURATE</PlayButton> */}
                        <div className={styles.favSet}>
                            <div className={styles.addfavBtn}>
                                <span>{t('addtofaviourate')} </span>
                            </div>
                        </div>

                        <div className={styles.btnsets}>
                        <div className={styles.infoBtns} onClick={onOpenGame}>{t('playnow')}</div>
                            <div className={styles.infoBtns}>{t('depositnow')}</div>
                           
                            {/* <div className={styles.btnSpacer}><PlayButton onGameClick={onOpenGame}>{t('playnow')}</PlayButton></div>
                            <div><PlayButton>{t('depositnow')}</PlayButton></div> */}
                        </div>

                    </div>



                </div> </Container></div>
    );
}
export default GameInfoPopUp;


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import homeStyles from '../../../styles/Home.module.scss';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
// import ReactLogo from './play-icon.svg';
// import {ReactComponent as ReactLogo} from './play-icon.svg';
import ReactLogo from './play-icon.svg';
// import { Home } from '@material-ui/icons';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameTile = (props) => {
    const [isCardFav, setCardFav] = useState(false);
    const [isFallBack , setFallBack] = useState(false);
    const [imgSrc , setImageSrc] = useState("");
    //  const router = useRouter();
    const { t, lang } = useTranslation('common')

    const onHandleGame = (e) => {
        e.preventDefault();
        let gameURL = "/igw/" + (props.gameObj && props.gameObj.game_type) + "/" + (props.gameObj && props.gameObj.game_name.replace(/ /g, "-").toLowerCase()) + "/" + (props.gameObj && props.gameObj.game_config_id) ;
        props.onOpenGame(gameURL);
       
       // console.log(e.target.id , "___>>iddd" , e.target , "___",e.currenttarget)
        // props.onOpenGame(props.gameObj)
    }

    const onSetFaviourate = () =>{
        setCardFav(false);
    }

    PubSub.subscribe('unsetFav', onSetFaviourate);
    
    const onSelectFav = () => {
        setCardFav(!isCardFav);
        props.updateFavSelection(props.gameObj , isCardFav);
    }

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
        <div className={homeStyles.gameTiles}  >

<div className={homeStyles.favHolder}>
<div className={homeStyles.favIcon}><FontAwesomeIcon className={isCardFav ? homeStyles.favSelect : homeStyles.favUnSelect} icon={faHeart} onClick={onSelectFav}/>

                {/* <div className={`${homeStyles.favIcon} ${(isCardFav ? homeStyles.favSelect : homeStyles.favUnSelect)}`}><FavoriteTwoToneIcon fontSize="inherit" onClick={onSelectFav} /> */}
                </div>
            </div>

            <div className={homeStyles.gameCardOverlayBtn}></div>
            <div className={homeStyles.CardOverlayBtn} onClick={onHandleGame}>
                <div className={homeStyles.playIcon} >
                    <a> <ReactLogo></ReactLogo></a>
                </div>
            </div>
            <div onClick={onHandleGame}><Image
                //src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/" + props.gameType + "/" + props.gameObj.image + "?v=" + props.versNum}
                src={imgSrc || "1.jpg"}
                alt={props.gameObj.game_name}
                quality={100}
                layout="fill"
                objectFit="cover"
            //objectFit="contain"
            /></div>

            

            {props.showInfo ?  <div className={homeStyles.infoIcon}><InfoTwoToneIcon fontSize="inherit" /></div> : "" }

            <div className={`${homeStyles.jackPotAmt} ${props.gameObj.jackpot ? homeStyles.jackpotEnable : homeStyles.jackpotDisable}  `} ><span>{props.gameObj.jackpot ? (props.currency + " " + props.gameObj.jackpot_amount ) : "000.00"}</span></div>

            <div className={homeStyles.gameNameWraper} onClick={onHandleGame}>
                <div className={homeStyles.gameName}>
                {/* <Link href={"/igw/" + (props.gameObj && props.gameObj.game_type) + "/" + (props.gameObj && props.gameObj.game_config_id) + "/" + (props.gameObj && props.gameObj.game_name.replace(/ /g, "-"))}>
                    <a>{props.gameObj.game_name}</a>
                </Link> */}
                 <a>{props.gameObj.game_name}</a>
                </div>
            </div>

            <div className={homeStyles.cardTags}>
                {props.gameObj.tags && props.gameObj.tags.map((obj, indx) =>
                    <span key={indx} className={obj.toUpperCase() == "TRENDING" ? homeStyles.hotTag : homeStyles.newTag} >{obj.toUpperCase()}</span>

                )}
                {/* 
                <span className={homeStyles.newTag}>TRENDING</span> 
                  <span className={homeStyles.hotTag}>HOT</span> */}
            </div>


        </div>
    )
}

export default GameTile;
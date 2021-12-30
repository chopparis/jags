import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
// import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
// import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import styles from '../../../styles/Home.module.scss';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

const GameProviders = (props) => {

    const { t, lang } = useTranslation('common')
    // const [gList, setGList] = useState(["blueprint.svg", "evolution.svg", "netent.svg", "play-n-go.svg", "pragmatic-play.svg", "quickspin.svg", "red-tiger.svg", "swintt.svg", "red-tiger.svg", "12.webp", "pragmatic-play.svg"]);
    const [allproviders, providersList] = useState([
        // { provider: "dragongaming", icon: "blueprint.svg" },
        // { provider: "dragongaming", icon: "evolution.svg" },
        // { provider: "dragongaming", icon: "netent.svg" },
        // { provider: "dragongaming", icon: "play-n-go.svg" },
        // { provider: "dragongaming", icon: "pragmatic-play.svg" },
        // { provider: "dragongaming", icon: "red-tiger.svg" },
        // { provider: "dragongaming", icon: "swintt.svg" },
        // { provider: "dragongaming", icon: "red-tiger.svg" },
        // { provider: "dragongaming", icon: "pragmatic-play.svg" },
        // { provider: "dragongaming", icon: "red-tiger.svg" }
    ]);
    const phoneInputRef = React.useRef(null);
    const cardRef = React.useRef(null);

    const [leftArrow, setLeftArrow] = useState(true);
    const [rightArrow, setRightArrow] = useState(false);



    useEffect(() => {
        providersList(props.pList);
    }, [props.pList]);

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
    return (

        <div className={styles.gameProviderSection} >
            <div className={styles.Ptitle}>
                <div><span>{t("providers")}</span></div>
                {/* <div className={styles.pBtnsHolder}>
                    <div className={`${leftArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.pnavBtns}`} onClick={onLeftMove}><FontAwesomeIcon icon={faAngleLeft} /></div>
                    <div className={`${rightArrow ? styles.disableNavBtn : styles.enableNavBtn}  ${styles.pnavBtns}`} onClick={onRightMove}><FontAwesomeIcon icon={faAngleRight} /></div>
                </div> */}
            </div>


            <div className={styles.providerItems} ref={phoneInputRef} onScroll={handleScroll}>

                {allproviders && allproviders.map((obj, k) => <div key={k} className={styles.pCard} >
                    <div className={styles.providerLogo} ref={cardRef}>

                        {/* <Image 
                        // src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/gameproviders/" +  obj.icon + "?v=" + props.versionNum}
                        src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/6x/" + "1.jpg" + "?v=" + props.versionNum}
                        alt="slots image"
                        quality={100}
                        layout="fill"
                    /> */}

                        {/* <a className={styles.providerImg}  href={"/games/" + obj.provider + "/" + 1}
                            style={{ backgroundImage: `url(${"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/gameproviders/play-n-go.svg" + "?v=" + props.versionNum})` }}
                        ></a> */}

                        <Link
                            href={{
                                pathname: "/games/providers/" + obj,
                            }}
                        >
                            <a className={styles.providerImg}
                                style={{
                                    backgroundImage: `url(${props.domain_cdn + "/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/gameproviders/" + obj + ".svg" + "?v=" + props.versionNum}) `,
                                    // backgroundImage: `url(${props.domain_cdn + "/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/gameproviders/"+obj+".svg" + "?v=" + props.versionNum}) , url(${props.domain_cdn + "/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/payment-icons/Eco.webp" + "?v=" + props.versionNum})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "100%"
                                }}
                            ></a>
                        </Link>

                    </div>
                </div>)}
            </div>
        </div>

    )
}
export default GameProviders;
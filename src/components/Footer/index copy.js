import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from "next/router";
import styles from './style.module.scss';
import { useSelector } from "react-redux";
import Image from 'next/image';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = (props) => {
    const router = useRouter();

    const { t, lang } = useTranslation('common');

    // const onPagesOpen = (myParams) => (event) => {
    //     console.log(myParams)
    //     router.push("/promotions");

    // }
    const footerData = useSelector(state => state.StaticDataReducer.appConfigObj);

    const myLoader = ({ src, width, quality }) => {
        return `https://staging-wl.dragongaming.com/${src}?w=${width}&q=${quality || 75}`
      }

    return (
        <section className={styles.footerHolder}>
            {/* <div>
            <Image
            loader={myLoader}
                                 src={"/images/6x/3.jpg"}
                                alt={"cardObj.name"}
                                layout="fill"
                                // loading="eager"
                            />
            </div> */}
            <div className={styles.footerMenuHolder}>
                {footerData && footerData.footerInfo &&  footerData.footerInfo.FooteMenuItems.map((obj, indx) =>
                    <ul key={indx}>
                        <li><a>{t(obj.name.replace(/\s/g, "").toLowerCase())}</a></li>

                    </ul>
                )}
                <div className={styles.socialIcons}>


                    <TwitterIcon className={styles.twiter_icon} fontSize="inherit" />
                    <FacebookIcon className={styles.fb_icon} fontSize="inherit" />
                    <InstagramIcon className={styles.insta_icon} fontSize="inherit" />
                </div>

            </div>

            <div className={styles.paymentsHolder}>
                <div className={styles.cardsStrip}>
                {footerData && footerData.footerInfo &&  footerData.footerInfo.payments.map((cardObj, k) =>

                        <div key={k} className={styles.paymenyCardHolder}>
                            <Image
                                //   src={"/images/payment-icons/" + cardObj.iconPath }
                                  src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/payment-icons/" +cardObj.iconPath +"?v=" + footerData.version}
                                alt={cardObj.name}
                                alt="Casino games Logo"
                                layout="fill"
                            />
                        </div>

                    )}
                </div>
                <div className={styles.footerText}> <p> {t('footertext')}</p> </div>
                <div className={styles.cardsStrip}>
                {footerData && footerData.footerInfo &&  footerData.footerInfo.payments.map((cardObj, ind) =>

                        <div key={ind} className={styles.paymenyCardHolder}>
                            {/* {console.log(cardObj.iconPath , "<<<<<<<,,,cardObj")} */}
                            <Image
                                src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/payment-icons/" +cardObj.iconPath +"?v=" + footerData.version}
                                alt={cardObj.name}
                                alt="Casino games Logo"
                                layout="fill"
                            />
                        </div>

                    )}
                </div>

                <div className={styles.logoWraper}>
                    <div className={styles.FlogoHolder} onClick={() => router.push("/")}>
                        <Image
                            src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=" + footerData.version}
                            quality={100}
                            alt="Casino games Logo"
                            layout="fill"
                        />
                    </div>
                    <span>Copyright © 2021 <a>Company</a>  | All Rights Reserved.</span>
                </div> 
            </div>

        </section>
    );
}
export default Footer;


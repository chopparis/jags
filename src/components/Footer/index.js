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
        <section className={styles.footerContainer}>
            <div className={styles.footer}>
                <div className={`${styles.container} ${styles.footer_inner}  `}>
                    <div className={styles.row}>
                        <div className={styles.text_lable_container}>
                            <div className={styles.footerMenuHolder}>
                                <ul>
                                    {footerData && footerData.footerInfo && footerData.footerInfo.FooteMenuItems.map((obj, indx) =>
                                        <li key={indx}>
                                            <a>{t(obj.name.replace(/\s/g, "").toLowerCase())}</a>
                                        </li>
                                    )}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className={styles.row_block}>
                        <div className={styles.img_container}>
                            {footerData && footerData.footerInfo && footerData.footerInfo.payments.map((cardObj, ind) =>

                                <div key={ind} className={styles.paymenyCardHolder}>
                                    <Image
                                        //   src={"/images/payment-icons/" + cardObj.iconPath }
                                        src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/payment-icons/" + cardObj.iconPath + "?v=" + footerData.version}
                                        alt={cardObj.name}
                                        alt="Casino games Logo"
                                        layout="fill"
                                    />
                                </div>

                            )}
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={`${styles.row_block} ${styles.footer_content_logo}  `}>
                            <div className={styles.inner_container}>
                                <p>By accessing, continuing to use, or navigating through this site you have accepted our use of certain browser cookies to improve the experience which you receive with us. Please refer to our Privacy Policy for further information on the types of cookies we use. GalaCasino is operated by LC International Limited who are licensed and regulated in Great Britain by the Gambling Commission</p>

                                <div className={styles.logoWraper}>
                                    <div className={styles.FlogoHolder} onClick={() => router.push("/")}>
                                        <Image
                                            src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=" + footerData.version}
                                            quality={100}
                                            alt="Casino games Logo"
                                            layout="fill"
                                        />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={`${styles.row} ${styles.footer_bottom}  `}>
                            <div className={styles.social_icon_block}>
                                <div className={styles.test_socialIcons}>


                                    <TwitterIcon className={styles.twiter_icon} fontSize="inherit" />
                                    <FacebookIcon className={styles.fb_icon} fontSize="inherit" />
                                    <InstagramIcon className={styles.insta_icon} fontSize="inherit" />
                                </div>
                            </div>
                            <div className={`${styles.copy_rights_block} ${styles.desktop_view}  `}>
                                <span className={styles.copy_lable}><strong>Copyright</strong></span>
                                {/* <img className={styles.ellipse} src={ellipse} /> */}
                                <span className={styles.copy_rights_year}><strong> 2021 VegasSoftware</strong></span>
                                <span>| All Rights Reserved</span>
                            </div>
                            <div className={`${styles.copy_rights_block} ${styles.mobile_view}  `}>
                                <div className={styles.copy_lable}><strong>Copyright</strong></div>
                                <div>
                                    {/* <img className={styles.ellipse} src={ellipse} /> */}
                                    <span className={styles.copy_rights_year}><strong> 2021 VegasSoftware</strong></span></div>
                                <span>| All Rights Reserved</span>
                            </div>
                            <div className={styles.orc_block}>
                                <span className={styles.footer_badge}><strong>18*</strong></span>
                                <span><strong>BeGambleAware</strong>.org</span>
                            </div>

                        </div>
                    </div>


                </div>

            </div>

        </section>
    );
}
export default Footer;
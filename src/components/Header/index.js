import React, { useState, useEffect } from 'react';
import Badge from '@material-ui/core/Badge';
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux"
import * as gtag from '../../../lib/gtag';
import Image from 'next/image';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import NewSideNav from '../NewSideNav';
import GlobalSearch from '../GlobalSearch';
import Notifications from '../Notifications';
import BalanceWindow from '../Balance/BalanceWindow';
import request from "../../../utils/request";
import NotificationsIcon from '@material-ui/icons/Notifications';
import styles from './style.module.scss';
import useTranslation from 'next-translate/useTranslation';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import { getRegistrationInfo } from '../../../pages/api/userValidations/getRegistrationInfo';
import Login from '../Login';
import dynamic from 'next/dynamic';
import PubSub from 'pubsub-js';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';


// import FacebookLogin from 'react-facebook-login';
// import FacebookIcon from '@material-ui/icons/Facebook';



const Header = (props) => {
    const router = useRouter();
    const { t, lang } = useTranslation('common');
    const [showLogin, setLoginBtn] = useState(false);
    const [sessionDetails, setSession] = useState({});
    const [balance, setBalance] = useState({});
    const [isWindow, setBalWind] = useState(false);
    const [regiInfo, setRegInfo] = useState({});

    const [isSideMenu, toggleSideMenu] = useState(false);

    // const Login = dynamic(() => import('../Login/'));
    const ForgotPSW = dynamic(() => import('../ForgotPSW'))
    const ResetPswd = dynamic(() => import('../ResetPswd'));
    const StatusMsg = dynamic(() => import('../StatusMsg'));
    const RegistrationNew = dynamic(() => import('../RegistrationNew/FormHolder'));


    const onLoginSucsses = (msg, data) => {
        setLoginBtn(false);
        upDateBalance();
    }

    const onLogOut = () => {
        onUserLogout();
    }

    useEffect(async () => {
        PubSub.subscribe('OpenLoginSucsses', onLoginSucsses);
        PubSub.subscribe('SideMEnuLogOut', onLogOut);
        await getSessionDetails();
        // const res = await getRegistrationInfo();

        //const resNew = await request(`../../../api/userValidations/getRegistrationInfo`, {});
        // console.log(resNew , "______----resNew");
        //  console.log(regConfigObj , "______----res")

        //   setRegInfo(regConfigObj);

        // console.log(props.appConfigObj.version , "______version")

    }, []);

    

    useEffect(async () => {
        upDateBalance();
    }, [router.query]);


    useEffect(async () => {
        //  console.log(props.regConfigObj , "______----res")
        setRegInfo(props.regConfigObj);
    }, [props.regConfigObj]);


    useEffect(async () => {
        await getSessionDetails();
    }, [showLogin]);


    const OpenNotificstionPage = () => {
        // router.push("/promotions");
    }

    const responseFacebook = (res) => {
        console.log("FB___>", res);
    }


    const onUserLogin = () => {
        // gtag.event({
        //     action: "openGameWindow",
        //     category: "slots",
        //     label: "Play CLOE",
        //     value: "332211"
        // }
        // )
        // dispatch(openModelWindow(true));
        // console.log("Login-Clicked!!!!!")
        PubSub.publish('OpenLoginWndow', "");
    }
    const onUserSignUp = () => {
        PubSub.publish('OpenSignUpWndow', "");
    }

    const onOpenGlobalSearch = () => {
        PubSub.publish('OpenSearchWindow', "");
    }

    const onUserLogout = async () => {

        //  let obj = { params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, "session_id": localStorage && localStorage.tocken } }
        //let s_id = Cookies.get('tocken');
        // let obj = { params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, "session_id": s_id } }

        const res = await request(`../../../api/userValidations/logout`, {});
        if (res.error) { return }
        if (res.error != undefined && res.error.code == 5005) {
            //setValidLogin(false)
            //   dispatch(updateUserLogin(false));
        } else {
            //Logout secussesfull
            Cookies.set('tocken', '');
            // localStorage && localStorage.setItem("tocken", "");
            PubSub.publish("LogOutSuccsess", "")
            // dispatch(updateUserLogin(false));
            setLoginBtn(true)
        }
    }


    const upDateBalance = async () => {
        // let obj = { "jsonrpc": "2.0", "id": 0, method: "get_balance", params: { "session_id": localStorage && localStorage.tocken } }
        // const userBalance = await request(`../../../api/balance/getBalance`, obj);
        // let s_id = Cookies.get('tocken');
        //   let obj = { params: { "session_id": localStorage && localStorage.tocken } }
        //let obj = { params: { "session_id": s_id } }
        const res = await request(`../../../api/balance/Binfo`, {})
        // console.log(res , "_____BBBB___-res.statusres.statusres.status")
        // console.log(resCMD , "__resCMD______-res.statusres.statusres.status")

        if (res.error) { return }
        if (res && res.result) {
            // show Balance
            setBalance(res.result)
        } else {
            // error
            return
        }
    }

    const getSessionDetails = async () => {

        const res = await request(`../../../api/session/details`, {});
        if (res.error) {
            setLoginBtn(true);
            Cookies.set('tocken', '');
            // localStorage && localStorage.setItem("tocken", "");
            return
        }
        if (res.result && res.result.session_id) {
            setSession(res.result);
            setLoginBtn(false);
            upDateBalance();
        } else {
            setLoginBtn(true);
        }
    }

    const onOPenBalance = () => {
        // PubSub.publish('OpenLogBalanceWindow', props.balance);
        setBalWind(true);
    }
    const windowClosed = () => {
        setBalWind(false);
    }
    const getFormatedBalance = (type) => {
        let currency_code = balance.currency ? balance.currency : "";
        let cash_val = balance.cash ? balance.cash : "0.00";
        let bonus_val = balance.cash ? balance.bonus : "0.00";

        if (type == "cash") {
            return (currency_code + " " + cash_val)
        } else if (type == "bonus") {
            return (currency_code + " " + bonus_val)
        }

    }

    const onOpenSideMenu = () => {
        // console.log("____>open side menu")
        toggleSideMenu(true);
    }
    const sideMenuClosed = () => {
        toggleSideMenu(false);
    }

    return (
        <section className={styles.headerHolder}>
            <GlobalSearch versionNum={props.appConfigObj.version} />
            <Login />
            <ForgotPSW />
            <ResetPswd />
            <StatusMsg />
            <RegistrationNew data={regiInfo} versionNum={props.appConfigObj.version} />
            {/* <Notifications /> */}
            <div className={styles.logoHolder} onClick={() => router.push("/")}>
                <Image
                    src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg" + "?v=" + props.appConfigObj.version}
                    quality={100}
                    layout="fill"
                    alt="Casino games Logo"
                />


            </div>



            {showLogin ? <div className={styles.loginSection}>
                <div className={`${styles.loginBtnsWaraper} ${showLogin ? styles.showLogins : styles.hideLogins}`}>
                    <div className={`${styles.signupBtn} ${showLogin ? styles.showLogins : styles.hideLogins}`} onClick={onUserSignUp}><span>{'SIGN UP'}</span></div>
                    <div className={`${styles.loginBtn} ${showLogin ? styles.showLogins : styles.hideLogins}`} onClick={onUserLogin}><span>{'LOGIN'}</span></div>
                </div>

            </div> :

                <div className={styles.after_loginSection}>



                    <div className={`${styles.defualtBalDispaly} ${!showLogin ? styles.hideBalance : styles.defualtBalDispaly}`}>

                        <div className={styles.new_myaccount_container}>
                            <div className={styles.new_myaccount_name}>
                                <span>{'MY ACCOUNT'}</span>
                                <span className={styles.new_myaccount_name_value}>{sessionDetails && sessionDetails.first_name}</span>
                            </div>
                            <div className={styles.new_myaccount_balance}>
                                <span>{'BALANCE'}</span>
                                <span className={styles.new_myaccount_name_value}>{getFormatedBalance('cash')}</span>
                            </div>
                            <div className={styles.new_myaccount_balance}>
                                <span>{'BONUS BALANCE'}</span>
                                <span className={styles.new_myaccount_name_value}>{getFormatedBalance('bonus')}</span>
                            </div>

                            <div className={styles.new_myaccount_depositBtn}>
                                <span>{'DEPOSIT'}</span>

                            </div>
                            <div onClick={OpenNotificstionPage} className={styles.bellIcon}><Badge ><NotificationsIcon fontSize='inherit' /><Badge color="secondary" badgeContent={17} fontSize='inherit' /></Badge></div>

                        </div>

                    </div>

                </div>}


            <div className={styles.navSection}>
                <div>
                    <span onClick={onOpenSideMenu} className={styles.toggleMenu}>&#9776;</span>
                    <NewSideNav isShow={isSideMenu} sideMenuClosed={sideMenuClosed} versionNum={props.appConfigObj.version} />

                </div>
                <div onClick={onOpenGlobalSearch} className={styles.searchHolder}><SearchSharpIcon fontSize="inherit" /></div>


            </div>

            <div className={styles.mLoginWraper}>
                {showLogin ? <div className={styles.mSignUpBtn} onClick={onUserSignUp}><span>{t("joinnow")}</span></div> : ""}
                {showLogin ? <div className={styles.mLoginBtn} onClick={onUserLogin}><span>{t("login")}</span></div> : ""}

            </div> 

        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        // menuObj: state.StaticDataReducer.menuObj,
        appConfigObj: state.StaticDataReducer.appConfigObj,
        regConfigObj: state.StaticDataReducer.regConfigObj
        // playerInfo: state.StaticDataReducer.playerInfo
    };
};

export default connect(mapStateToProps)(React.memo(Header))



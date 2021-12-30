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
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';


// import FacebookLogin from 'react-facebook-login';
// import FacebookIcon from '@material-ui/icons/Facebook';



const Header = (props) => {
    const router = useRouter();
    const { t, lang } = useTranslation('common');
    const [showLogin, setLoginBtn] = useState(false);
    // const [sessionDetails, setSession] = useState({});
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
        //console.log("_____________Logn")
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
            //   setSession(res.result);
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
    const getFormatedBalance = () => {
        let currency_code = balance.currency ? balance.currency : "";
        let cash_val = balance.cash ? balance.cash : "0.00";
        return (currency_code + " " + cash_val)
    }

    const onOpenSideMenu = () => {
         console.log("____>open side menu")
        toggleSideMenu(true);
    }
    const sideMenuClosed = () => {
        toggleSideMenu(false);
    }

    return (
        <section className={styles.headerHolder}>
             <div>
                    {/* <span onClick={onOpenSideMenu} className={styles.toggleMenu}>&#9776;</span> */}
                    <NewSideNav isShow={isSideMenu} sideMenuClosed={sideMenuClosed} versionNum={props.appConfigObj.version} />
                    <GlobalSearch versionNum={props.appConfigObj.version} />
                    <Login />
                    <ForgotPSW />
                    <ResetPswd />
                    <StatusMsg />
                    <RegistrationNew data={regiInfo} versionNum={props.appConfigObj.version} />
                    {/* <Notifications /> */}
                </div>

            <header>
                <div className={styles.headerContaner}>
                    <div className={styles.menu_search}>
                        <span onClick={onOpenSideMenu} className={styles.toggleMenu}>&#9776;</span>
                        <span onClick={onOpenSideMenu} className={styles.toggleMenu}><FontAwesomeIcon icon={faSearch}  /></span>
                    </div>
                    <div className={styles.Header_logo}>
                        <Image
                            src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/logo.svg"}
                            quality={100}
                            alt="Casino games Logo"
                            layout="fill"
                        />
                    </div>
                    <div className={styles.sgnup_login_container}>
                        <button className={styles.signup} onClick={onUserSignUp}>SIGN UP</button>
                        <button className={styles.login} onClick={onUserLogin}>LOGIN</button>
                    </div>
                    {/* <div className={styles.btn_container}>
                        <div className={styles.item}>  <span className={styles.lable}>MY ACCOUNT</span> <span className={styles.value_name}>JOHNSMITH</span></div>
                        <div className={styles.item}>  <span className={styles.lable}>BALANCE: </span> <span className={styles.value}>$0.00</span></div>
                        <div className={styles.item_bonus}>  <span className={styles.lable}>BONUS BALANCE:</span> <span className={styles.value}>$0.00</span></div>
                        <button className={styles.deposit}>DEPOSIT</button>
                        <div className={styles.notifications}>
                            <span><FontAwesomeIcon icon={faBell}  /> <span className={styles.count}>86</span></span>
                        </div>
                    </div> */}

                </div>
            </header>
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



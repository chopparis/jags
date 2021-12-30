import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { updatePlayerDetails } from '../../../redux/actions/config';
import { useFormik } from "formik" // new
import PubSub from 'pubsub-js';
import request from "../../../utils/request";
import ErrorHandling from "../../..//utils/utility";
import Container from '@material-ui/core/Container';
import styles from './style.module.scss'
import globalStyles from '../../../styles/Global.module.scss'
import LinearProgress from '@material-ui/core/LinearProgress';
import _ from "lodash";
import useTranslation from 'next-translate/useTranslation';
import Cookies from 'js-cookie';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

export default function LoginForm(props) {
    const { t, lang } = useTranslation('common');
    const router = useRouter();
    const [isValidlogin, setValidLogin] = useState(false);
    const [isFormDisable, setFormMode] = useState(false);
    const [isOPen, setOverlay] = useState(false);
    const [responsiveWidth, setResponsiveWidth] = useState("sm");

    const dispatch = useDispatch();
    useEffect(() => {
        setOverlay(props.openWind);
    }, [props.openWind]);

    useEffect(() => {



         PubSub.subscribe('OpenLoginWndow', onLogin);
        // PubSub.subscribe("clickedOutSide", onOutSideClicked);

        if (isMobile) {
            setResponsiveWidth("xs")
        } else {
            setResponsiveWidth("sm")
        }

        return () => {
            PubSub.unsubscribe('OpenLoginWndow');
          //  PubSub.unsubscribe("clickedOutSide");
        };

    }, []);

    useEffect(() => {
        let defualtOpenWindow = router.query.id ? router.query.id : "";
        //console.log(defualtOpenWindow , "_-<<<<<<<<<<<<defualtOpenWindow")
       // http://localhost:3000/?id=signup
        if( defualtOpenWindow == "login"){
            onLogin();
        }

    }, [router.query.id]);


    const onLogin = (msg, data) => {

        let localStoreObj = {}
        if (localStorage) {

            formik.values.userName = localStorage.getItem("userName");
            formik.values.passWord = localStorage.getItem("passWord");

            //    console.log(formik.values.userName , "_____username")

            if (localStorage.getItem("rememberMe") == "false") {
                formik.values.rememberMe = false;
            } else if (localStorage.getItem("rememberMe") == "true") {
                formik.values.rememberMe = true;
            } else {
                formik.values.rememberMe = false;
            }
        }else{
            formik.values.userName = "";
            formik.values.passWord = "";
        }

        setOverlay(true);
        // setWindow();
        setFormMode(false)
    }

    // const onOutSideClicked = (msg, data) => {
    //     if (data.includes("-avoid")) {
    //         resetWindow();
    //     }
    // }
const closeWindow =(e) => {
    // console.log(e.target.id,"<<clicked..ifr.!!" ,e.currentTarget.id, "<<<<<<<<<<<")
    if(e.target.id == "loginWraper-avoid"){
        resetWindow();
    }
 //
}

    const onJoinNow = () => {
        PubSub.publish('OpenSignUpWndow', "");
        resetWindow();

    }
    const chcktestng = () => {
        console.og("fdsfdsg")
    }
    const formik = useFormik({


        initialValues: {
            // ...RememberObj
            userName: "",
            passWord: "",
            rememberMe: false
        },

        validate(values) {
            //  console.log(values, "___________checkng..")
            //  setChecked(!values.rememberMe)
            //values.rememberMe = !values.rememberMe;
            const errors = {}
            if (!values.userName) {
                errors.userName = t("username_required");
            } else {
                // console.log("yes");
                //  testFun()
            }

            if (!values.passWord) {
                errors.passWord = t("psw_required");
            }

            // if (!values.email) {
            //     errors.email = "Email field is required!"
            // } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            // ) {
            //     errors.email = "Email must be valid!"
            // }

            // More validations here

            return errors
        },
        onSubmit(values) {
            console.log(values)
            setFormMode(true);
            setTimeout(async () => {
                //  setSubmitting(false);
                let obj = {
                    // "jsonrpc": "2.0", "id": 0, method: "login",
                    params: {
                        username: values.userName,
                        password: values.passWord,
                        site_code: process.env.NEXT_PUBLIC_SITE_CODE,
                        api_key :   process.env.NEXT_PUBLIC_API_KEY,
                    }
                }
                //  const res = await request(`/api/sendLogin?_u=` + values.userName + "&_p=" + values.passWord , obj)
                const res = await request(`/api/validation`, obj)

                // const res = await fetch(`/api/sendLogin?_u=` + values.userName + "&_p=" + values.passWord , obj)
                // res = await res.json();
                //  console.log(res.status, "____VV")
                //if (res.status == 500) {
                //  router.push('/success?s=se')
                //}


                if (res.error != undefined && res.error) {
                    //InvalidCredentials
                    let errType = ErrorHandling(res.error.code);
                    if (errType.code == 5005) {
                        setValidLogin(true)
                        setFormMode(false);
                    }



                } else if (res.result) {
                    dispatch(updatePlayerDetails(res.result))
                    if (localStorage) {
                        //   console.log(values.rememberMe, "____VV");
                        Cookies.set('tocken', res.result.session_id , { expires: 365 });
                        // localStorage.setItem("tocken", res.result.session_id);
                       
                        if (values.checkbox) {
                            localStorage.setItem("userName", values.userName);
                            localStorage.setItem("passWord", values.passWord);
                            localStorage.setItem("rememberMe", true);
                        } else {
                            localStorage.setItem("userName", "");
                            localStorage.setItem("passWord", "");
                            localStorage.setItem("rememberMe", false);
                        }
                    }
                    PubSub.publish('OpenLoginSucsses', "");
                    //setOverlay(false);
                    resetWindow();
                }


                // const res = await fetch(`/api/registration`,
                // 	{
                // 		method: 'POST',
                // 		headers: { "Content-Type": "application/json" },
                // 		body: JSON.stringify(sendObj)
                // 	}
                // )
                //	const json = await res.json()
                //   if (res.error != undefined && res.error && res.error.code) {
                //  } else if (res.result) {
                //router.push('/success?s=r')
                // setSubmitting(false);
                // }
            }, 1000);
        },
    })

    const forGotPsw = () => {
        resetWindow();
        PubSub.publish('OpenForgotPWdWindow', "");

    }
    const onClose = () => {
        // dispatch(closeModelWindow(false));
        //   PubSub.publish('CloseLoginWndow', 'hello world!');
        resetWindow();
    }


    const resetWindow = () => {
        setOverlay(false);
        setFormMode(false)
        setValidLogin(false)

        // console.log(formik.values.rememberMe , "___<values.checkbox" , formik.values.checkbox)
        if (formik.values.checkbox == false || formik.values.rememberMe == false || formik.values.rememberMe == "false") {
            formik.values.userName = "";
            formik.values.passWord = "";
        }

        formik.errors.userName = "";
        formik.errors.passWord = "";
    }

    // ...

    return (

        <div id="loginWraper-avoid" className={isOPen ? globalStyles.overlay : globalStyles.unSetOverlay} onClick={closeWindow}>

            <Container component="main" maxWidth={responsiveWidth} >


                <div className={styles.loginWindow}>


                    <div className={styles.headtitle}>
                        <div className={styles.titleTxt}><span>{t('login')}</span>

                        </div>
                        <div onClick={onClose} className={globalStyles.closeBtn}><span>X</span></div>
                    </div>
                    {isFormDisable ? <LinearProgress className={styles.pBar} color="primary" /> : ""}
                    <form className={`${styles.formHolder} ${isFormDisable ? styles.disableForm : styles.enableForm}  `} onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="userName"
                            placeholder={t('enter_username')}
                            className={formik.errors.userName ? "errorText" : null}
                            onChange={formik.handleChange}
                            value={formik.values.userName ? formik.values.userName : ""}
                        />

                        {formik.errors.userName ? (
                            <span className={styles.errorText}>{formik.errors.userName}</span>
                        ) : null}

                        <br />


                        <input
                            type="password"
                            name="passWord"
                            placeholder={t('enter_password')}
                            className={formik.errors.passWord ? "errorText" : null}
                            onChange={formik.handleChange}
                            value={formik.values.passWord ? formik.values.passWord : ""}
                        />

                        {formik.errors.passWord ? (
                            <span className={styles.errorText}>{formik.errors.passWord}</span>
                        ) : null}

                        <br />

                        <div className={styles.checkBoxHolder}>

                            <div className={styles.checkBoxLable}><input className={styles.largerCheckbox} onChange={formik.handleChange} id="rememberMe" type="checkbox" name="checkbox" value={formik.values.rememberMe} defaultChecked={formik.values.rememberMe} />
                                <label>{t("rememberme")}</label></div>
                            <div onClick={forGotPsw}><a>{t("for_got_psw")}</a></div>
                        </div>
                        <br />
                        {isValidlogin ? <span className={styles.errorText}>{t("invalid_login")}</span> : ""} <br />

                        <button type="submit">{t("login")}</button> <br />
                        <button type="button" onClick={onJoinNow}>{t("create_account")}</button>

                    </form>


                </div>
            </Container>

        </div>
    )
}

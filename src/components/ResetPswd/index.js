import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import request from "../../../utils/request";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp';
// import StatusPage from './StatusPage';
import styles from './style.module.scss';
import globalStyles from '../../../styles/Global.module.scss';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

const ResetPswd = (props) => {
    const router = useRouter();
    //const restrictedKeyList = [32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 58, 60, 62, 63, 64, 94, 123, 125, 126];


    const [isShow, setShowPassWord] = useState("");
    const [isShowCpsw, setShowCPassWord] = useState("");
    const [isFormDisable, setFormMode] = useState(false);
    const [passWord, setPassWord] = useState("");
    const [cpassword, setcPassWord] = useState("");
    const [isOPen, setOverlay] = useState(false);
    const [isShowSuc, setSecMsg] = useState(false);

    const [passWordError, setPassWordError] = useState({ error: "", valid: false });
    const [cpasswordError, setcPassWordError] = useState({ error: "", valid: false });

    const [responsiveWidth, setResponsiveWidth] = useState("sm");


    const pswRequired = "Password required";

    const cpswRequired = "Confirm password required";
    const cpswError = "Should match with password";


    if (router.query && router.query.id != undefined) {
        //  queryParam = router.query.id;
    }

    const onClose = () => {
        setOverlay(false)
    }
    const onResetWindowOpen = () => {
        setOverlay(true)
    }

    useEffect(() => {
        let defualtOpenWindow = router.query.id ? router.query.id : "";
        //console.log(defualtOpenWindow , "_-<<<<<<<<<<<<defualtOpenWindow")
        if (defualtOpenWindow == "resetpswd") {
            onResetWindowOpen();
        }

    }, [router.query.id]);

    useEffect(() => {
        //  console.log(isMobile , ")____isMobileisMobileisMobile")
        if(isMobile){
          setResponsiveWidth("xs")
        }else{
          setResponsiveWidth("sm")
        }
      }, []);


    const onPassWord = (e) => {
        setPassWord(e.target.value);
    }
    const onPassWordBlur = (e) => {
        validatePassWord(passWord);
        validateConfirmPassWord()
    }


    const validatePassWord = () => {
        if (passWord.length <= 0) {
            setPassWordError({ error: pswRequired, valid: false });
            return;
        } else {
            setPassWordError({ error: "", valid: true });
        }
    }

    const validateConfirmPassWord = () => {
        if (cpassword.length <= 0) {
            setcPassWordError({ error: cpswRequired, valid: false });
            return;
        }
        if (cpassword != passWord) {
            setcPassWordError({ error: cpswError, valid: false })
        } else {
            setcPassWordError({ error: "", valid: true })
        }
    }

    const onConfirmPassWord = (e) => {
        setcPassWord(e.target.value);
    }
    const onCPassWordBlur = () => { validateConfirmPassWord(); }

    const onPswEyeClick = () => {
        //  console.log(isShow , "__sdsdd_")
        setShowPassWord(!isShow)
    }

    const onCPswEyeClick = () => {
        setShowCPassWord(!isShowCpsw)
    }

    const onSubmit = async () => {
        setFormMode(true);
        validatePassWord();
        validateConfirmPassWord();

        if (passWordError.valid && cpasswordError.valid) {
            let obj = {
                "jsonrpc": "2.0", "id": 0, method: "registration",
                params: {
                    password: passWord,
                    site_code: process.env.NEXT_PUBLIC_SITE_CODE,
                }
            }
            const res = await request(`/api/resetPassword`, obj)
            if (res.error != undefined && res.error && res.error.code) {

                setFormMode(false);
                //  setSecMsg(true)
            } else if (res.result) {
                setSecMsg(true)

            }


        }

    }

    return (
        <div className={isOPen ? globalStyles.overlay : globalStyles.unSetOverlay}>

<Container component="main" maxWidth= { responsiveWidth} >

                <div className={styles.rsetPswWraper}>
                    <div className={styles.titleHead}>
                        <div className={styles.title}><span>RESET PASSWORD</span></div>

                        <div className={styles.closeBtn} onClick={onClose}><span>X</span></div>

                    </div>
                    <div className={`${styles.resetPswHolder} ${isFormDisable ? styles.disableForm : styles.enableForm}  `}>
                        {isFormDisable ? <LinearProgress className={styles.pBar} color="primary" /> : ""}
                        <div className={styles.pswHolder}>
                            <span>{passWordError.error}    </span> <div>

                                <input onKeyPress={(data) => {

                                    if (data.charCode === 32) {
                                        //    console.log("Space touched")
                                        data.preventDefault();
                                        return false;
                                    }
                                }} placeholder="* Password" type={isShow ? "text" : "password"} value={passWord} onChange={onPassWord} onBlur={onPassWordBlur} />     <span className={styles.eyeIcon} onClick={onPswEyeClick}>{isShow ? <VisibilityIcon /> : <VisibilityOffSharpIcon />}</span>  </div>
                        </div>

                        <div className={styles.pswHolder}>
                            <span>{cpasswordError.error} </span><div><input onKeyPress={(data) => {

                                if (data.charCode === 32) {
                                    //    console.log("Space touched")
                                    data.preventDefault();
                                    return false;
                                }
                            }} placeholder="* Confirm password " type={isShowCpsw ? "text" : "password"} value={cpassword} onChange={onConfirmPassWord} onBlur={onCPassWordBlur} /><span className={styles.eyeIcon} onClick={onCPswEyeClick}>{isShowCpsw ? <VisibilityIcon /> : <VisibilityOffSharpIcon />}</span></div></div>


                        <button type="button" onClick={onSubmit}>SUBMIT</button>

                    </div>
                    {/* {isShowSuc ?  <div>Sucsses login</div> : "" } */}
                </div></Container></div>
    )
}
export default ResetPswd;
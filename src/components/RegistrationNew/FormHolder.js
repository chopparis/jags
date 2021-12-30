import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import LinearProgress from '@material-ui/core/LinearProgress';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree'
import Container from '@material-ui/core/Container';
import styles from './style.module.scss';
import request from "../../../utils/request";
import PubSub, { publish } from 'pubsub-js';
// import { getRegistrationInfo } from '../../../pages/api/userValidations/getRegistrationInfo';
import globalStyles from '../../../styles/Global.module.scss';
import useTranslation from 'next-translate/useTranslation';
import Cookies from 'js-cookie';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

const FormHolder = (props) => {
    const { t, lang } = useTranslation('common');
    const router = useRouter();
    const [pageObj, setPagenation] = useState({ pageCount: 1, statusObj: {} ,activePage:""});
    // const [statusObj, setStausObj] = useState({});

    const [pageOne, setPageOne] = useState(true);
    const [pageTwo, setPageTwo] = useState(false);
    const [pageThree, setPageThree] = useState(false);
    const [isFormDisable, setFormMode] = useState(false);

    const [isOPen, setOverlay] = useState(false);
    //const [isShowSuc, setSecMsg] = useState(false);

    const [responsiveWidth, setResponsiveWidth] = useState("sm");

    const [regiInfo, setRegInfo] = useState({});

    if (router.query && router.query.id != undefined) {
      //  queryParam = router.query.id;
    }

    // const data = props.data;
    // data.countriesList, data.securityQuestions, data.citizenShip, data.currencyList

    const onpagination = data => (e) => {
    }

    const onClose = () => {
        resetWindow();
    }
    const onSgnUpOpen =()=>{
        setOverlay(true)
    }

    
    const onOutSideRegiClicked = (msg, data) => {
        if (data.includes("-avoid")) {
            resetWindow();
        }
    }



    const updatePageStatus = (obj, pageCount , activePage) => {

        setPagenation(
            { pageCount: pageCount, statusObj: { ...obj, ...pageObj.statusObj } , activePage : activePage }
        )
    }

    // const gotoLogin =()=>{
        
    //      setSecMsg(false)
    //      setOverlay(false);
    //      PubSub.publish('OpenLoginWndow', "");
    // }

    // useEffect(async () => {
       
    //     const regInfo = await getRegistrationInfo();
    //     setRegInfo(regInfo);
    //   }, []);

    useEffect(() => {
      if(isOPen){
        setPagenation({ pageCount: 1, statusObj: {} ,activePage:""});
      }

    }, [isOPen]);

    useEffect(() => {
        let defualtOpenWindow = router.query.id ? router.query.id : "";
        //console.log(defualtOpenWindow , "_-<<<<<<<<<<<<defualtOpenWindow")
       // http://localhost:3000/?id=signup
        if( defualtOpenWindow == "signup"){
            onSgnUpOpen();
        }

    }, [router.query.id]);
    

    useEffect(async () => {
        if(pageObj.activePage == "final"){
            setFormMode(true);
            await validateRegistration();
        }
       
    }, [pageObj.activePage]);
    
    useEffect(() => {
        if (pageObj.pageCount == 1) {
            setPageOne(true)
            setPageTwo(false)
            setPageThree(false)
        }
        if (pageObj.pageCount == 2) {
            setPageOne(true)
            setPageTwo(true)
            setPageThree(false)
        }
        if (pageObj.pageCount == 3) {
            setPageThree(true)
            setPageOne(true)
            setPageTwo(true)
        }


    }, [pageObj]);

    useEffect(() => {
        PubSub.subscribe('OpenSignUpWndow', onSgnUpOpen);
        PubSub.subscribe("clickedOutSide", onOutSideRegiClicked);
      //  console.log(isMobile , ")____isMobileisMobileisMobile")
      if(isMobile){
        setResponsiveWidth("xs")
      }else{
        setResponsiveWidth("sm")
      }

      return () => {
        PubSub.unsubscribe('OpenSignUpWndow');
        PubSub.unsubscribe("clickedOutSide");
      };
    }, []);

const resetWindow =()=>{
    setFormMode(false)
    setOverlay(false)
}

const validateRegistration = async () => {
    // for (let k in pageObj.statusObj) {
    //     console.log(`${k}: ${pageObj.statusObj[k]}`);
    //   }
    
    // let obj = {
    //     ...pageObj.statusObj,
    //      site_code: process.env.NEXT_PUBLIC_SITE_CODE,
    // }
        let obj = {
            //  "jsonrpc": "2.0", 
            //  "id": 0, 
            //  method: "registration",
            params: {
                ...pageObj.statusObj,
                 site_code: process.env.NEXT_PUBLIC_SITE_CODE,
            }
        }

        const res = await request(`/api/signup`, obj)
        if (res.error != undefined && res.error && res.error.code) {
            PubSub.publish("OpenStatusWindow" , "Error");
            resetWindow()
        } else if (res.result) {
           
            // resetWindow();
            pushUserLogin();
        }
}
 
const pushUserLogin =async()=>{
   //console.log(pageObj.statusObj.password , "________--pageObj.statusObj");
        let obj = {
            params: {
                username:pageObj.statusObj.username,
                password: pageObj.statusObj.password,
                site_code: process.env.NEXT_PUBLIC_SITE_CODE,
                api_key :   process.env.NEXT_PUBLIC_API_KEY,
            }
        }
        const res = await request(`/api/validation`, obj)
        if (res.error != undefined && res.error) {
            //InvalidCredentials
            //let errType = ErrorHandling(res.error.code);
           // if (errType.code == 5005) {
                // setValidLogin(true)
                // setFormMode(false);
           // }
        } else if (res.result) {
            Cookies.set('tocken', res.result.session_id , { expires: 365 });
          //  resetWindow();
         //   dispatch(updatePlayerDetails(res.result))
            // if (localStorage) {
            //     localStorage.setItem("tocken", res.result.session_id);
            //     if (values.checkbox) {
            //         localStorage.setItem("userName", values.userName);
            //         localStorage.setItem("passWord", values.passWord);
            //     } else {
            //         localStorage.setItem("userName", "");
            //         localStorage.setItem("passWord", "");
            //     }
            // }
          //  PubSub.publish('OpenLoginSucsses', "");
            PubSub.publish("OpenStatusWindow" , "Your Registration processes has been succesfully completed ");
            resetWindow();
           
        }
}


    return (
        <div id="signup-avoid" className={isOPen ? globalStyles.overlay : globalStyles.unSetOverlay}>
            {/* { console.log(isMobile , "_______--isMobile") }  */}
             <Container component="main" maxWidth= { responsiveWidth} >

                 
        <div  className={`${styles.fHolder} ${isFormDisable ? styles.disableForm : styles.enableForm}  `}>
          
            <div className={styles.titleHead}>
                
                <div className={styles.stepper}>
                <div className={styles.title}><span>{t("signup")}</span></div>
                    <div className={styles.stepH}>
                        {/* <div  className={`${styles.steps} ${pageOne ? styles.setBgColor : styles.unsetBgColor}  `}> */}
                        <div className={`${styles.steps} ${pageOne ? styles.setBgColor : styles.unsetBgColor}  `} onClick={onpagination(1)}><span>1</span></div>
                        {/* <div className={styles.steps} onClick={onpagination(1)}><span>1</span></div> */}
                        <div className={`${styles.steps} ${pageTwo ? styles.setBgColor : styles.unsetBgColor}  `} onClick={onpagination(2)}><span>2</span></div>
                        <div className={`${styles.steps} ${pageThree ? styles.setBgColor : styles.unsetBgColor}  `} onClick={onpagination(3)}><span>3</span></div>
                    </div>
                   
                </div>
                <div className={globalStyles.closeBtn} onClick={onClose}><span>X</span></div>
            </div>
            { isFormDisable ?  <LinearProgress className={styles.pBar} color="primary" /> : "" }
            <div>
                {/* <StepOne qList={props.data.securityQuestions}></StepOne> */}
                {/* <StepTwo cShip={props.data.citizenShip} cList={props.data.currencyList}></StepTwo> */}
                {/* {console.log(pageObj , "_________---pageObj")} */}
                {/* {pageObj.pageCount == 1 ?<StepOne qList={props.data.securityQuestions} updatePageStatus={updatePageStatus}></StepOne> : "" }
               {pageObj.pageCount == 2 ?<StepTwo cShip={props.data.citizenShip} cList={props.data.currencyList} updatePageStatus={updatePageStatus}></StepTwo> : "" }
               {pageObj.pageCount == 3 ?<StepThree cList={props.data.countriesList} updatePageStatus={updatePageStatus}></StepThree> : "" } */}


                <div className={pageObj.pageCount == 1 ? styles.showPage : styles.hidepage}><StepOne qList={props.data.securityQuestions} updatePageStatus={updatePageStatus} versionNum={props.versionNum}></StepOne></div>
                <div className={pageObj.pageCount == 2 ? styles.showPage : styles.hidepage}><StepTwo cShip={props.data.citizenShip} cList={props.data.currencyList} updatePageStatus={updatePageStatus} versionNum={props.versionNum}></StepTwo></div>
                <div className={pageObj.pageCount == 3 ? styles.showPage : styles.hidepage}><StepThree cList={props.data.countriesList} updatePageStatus={updatePageStatus} versionNum={props.versionNum}></StepThree></div>

              
            </div>  
         
        </div>    </Container></div>
    )
}

export default FormHolder;
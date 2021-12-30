import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import PubSub from 'pubsub-js';
import request from "../../../utils/request";
import Container from '@material-ui/core/Container';
import styles from './style.module.scss';
import globalStyles from '../../../styles/Global.module.scss'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

export default function ForgotForm(props) {

    const [isOPen, setOverlay] = useState(false);
  const [responsiveWidth, setResponsiveWidth] = useState("sm");
    const [isValid, validateResult] = useState(false);

    const [isError, setError] = useState(false);
    const [isFormDisable, setFormMode] = useState(false);

    useEffect(() => {
        //  console.log(isMobile , ")____isMobileisMobileisMobile")
        if(isMobile){
          setResponsiveWidth("xs")
        }else{
          setResponsiveWidth("sm")
        }

        return () => {
            PubSub.unsubscribe('OpenForgotPWdWindow');
           PubSub.unsubscribe('clickedOutSide');
          };
          
      }, []);

    useEffect(() => {
        setOverlay(props.openWind);
        setError(false)
    }, [props.openWind]);

    const onForgotWindow = (msg, data) => {
        setOverlay(true);
        setError(false)
       
    }
    const onOutSideForgotClicked = (msg, data) => {
        if (data.includes("-avoid")) {
            resetWindow();
        }
    }

    PubSub.subscribe('OpenForgotPWdWindow', onForgotWindow);
     PubSub.subscribe("clickedOutSide", onOutSideForgotClicked);


    const formik = useFormik({
        initialValues: {
            userName: ""
        },

        validate(values) {

    
            const errors = {}

            if (!values.userName) {
                errors.userName = "Username / Email required ! "
            }else{
               // console.log("yes");
              //  testFun()
               
       
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
                let obj = {
                    "jsonrpc": "2.0", "id": 0, method: "forgot_password",
                   params: {
                    //    ...values, 
                    email:values.userName,
                       site_code: process.env.NEXT_PUBLIC_SITE_CODE,
                       // tocken:localStorage.getItem("tocken")
                   }
               }
               const res = await request(`/api/forgotPassword`, obj)
               if (res.result) {
                   validateResult(true);
                   setFormMode(false);
                  // router.push('/success?s=f')
               } else if (res.error) {
                   //setValidLogin(false)
                   setFormMode(false);
                   setError(true)
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
                 //setSubmitting(false);
                // }
            }, 1000);
        },
    })

const forGotPsw =()=>{
    resetWindow();

}
    const onClose = () => {
        // dispatch(closeModelWindow(false));
        //   PubSub.publish('CloseLoginWndow', 'hello world!');
        resetWindow();
    }

    const resetWindow=()=>{
        setOverlay(false);
        formik.values.userName = "";
        formik.errors.userName = "";
        setError(false);
        validateResult(false)
        setFormMode(false);
    }

    // ...

    return (

        <div id="loginWraper-avoid" className={isOPen ? globalStyles.overlay : globalStyles.unSetOverlay}>
              <Container component="main" maxWidth= { responsiveWidth} >

            
            <div className={styles.loginWindow}>
            
                <div className={styles.headtitle}>
                    <div className={styles.titleTxt}><span>Forgot Password</span>
                      
                    </div>
                    <div onClick={onClose} className={globalStyles.closeBtn}><span>X</span></div>
                </div>
                { isFormDisable ?  <LinearProgress className={styles.pBar} color="primary" /> : "" }
{ !isValid ? 
                <form className={`${styles.formHolder} ${isFormDisable ? styles.disableForm : styles.enableForm}  `} onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Enter Username"
                        className={formik.errors.userName ? "errorText" : null}
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                    />

                    {formik.errors.userName ? (
                        <span className={styles.errorText}>{formik.errors.userName}</span>
                    ) : null}

                    { (isError && ( !formik.errors.userName ) )?  <span className={styles.errorText}>{"Invalid Username / Email  !!!"}</span> : "" }

                    <br />
             
            

                    <button type="submit">Submit</button> <br />
                   
                </form> : <div className={styles.resultMsg}> 
                    <div className={styles.emailIcon}><MailOutlineIcon fontSize="inherit"/> </div>
                    <span>A message has been sent to your e-mail with instructions to retrieve your password.</span>
                </div> }
            </div>
   </Container>

        </div>
    )
}

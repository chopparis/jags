import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js'
import Container from '@material-ui/core/Container';
import styles from './style.module.scss';
import globalStyles from '../../../styles/Global.module.scss'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SendIcon from '@material-ui/icons/Send';
import useTranslation from 'next-translate/useTranslation';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

export default function StatusMsgF(props) {
    const { t, lang } = useTranslation('common');
    const [responsiveWidth, setResponsiveWidth] = useState("sm");
    const [statusInfo, setOverlay] = useState({status:false,data:""});

    const onOutSideSttausClicked = (msg, data) => {
        if (data.includes("-avoid")) {
            setOverlay({status:false,data:""});
        }
    }
    useEffect(() => {
         
        if(isMobile){
          setResponsiveWidth("xs")
        }else{
          setResponsiveWidth("sm")
        }
        PubSub.subscribe("clickedOutSide", onOutSideSttausClicked);
        PubSub.subscribe('OpenStatusWindow', onOpenStatusWindow);
      }, []);


    const onOpenStatusWindow = (msg,data)=>{
        setOverlay({status:true,data:data});
    }

    const onClose = () => {
        window.location.reload(false);
     //   PubSub.publish('OpenLoginSucsses', "");
       // setOverlay({status:false,data:""});
    }
    // ...

    return (

        <div id="status-avoid" className={statusInfo.status ? globalStyles.overlay : globalStyles.unSetOverlay}>
              <Container component="main" maxWidth= { responsiveWidth} >

            <div className={styles.statusWindow}>
            
                <div className={styles.headtitle}>
                    <div className={styles.titleTxt}><span>{t("status_msg")}</span>
                        <div onClick={onClose} className={globalStyles.closeBtn}><span>X</span></div>
                    </div>
                </div>
                <div className={styles.resultMsg}> 
                    <div className={styles.emailIcon}>
                        {/* <MailOutlineIcon fontSize="inherit"/> */}
                        <SendIcon fontSize="inherit"/>
                     </div>
                    <span>{statusInfo.data}</span>
                </div> 
            </div>
   </Container>

        </div>
    )
}

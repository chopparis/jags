import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
// import GameWindow from "../GameWindow/";
// import GameInfoPopUp from "../GameInfoPopUp/";
// import ResetPswd from '../ResetPswd/';
// import StatusMsg from '../StatusMsg/'
// import Login from '../Login/'
// import ForgotPSW from '../ForgotPSW/';
// import GlobalSearch from "../GlobalSearch/";

// import RegistrationNew from '../RegistrationNew/FormHolder'
import styles from './style.module.scss';
import dynamic from 'next/dynamic';
// import CarouselWidget from "../CarouselWidget/"
// import CasinoGameContainer from "../CasinoGameContainer/"


const MainContainer = (props) => {

  const GameInfoPopUp = dynamic(() => import('../GameInfoPopUp'));


  // const Login = dynamic(() => import('../Login/'));
  // const ForgotPSW = dynamic(() => import('../ForgotPSW/'))
  // const ResetPswd = dynamic(() => import('../ResetPswd/'));
  // const StatusMsg = dynamic(() => import('../StatusMsg/'));
  // const RegistrationNew = dynamic(() => import('../RegistrationNew/FormHolder'));


  // const BalanceWindow = dynamic(() => import('../Balance/BalanceWindow'));

  const handleClickOutside = (e) => {
    //  console.log(e.target.id,"<<clicked...!!" ,e.currentTarget.id, "<<<<<<<<<<<")
    PubSub.publish("clickedOutSide", e.target.id)
  }

  useEffect(() => {
    // document.removeEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);
    //console.log('____MainC_clickoutside')
      // return () => {
      //   document.removeEventListener('mousedown', handleClickOutside);
      //  };
  }, []);



  return (
    <div className={styles.mainContainer}>
      {props.children}
      <GameInfoPopUp />
      {/* <Login/>
      <ForgotPSW/>
      <ResetPswd />
      <StatusMsg />
      <RegistrationNew/> */}
    </div>
  );
}

export default MainContainer;
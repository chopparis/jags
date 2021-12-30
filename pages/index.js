import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import request from "../utils/request";
import { formateMenuItems , formateCMSMenuList} from "../utils/utility";
import Head from 'next/head';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { getMenuList, getAppInfo } from './api/getAppInfo';
// import { cmsHomeTest } from './api/cms/getCMSdetails';
import { updateAppConfig, upDateRegInfo , updateMenuList, updateDeviceType, updateGameSections, updateProvidersList , updateCMSPlainMenuList } from '../redux/actions/config';
import MainContainer from '../src/components/MainContainer/';
import CarouselWidget from '../src/components/CarouselWidget/';
import CasinoGameContainer from '../src/components/CasinoGameContainer/';
// import WLGamesSection from '../src/components/WLGamesSection/'
import CssBaseline from '@material-ui/core/CssBaseline';
// import JackPotContainer from "../src/components/JackPotContainer/";
import { useUserAgent } from 'next-useragent';
import PubSub, { publish } from 'pubsub-js';
import Error from 'next/error';

import { getRegistrationInfo } from './api/userValidations/getRegistrationInfo';
// import FacebookLogin from 'react-facebook-login';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import FacebookIcon from '@material-ui/icons/Facebook';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const Home = (result) => {
  // export default function Home(result) {

  const router = useRouter();

  // let ua;
  // if (result.res.uaString) {
  //   ua = useUserAgent(result.res.uaString)
  // } else {
  //   ua = useUserAgent(window.navigator.userAgent)
  // }

  const defaultTheme = "light";


  const dispatch = useDispatch();

  useEffect(async () => {

    let lang = router.locale ? router.locale : "us_en";
    if (lang == "en") {
      lang = "us_en";
    }

    // if (result.menuList.length > 0) {
    //   return;
    // }

    let paramObj = { params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, language: lang } }
    let staticMenuList = result.res.menuObj.menu;

    if (result.gamesSections.length == 0) {
      let gamesCateg = [];
      try {
        gamesCateg = await request(`./api/cms/cmsHome`, paramObj);
      
      } catch (err) {
        //  console.log(err , "_____CMS ERROR");
       
        gamesCateg = [];
      }

      if (gamesCateg && gamesCateg.gameSections) {
        dispatch(updateGameSections(gamesCateg.gameSections));
      }else{
       // console.log(gamesCateg.status , "_____CMS" , gamesCateg.statusText)
      }
    //}

   // if (result.menuList.length == 0) {

      let dynamicMenuObj = {};
      try {
        dynamicMenuObj = await request(`./api/cms/cmsMenu`, paramObj);
      } catch (err) {
        dynamicMenuObj = {};
        // console.log(err);
      } 
      let finalMenuList = formateMenuItems(dynamicMenuObj, staticMenuList);
      dispatch(updateMenuList(finalMenuList))

      let CMSPalinMenuList = formateCMSMenuList(dynamicMenuObj, gamesCateg.gameSections);
      dispatch(updateCMSPlainMenuList(CMSPalinMenuList));
      // console.log(finalMenuList , "________--plainCMSList")
    //}

    }
    if (result.providersList.length == 0) {
      const providersList = await request(`./api/getProviders`, { params: {} });
     
      if (providersList.result) {
        dispatch(updateProvidersList(providersList.result));
      } else {
      //  console.log(providersList.status , "__From providers___" , providersList.statusText)
        dispatch(updateProvidersList([]));
      }
    }

    // const menuObjtest = await getMenuList();
    // console.log(menuObjtest , "_____----menuObjtest>>>")

  }, [router]);

  useEffect(async () => {

    // const gamesList = result.res.gamesData.gamesList;
    const appConfig = result.res.appInfo;
    dispatch(updateAppConfig(appConfig));

    const regInfo = result.res.regInfo;
    dispatch(upDateRegInfo(regInfo));

    // dispatch(updateDeviceType(ua))
    document.documentElement.classList.add(`theme-${defaultTheme}`);

    //     app_id = "1275502"
    // key = "0e43a4e1b6c30693c29e"
    // secret = "d771ce366e31f91e10b9"
    // cluster = "ap2"

    // let pusher = new Pusher('0e43a4e1b6c30693c29e', {
    //   cluster: 'ap2'
    // });

    // let channel = pusher.subscribe('my-channel');
    // channel.bind('my-event', function (data) {
    //   // alert(JSON.stringify(data));
    //   PubSub.publish("OpenStatusWindow", data);
    // });

    const exchangerates = await request(`./api/wallet/getExchangeRates`, { params: { } });


    // if (typeof window != "undefined") { // needed if SSR
    //   window.gapiInit = () => {
    //     window.sid = "99999999-9999-9999-9999-999999999999-9999";
    //     window.fasttrackbrand = 'islandluck';
    //     window.fasttrack = {
    //       integrationVersion: 1.1,
    //       autoInit: false,
    //       enableEventTracking: false,
    //       enablePendingRewards: false,
    //       enableCrmIntegration: true,
    //       inbox: {
    //         enable: true,
    //         badgeId: '#inbox-badge', // REPLACE THIS ONE WITH YOUR OWN VALUES (OR REMOVE IT IF NOT NEEDED)
    //         navBarLogo: 'https://via.placeholder.com/150x150', // REPLACE THIS ONE WITH YOUR OWN VALUES (OR REMOVE IT IF NOT NEEDED)
    //         contactEmail: 'choppari589@gmail.com', // REPLACE THIS ONE WITH YOUR OWN VALUES
    //         termsAboveButtons: false
    //       },
    //       translations: {
    //         recieved: 'Recieved:',
    //         validUntil: 'Valid until:',
    //         questionsTop: 'Questions? Mail us at',
    //         questionsShort: 'Questions:',
    //         deleteMessagePrompt: 'Are you sure you want to delete this message?',
    //         inboxEmpty: 'There is currently no messages in your inbox',
    //         readMore: 'Read more'
    //       }
    //     };

    //     let fastTrackCrmScript = document.createElement('script');
    //     fastTrackCrmScript.async = true;
    //     fastTrackCrmScript.onload = function () {
    //       new window.FastTrackLoader();
    //     };

    //     // fastTrackCrmScript.src = 'https://crm-lib-staging.fasttrack-solutions.com/loader/fasttrack-crm.js'; // THIS ONE IS FOR STAGING
    //     fastTrackCrmScript.src = 'https://crm-lib.fasttrack-solutions.com/loader/fasttrack-crm.js';
    //     document.body.appendChild(fastTrackCrmScript);
    //   }
    // }




  }, [])


  return (

    <main>
      {/* <CssBaseline /> */}
      <div>
        {/* 
      <Head>
     

      var pusher = new Pusher('0e43a4e1b6c30693c29e', {
      cluster: 'ap2'
    });
      </Head> */}
        {/* <Head>
      <title>Linda Ojo</title>
      </Head> */}
        <React.StrictMode>
          <MainContainer >
            <CarouselWidget />
            {/* {console.log("FROM INDEX PAGE")} */}
            <CasinoGameContainer />
            {/* <WLGamesSection></WLGamesSection> */}
            {/* {result.res.appInfo.showJackpot &&  result.res.appInfo.showJackpot ? <JackPotContainer isShow={false} /> : "" } */}
          </MainContainer>
        </React.StrictMode>
      </div>
    </main>
  )
}


// Home.getInitialProps = async ({ req, res }) => {
//   const ip = req.connection.remoteAddress
//   console.log("ip..!!!" , ip)
//   // return { ip }
// }

export const getServerSideProps = async (context) => {
  let uaString = context.req.headers['user-agent'];
  const forwarded = context.req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(/, /)[0] : context.req.connection.remoteAddress
  const menuObj = await getMenuList();
  const appInfo = await getAppInfo();
  const regInfo = await getRegistrationInfo();


  // if (!data) {
  //   return {
  //     notFound: true,
  //   }
  // }

  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }


  return {
    props: { res: { menuObj, appInfo, uaString ,regInfo } }
  }
}


// export const getStaticProps = async (context) => {
//   const menuObj = await getMenuList();
//   const appInfo = await getAppInfo();
//   return {
//     props: { res: { menuObj, appInfo } },
//     revalidate: 60, // In seconds
//   }
// }

const mapStateToProps = (state) => {
  return {
    menuList: state.StaticDataReducer.menuList,
    gamesSections: state.StaticDataReducer.gamesSections,
    providersList: state.StaticDataReducer.providersList
  };
};

// export default MenuContainer;
export default connect(mapStateToProps)(Home)
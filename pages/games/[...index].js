import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import request from "../../utils/request";
import { formateMenuItems, formateCMSMenuList } from "../../utils/utility";
import { useRouter } from 'next/router';
import { connect } from "react-redux";
import { getGamesList, getMenuList, getDynamicMenuList, getAppInfo } from '../api/getAppInfo';
import { updateAppConfig, updateGamesList, updateMenuList, updateGameSections, updateDeviceType, updateCMSPlainMenuList, updateProvidersList } from '../../redux/actions/config';
import MainContainer from '../../src/components/MainContainer';
import CarouselWidget from '../../src/components/CarouselWidget';
// import CasinoGameContainer from '../../src/components/CasinoGameContainer';
import MoreGamesContainer from '../../src/components/MoreGamesContainer'
// import CssBaseline from '@material-ui/core/CssBaseline';
// import JackPotContainer from "../../src/components/JackPotContainer/";
import { getRegistrationInfo } from '../api/userValidations/getRegistrationInfo';
// import { useRouter } from "next/router";
import { useUserAgent } from 'next-useragent'


const MoreGames = (result) => {

  // export default function MoreGames(result) {
  const router = useRouter();

  let ua;
  if (result.res.uaString) {
    ua = useUserAgent(result.res.uaString)
  } else {
    ua = useUserAgent(window.navigator.userAgent)
  }

  const defaultTheme = "light";

  const dispatch = useDispatch();

  useEffect(async () => {

    let lang = router.locale ? router.locale : "us_en";
    if (lang == "en") {
      lang = "us_en";
    }



    let paramObj = { params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, language: lang } }
    let staticMenuList = result.res.menuObj.menu;

    if (result.gamesSections.length == 0) {

      const gamesCateg = await request(`../../api/cms/cmsHome`, paramObj);

      if (gamesCateg && gamesCateg.gameSections) {
        dispatch(updateGameSections(gamesCateg.gameSections));
      }

      const dynamicMenuObj = await request(`../../api/cms/cmsMenu`, paramObj);


      let finalMenuList = formateMenuItems(dynamicMenuObj, staticMenuList);
      dispatch(updateMenuList(finalMenuList));

      let CMSPalinMenuList = formateCMSMenuList(dynamicMenuObj, gamesCateg.gameSections);
      dispatch(updateCMSPlainMenuList(CMSPalinMenuList));
      

    }
    if (result.providersList.length == 0) {
      const providersList = await request(`../../api/getProviders`, { params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, "api_key": process.env.NEXT_PUBLIC_API_KEY } });
      if (providersList.result) {
        dispatch(updateProvidersList(providersList.result));
      } else {
        dispatch(updateProvidersList([]));
      }
    }


  }, [router]);

  useEffect(async () => {
    const appConfig = result.res.appInfo;
    dispatch(updateAppConfig(appConfig));
    dispatch(updateDeviceType(ua))
    document.documentElement.classList.add(`theme-${defaultTheme}`);
  }, [])

  return (

    <main>
      <div>
        <MainContainer>
          <CarouselWidget />
          <MoreGamesContainer />
        </MainContainer>
      </div>
    </main>
  )
}
export const getServerSideProps = async (context) => {
  let uaString = context.req.headers['user-agent'];
  const menuObj = await getMenuList();
  const appInfo = await getAppInfo();

  return {
    props: { res: { menuObj, appInfo, uaString } }
  }



}

const mapStateToProps = (state) => {
  return {
    menuList: state.StaticDataReducer.menuList,
    gamesSections: state.StaticDataReducer.gamesSections,
    providersList: state.StaticDataReducer.providersList
  };
};

// export default MenuContainer;
export default connect(mapStateToProps)(MoreGames)
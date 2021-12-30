
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getGamesList, getMenuList, getDynamicMenuList, getAppInfo } from '../api/getAppInfo';
// import { updateAppConfig, updateMenuList, updateDeviceType } from '../../redux/actions/config';
// import MainContainer from '../../src/components/MainContainer/';
// import { useUserAgent } from 'next-useragent';
// import IFrameWindow from '../../src/components/IFrameWindow';
// import { getRegistrationInfo } from '../api/userValidations/getRegistrationInfo';

// export default function Home(result) {

//     let ua;
//     if (result.res.uaString) {
//         ua = useUserAgent(result.res.uaString)
//     } else {
//         ua = useUserAgent(window.navigator.userAgent)
//     }

//     const defaultTheme = "light";

//     const dispatch = useDispatch();

//     useEffect(() => {

//         const gamesList = result.res.gamesData.gamesList;
//         const appConfig = result.res.appInfo;
//         let staticMenuList = result.res.menuObj.menu;
//         let dynaimcMenu = result.res.dynamicMenuObj.menu;
//         let homeArr = staticMenuList.shift(); // returns "HOME object here"
//         for (const key in dynaimcMenu) {
//             dynaimcMenu[key]["showInMainMenu"] = true;
//         }

//         const finalMenuList = dynaimcMenu.concat(staticMenuList);

//         //Adding home object on top
//         finalMenuList.splice(0, 0, homeArr);

//         dispatch(updateAppConfig(appConfig));
//         dispatch(updateMenuList(finalMenuList))
//         dispatch(updateDeviceType(ua))

//         document.documentElement.classList.add(`theme-${defaultTheme}`);
//     }, [])

//     return (

//         <main>
//             <div>
//                 <MainContainer regInfo={result.res.regInfo}>
//                     <IFrameWindow systemIP={result.res.systemIP}></IFrameWindow>
//                 </MainContainer>
//             </div>
//         </main>
//     )
// }

// export const getServerSideProps = async (context) => {
//     let uaString = context.req.headers['user-agent'];

//     const forwarded = context.req.headers['x-forwarded-for']
//     const systemIP = forwarded ? forwarded.split(/, /)[0] : context.req.connection.remoteAddress

//     const gamesData = await getGamesList();

//     const menuObj = await getMenuList();
//     const dynamicMenuObj = await getDynamicMenuList();
//     const appInfo = await getAppInfo();
//     const regInfo = await getRegistrationInfo();

//     return {
//         props: { res: { gamesData, menuObj, dynamicMenuObj, appInfo, uaString, regInfo ,systemIP} }
//     }



// }




import React, { useState, useEffect } from 'react';
import IFrameWindow from '../../src/components/IFrameWindow';
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import request from "../../utils/request";
import { updateAppConfig, updateMenuList, updateDeviceType } from '../../redux/actions/config';
import { formateMenuItems, formateCMSMenuList } from "../../utils/utility";
import { getGamesList, getMenuList, getDynamicMenuList, getAppInfo } from '../api/getAppInfo';

const GameLaunchWindow = (result) => {

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(async () => {



        if (result.menuList.length > 0) {
            return;

        }
            let lang = router.locale ? router.locale : "us_en";
            if (lang == "en") {
                lang = "us_en";
            }

            // console.log(router , "_______--routerrouterrouterrouter");
            let paramObj = { params: { site_code: process.env.NEXT_PUBLIC_SITE_CODE, language: lang } }
            let staticMenuList = result.res.menuObj.menu;
            const dynamicMenuObj = await request(`../../../api/cms/cmsMenu`, paramObj);
            let finalMenuList = formateMenuItems(dynamicMenuObj, staticMenuList);
            dispatch(updateMenuList(finalMenuList));
        



    }, [router]);




    return (
        <main>
            {/* <div> */}
            {/* <MainContainer regInfo={result.res.regInfo}> */}
            <IFrameWindow systemIP={result.res.systemIP}></IFrameWindow>
            {/* </MainContainer> */}
            {/* </div> */}
            {/* <div>
            </div> */}
        </main>
    )
}

// export default GameLaunchWindow;


export const getServerSideProps = async (context) => {


    // const forwarded = context.req.headers['x-forwarded-for']
    // const systemIP = forwarded ? forwarded.split(/, /)[0] : context.req.connection.remoteAddress

    // return {
    //     props: { res: { systemIP } }
    // }

    let uaString = context.req.headers['user-agent'];
    const menuObj = await getMenuList();

    return {
        props: { res: { menuObj } }
    }


}




const mapStateToProps = (state) => {
    return {
        menuList: state.StaticDataReducer.menuList,
    };
};

// export default MenuContainer;
export default connect(mapStateToProps)(GameLaunchWindow)
import {
    UPDATE_MENU_CONFIG,
    OPEN_FORM_TYPE,
    UPDATE_APP_CONFIG,
    UPDATE_REG_CONFIG,
    UPDATE_GAME_LIST,
    UPDATE_APP_LABLES_CONFIG,
    UPDATE_USER_LOGIN,
    UPDATE_MENU_LIST,
    UPDATE_PROVIDERS_LIST,
    UPDATE_CMS_PLAIN_MENU_LIST,
    OPEN_MODEL_WINDOW,
    CLOSE_MODEL_WINDOW,
    OPEN_GAME_WINDOW,
    UPDATE_DEVICE_TYPE_OBJ,
    PLAYER_INFO,
    GAME_SECTIONS
} from "../../utils/constants";

export const updateMenuConfig = (menuConfig) => async (dispatch) => {
   // console.log(menuConfig , "____From config");
    dispatch({
        type: UPDATE_MENU_CONFIG,
        data: menuConfig,
    });

};



export const updateGameSections = (gameSections) => async (dispatch) => {
    // console.log(menuConfig , "____From config");
     dispatch({
         type: GAME_SECTIONS,
         data: gameSections,
     });
 
 };

 export const updateProvidersList = (providersList) =>async (dispatch) =>{
    dispatch({
        type: UPDATE_PROVIDERS_LIST,
        data: providersList,
    });
 }

export const updatePlayerDetails = (playerInfo) => async (dispatch) => {
    // console.log(menuConfig , "____From config");
     dispatch({
         type: PLAYER_INFO,
         data: playerInfo,
     });
 
 };

export const updateDeviceType = (deviceTypeObj) => async (dispatch) => {
    // console.log(menuConfig , "____From config");
     dispatch({
         type: UPDATE_DEVICE_TYPE_OBJ,
         data: deviceTypeObj,
     });
 
 };



export const updateUserLogin=(isUserLogin)=>async(dispatch)=>{
    // dispatch({
    //     type: UPDATE_USER_LOGIN,
    //     data: isUserLogin,
    // });

}

export const updateAppConfig = (appConfig) => async (dispatch) => {
   // console.log(gamesList , "____From config");
    dispatch({
        type: UPDATE_APP_CONFIG,
        data: appConfig ? appConfig : {},
    });

};

export const upDateRegInfo = (regInfo) => async (dispatch) => {
    // console.log(gamesList , "____From config");
     dispatch({
         type: UPDATE_REG_CONFIG,
         data: regInfo ? regInfo : {},
     });
 
 };

export const updateGamesList = (gamesList) => async (dispatch) => {
    // console.log(gamesList , "____From config");
     dispatch({
         type: UPDATE_GAME_LIST,
         data: gamesList ? gamesList : {},
     });
 
 };
 
 export const updateMenuList = (menuList) => async (dispatch) => {
    // console.log(gamesList , "____From config");
     dispatch({
         type: UPDATE_MENU_LIST,
         data: menuList ? menuList : [],
     });
 
 };

 export const updateCMSPlainMenuList = (cmsPalinList) => async (dispatch) => {
    //  console.log(cmsPalinList , "__cmsPalinList__From config");
     dispatch({
         type: UPDATE_CMS_PLAIN_MENU_LIST,
         data: cmsPalinList ? cmsPalinList : [],
     });
 
 };
 

export const updateLablesConfig = (lablesConfig) => async (dispatch) => {
   // console.log(lablesConfig , "____From config");
    dispatch({
        type: UPDATE_APP_LABLES_CONFIG,
        data: lablesConfig,
    });

};


export const onOpenForm = (str) => async (dispatch) => {
    dispatch({
        type: OPEN_FORM_TYPE,
        data: str,
    });

};

export const openModelWindow = (bol) => async (dispatch) => {
    // console.log(gamesList , "____From config");
     dispatch({
         type: OPEN_MODEL_WINDOW,
         data: bol,
     });
 
 }
 export const closeModelWindow = (bol) => async (dispatch) => {
    // console.log(gamesList , "____From config");
     dispatch({
         type: CLOSE_MODEL_WINDOW,
         data: bol,
     });
 
 }

export const launchGameWindow =(str) =>async (dispatch) =>{
    dispatch({
        type: OPEN_GAME_WINDOW,
        data: str,
    });
}

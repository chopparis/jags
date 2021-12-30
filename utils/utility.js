// import React from "react";
// // import _, { split } from "lodash";
// import { connect } from "react-redux";

// import request from "./request";

// class SubscriptionUtility extends React.Component {
//     static statProps = {};
//     static utility = SubscriptionUtility.utility == null ? new SubscriptionUtility() : SubscriptionUtility.utility

//     UNSAFE_componentWillReceiveProps(props,nextProps) {
//       // console.log(props.languageLabels, "________propsprops")
//         SubscriptionUtility.statProps = props.languageLabels;
//     }

//     getHMILanguageLabel(str="") {
//        // console.log(str , "___________HELLOWdd",SubscriptionUtility.statProps)
//         if (str != undefined && (typeof str === "string" || str instanceof String)) {
//             let lables = SubscriptionUtility.statProps;
//             let langStr = lables[str.toLocaleLowerCase()] || {};
//             //.log(langStr , "________>>>",str.toLocaleLowerCase())
//             return langStr || str;
//         }
//         else {
//             return str;
//         }
//     }
//     // getBrowserDateFormat() {
//     //     // let d = new Date().toLocaleDateString();
//     //     // moment.locale(window.navigator.userLanguage || window.navigator.language);
//     //     let localeData = moment.localeData().longDateFormat("L");
//     //     return localeData;
//     // }

//     // getBrowserLanguage() {
//     //     let {languageCodeMapping={}} = SubscriptionUtility.statProps;
//     //     let browser_lang =  window.navigator.userLanguage || window.navigator.language || "";
//     //     let _lang = browser_lang.split("-");
//     //     return languageCodeMapping[_lang[0]] || "ENG";
//     //

//     render() {
//         return null;
//     }
// }


// const mapStateToProps = ({
//     StaticDataReducer: {
//        // languageLabels,
//        languageLabels:  languageLabels,
//         //languageLabels: {},
//     }
// }) => ({
//     languageLabels,
// });

// export default connect(mapStateToProps)(SubscriptionUtility);

// export const UtilityValidateSession = async() =>{
//     console.log( "____dddd______-isUserActive")
//     const isValidSession = await request(`/api/player/validateSession`, {});
//     console.log(isValidSession , "___dd_______-isUserActive")
//     if(isValidSession && isValidSession.result && isValidSession.result.is_valid){
//         return true;
//     }else{
//         return false;
//     }

// }


let lables = {};

export const setLangObj = (langObj) => {
    // console.log(langObj , "____langObj____>>>")
    lables = langObj
};

export const getLangLable = str => {
    if (str != undefined && (typeof str === "string" || str instanceof String)) {
        //  let lables = SubscriptionUtility.statProps;
        let langStr = lables && lables[str.toLocaleLowerCase()] || "";
        // console.log(langStr , "__ddd__langObj____>>>")
        return langStr || str;
    }
    else {
        return str;
    }


};

export const formateCMSMenuList = (dynamicMenuObj, homeCategory) => {
    let faviourates =  {
        "name": "favourites",
        "display_name": "Favourites",
        "id":99,
        "permalink":"favourites",
        "iconPath": "menuicons/home.svg",
        "pageId": "favourites",
        "showInMainMenu": true,
        "subMenu": [],
        "gameRoute":""


     };
    let plainCMSList = [];
    if (dynamicMenuObj && dynamicMenuObj.menu) {
        let cmsMenuLeng = dynamicMenuObj && dynamicMenuObj.menu;

        for (let m = 0; m < cmsMenuLeng.length; m++) {
            let subM = cmsMenuLeng[m].subMenu;
            if (subM != undefined && subM.length > 0) {
                for (let sm = 0; sm < subM.length; sm++) {
                    plainCMSList.push(subM[sm])
                }
            }
            plainCMSList.push(cmsMenuLeng[m])
        }
        // console.log(plainCMSList , "__UTITLIY")

    }
    
    if (homeCategory && homeCategory != undefined) {
        let homeCatLeng = homeCategory.length;
        for (let h = 0; h < homeCatLeng; h++) {
            plainCMSList.push(homeCategory[h])
        }
    }
    plainCMSList.push(faviourates);

    return plainCMSList;


}

export const formateMenuItems = (dynamicMenuObj, staticMenuList) => {
    if (dynamicMenuObj && dynamicMenuObj.menu) {
        let dynaimcMenu = dynamicMenuObj && dynamicMenuObj.menu;

        let homeArr = staticMenuList.shift(); // returns "HOME object here"

        for (const key in dynaimcMenu) {
            dynaimcMenu[key]["permalink"] = dynaimcMenu[key]["permalink"].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            dynaimcMenu[key]["showInMainMenu"] = true;
            if (dynaimcMenu[key]["subMenu"] && dynaimcMenu[key]["subMenu"].length > 0) {
                let subMenuList = dynaimcMenu[key]["subMenu"];
                for (const skey in subMenuList) {
                    // console.log(subMenuList[skey]["permalink"] , "__sstt___--finalMenuList____");
                    subMenuList[skey]["permalink"] = subMenuList[skey]["permalink"].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                    subMenuList[skey]["parentId"] = dynaimcMenu[key]["id"];
                    subMenuList[skey]["parent_permaLink"] = dynaimcMenu[key]["permalink"]
                    //     dynaimcMenu[skey]["subMenu"]["permalink"] =  dynaimcMenu[skey]["subMenu"]["permalink"].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                }

            }

        }

        const finalList = dynaimcMenu.concat(staticMenuList);
        //Adding home object on top
        finalList.splice(0, 0, homeArr);
        return finalList;
    }
}

export default function ErrorHandling(ErrorCode) {
    let error_message = "";
    let resInfo = { code: 0, msg: error_message, isError: false };

    switch (ErrorCode) {
        case 5001:
            error_message = "User Already Registered."
            break;
        case 5002:
            error_message = "Invalid Username"
            break;
        case 5003:
            error_message = "Invalid Password"
            break;
        case 5004:
            error_message = "Invalid Email"
            break;
        case 5005:
            error_message = "Credentials Incorrect"
            break;
        case 5006:
            error_message = "Invalid Verfication Code"
            break;
        case 5007:
            error_message = "Code Given expired."
            break;
        case 5008:
            error_message = "Code Given expired."
            break;
        case 5010:
            error_message = "Verfication code already used"
            break;
        case 5000:
            error_message = "Invalid Session."
            break;
        case 6001:
            error_message = "Insufficient Balance."
            break;
        case 6002:
            error_message = "Insufficient Bonus Balance."
            break;
        case 6003:
            error_message = "Invalid Transaction Type"
            break;
        case 6004:
            error_message = "Invalid Sub Transaction Type"
            break;
        case 6005:
            error_message = "Bonus is Not configured for this game"
            break;
        case 6006:
            error_message = "Bonus is not active"
            break;
        case 6007:
            error_message = "Free Spins Balance id not provided"
            break;
        case 6008:
            error_message = "Insufficient Data to fetch transaction"
            break;
        case 6009:
            error_message = "Debit Transaction not found."
            break;
        case 6010:
            error_message = "Search Balance is not in player balances."
            break;
        case 6011:
            error_message = "Transaction not found."
            break;
        case 6012:
            error_message = "Not a Manual Bonus."
            break;
        case 6013:
            error_message = "Invalid Wager Multiplier provided."
            break;
        case 6014:
            error_message = "Invalid Amount."
            break;
        case 6015:
            error_message = "Invalid Amount Range"
            break;
        default:
            error_message = "Error Occurred "
    }

    resInfo = { code: ErrorCode, msg: error_message, isError: true };
    return resInfo;




}
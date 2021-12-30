import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import request from "../../../utils/request";
import styles from './style.module.scss';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector/';
import ThemeSwitcher from '../ThemeSwitcher/';
import { useRouter } from "next/router";
import PubSub from 'pubsub-js';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import Cookies from 'js-cookie';

const NewSideNav = (props) => {

    const { t, lang } = useTranslation('common');
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const menuList = useSelector(state => state.StaticDataReducer.menuList);
    const [isOpen, setWindowMode] = useState(false);

    // const listControler = [...menuList]

    // const [myAccntOpen, setAccountMode] = useState(false);
    const [finalMenuList, setMenuList] = useState(menuList);
    const [loginStatus, setLoginStatus] = useState(false);

    const onCloseWindow = () => {
        setWindowMode(false);
        props.sideMenuClosed();
    }

    const onOpenWindow = () => {
        //console.log("__OPen windpe")
        setWindowMode(true);
    }

    const onThemeChange = () => {
        // console.log('theme , ____' , theme);
        if (theme == "pink") {
            setTheme('blue')
        } else {
            setTheme('pink')
        }
    }

    const resetAllItems = (listItems) => {
        let menuItems = [...listItems]
        for (const key in menuItems) {

            let n = menuItems[key].name ? menuItems[key].name : "";
            if (menuItems[key].id == "m2") {
             //   console.log(Cookies.get('tocken') , "_____________>>Cookies.get('tocken')")
                if( Cookies.get('tocken') == '' || Cookies.get('tocken') == undefined){
                    menuItems.splice(menuItems.findIndex(obj => obj.id == "m2"), 1)
                }else{
                  //  menuItems.splice(menuItems.findIndex(obj => obj.id == "m2"), 1)
                }
                // if (localStorage && localStorage.tocken) {
                // } else {
                   
                // }
                

            } else {
                // menuItems[key]["showMe"] = true;
            }

            if (menuItems[key].subMenu && menuItems[key].subMenu.length > 0) {
                menuItems[key]["isExpanded"] = false;
            }

        }
        return menuItems;
    }

    useEffect(() => {
        let finalList = resetAllItems(menuList);
        setMenuList(finalList);
    }, [menuList]);

    useEffect(() => {
        setWindowMode(false);
        props.sideMenuClosed();
    }, [router]);


    const validateSession = async() =>{
        const isValidSession = await request(`/api/player/validateSession`, {});
        if(isValidSession && isValidSession.result && isValidSession.result.is_valid){
            return true;
        }else{
            //console.log(isValidSession , "____Side_---isValidSession" , isValidSession.status)
            return false;
        }
 
    }

    useEffect(async() => {
        let isUserActive = await validateSession();
        if (isUserActive) {
            setLoginStatus(true);
        }
    }, []);

    useEffect(() => {

        // console.log("___sidemenu>>>", props.isShow)
        setWindowMode(props.isShow);
    }, [props.isShow]);





    const onExpanding = selectedItem => () => {
        //  let temList = resetAllItems(finalMenuList);
        let temList = [...finalMenuList];

        for (const key in temList) {
            if (temList[key].name == selectedItem.name) {

                temList[key]["isExpanded"] = !temList[key]["isExpanded"];
            }

        }
        setMenuList(temList);

        // console.log(selectedItem.permalink , "_________--selectedItem.name" , selectedItem.id);
        var gameTypeObj = { 'permalink': selectedItem.permalink, 'id': selectedItem.id };
        localStorage && localStorage.setItem("gameType", JSON.stringify(gameTypeObj));
        //console.log(selectedItem, "_____--selectedObj")

        // setAccountMode(!myAccntOpen);
    }
    // const OnCloseNavBar = (e) =>{
    //  console.log(e , "____________>>")
    // setWindowMode(!isOpen);
    // }

    const onOutSideNavBarClicked = (msg, data) => {
        //console.log(data.includes("-avoid") , "_________From document")
        // console.log(data.includes("-avoid") , "__data")
        // if( data != "providersDropDown" || data != "providers" || data != "providersDropDownIcon"){
        if (data.includes("-avoid")) {
            setWindowMode(false);
            props.sideMenuClosed();
        }



    }
    const onLogOut = () => {
        PubSub.publish('SideMEnuLogOut', "");
        setLoginStatus(false);
        setWindowMode(false);
        props.sideMenuClosed();

    }
    const onLoginSucsses = () => {
        setLoginStatus(true)
        //  setMenuList(menuList)
        let finalList = resetAllItems(menuList);
        setMenuList(finalList);
    }
    const onLogOutSuccses = () => {
        setLoginStatus(false)
        //resetMenu();
        let finalList = resetAllItems(menuList);
        setMenuList(finalList);
    }

    PubSub.subscribe('OpenLoginSucsses', onLoginSucsses);
    PubSub.subscribe('LogOutSuccsess', onLogOutSuccses)


    PubSub.subscribe("clickedOutSide", onOutSideNavBarClicked);

    const getSubmenuItems = (subMenuList) => {
        return <div>
            {
                subMenuList.map((obj, k) => {
                    <div key={k}><a href="#">{subMenuList.name}</a></div>
                })
            }

        </div>

    }
    return (
        <div id="sideNavWraper-avoid" className={isOpen ? styles.sideNavWraper : styles.unSetWraper}>
            {/* <span onClick={onOpenWindow} className={styles.toggleMenu}>&#9776;</span> */}

            <div className={`${styles.sidenav} ${isOpen ? styles.setWidth : styles.unSetWraper}  `}>
                <div>
                    <div className={styles.langWraper}><LanguageSelector versionNum={props.versionNum} /></div>
                    <div className={styles.switchWraper}><ThemeSwitcher customMethod={onThemeChange} /></div>

                    <a className={styles.closebtn} onClick={onCloseWindow}>&times;</a>

                    {finalMenuList && finalMenuList.map((obj, indx) =>
                        (obj.subMenu != null && obj.subMenu.length > 0) ?

                            <div key={indx}>

                                {/* <div className={styles.dropdownBtn} onClick={onExpanding(obj)}> */}
                                <div className={`${styles.dropdownBtn} ${obj.isExpanded ? styles.setActiveColor : styles.unSetActiveColor}  `} onClick={onExpanding(obj)}>

                                    {/* <a className={`${styles.fa} ${styles.faCaretDown}  `}></a> */}
                                    {/* <a href="#">{obj.name}</a> */}
                                    <a>{obj.display_name}</a>
                                    {/* <a href="#">{t(obj.display_name.replace(/\s/g, "").toLowerCase())}</a> */}

                                    <div className={styles.expandArrow} >
                                        {obj.isExpanded ?
                                            <ExpandLessRoundedIcon fontSize="inherit" className={styles.activeColor} /> : <ExpandMoreRoundedIcon fontSize="inherit" className={styles.inActiveColor} />}
                                    </div>
                                </div>

                                <div className={obj.isExpanded ? styles.dropdownContainer : styles.closeDropDown}>
                                    {/* <a href="#">{"obj.subMenu.name"}</a> */}
                                    {obj.subMenu && obj.subMenu.map((subObj, sk) =>
                                        <div key={sk} className={styles.dropDownChildren} >
                                            {/* {console.log(subObj , "_____---subObj")} */}
                                            {/* <a href="#">{subObj.name}</a> */}
                                            {/* <Link href={"/games/" + subObj.permalink.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}>
                                                <a>{subObj.display_name}</a>
                                           
                                            </Link> */}

                                            {( subObj.gameRoute && subObj.gameRoute == "myaccount" ) ?
                                                <Link
                                                    href={{
                                                        pathname: "/myaccount/" +  subObj.permalink.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
                                                        // pathname: "/games/"  + props.propObj.permalink,
                                                        // query: { slug: "Hello worls" },
                                                    }}
                                                >
                                                   <a>{subObj.display_name }</a>


                                                </Link> : <Link
                                                    href={{
                                                        // pathname: "/games/" + subObj.permalink + "/" + subObj.id,
                                                        pathname: "/games/" + obj.permalink + "/" + subObj.permalink,
                                                        // query: { slug: "Hello worls" },
                                                    }}
                                                >
                                                     <a>{subObj.display_name}</a>

                                                </Link>}

                                        </div>


                                    )}
                                </div>

                            </div>

                            :

                            <div className={`${styles.normalBtn} ${(indx == 0) ? styles.setHomeColor : styles.unSetHomeColor}  `} key={indx}>
                                {/* <a href="#">{obj.name}</a> */}
                                {/* {console.log(obj.showInMainMenu , "<_______--obj.permalink")} */}

                                {obj.showInMainMenu ?

                                    <Link
                                        href={{
                                           // pathname: "/games/" + obj.permalink + "/" + obj.id,
                                             pathname: "/games/"  + obj.permalink,
                                            // query: { slug: "Hello worls" },
                                        }}
                                    >
                                        <a>{obj.display_name}</a>
                                    </Link>

                                    // <Link href={"/games/" + obj.permalink.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}>
                                    //    <a>{obj.display_name}</a>
                                    //     {/* <a>{t(obj.display_name.replace(/\s/g, "").toLowerCase())}</a> */}
                                    // </Link>
                                    :

                                    <Link href={"/" + obj.permalink.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}>
                                        {/* <a>{obj.displayName}</a> */}
                                        <a>{t(obj.display_name.replace(/\s/g, "").toLowerCase())}</a>
                                    </Link>
                                }
                            </div>


                    )}

                </div>
                {loginStatus ? <div className={styles.logOutBtn} onClick={onLogOut}><span>{t("logout")}</span></div> : ""}
            </div>
        </div>
    )
}

export default NewSideNav;
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import styles from './style.module.scss';
import { useRouter } from "next/router";
import MenuContainer from "../MenuContainer/";
import { connect } from "react-redux";
import request from "../../../utils/request";
import useTranslation from 'next-translate/useTranslation';
//import GameTile from '../GameTile/';
import FilterChip from './FilterChip/';
import FilterComponent from './FilterComponent/';
import GameCard from '../GameCard';
import PubSub from 'pubsub-js';
import Link from 'next/link';

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MoreGamesContainer = (props) => {

    // console.log(props.deviceType , "___propsprops DeviceType")
    const { t, lang } = useTranslation('common')
    const router = useRouter();
    let queryParam = "";
    if (router.query && router.query.id != undefined) {
        queryParam = router.query.id;
        //queryParam = localStorage && localStorage.getItem("menuName")
        //  console.log( queryParam , "____FROM SUCC__- router.query.id")
    }
    const [moreGamesChunk, setMoreGamesChunk] = useState({});
    const [minMaxMoreLoad, setMoreLoadMinMax] = useState({ "min": 0, "max": 32, "totalCount": 0, "currency": "" });
    const [allMoreGames, setAllMoreGmes] = useState([]);

    const [providersList, setProvidersList] = useState([]);

    const [featuresList, setfeaturesList] = useState([]);

    const [noDataFound, setNoDataFound] = useState(false);




    const [rtpList, setRTPList] = useState([
        { name: "High", isSelected: false, filterType: "rtp", rangeValue: "high" },
        { name: "Medium", isSelected: false, filterType: "rtp", rangeValue: "medium" },
        { name: "Low", isSelected: false, filterType: "rtp", rangeValue: "low" }
    ]);

    const [maxwinList, setmaxwinList] = useState([
        { name: " < 5000", isSelected: false, filterType: "maxwin", rangeValue: { 'minimum': 10, 'maximum': 4999 } },
        { name: " 5000 - 9999 ", isSelected: false, filterType: "maxwin", rangeValue: { 'minimum': 5000, 'maximum': 9999 } },
        { name: " 10000 + ", isSelected: false, filterType: "maxwin", rangeValue: { 'minimum': 10000, 'maximum': 100000 } }
    ]);

    const [volitilityList, setvolitilityList] = useState([
        { name: "High", isSelected: false, filterType: "volatility", rangeValue: "high" },
        { name: "Medium", isSelected: false, filterType: "volatility", rangeValue: "medium" },
        { name: "Low", isSelected: false, filterType: "volatility", rangeValue: "low" }
    ]);

    const [filteredList, setFlters] = useState([]);
    const [gameTitle, setGameTitle] = useState("");
    const [showFilters, setFilterMode] = useState(false);
    const [isShowProviderF, setProviderFilter] = useState(true);




    const getMoreGames = async (min, max, totalLeng, filterHTTPObj) => {
        let categeryID = "1"
        let categeries = [];

        //   console.log(router.query.index , "____________test______",router.query.index.length-1);
        //  console.log(router.query.index , "_________dd");

        //---always get last route name
        let menuIndex = router.query.index.length - 1;


        if (router.query.index[0] == "providers") {
            filterHTTPObj["game_providers"] = [router.query.index[1]];
            categeries = [];
        } else if (props.cmsPlainMenu.length > 0) {

            const currentMenuObj = props.cmsPlainMenu && props.cmsPlainMenu.filter(menuObj => menuObj.permalink == router.query.index[menuIndex]);

            if (currentMenuObj != undefined && currentMenuObj[0] != undefined && currentMenuObj[0].id != undefined) {
                // console.log(currentMwnuObj[0].id, "_____tt_currentMwnuObj___---testing" );
                // categeryID = router.query.index[1] ? router.query.index[1] : "1";

                categeryID = currentMenuObj[0].id;
                categeries.push(parseInt(categeryID));
            }
        }

        let obj = {
            params: {
                ...filterHTTPObj,
                "category_ids": categeries,
                "start_limit": min,
                "end_limit": max,
                // "api_key": process.env.NEXT_PUBLIC_API_KEY
            }
        }

        // console.log(categeries[0] , "__________--categeries[0]")
       // if(categeries[0] !=undefined){
            const res = await request(`/api/getGames`, obj);

            if (res.error != undefined && res.error && res.error.code) {
            } else if (res.result) {
                let gamesList = res.result;
                if (gamesList.games.length > 0) {
                    // setSearchResults(gamesList)
                    setMoreGamesChunk(gamesList);
    
                } else {
                    setNoDataFound(true);
                }
            }
        //}
       

    }

    useEffect(() => {

        if (router.query.index[0] == "providers") {
            setProviderFilter(false);
        } else {
            setProviderFilter(true);
        }
        if (moreGamesChunk && moreGamesChunk.games && moreGamesChunk.games.length > 0) {
            let totalGames = allMoreGames.concat(moreGamesChunk.games);
            setNoDataFound(false);
            setAllMoreGmes(totalGames);
            setMoreLoadMinMax({ "min": (minMaxMoreLoad.max), "max": (minMaxMoreLoad.max + 32), "totalCount": moreGamesChunk.total_count, "currency": moreGamesChunk.currency });
        };

    }, [moreGamesChunk]);


    useEffect(() => {
        localStorage && localStorage.setItem("backRoute", router.asPath);
        let currentIndx = router.query.index.length - 1;
        console.log()
        let menuObj = props.cmsPlainMenu.find(o => o.permalink == router.query.index[currentIndx] );
        if (menuObj && menuObj.display_name) {
            setGameTitle(menuObj.display_name);
        }
        clearAllFilter();
    
        // }, [router.query ]);
    }, [router.query , props.cmsPlainMenu]);

    //   useEffect(() => {
    //   //  localStorage && localStorage.setItem("backRoute", router.asPath);
    //     let currentIndx = router.query.index.length - 1;
    //     let menuObj = props.cmsPlainMenu.find(o => o.permalink == router.query.index[currentIndx] );
    //     if (menuObj && menuObj.display_name) {
    //         setGameTitle(menuObj.display_name);
    //     }
    //     //clearAllFilter();
    // }, [props.cmsPlainMenu]);


    const getFeatures = async () => {
        let obj = {
            params: {
                "api_key": process.env.NEXT_PUBLIC_API_KEY
            }
        }
        const res = await request(`/api/wallet/getFeatures`, obj);

        if (res.error != undefined && res.error && res.error.code) {
        } else if (res.result) {
            formateFeatures(res.result);
        }
    }

    //  const { data, error } = useSWR("/api/wallet/getFeatures", getFeatures());
    useEffect(() => {
        getFeatures();

    }, []);

    const formateFeatures = (featuresList) => {
        let fLeng = featuresList.length;
        let tempArr = [];

        if (fLeng > 0) {
            for (let f = 0; f < fLeng; f++) {
                let fObj = {};
                fObj.name = featuresList[f];
                fObj.isSelected = false;
                fObj.filterType = "feature";
                fObj.rangeValue = featuresList[f];

                tempArr.push(fObj);
            }
            setfeaturesList(tempArr);
        }
    }

  


    useEffect(() => {
        let pLeng = props.providersList.length;
        let tempArr = [];

        if (pLeng > 0) {
            for (let p = 0; p < pLeng; p++) {
                let pObj = {};
                pObj.name = props.providersList[p];
                pObj.isSelected = false;
                pObj.filterType = "providers";
                pObj.rangeValue = props.providersList[p];

                tempArr.push(pObj);
            }
            setProvidersList(tempArr);
        }

    }, [props.providersList]);

    const getFormatedList = (fList) => {
        let tempList = [];
        for (let f = 0; f < fList.length; f++) {
            tempList.push(fList[f].rangeValue)
        }
        return tempList;
    }

    useEffect(async () => {

        if (filteredList.length == 0) {
            return;
        }

        let httpObj = {};

        const providersList = filteredList.filter(fObj => fObj.filterType == "providers");
        const featureList = filteredList.filter(fObj => fObj.filterType == "feature");
        const rtpList = filteredList.filter(fObj => fObj.filterType == "rtp");
        const maxwinList = filteredList.filter(fObj => fObj.filterType == "maxwin");
        const volatilityList = filteredList.filter(fObj => fObj.filterType == "volatility");

        if (providersList.length > 0) {
            httpObj["game_providers"] = getFormatedList(providersList);
        }
        if (featureList.length > 0) {
            httpObj["game_features"] = getFormatedList(featureList);
        }
        if (rtpList.length > 0) {
            httpObj["rtp"] = getFormatedList(rtpList);
        }
        if (maxwinList.length > 0) {
            httpObj["max_win_range"] = getFormatedList(maxwinList);
        }
        if (volatilityList.length > 0) {
            httpObj["volatality"] = getFormatedList(volatilityList);
        }
        setMoreLoadMinMax({ "min": 0, "max": 32, "totalCount": 0, "currency": moreGamesChunk.currency });
        setAllMoreGmes([]);
        getMoreGames(0, 32, 0, httpObj);
    }, [filteredList]);




    const updateFavSelection = async (gameObj, isFav) => {

        let isValid = await validateSession();

        if (isValid) {
            let obj = {
                params: {
                    "game_config_id": gameObj.game_config_id,
                    "game_type": gameObj.game_type,
                    "is_favourite": !isFav,
                    // "session_id": localStorage && localStorage.tocken,
                    // "api_key": process.env.NEXT_PUBLIC_API_KEY
                }
            }
            const res = await request(`/api/favouriates`, obj);

            if (res.error != undefined && res.error && res.error.code) {
            } else if (res.result) {

            }
        } else {
            // reset to login and show login window
            // setSession(false);
            PubSub.publish('unsetFav', "");
            PubSub.publish('OpenLoginWndow', "");

        }



    }

    const validateSession = async () => {
        const isValidSession = await request(`/api/player/validateSession`, {});
        if (isValidSession && isValidSession.result && isValidSession.result.is_valid) {
            return true;
        } else {
            return false;
        }

    }

    const onOpenGame = async (gameURL) => {
        let isValid = await validateSession();

        if (isValid) {
            // router.push(gameURL, undefined, {
            //     scroll: true
            //  });
            router.push(gameURL);
        } else {
            // reset to login and show login window
            PubSub.publish('OpenLoginWndow', "");
        }
    }

    const updateFiltersTray = (filterObj) => {
        let tempArr = [...filteredList];
        tempArr.push(filterObj);
        setFlters(tempArr);
    }


    const setDeleteMode = (fList, fName) => {
        let tempArr = [...fList];
        let obj = tempArr.find(o => o.name == fName);
        let index = tempArr.indexOf(obj);
        tempArr[index].isSelected = false;
        return tempArr;
    }

    const deleteFilter = (filterObj, chipIndex) => {

        if (filterObj.filterType == "providers") {
            setProvidersList(setDeleteMode(providersList, filterObj.name));
        }

        if (filterObj.filterType == "feature") {
            setfeaturesList(setDeleteMode(featuresList, filterObj.name));
        }

        if (filterObj.filterType == "rtp") {
            setRTPList(setDeleteMode(rtpList, filterObj.name));
        }

        if (filterObj.filterType == "maxwin") {
            setmaxwinList(setDeleteMode(maxwinList, filterObj.name));
        }
        if (filterObj.filterType == "volatility") {
            setvolitilityList(setDeleteMode(volitilityList, filterObj.name));
        }
        // if (filterObj.filterType == "gametype") {
        //     setgameTypeList(setDeleteMode(gameTypeList, filterObj.name));
        // }


        let tempChips = [...filteredList];
        let chipObj = tempChips.find(co => co.name == filterObj.name);
        let chipInd = tempChips.indexOf(chipObj);
        tempChips.splice(chipInd, 1);

        if (tempChips.length == 0) {
            // Reseting exsting min max
            setMoreLoadMinMax({ "min": 0, "max": 32, "totalCount": 0, "currency": moreGamesChunk.currency });
            // Reseting exsting games while switching menus
            setAllMoreGmes([]);
            // Reseting API for games
            getMoreGames(0, 32, 0, {});
        }
        setFlters(tempChips);

    }
    const resetAllFilterTypes = (fList, updateFilterType) => {
        let tempProvList = fList;
        let pLeng = tempProvList.length;
        for (let p = 0; p < pLeng; p++) {
            tempProvList[p].isSelected = false;
        }
        updateFilterType(tempProvList);
    }
    const clearAllFilter = () => {
        resetAllFilterTypes([...providersList], setProvidersList);
        resetAllFilterTypes([...featuresList], setfeaturesList);
        resetAllFilterTypes([...rtpList], setRTPList);
        resetAllFilterTypes([...maxwinList], setmaxwinList);
        resetAllFilterTypes([...volitilityList], setvolitilityList);
        // resetAllFilterTypes([...gameTypeList], setgameTypeList);

        let tempChips = [...filteredList];
        tempChips.length = 0;
        setFlters(tempChips);

        // Reseting exsting min max
        setMoreLoadMinMax({ "min": 0, "max": 32, "totalCount": 0, "currency": moreGamesChunk.currency });
        // Reseting exsting games while switching menus
        setAllMoreGmes([]);
        // Reseting API for games
        getMoreGames(0, 32, 0, {});




    }
    const toogleFilters = () => {
        setFilterMode(!showFilters);
    }

    const onLoadMoregames = () => {
        //  let categID = router.query.index[1] ? router.query.index[1] : "1"
        getMoreGames(minMaxMoreLoad.min, minMaxMoreLoad.max, minMaxMoreLoad.totalCount, {});
    }
    const onSearchFilter = () => {
        if (filteredList.length == 0) {
            return;
        }

        let httpObj = {};

        // const providersList = filteredList.filter(fObj => fObj.filterType == "providers");
        // const featureList = filteredList.filter(fObj => fObj.filterType == "feature");
        // const rtpList = filteredList.filter(fObj => fObj.filterType == "rtp");
        // const maxwinList = filteredList.filter(fObj => fObj.filterType == "maxwin");
        // const volatilityList = filteredList.filter(fObj => fObj.filterType == "volatility");

        // if (providersList.length > 0) {
        //     httpObj["game_providers"] = getFormatedList(providersList);
        // }
        // if (featureList.length > 0) {
        //     httpObj["game_features"] = getFormatedList(featureList);
        // }
        // if (rtpList.length > 0) {
        //     httpObj["rtp"] = getFormatedList(rtpList);
        // }
        // if (maxwinList.length > 0) {
        //     httpObj["max_win_range"] = getFormatedList(maxwinList);
        // }
        // if (volatilityList.length > 0) {
        //     httpObj["volatality"] = getFormatedList(volatilityList);
        // }
        // setMoreLoadMinMax({ "min": 0, "max": 32, "totalCount": 0, "currency": moreGamesChunk.currency });
        // setAllMoreGmes([]);
        // getMoreGames(0, 32, 0, httpObj);
    }
    return (
        <section className={styles.moregames_CasinoContainer}>
            <MenuContainer versionNum={props.appConfigObj.version} />

            <div className={`${styles.filterContainer} ${showFilters ? styles.setBgcolor : styles.unSetBgcolor}  `}>

                {/* <div className={styles.filterContainer}> */}
                <div className={styles.filterBtnWraper}> <div className={styles.toogleFilterBtn} onClick={toogleFilters}> <FontAwesomeIcon icon={faFilter} color="#ffffff" />  </div> <span>{"Game Filters"}</span> </div>

                {/* <div className={styles.filterHolder}> */}


                {showFilters ? <div className={styles.filtersHolder}>
                    <div className={styles.fcloseBtn} onClick={toogleFilters}><span>X</span></div>
                    <div className={styles.filtersWraper}>
                        {isShowProviderF ? <FilterComponent title={"PROVIDERS"} filterType={"providers"} filters={providersList} updateFiltersTray={updateFiltersTray} deleteFilter={deleteFilter} /> : ""}
                        {/* <FilterComponent title={"GAME TYPE"} filterType={"gametype"} filters={gameTypeList} updateFiltersTray={updateFiltersTray} deleteFilter={deleteFilter} /> */}
                        <FilterComponent title={"FEATURES"} filterType={"feature"} filters={featuresList} updateFiltersTray={updateFiltersTray} deleteFilter={deleteFilter} />
                        <FilterComponent title={"RTP"} filterType={"rtp"} filters={rtpList} updateFiltersTray={updateFiltersTray} deleteFilter={deleteFilter} />
                        <FilterComponent title={"MAX.WIN"} filterType={"maxwin"} filters={maxwinList} updateFiltersTray={updateFiltersTray} deleteFilter={deleteFilter} />
                        <FilterComponent title={"VOLATILITY"} filterType={"volatility"} filters={volitilityList} updateFiltersTray={updateFiltersTray} deleteFilter={deleteFilter} />
                        {/* <div className={styles.searchCom} onClick={onSearchFilter}><span>{"SEARCH"}</span></div> */}
                    </div>
                    <div className={styles.chipsTray}>
                        {filteredList && filteredList.map((obj, indx) =>
                            <div key={indx}><FilterChip chipObj={obj} deleteFilter={deleteFilter} ind={indx} /></div>
                        )}
                        {filteredList && filteredList.length > 0 ? <div className={styles.clearFilters} onClick={clearAllFilter}><span >{"CLEAR FILTERS"}</span></div> : ""}
                    </div>
                </div> : ""}

                {/* </div>  */}

            </div>

            <div className={styles.moreGamesHolder}>
                <div className={styles.titleHolder}>
                    {/* <div className={mgStyles.gametypeName}><h2>{t(gameTitle ? gameTitle : queryParam.toLocaleLowerCase())}</h2></div> */}
                    <div className={styles.gametypeName}><span>{gameTitle ? gameTitle : queryParam}</span></div>
                </div>



                {/* {console.log(gamesList , "___gamesList")} */}
                {/* <div className={styles.gamesSectionHolder}> */}
                {allMoreGames && allMoreGames.length > 0 ?
                    <div className={styles.gamesSection}>
                        {/* {console.log(allMoreGames , "__________--allMoreGames.games")} */}
                        {allMoreGames && allMoreGames.map((obj, indx) =>
                            // <GameItem key={indx} gameObj={obj} device = {props.deviceType}/>
                            <div key={indx} className={styles.gameTileWraper}>
                                <GameCard key={indx} gameObj={obj} versNum={props.appConfigObj.version} showInfo={props.appConfigObj.showgameInfo} gameType="6x" updateFavSelection={updateFavSelection} onOpenGame={onOpenGame} currency={minMaxMoreLoad.currency} pageType={"moreGames"} />
                            </div>
                        )}
                        {(minMaxMoreLoad.min < minMaxMoreLoad.totalCount) ? <div className={styles.loadMoreWraper}><div className={styles.loadMoreGames} onClick={onLoadMoregames}>{"Load More Games"}</div></div> : ""}
                    </div> : <div> <span>{""}</span></div>}

                <div> {noDataFound ? <div className={styles.notFound}><span >{"No Result Found"}</span></div> : ""}</div>


                {/* </div> */}
            </div></section>
    )
}

const mapStateToProps = (state) => {
    return {
        providersList: state.StaticDataReducer.providersList,
        menuList: state.StaticDataReducer.menuList,
        appConfigObj: state.StaticDataReducer.appConfigObj,
        cmsPlainMenu: state.StaticDataReducer.cms_plain_menuList
    };
};

export default connect(mapStateToProps)(MoreGamesContainer);

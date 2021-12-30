import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import PubSub from 'pubsub-js';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

const Filters = (props) => {

    const [isProviders, setproviders] = useState(false);
    const [isFilters, setFilters] = useState(false);

    const [allproviders, providersList] = useState([{provider : "Netent", icon:"ne.jpg"} , {provider : "Play'n GO", icon:"go.jpg"} , {provider : "BGaming", icon:"b.jpg"},{provider : "Pragmatic Play", icon:"p.jpg"},{provider : "Spenimonal", icon:"s.jpg"}]);
    const [allFilters, FiltersList] = useState(["A-Z", "Z-A", "Promotions", "Most Played", "Papularity", "New games"]);

    const [ptitle, setProvidertitle] = useState("Filter by providers");
    const [FTitle, setFilterTitle] = useState("Apply filters");


    const onOutSideLoginClicked = (msg, data) => {
        // console.log(data.includes("-avoid") , "__data")
        // if( data != "providersDropDown" || data != "providers" || data != "providersDropDownIcon"){
        if (!data.includes("-avoid")) {
            if (isProviders) {
                setproviders(false)
            }
            if (isFilters) {
                setFilters(false)
            }
        }



    }

    PubSub.subscribe("clickedOutSide", onOutSideLoginClicked);

    const [searchTerm, setSearchTerm] = React.useState("");

    const openProviders = () => {
        setproviders(!isProviders);
        setFilters(false);
    }

    const openFilters = () => {
        setFilters(!isFilters);
        setproviders(false)
    }



    const handleChange = event => {

        setSearchTerm(event.target.value);
        props.handleFilters(event.target.value, "search")
        //  setFilteredGamesList()
    };
    const onProvidersListClick = (e) => {
        let temp = e.currentTarget.id.split("-avoid");

        if (temp[0] == "clearproviders") {
            setProvidertitle("Filter by providers");
            props.handleFilters("", "providers")
        } else {
            setProvidertitle(temp[0])
            props.handleFilters(temp[0], "providers")
        }
        setproviders(false)
        

    }
    const onFilterListClick = (e) => {
        let temp = e.currentTarget.id.split("-avoid");
        if (temp[0] == "clear") {
            setFilterTitle("Apply filters");
        } else {
            setFilterTitle(temp[0])
        }
        props.handleFilters(temp[0], "filters")
        setFilters(false)
    }
    return (

        <div className={styles.filtersHolder}>

            <div className={styles.gameProvidersH}>

                <div className={styles.dropDownWraper}>

                    <div id="providersDropDown-avoid" className={`${styles.dropDownH} ${isProviders ? styles.dropDownHBg : styles.dropDownH}  `} onClick={openProviders}>

                        {/* <div id={"providersDropDown-avoid"} className={isProviders ? styles.dropDownHBg : styles.dropDownH} onClick={openProviders}> */}
                        <span id={"providers-avoid"} >{ptitle}</span>
                        < ArrowDropDownCircleOutlinedIcon id={"providersDropDownIcon-avoid"} />
                    </div>

                    {isProviders ?
                        <div className={styles.providersList} >

                            {allproviders && allproviders.map((obj, i) =>
                                <div id={obj.provider + "-avoid"} key={i} className={styles.listItems} onClick={onProvidersListClick}>
                                    <div className={styles.img}><Image id={obj.provider + "b-avoid"} src={obj.icon} quality={100} layout="fill" /></div><span id={obj.provider + "b-avoid"}>{obj.provider}</span></div>
                            )}


                            <div id={"clearproviders-avoid"} className={`${styles.listItems} ${styles.clearFilters}`} onClick={onProvidersListClick}><span id={"cleari-avoid"}>{"Clear Filters"}</span></div>

                        </div> : ""}

                </div>

                <div className={styles.dropDownWraper}>

                    <div id="filtersDropDown-avoid" className={`${styles.dropDownH} ${isFilters ? styles.dropDownHBg : styles.dropDownH}  `} onClick={openFilters}>
                        {/* <div  id={"filtersDropDown-avoid"} className={styles.dropDownH} onClick={openFilters}> */}
                        <span id={"F-avoid"}>{FTitle}</span>
                        <ArrowDropDownCircleOutlinedIcon id={"FDropDownIcon-avoid"}/>
                    </div>
                    {isFilters ?
                        <div className={styles.providersList}>

                            {allFilters && allFilters.map((obj, indx) =>
                                <div id={obj + "-avoid"} key={indx} className={styles.listItems} onClick={onFilterListClick}><span id={obj + "i-avoid"}>{obj}</span></div>
                            )}

                            <div id={"clear-avoid"} className={`${styles.listItems} ${styles.clearFilters}`} onClick={onFilterListClick}><span id={"cleari-avoid"}>{"Clear Filters"}</span></div>


                        </div> : ""}
                </div>

            </div>

            <div className={styles.gameSearchHolder}>
                <div className={styles.gameSearch}>
                    <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
                </div>
            </div>

        </div>

    )
}

export default Filters;
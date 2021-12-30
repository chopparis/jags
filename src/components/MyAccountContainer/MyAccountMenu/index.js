import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import styles from './style.module.scss';
// import AddressIcon from './address-card.svg';
// import ReactLogo from './address-card.svg';

import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const MyAccountMenu = (props) => {

    const router = useRouter();

    useEffect(() => {
        // console.log(props.menuList , "_______--AcctMenuList")
        let filter = props.menuList && props.menuList.filter(obj => obj.name == "myaccount" || obj.id == "m2");
        // console.log(filter[0] , "____filter___--AcctMenuList");
        if (filter[0] != undefined) {
            setAccntItems(filter[0].subMenu);
        } else {
            setAccntItems([]);
        }
    }, [props.menuList]);


    const [accntItems, setAccntItems] = useState([
        // { name: "mydetails", permaLink: "my-details" , display_name:"My Details"},
        // { name: "changepassword", permaLink: "change-password" , display_name:"Change Password"},
        // { name: "addnewcard", permaLink: "add-card" , display_name:"Add New Card"},
        // { name: "deposit", permaLink: "deposit" , display_name:"Deposit"},
        // { name: "withdraw", permaLink: "withdraw" , display_name:"Withdraw"},
        // { name: "depositlimit", permaLink: "deposit-limit" , display_name:"Deposit Limit"},
        // { name: "mybonus", permaLink: "my-bonus" , display_name:"My Bonus"},
        // { name: "myhistory", permaLink: "my-history" , display_name:"My History"},
        // { name: "myfiles", permaLink: "my-files" , display_name:"My Files"},
        // { name: "inbox", permaLink: "inbox" , display_name:"Inbox"}

    ]);

    const [selectAcct, setSectcAcc] = useState("overview");
    const [isSlide, setToggleMenu] = useState(true);


    useEffect(() => {
        let currentSelect = router.query.index[0];
        console.log(currentSelect, "_____---overview")
        if (currentSelect == "overview") {
            // setSectcAcc("overview");
            return;
        }
        // console.log(currentSelect , "_____--currentSelect" , accntItems.length)
        const myacLength = accntItems.length;
        if (myacLength > 0) {
            for (let i = 0; i < myacLength; i++) {
                if (accntItems[i].permalink == currentSelect) {
                    //   console.log(currentSelect , "__b___--currentSelect")
                    setSectcAcc(accntItems[i].name);

                }
            }
        }


    }, [router.query, accntItems]);

    // useEffect(() => {

    // }, [isSlide]);

    const getMenuIcons = (cardObj) => {

        let menuicon;

        switch (cardObj.permalink) {
            case "my-details":
                menuicon = <FontAwesomeIcon icon={faAddressCard} className={styles.menuIcon} />
                break;
            case "change-password":
                menuicon = <FontAwesomeIcon icon={faLock} className={styles.menuIcon} />
                break;
            case "add-card":
                menuicon = <FontAwesomeIcon icon={faCreditCard} className={styles.menuIcon} />
                break;
            case "deposit":
                menuicon = <FontAwesomeIcon icon={faDonate} className={styles.menuIcon} />
                break;
            case "withdraw":
                menuicon = <FontAwesomeIcon icon={faHandHoldingUsd} className={styles.menuIcon} />
                break;
            case "deposit-limit":
                menuicon = <FontAwesomeIcon icon={faShieldAlt} className={styles.menuIcon} />
                break;
            case "my-bonus":
                menuicon = <FontAwesomeIcon icon={faMedal} className={styles.menuIcon} />
                break;
            case "my-history":
                menuicon = <FontAwesomeIcon icon={faClock} className={styles.menuIcon} />
                break;
            case "my-files":
                menuicon = <FontAwesomeIcon icon={faFileAlt} className={styles.menuIcon} />
                break;
            case "inbox":
                menuicon = <FontAwesomeIcon icon={faEnvelopeOpenText} className={styles.menuIcon} />
                break;
            default:
                menuicon = <FontAwesomeIcon icon={faUserCircle} className={styles.menuIcon} />
        }

        return menuicon;


    }
    const onItemclick = (itemObj) => (event) => {
        // props.onMenuItem(cardObj);
        //  console.log(itemObj , "_______---itemObj")

        router.push("/myaccount/" + itemObj.permalink);
    }

    const onOverViewPage = (e) => {
        e.preventDefault();
   // if(e.currentTarget.id == "overviewBtn"){
        router.push("/myaccount/overview");
      // }
       
    }


    const toggleMenuSlide = (e) => {
        e.preventDefault();
       // if(e.currentTarget.id == "toggleMenu"){
            setToggleMenu(!isSlide);
         //  }
        

    }

    return (
        <div className={`${styles.myAccPanel} ${isSlide ? styles.myAccPanel : styles.myAccPanel_mini}  `}>

            <div  className={styles.accTitle} >
                <div id={"overviewBtn"} className={styles.avataricon} onClick={onOverViewPage}> <FontAwesomeIcon icon={faUserCircle} className={styles.menuIcon} /></div>
               {isSlide ?  <span className={(selectAcct == "overview") ? styles.selectAcctColor : styles.unselectAcct} >{"My Account"}</span> : "" }
                <div id={"toggleMenu"} className={styles.menu_devider} onClick={toggleMenuSlide}> <FontAwesomeIcon icon={isSlide ? faChevronLeft : faChevronRight} className={styles.menuIcon} /></div>
                {/* <div className={styles.avataricon} onClick={toggleMenuSlide}> <FontAwesomeIcon icon={faChevronRight} className={styles.menuIcon} /></div> */}
            </div>

            
           
            <div className={styles.itemsWraper}>


                <ul>
                    {/* <li onClick={onItemclick("cardObj")} key={"k"}><span>{"cardObj"}</span></li>

                        <li onClick={onItemclick("cardObj")} key={"k"}><span>{"cardObj2"}</span></li> */}

                    {accntItems && accntItems.map((itemsObj, k) => <li className={(selectAcct == itemsObj.name) ? styles.selectAcctColor : styles.unselectAcct} onClick={onItemclick(itemsObj)} key={k}>
                        {/* <AddressIcon className={styles.menuIcon}></AddressIcon> */}
                        {getMenuIcons(itemsObj)}
                      <span className={isSlide ? styles.showLable : styles.hideLable}>{itemsObj.display_name}</span>

                    </li>)}

                </ul>

            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        menuList: state.StaticDataReducer.menuList
    };
};

// export default MenuContainer;
export default connect(mapStateToProps)(MyAccountMenu)


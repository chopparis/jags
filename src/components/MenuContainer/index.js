import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenuItem';
import { connect } from "react-redux";
import { useRouter } from "next/router";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
const MenuContainer = (props) => {
  const router = useRouter();
  // const menuList = useSelector(state => state.StaticDataReducer.menuList);
  //const temList = [...menuList];

  // const filterdList = temList && temList.filter(function (e) { return e.showInMainMenu == true });
  // console.log(filterdList , "___filterdListfilterdListfilterdList");


  // const [showSubMenu, setSubMenu] = useState(false);
  // const [showMoreGames, setMoreGames] = useState(false);
  const [filterdList, setFilterdList] = useState([])
  const [subMenuArr, setSubMenuItems] = useState([]);
  const [leftArrow, setLeftArrow] = useState(true);
  const [rightArrow, setRightArrow] = useState(false);
  const [colorIndex, setColorIndex] = useState();
 const [hasScroll ,setHasScoll] = useState(false);
  const [subMenuColorIndex, setSubMenuColorIndex] = useState();
  const phoneInputRef = React.useRef(null);


  useEffect(() => {
      //  console.log( "<<_________obj.permalink_>>" , router.query.index , "____---router.query" , router.query , "_______" , router)

    let tempList = [...props.menuList];
    // console.log(tempList , "________----tempListtempListtempList")
    const filterdList = tempList && tempList.filter(function (e) { return e.showInMainMenu == true });

    //let subMenuList = [];

    

    //  if(retrievedObject){
    //   console.log('retrievedObject: ', JSON.parse(retrievedObject));
    //  }



   // console.log( localStorage && localStorage.gameType.id , "Ll___@@@@@@@@@@@@@@@@____--router.query.index" , router.query.index)

          // for (let i = 0; i < filterdList.length; i++) {

          //       let obj = filterdList[i];
          //       console.log(router.query.index , "_______--router.query.index")
          //       if (( obj.permalink == router.query.index)) {
          //         //  if (obj.permalink == router.query.index) {
          //         if (obj.subMenu && obj.subMenu.length > 0) {
          //           subMenuList = [...obj.subMenu];
          //         }
          //       } else {
          //         if (obj.subMenu && obj.subMenu.length > 0) {

          //           for (let k = 0; k < obj.subMenu.length; k++) {
          //             let subObj = obj.subMenu[k]
          //             if (subObj.permalink == router.query.index) {
          //               subMenuList = [...obj.subMenu];
          //             }
          //           }
          //         }
          //       }


          //     }


          var currentGapeType = localStorage && localStorage.getItem('gameType');
          let gameType = JSON.parse(currentGapeType);
// console.log(gameType.id , "________________IDDD")
          
          if(router.query.index != undefined && router.query.index.length > 0 ){
         //---index of 0 always mainMenu
            let currentManuName = router.query.index[0];

            // let menuObj = filterdList.find(o => o.id == router.query.index[1]);
            let menuObj = filterdList.find(o => o.permalink == currentManuName);
            if( menuObj && menuObj.subMenu){
            //  console.log(menuObj['subMenu'] , "_________--subMenu");
              setSubMenuItems(menuObj['subMenu']);
            }
          }
          
          
          // if(Array.isArray(subM.subMenu)){
           
          // }
          
    
    
    setFilterdList(filterdList);
    // setSubMenuItems(subMenuList);


    // setTimeout(() => {
    //   if(phoneInputRef && phoneInputRef.current && phoneInputRef.current.scrollWidth != null ){
    //     setHasScoll(phoneInputRef.current.scrollWidth > phoneInputRef.current.clientWidth);
    //   }
    // }, 500)

  }, [props.menuList, router])


  const onLeftMove = (e) => {

    e.preventDefault();
    phoneInputRef.current.scrollLeft -= 500;
  }

  const handleScroll = (e) => {
    if ((phoneInputRef.current.scrollLeft + phoneInputRef.current.clientWidth) == phoneInputRef.current.scrollWidth) {

      setRightArrow(true);
      setLeftArrow(false);

    }

    if (phoneInputRef.current.scrollLeft == 0) {
      setLeftArrow(true);
      setRightArrow(false);
    }
  }

  const onRightMove = (e) => {
    e.preventDefault();
    phoneInputRef.current.scrollLeft += 500;
  }

  const onSelectedSubMenuItem = (menuItem, selectedIndex) => {
    setSubMenuColorIndex(selectedIndex)
  }


  return (
    <div className={styles.menuHolder}>
      <div className={styles.mainMenuContainer}>

        {hasScroll ? 

        <div className={styles.navHolder}>

          <div disabled className={`${leftArrow ? styles.disaNavBtn : styles.enabNavBtn}  ${styles.menu_navBtns}`} onClick={onLeftMove}><ArrowBackSharpIcon fontSize="inherit" /></div>
          <div className={`${rightArrow ? styles.disaNavBtn : styles.enabNavBtn}  ${styles.menu_navBtns}`} onClick={onRightMove}><ArrowForwardSharpIcon fontSize="inherit" /></div>
        </div> : "" }

        <div className={`${styles.menuContainer} ${hasScroll ? styles.setDisplay : styles.menuContainer}  `} ref={phoneInputRef} onScroll={handleScroll}>
          {filterdList && filterdList.map((obj, indx) => obj.showInMainMenu ? <MenuItem key={indx} cindex={colorIndex} temIndex={indx} propObj={obj} routPath={router.query.index} /> : "")}
        </div>
        {/* {console.log(subMenuArr.length , "____--subMenuArr")} */}
        {subMenuArr && subMenuArr.length > 0 ? <div className={styles.subMenuContainer}>
        {subMenuArr && subMenuArr.map((obj, indx) => <SubMenuItem key={indx} propObj={obj} routPath={router.query.index} cindex={subMenuColorIndex} temIndex={indx} onSelectedSubMenuItem={onSelectedSubMenuItem} />)}

          {/* {subMenuArr && subMenuArr.map((obj, indx) => <SubMenuItem key={indx} propObj={obj} routPath={router.query.index} cindex={subMenuColorIndex} temIndex={indx} onSelectedSubMenuItem={onSelectedSubMenuItem} />)} */}
        </div> : ""}



      </div></div>

  );
}

const mapStateToProps = (state) => {
  return {
    menuList: state.StaticDataReducer.menuList
  };
};

// export default MenuContainer;
export default connect(mapStateToProps)(MenuContainer)
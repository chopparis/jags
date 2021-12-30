import React, { useState, useEffect } from 'react';
import styles from './style.module.scss'
import PubSub from 'pubsub-js';
import Link from 'next/link';
import { useRouter } from "next/router";

const MenuItem = (props) => {
  const router = useRouter();
  const [isMenuMode, setMenuMode] = useState(false);
  const onPageOpen = (e) => {
   // PubSub.publish("OnMenuSelection", e);
    // router.push("/games/" + props.propObj.permalink)

    var game_Type_Obj = { 'permalink': props.propObj.permalink, 'id': props.propObj.id };
    localStorage && localStorage.setItem("gameType", JSON.stringify(game_Type_Obj));

  }

  const getRoutePath =()=>{
    // console.log(props.routPath , "__props.routPath");
   if(props.routPath != undefined && props.routPath.length > 0 ){
     return props.routPath[0]

   }else{
     return props.routPath;
   }
  }
  useEffect(() => {
    // console.log(props.propObj.permalink , "_____________" ,  router.query.index[1])
    if(router.query.index && router.query.index.length > 0){
      if (props.propObj.permalink == router.query.index[0]) {
        setMenuMode(true);
       }else{
        setMenuMode(false);
       }
    }
     
   }, [router])
  return (
    <div className={styles.menuItem} onClick={() => onPageOpen(props.propObj.name)}>
     
      <div className={`${styles.menuItemName} ${(isMenuMode ) ? styles.setBgColor : styles.menuItemName}  `} >
        <ul>
          <li>
            {/* <Link href={"/games/" + props.propObj.permalink}>
              <a>{props.propObj.display_name}</a>
            </Link> */}

<Link
            href={{
              // pathname: "/games/"  + props.propObj.permalink + "/" + props.propObj.id ,
               pathname: "/games/"  + props.propObj.permalink,
              // query: { slug: "Hello worls" },
            }}
          >
<a>{props.propObj.display_name}</a>
</Link>
          </li>
        </ul>
      </div>
     {(isMenuMode ) ?  <div className={styles.down_menu_triangle}></div> : "" }
    </div>

  );
}

export default MenuItem;
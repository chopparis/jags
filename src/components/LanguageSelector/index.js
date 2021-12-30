import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import styles from './style.module.scss';
import _ from "lodash";

const LanguageSelector = (props) => {
    const router = useRouter();
    let LangArr = [  
        { "flag": "en.svg", "lang": "English" , "code":"en"},
        //  { "flag": "fr.svg", "lang": "french" , "code":"fr"},
         { "flag": "fr.svg", "lang": "Spanish" , "code":"es"}
]

    const [LangObj, setLang] = useState([]);

    const [isShow , setLangStrip] = useState(false)
    const [initObj , setInitObj] = useState([]);

    useEffect(() => {
    let Lan = router.locale ? router.locale : "en"
    //console.log(_.filter(LangArr, {code : Lan } ), "_+____" , Lan)
    setInitObj(_.filter(LangArr, {code : Lan } ));
       setLang(LangArr);
    
    }, []);
     

    useEffect(() => {
        setLangStrip(false)
     }, [router]);
    

    const onLangSelect = (obj,i) => (event) => {
         // console.log(obj , "___________LLL" , i)
       // setLang(temp)
     //console.log(router.asPath, "________", router.asPath, "------------" ,{ locale: obj.code } , "<<<<<<,,,routerrouter")
        // router.push('/', '/', { locale: obj.code })
        router.push(router.asPath, router.asPath, { locale: obj.code });
        //router.reload(window.location.pathname);
       // router.reload()
    }

    const onShowHideLang= () =>{
        setLangStrip(!isShow)
    }

    const getLangTxt =()=>{
       let obj =  LangObj && LangObj.find(c => c.code == router.locale);
      // console.log(obj , "_______-objobj")
     
       return obj && obj.lang ? obj.lang : "English";
    }

    return (

        <div >
            <div className={styles.Langholder}>
                <div className={styles.lanDisplay} onClick={onShowHideLang}>
                    {/* {console.log(initObj[0]["flag"] , "s__-Lang")} */}
                  <div className={styles.thumbImg}> 
                  <Image 
                        //  src= {initObj &&  initObj[0]["flag"] }
                      
                       src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/"+ router.locale + ".svg" + "?v=" + props.versionNum}
                       alt="Casino games Logo"
                        quality={100}
                        // width={30}
                        // height={30}
                         layout="fill"
                        objectFit="cover"
                    // objectFit="contain"
                    /></div>  
                    <span>{LangObj && getLangTxt()} </span>
                    <ArrowDropDownCircleOutlinedIcon className={styles.langDropDown}/>
                </div>
                

                { isShow ? 

                <div className={styles.stripsholder}>

                    {
                        LangObj && LangObj.map((obj, i) =>

                            <div key={i} className={styles.langStrip} onClick={onLangSelect(obj,i)}>
                                 <div className={styles.thumbImg}> 
                                <Image
                                    src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/"+ obj.flag + "?v=" + props.versionNum}
                                    alt="Casino games Logo"
                                    quality={100}
                                    width={30}
                                    height={30}
                                    objectFit="cover"
                                />
                                </div>
                                
                                 <span>{obj.lang}</span>
           
                                
                            </div>

                        )}


                </div> : "" }
            </div>
        </div>
    )
}
export default React.memo(LanguageSelector);
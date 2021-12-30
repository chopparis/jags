import React, { useState, useEffect } from 'react';
import { connect} from "react-redux";
// import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
// import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './style.module.scss';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const CarouselWidget = (props) => {
  let basePath = isMobile ? "/images/promotions/mob/" : "/images/promotions/desk/";

  const [banners, setBaners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setBaners(props.appConf);
    setCurrentSlide(currentSlide + 1)
  }, [props.appConf]);

  const onNext = () => {
    setCurrentSlide(currentSlide + 1);

  };
  const onSlideChange = (index) => (event) => {
    setCurrentSlide(index)
  }
  const onPrev = () => {
    setCurrentSlide(currentSlide - 1)
  };

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index)
    }
  };

  const settings = {
    showArrows: false,
    interval: 4500,
    dynamicHeight: false,
    stopOnHover: false,
    infiniteLoop: true,
    showStatus: false,
    transitionTime: (isMobile) ? 500 : 1000,
    showThumbs: false,
    showIndicators: false,
    swipeable: true,
    emulateTouch: true,
    autoPlay: true,
  };

  return (
    // <div className={styles.carouseHolder}>
    <section className={styles.carouseHolder}>
      <div className={styles.carouselBanner}>
      <div className={styles.caro_rightbtn_wraper}>
        <div className={styles.caro_rightBtn} onClick={onNext} > 
        <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className={styles.caro_leftbtn_wraper}>
        <div className={styles.caro_leftBtn} onClick={onPrev} > <FontAwesomeIcon icon={faAngleLeft} /></div>
      </div>


      <Carousel selectedItem={currentSlide} {...settings} onChange={updateCurrentSlide}>

        {/* {banners && banners.map((obj, indx) => <div key={indx} className={homeStyles.HerocarousItemHolder} > */}
        {banners.promotionBanners && banners.promotionBanners.map((obj, indx) => <div key={indx} className={styles.setBannerBg} style={{ backgroundImage: `url(${banners.domaine + basePath + obj.imgPath + "?v=" + banners.version})` }}>

          {/* <Image
            // src={obj.imgPath}
             src={basePath + obj.imgPath}
            // src = { basePath +"homepage.jpg"}
            // src = { basePath +"banner.jpg"}
            priority
            alt={obj.name}
            layout="fill"
            quality={100}
          //  objectFit="cover"
          /> */}
          <div className={styles.promotionCard}><h1 className={styles.promotionTitle}>Your Welcome Offer</h1>
            <p className={styles.promotionTxt}>Get up to $1,200 + 200 Free Spins</p>
            <div className={styles.climBtn} ><div>{"LET'S START"}</div></div></div>

        </div>)}
      </Carousel>
      <div className={styles.slideBtnsWraper}>

        {banners.promotionBanners && banners.promotionBanners.map((obj, indx) =>
          <div key={indx} className={`${styles.slideBtn} ${(indx == currentSlide) ? styles.activeBg : styles.inActiveBg}  `} onClick={onSlideChange(indx)}></div>)}


      </div>
      </div></section>
    // </div>
  );
}

const mapStateToProps = (state) => {
  return {
    appConf: state.StaticDataReducer.appConfigObj
  };
};

export default connect(mapStateToProps)(CarouselWidget)

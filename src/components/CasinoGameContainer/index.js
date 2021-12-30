import React from 'react';
// import homeStyles from '../../../styles/Home.module.scss';
import styles from './style.module.scss';
import GameProviders from '../GameProviders/';
import Winners from '../Winners/';
import { connect, connectAdvanced } from "react-redux";
import MenuContainer from "../MenuContainer/";
import WLGamesSection from "../WLGamesSection/";


const CasinoGameContainer = (props) => {

  return (
    <div className={styles.CasinoContainer}>
      <MenuContainer versionNum={props.appConfigObj.version}/>
      <div className={styles.gamesHolder}>
        {props.gamesSections && props.gamesSections.length > 0 && props.gamesSections.map((obj, k) =>
          <div key={k}>
            <WLGamesSection  categryObj={obj}  versionNum={props.appConfigObj.version} showInfo={props.appConfigObj.showgameInfo} cacheGamesList={props.cacheGamesList}/>
          </div>)}
          <GameProviders  domain_cdn = {props.appConfigObj.domain_cdn} versionNum={props.appConfigObj.version} pList={props.providersList}/>
          <Winners domain_cdn = {props.appConfigObj.domain_cdn} versionNum={props.appConfigObj.version} /> 
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      gamesSections: state.StaticDataReducer.gamesSections,
      appConfigObj: state.StaticDataReducer.appConfigObj,
      cacheGamesList: state.StaticDataReducer.gamesList,
      providersList: state.StaticDataReducer.providersList,
      // languageLabels: state.StaticDataReducer.languageLabels
  };
};

 export default connect(mapStateToProps)(CasinoGameContainer)

// export default React.memo(CasinoGameContainer);
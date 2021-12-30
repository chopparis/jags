import {
  // UPDATE_ASSET_SITE_INFO,
  UPDATE_MENU_CONFIG,
  OPEN_FORM_TYPE,
  UPDATE_APP_CONFIG,
  UPDATE_REG_CONFIG,
  UPDATE_APP_LABLES_CONFIG,
  PLAYER_INFO,
  UPDATE_GAME_LIST,
  UPDATE_MENU_LIST,
  UPDATE_PROVIDERS_LIST,
  UPDATE_CMS_PLAIN_MENU_LIST,
  OPEN_MODEL_WINDOW,
  CLOSE_MODEL_WINDOW,
  OPEN_GAME_WINDOW,
  UPDATE_DEVICE_TYPE_OBJ,
  GAME_SECTIONS
} from "../../utils/constants";

const staticData = {
  intialDataloaded: false,
  openFormType:"",
  menuObj:[],
  appConfigObj:[],
  regConfigObj:{},
  gamesList:{},
  menuList:[],
  providersList:[],
  cms_plain_menuList:[],
  homeLables:{},
  languageLabels:{},
  isUserLogin:false,
  openDialogWindow:false,
  openGameTypeWindow:'',
  deviceTypeObj : {},
  playerInfo:{},
  gamesSections:[],
  cacheObj : {}
};

const StaticDataReducer = (state = staticData, action) => {
  
  switch (action.type) {
    case UPDATE_MENU_CONFIG:
      return Object.assign({}, state, {
        intialDataloaded: true,
        menuObj : action.data
      });
    case UPDATE_DEVICE_TYPE_OBJ:
      return Object.assign({}, state, {
        deviceTypeObj : action.data
      });
    case UPDATE_APP_CONFIG:
      return Object.assign({}, state, {
        appConfigObj : action.data
      });
      case UPDATE_REG_CONFIG:
        return Object.assign({}, state, {
          regConfigObj : action.data
        });

    case UPDATE_GAME_LIST:
     
      state.cacheObj[action.data.cetegoryID] = action.data.cachegamesList;
      return Object.assign({}, state, {
        gamesList :state.cacheObj
      });
      case UPDATE_MENU_LIST:
        return Object.assign({}, state, {
          menuList : action.data
        });
        case UPDATE_PROVIDERS_LIST:
          return Object.assign({}, state, {
            providersList : action.data
          });
        case UPDATE_CMS_PLAIN_MENU_LIST:
          return Object.assign({}, state, {
            cms_plain_menuList : action.data
          });
        case OPEN_MODEL_WINDOW:
        return Object.assign({}, state, {
          openDialogWindow : action.data
        });
        case CLOSE_MODEL_WINDOW:
        return Object.assign({}, state, {
          openDialogWindow : action.data
        });
        case OPEN_GAME_WINDOW:
          return Object.assign({}, state, {
            openGameTypeWindow : action.data
          });
    case UPDATE_APP_LABLES_CONFIG:
      return Object.assign({}, state, {
        languageLabels : action.data
      });
    case OPEN_FORM_TYPE:
        return Object.assign({},state,{
          openFormType: "openRegistration",
        })
    case PLAYER_INFO:
      return Object.assign({}, state, {
        playerInfo : action.data
      });

      case GAME_SECTIONS:
      return Object.assign({}, state, {
        gamesSections : action.data
      });

    default:
      return state;
  }
};

export default StaticDataReducer;

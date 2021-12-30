import { combineReducers } from "redux";

import StaticDataReducer from "./StaticDataReducer";
import configReducer from "./configReducer";
import SlotsReducer from "./SlotsReducer";
import TableGamesReducer from "./TableGamesReducer";

const rootReducer = combineReducers({
    configReducer,
    StaticDataReducer,
    SlotsReducer,
    TableGamesReducer
});

export default rootReducer;

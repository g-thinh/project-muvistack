import { combineReducers } from "redux";

import TOGGLERS from "./ui-reducer";
import USER from "./user-reducer";

export default combineReducers({ TOGGLERS, USER });

import { combineReducers } from "redux";

import TOGGLERS from "./ui-reducer";
import USER from "./user-reducer";
import MOVIE from "./movie-reducer";
import CHAT from "./chat-reducer";

export default combineReducers({ TOGGLERS, USER, MOVIE, CHAT });

import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// const initialState = {};

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  error: errorReducer
});

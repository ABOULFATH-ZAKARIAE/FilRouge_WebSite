import { combineReducers } from "redux";
import AuthReducer from "./AuthtReducer";
import CartReducer from "./CartReducer";

const rootReducers = combineReducers({
  auth: AuthReducer,
  cart: CartReducer,
});

export default rootReducers;

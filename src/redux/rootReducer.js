import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
const rootReducer = combineReducers({
  cartItems: cartReducer,
});

export default rootReducer;

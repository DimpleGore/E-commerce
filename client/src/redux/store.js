import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import cookie from "js-cookie";

import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/productReducers";


const cartItems = cookie.getJSON("cartItems") || [];

const initalState = { cart: { cartItems } };

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetail: getProductDetailsReducer,
});


const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

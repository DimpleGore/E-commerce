import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

import Cookie from "js-cookie";

export const addToCart = (id, qty, index) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      productId: data._id,
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.images.url,
      countInStock: data.countInStock,
      qty,
    },
  });
  const {
    cart: { cartItems },
  } = getState();

  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

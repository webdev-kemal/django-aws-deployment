import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../store/constants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/courses/main/${id}`
  );
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      title: data.title,
      author: data.author,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/courses/main/${id}`);

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};

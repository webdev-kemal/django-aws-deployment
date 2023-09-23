//2
//CREATE STORE
import quizReducer from "../reducers/quiz";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { coursesReducer, courseDetailReducer } from "../reducers/courses";
import { cartReducer } from "../reducers/cart";
import {
  userDetailsReducer,
  userReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "../reducers/user";
import { composeWithDevTools } from "redux-devtools-extension";
import { json } from "react-router-dom";

export default () => {
  // const store = createStore(quizReducer);
  // const userInfoFromStorage = localStorage.getItem("userInfo")
  //   ? JSON.parse(localStorage.getItem("userInfo"))
  //   : null;

  // //bu taraflara tekrar bak
  // const initialState = {
  //   userLogin: userInfoFromStorage,
  // };

  const reducer = combineReducers({
    courseStore: coursesReducer,
    courseDetailStore: courseDetailReducer,
    quiz: quizReducer,
    cart: cartReducer,
    user: userReducer,
    register: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
  });

  const store = createStore(
    reducer,
    // initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

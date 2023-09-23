import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../store/constants";

const cartItemsStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initalState = {
  //   loading: false,
  //   error: null,
  cartItems: cartItemsStorage,
};
// const initalState = {
//   //   loading: false,
//   //   error: null,
//   cart: { cartItems: cartItemsStorage },
// };
//^^ initialState = cartState aslında
//state = cartState  yazılacak, cart: { cartItems } yerine de direkt cartItems: cartItemsStorage yazılacak büyük ihtimalle

// export const cartReducer = (state = { cartItems: [] }, action) => {
export const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const itemExists = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (x) => (x.product === itemExists.product ? item : x)
            //tüm cartItem'leri dönderir, fakat zaten var olan item için bunu yaparken, eskisini siler, yeni itemi koyar
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};

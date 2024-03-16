import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/login-slice";
import usersReducer from "./users/users-slice";
import basketReducer from "./basket/basket-slice";
import productsReducer from "./products/products-slice";
import ordersReducer from "./orders/orders-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./type";

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    basket: basketReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});

export default store;

export const useAppDispatch: () => AppDispatch = useDispatch;

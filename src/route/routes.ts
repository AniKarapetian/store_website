import NotFoundPage from "../components/app/NotFoundPage";
import Basket from "../components/basket/Basket";
import { Home } from "../components/home/Home";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import Orders from "../components/order/Orders";
import { ProductPage } from "../components/product/ProductPage";
import { ProductsList } from "../components/product/ProductsList";
import { UserProfile } from "../components/user/UserProfile";

import Users from "../components/user/Users";
import { RouteType } from "./types";

export const routes: RouteType[] = [
  {
    type: "public",
    Component: Home,
    path: "/",
    name: "Home",
  },
  {
    type: "public",
    Component: Home,
    path: "/home",
    name: "Home",
  },
  {
    type: "public",
    Component: ProductsList,
    path: "/products",
    name: "Products",
  },
  {
    type: "private",
    Component: Orders,
    path: "/orders",
    name: "Orders",
  },
  {
    type: "private",
    Component: UserProfile,
    path: "/user",
    name: "Profile",
  },
  {
    type: "private",
    Component: Users,
    path: "/users",
    name: "Users",
  },
  {
    type: "private",
    Component: ProductPage,
    path: "/products/:id",
    name: "Product Details",
  },
  {
    type: "no-auth",
    Component: SignIn,
    path: "/sign-in",
    name: "Sign In",
  },
  {
    type: "no-auth",
    Component: SignUp,
    path: "/sign-up",
    name: "SignUp",
  },
  {
    type: "private",
    Component: Basket,
    path: "/basket",
    name: "Basket",
  },
  {
    type: "private",
    Component: UserProfile,
    path: "/profile",
    name: "Profile",
  },
  {
    type: "public",
    Component: NotFoundPage,
    path: "*",
    name: "Not Found",
  },
];

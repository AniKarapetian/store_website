import { Home } from "../components/home/Home";
import { OrdersList } from "../components/order/OrdersList";
import { ProductsList } from "../components/product/ProductsList";
import { UserProfile } from "../components/user/UserProfile";

import { User } from "../components/user/Users";
import { RouteType } from "./types";

export const routes: RouteType[] = [
  {
    type: "public",
    Component: Home,
    path: "/home",
    name: "Home",
  },
  {
    type: "private",
    Component: ProductsList,
    path: "/products",
    name: "Products",
  },
  {
    type: "private",
    Component: OrdersList,
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
    Component: User,
    path: "/users",
    name: "Users",
  },
];

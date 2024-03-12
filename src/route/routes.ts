import { Home } from "../components/home/Home";

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
    Component: User,
    path: "/users",
    name: "Users",
  },
];
// 2. My Profile
// 3. Product list
// 4. Product details
// 5. Shopping cart
// 6. Orders
// 7. Admin

import SearchScreen from "../screens/SearchScreen/SearchScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen/NotFoundScreen";
const routeConfig = [
  {
    path: "/login",
    component: LoginScreen,
    exact: true,
  },
  {
    path: "/search",
    component: SearchScreen,
  },

  {
    path: "*",
    component: NotFoundScreen,
  },
  {
    path: "not-found",
    component: NotFoundScreen,
  },
];

export default routeConfig;

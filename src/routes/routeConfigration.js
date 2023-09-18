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
    protected: false,
  },

  {
    path: "*",
    component: NotFoundScreen,
    protected: false,
  },
  {
    path: "not-found",
    component: NotFoundScreen,
    protected: false,
  },
];

export default routeConfig;

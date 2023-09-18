import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/authSlice";
import userReducer from "../state/user/userSlice";
import searchReducer from "../state/search/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    user: userReducer,
  },
});

export default store;

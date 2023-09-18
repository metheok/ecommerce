import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/authSlice";
import userReducer from "../state/user/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    user: userReducer,
  },
});

export default store;

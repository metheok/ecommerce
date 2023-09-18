import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { clearUser } from "../user/userSlice";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userToken,
  loginError: null,
  loginSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // localStorage.removeItem("userToken");
      state.loading = false;
    },

    clearErrors: (state) => {
      state.loading = false;

      state.loginError = null;

      state.loginSuccess = false;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.loginError = null;

      state.loginSuccess = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loginSuccess = true;
      state.userToken = payload.userToken;
      state.loginError = null;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.loginError = payload;
      state.loginSuccess = false;
    },
  },
});

export const { logout, clearErrors } = authSlice.actions;
export const logoutAndClearUser = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearUser());
};
//selectors
export const isLoading = (state) => state.auth.loading;

export default authSlice.reducer;

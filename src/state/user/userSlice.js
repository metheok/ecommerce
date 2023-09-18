import { createSlice } from "@reduxjs/toolkit";
import { userFetch, userUpdate } from "./userActions";

const initialState = {
  user: null,

  userLoading: true,
  userError: null,
  userSuccess: false,

  userUpdateSuccess: false,
  userUpdateError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.userLoading = false;
      state.userError = null;
      state.userSuccess = false;

      state.userUpdateError = null;
      state.userUpdateSuccess = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userError = null;
      state.userSuccess = false;
      state.userLoading = false;
      state.userUpdateSuccess = false;
      state.userUpdateError = null;
    },
  },
  extraReducers: {
    [userFetch.pending]: (state) => {
      state.userLoading = true;
      state.userError = null;
      state.userSuccess = false;
    },
    [userFetch.fulfilled]: (state, { payload }) => {
      state.userLoading = false;
      state.user = payload;
      state.userSuccess = true;
    },
    [userFetch.rejected]: (state, { payload }) => {
      state.userLoading = false;
      state.userError = payload;
    },

    [userUpdate.pending]: (state) => {
      state.userLoading = true;
      state.userUpdateError = null;
      state.userUpdateSuccess = false;
    },
    [userUpdate.fulfilled]: (state, { payload }) => {
      state.userLoading = false;
      state.user = payload;
      state.userUpdateSuccess = true;
    },
    [userUpdate.rejected]: (state, { payload }) => {
      state.userLoading = false;
      state.userUpdaterror = payload;
    },
  },
});

export const { clearErrors, clearUser } = userSlice.actions;

//selectors
export const isLoading = (state) =>
  state.user.userLoading || state.user.userUpdateLoading;

export default userSlice.reducer;

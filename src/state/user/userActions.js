import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const userFetch = createAsyncThunk(
  "auth/userFetch",
  async (params, { rejectWithValue, getState }) => {
    try {
      // configure header's Content-Type as JSON
      const token = getState().auth.userToken;

      if (!token) {
        throw { message: "user token" };
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/api/user`, config);

      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userUpdate = createAsyncThunk(
  "auth/userUpdate",
  async (params, { rejectWithValue, getState }) => {
    try {
      // configure header's Content-Type as JSON
      const token = getState().auth.userToken;

      if (!token) {
        throw { message: "user token" };
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch(`/api/user`, params, config);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

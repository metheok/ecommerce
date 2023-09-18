import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const productFetch = createAsyncThunk(
  "auth/productFetch",
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
      const { data } = await axios.get(
        `/api/product?${params.search ? `search=${params.search}&` : ""}${
          params.category ? `category=${params.category}&` : ""
        }${params.page ? `page=${params.page}` : ""}`,
        config
      );

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

export const categoryFetch = createAsyncThunk(
  "auth/categoryFetch",
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

      const { data } = await axios.get(`/api/category`, config);

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

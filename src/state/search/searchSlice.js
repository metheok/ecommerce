import { createSlice } from "@reduxjs/toolkit";
import { productFetch, categoryFetch } from "./searchActions";

const initialState = {
  productFetchLoading: false,
  productFetchSuccess: false,
  productFetchError: null,
  categoryFetchLoading: false,
  categoryFetchSuccess: false,
  categoryFetchError: null,
  products: [],
  categories: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [productFetch.pending]: (state) => {
      state.productFetchLoading = true;
      state.productFetchError = null;
      state.productFetchSuccess = false;
    },
    [productFetch.fulfilled]: (state, { payload }) => {
      state.productFetchLoading = false;
      state.products = payload;
      state.productFetchSuccess = true;
    },
    [productFetch.rejected]: (state, { payload }) => {
      state.productFetchLoading = false;
      state.productFetchError = payload;
    },

    [categoryFetch.pending]: (state) => {
      state.categoryFetchLoading = true;
      state.categoryFetchError = null;
      state.categoryFetchSuccess = false;
    },
    [categoryFetch.fulfilled]: (state, { payload }) => {
      state.categoryFetchLoading = false;
      state.categories = payload;
      state.categoryFetchSuccess = true;
    },
    [categoryFetch.rejected]: (state, { payload }) => {
      state.categoryFetchLoading = false;
      state.categoryFetchError = payload;
    },
  },
});

//selectors
export const isLoading = (state) =>
  state.search.categoryFetchLoading || state.search.productFetchLoading;

export default searchSlice.reducer;

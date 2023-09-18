import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import css from "./SearchScreen.module.css";
import Loading from "../../components/Loading/Loading.js";
import { useDispatch } from "react-redux";
import { logoutAndClearUser } from "../../state/auth/authSlice";
import { useEffect } from "react";
import { userFetch, userUpdate } from "../../state/user/userActions";
import { categoryFetch, productFetch } from "../../state/search/searchActions";
import Header from "../../components/Header/Header";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import Listing from "../../components/Listing/Listing";

const SearchScreen = () => {
  const [showCategoryModal, changeShowCategoryModal] = React.useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    dispatch(userFetch());
  }, [dispatch]);

  const searchFilter = {};

  searchFilter.search = searchParams.get("q") || "";
  searchFilter.page = searchParams.get("page") || 1;
  searchFilter.category = searchParams.get("category") || "";

  const { auth, user, search } = state;
  const { loading, userToken, error } = auth;
  const {
    productFetchLoading,

    productFetchError,
    categoryFetchLoading,

    categoryFetchError,
    products,
    categories,
  } = search;

  const { userLoading, userUpdateLoading, userUpdateError, userError } = user;
  useEffect(() => {
    dispatch(productFetch(searchFilter));
  }, [
    dispatch,
    searchParams.get("q"),
    searchParams.get("category"),
    searchParams.get("page"),
  ]);
  useEffect(() => {
    dispatch(categoryFetch());
  }, []);
  if (
    loading ||
    userLoading ||
    userUpdateLoading ||
    productFetchLoading ||
    categoryFetchLoading ||
    productFetchError ||
    categoryFetchError
  ) {
    return (
      <div>
        <Header
          user={user.user?.user}
          onShowCategoryModal={() => {}}
          className={css.header}
          showCategoryModal={() => {}}
          searchText={searchParams.get("q") || ""}
          changeSearch={() => {}}
        />
        {productFetchError || categoryFetchError ? (
          <p className={css.error}>Failed to fetch data. Please try again.</p>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
  if (!user.user || userError || !userToken) {
    dispatch(logoutAndClearUser());
    return <Navigate to="/login" />;
  }
  const changeSearch = (val) => {
    navigate(
      `/search?q=${val}&category=${
        searchParams.get("category") || ""
      }&page=${"1"}`
    );
  };
  const handleCategorySelect = (val) => {
    navigate(
      `/search?q=${searchParams.get("q") || ""}&category=${val}&page=${"1"}`
    );
  };

  const cartChange = (id, val) => {
    let cart = [...(user.user?.user?.cart || [])];
    if (val) {
      cart.push(id);
    } else {
      const index = cart.indexOf(id);

      if (index !== -1) {
        cart.splice(index, 1);
      }
    }
    dispatch(userUpdate({ cart }));
  };
  return (
    <div>
      <Header
        user={user.user?.user}
        onShowCategoryModal={() => {
          changeShowCategoryModal(!showCategoryModal);
        }}
        className={css.header}
        showCategoryModal={showCategoryModal}
        changeSearch={changeSearch}
        searchText={searchParams.get("q") || ""}
      />
      <CategoryModal
        showCategoryModal={showCategoryModal}
        selectedCategory={searchParams.get("category") || ""}
        onToggleCategoryModal={() => {
          changeShowCategoryModal(!showCategoryModal);
        }}
        handleCategorySelect={handleCategorySelect}
        categories={categories.category}
      />
      <Listing
        data={products.products}
        categories={categories.category}
        pagination={products.pagination}
        cart={user.user?.user?.cart || []}
        cartChange={cartChange}
        onPageChange={(event, page) => {
          navigate(
            `/search?q=${searchParams.get("q") || ""}&category=${
              searchParams.get("category") || ""
            }&page=${page}`
          );
        }}
      />
    </div>
  );
};

export default SearchScreen;

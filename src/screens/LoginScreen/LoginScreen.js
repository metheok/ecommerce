import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

import css from "./LoginScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading.js";
import { Navigate } from "react-router";
import { logoutAndClearUser } from "../../state/auth/authSlice";

const LoginScreen = () => {
  const { loading, loginError, signupError } = useSelector(
    (state) => state.auth
  );
  const { user, profileLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!loading && !user) {
      dispatch(logoutAndClearUser());
    }
  }, [dispatch, loading, user]);
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/search" />;
  }

  return (
    <>
      <div>LoginScreen</div>
    </>
  );
};

export default LoginScreen;

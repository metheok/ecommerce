import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Alert, Container } from "react-bootstrap";
import css from "./ProductScreen.module.css";
import { Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading/Loading.js";

const ProductScreen = () => {
  const state = useSelector((state) => state);
  const { auth, user } = state;
  const { loading, error } = auth;
  const { userLoading } = user;

  if (loading || userLoading) {
    return <Loading />;
  }

  let renderComponent = null;

  return (
    <>
      <div>ProductScreen</div>
    </>
  );
};

export default ProductScreen;

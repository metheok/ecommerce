import { React, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import { Row } from "react-bootstrap";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen.js";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "./state/user/userActions";
import Routing from "./routes/Routing";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { auth, user } = state;
  useEffect(() => {
    dispatch(userFetch());
  }, [dispatch]);

  const { loading } = auth;
  const { userLoading } = user;
  if (loading || userLoading) {
    return <LoadingScreen user={user} auth={auth} />;
  }
  return (
    <>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <Row xs={12}>
          <Header auth={auth} user={user} />
        </Row>
        <div>
          <Routing />
        </div>
      </div>
    </>
  );
}

export default App;

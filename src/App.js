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

  return (
    <>
      <div>
        <div>
          <Routing />
        </div>
      </div>
    </>
  );
}

export default App;

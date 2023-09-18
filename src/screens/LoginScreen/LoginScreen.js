import React, { useState, useEffect } from "react";
import css from "./LoginScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading.js";
import { Navigate } from "react-router";
import { logoutAndClearUser } from "../../state/auth/authSlice";
import { TextField, Button, Container, Paper } from "@mui/material";
import { userLogin } from "../../state/auth/authActions";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, userToken, loginError, loginSuccess } = useSelector(
    (state) => state.auth
  );
  const { user, userLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginSuccess && userToken) {
      navigate("/search");
    }
  }, [loginSuccess, navigate, userToken]);
  if (user) {
    return <Navigate to="/search" />;
  }
  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    dispatch(userLogin({ email, password }));
  };
  return (
    <div className={css.root}>
      <Container maxWidth="xs">
        {loading || userLoading ? (
          <Paper elevation={3} className={css.loginBox}>
            <Loading />
          </Paper>
        ) : (
          <Paper elevation={3} className={css.loginBox}>
            <h2>Login</h2>
            <form>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                margin="normal"
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                margin="normal"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />

              <div className={css.errorContainer}>
                <p className={css.errorText}>{error}</p>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={css.submitButton}
                type="button"
                onClick={login}
              >
                Submit
              </Button>
            </form>
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default LoginScreen;

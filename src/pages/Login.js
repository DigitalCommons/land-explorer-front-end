import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Auth from "../utils/Auth";
import Spinner from "../components/common/Spinner";
import TopBar from "../components/top-bar/TopBar";
import constants from "../constants";

const Login = ({ updateBgImage }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const error = useSelector((state) => state.authentication.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("reset_token")) {
      // user has clicked reset password link
      login(true);
    }
    updateBgImage(0);
  }, []);

  useEffect(() => {
    // If user is logged in, redirect to app
    if (authenticated && Auth.isTokenActive()) {
      navigate("/app");
    }
  }, [authenticated]);

  const login = (useResetToken = false) => {
    setLoggingIn(true);

    let loginDetails;

    if (useResetToken) {
      loginDetails = new URLSearchParams({
        username: decodeURIComponent(searchParams.get("email")),
        reset_token: decodeURIComponent(searchParams.get("reset_token")),
        grant_type: "password",
      });
    } else {
      loginDetails = new URLSearchParams({
        username: email,
        password: password,
        grant_type: "password",
      });
    }

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(`${constants.ROOT_URL}/api/token`, loginDetails, config)
      .then((response) => {
        Auth.setToken(response.data.access_token, response.data.expires_in);
        dispatch({ type: "LOGGED_IN" });

        if (useResetToken) {
          // user needs to set a new password
          navigate("/app/my-account/password", { state: { mandatory: true } });
        } else {
          navigate("/app");
        }
      })
      .catch((err) => {
        console.log(err);
        const { response } = err;
        const errorMessage =
          response?.data.message || "Unable to log in. Please try again later.";
        setLoggingIn(false);
        dispatch({ type: "FAILED_LOGIN", payload: { errorMessage } });
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <TopBar limited={true} />
      <div
        style={{
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          position: "absolute",
          textAlign: "center",
          display: loggingIn ? "block" : "none",
        }}
      >
        <Spinner />
      </div>
      <div
        style={{
          height: "auto",
          minHeight: "200px",
          width: "500px",
          maxWidth: "90vw",
          background: "white",
          position: "absolute",
          left: "50%",
          top: "50%",
          boxSizing: "border-box",
          transform: "translateX(-50%) translateY(-50%)",
          textAlign: "center",
          paddingLeft: "24px",
          paddingRight: "24px",
          display: loggingIn ? "none" : "block",
        }}
      >
        <h2>Log In</h2>
        {error && <p style={{ marginBottom: "12px" }}>{error}</p>}
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            type="text"
            className="text-input"
            placeholder="Email address"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="text-input"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Log In"
            className="button button-medium"
            style={{
              paddingTop: 0,
              marginTop: "6px",
            }}
          />
        </form>
        <p>
          or,{" "}
          <Link
            to="/auth/register"
            style={{
              textDecoration: "none",
              color: "rgb(46, 203, 112)",
              paddingBottom: "4px",
              borderBottom: "1px solid rgb(46, 203, 112)",
            }}
          >
            register new account
          </Link>
        </p>
        <p>
          or,{" "}
          <Link
            to="/auth/reset-password"
            style={{
              textDecoration: "none",
              color: "rgb(46, 203, 112)",
              paddingBottom: "4px",
              borderBottom: "1px solid rgb(46, 203, 112)",
            }}
          >
            reset password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

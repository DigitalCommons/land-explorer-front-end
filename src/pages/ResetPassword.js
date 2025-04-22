import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import constants from "../constants";

const ResetPassword = ({ updateBgImage }) => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    valid: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.valid) {
      reset();
    }
  };

  const reset = () => {
    axios
      .post(`${constants.ROOT_URL}/api/user/password-reset`, {
        username: email.value,
      })
      .then((response) => {
        console.log("reset response", response);
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateBgImage(2);
  }, []);

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            position: "absolute",
            height: "auto",
            width: "340px",
            maxWidth: "90vw",
            background: "white",
            left: "50%",
            top: "50%",
            boxSizing: "border-box",
            textAlign: "center",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "12px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ fontWeight: 600 }}>Password reset requested</h3>
          <Link to="/auth">
            <div className="button button-small" style={{ margin: "auto" }}>
              Ok
            </div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            height: "auto",
            width: "340px",
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
            paddingBottom: "12px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ fontWeight: 600 }}>Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="text-input"
              placeholder="Email address"
              value={email.value}
              onChange={(e) => {
                let value = e.target.value;
                let valid = emailRegexp.test(value);
                setEmail({ value, valid });
              }}
            />
            <div style={{ marginTop: "16px" }}>
              <input
                type="submit"
                value="Reset"
                className="button button-full"
                style={{
                  paddingTop: 0,
                }}
              />
              <p>
                <Link
                  to="/auth"
                  style={{
                    textDecoration: "none",
                    color: "rgba(208, 2, 78, 0.95)",
                    fontSize: "14px",
                    borderBottom: "1px solid rgba(208, 2, 78, 0.95)",
                  }}
                >
                  Cancel
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default ResetPassword;

import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/common/Spinner";
import { Link, useLocation } from "react-router-dom";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const mandatory = useLocation().state?.mandatory;

  const changePassword = (e) => {
    e.preventDefault();

    if (passwordValid && confirmPasswordValid) {
      setSubmitting(true);

      const body = {
        password: password
      };

      axios.post(`${constants.ROOT_URL}/api/user/password`, body, getAuthHeader())
        .then((response) => {
          setSuccess(true);
          setSubmitting(false);
        })
        .catch((err) => {
          console.error("error changing password", err);
          setError(true);
          setSubmitting(false);
        });
    }
  };

  if (success) {
    return (
      <div
        className="registration modal"
        style={{
          height: "auto",
          width: "340px",
          maxWidth: "90vw",
          background: "white",
          boxSizing: "border-box",
          textAlign: "center",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "24px",
          paddingTop: "28px",
          borderRadius: "8px",
          margin: "0",
        }}
      >
        <div>
          <div>Your password has been changed successfully.</div>
          <div style={{ marginTop: "24px" }}>
            <Link to={`/app${mandatory ? '' : '/my-account'}`}>
              <div
                className="button button-medium"
                style={{ display: "inline-block", marginRight: "12px" }}
              >
                Ok
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (submitting) {
    return (
      <div
        style={{
          display: submitting ? "block" : "none",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          position: "absolute",
          textAlign: "center",
        }}
      >
        <Spinner />
      </div>
    );
  } else {
    return (
      <div
        className="registration modal"
        style={{
          height: "auto",
          width: "340px",
          maxWidth: "90vw",
          background: "white",
          boxSizing: "border-box",
          textAlign: "center",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "12px",
          paddingTop: "6px",
          borderRadius: "8px",
          margin: "0",
        }}
      >
        <div
          style={{
            display: submitting ? "none" : "block",
          }}
        >
          <h3 style={{ fontWeight: 600 }}>Password</h3>
          {!mandatory && <Link to="/app/my-account" className="modal-close" />}
          <br />
          {error && (
            <div>
              <p>Error changing password. Try again.</p>
              <br />
            </div>
          )}
          <form onSubmit={changePassword}>
            <input
              type="password"
              className={`text-input ${passwordValid !== null && (passwordValid ? 'valid' : 'invalid')}`}
              placeholder="New password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                setPasswordValid(value.length > 5 && value.length < 30);
              }}
            />
            <input
              type="password"
              className={`text-input ${confirmPasswordValid !== null && (confirmPasswordValid ? 'valid' : 'invalid')}`}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);
                setConfirmPasswordValid(passwordValid && password === value);
              }}
            />
            <div style={{ marginTop: "24px" }}>
              <input
                type="submit"
                value="Save Changes"
                className={`button button-full ${passwordValid || confirmPasswordValid || 'button-grey'}`}
                style={{
                  paddingTop: 0,
                  marginBottom: "12px",
                  display: "inline-block",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;

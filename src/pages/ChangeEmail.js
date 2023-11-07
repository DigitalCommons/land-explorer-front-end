import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import constants from "../constants";
import { getUserDetails } from "../actions/UserActions";
import analytics from "../analytics";
import { getAuthHeader } from "../utils/Auth";

const ChangeEmail = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newEmail, setNewEmail] = useState({
    value: "",
    valid: false,
  });
  const [confirmNewEmail, setConfirmNewEmail] = useState({
    value: "",
    valid: false,
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    analytics.pageview(window.location.pathname);
  }, []);

  const changeEmail = (e) => {
    e.preventDefault();

    if (confirmNewEmail.valid && newEmail.valid) {
      setSubmitting(true);
      const body = {
        username: newEmail.value,
      };
      axios
        .post(`${constants.ROOT_URL}/api/user/email`, body, getAuthHeader())
        .then((response) => {
          console.log("change email", response);
          setSuccess(true);
          setSubmitting(false);
        })
        .catch((err) => {
          if (err.response.data.Message.includes("Duplicate")) {
            setErrors(["This email is already registered."]);
          } else {
            setErrors([
              "We could not change your email at the moment. Please try again later.",
            ]);
          }
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
        }}
      >
        <div>
          <div>Your email has been changed successfully.</div>
          <div style={{ marginTop: "24px" }}>
            <Link to="/app/my-account">
              <div
                className="button button-medium"
                style={{ display: "inline-block", marginRight: "12px" }}
                onClick={getUserDetails}
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
          minHeight: "200px",
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
        }}
      >
        <div
          style={{
            display: submitting ? "none" : "block",
          }}
        >
          <h3 style={{ fontWeight: 600 }}>Email</h3>
          <Link to="/app/my-account" className="modal-close" />
          <br />
          {errors && (
            <div>
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
              <br />
            </div>
          )}
          <form onSubmit={changeEmail}>
            <input
              type="text"
              className={`text-input
                            ${newEmail.valid ? "valid" : "invalid"}`}
              placeholder="New email address"
              value={newEmail.value}
              onChange={(e) => {
                const valid = emailRegexp.test(e.target.value);
                setNewEmail({ value: e.target.value, valid });
              }}
            />
            <input
              type="text"
              className={`text-input
                            ${confirmNewEmail.valid ? "valid" : "invalid"}`}
              placeholder="Confirm new email address"
              value={confirmNewEmail.value}
              onChange={(e) => {
                const valid = e.target.value === newEmail.value;
                setConfirmNewEmail({ value: e.target.value, valid });
              }}
            />
            <div>
              <input
                type="submit"
                value="Save Changes"
                className={`button button-full ${
                  confirmNewEmail.valid && newEmail.valid ? "" : "button-grey"
                }`}
                style={{
                  paddingTop: 0,
                  marginTop: "12px",
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
};

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default ChangeEmail;

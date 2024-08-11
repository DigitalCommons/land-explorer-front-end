import axios from "axios/index";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import Spinner from "../components/common/Spinner";
import GoCardlessModal from "../components/modals/GoCardlessModal";
import TopBar from "../components/top-bar/TopBar";
import constants from "../constants";

const Register = ({ updateBgImage }) => {
  const [registering, setRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerErrors, setRegisterErrors] = useState([]);
  const [firstName, setFirstName] = useState({ value: "", valid: "" });
  const [lastName, setLastName] = useState({ value: "", valid: "" });
  const [organisation, setOrganisation] = useState({ value: "", valid: "" });
  const [organisationType, setOrganisationType] = useState({
    value: "",
    valid: "",
  });
  const [organisationCommercial, setOrganisationCommercial] = useState({
    value: "",
    valid: "",
  });
  const [organisationCommercialOther, setOrganisationCommercialOther] =
    useState({ value: "", valid: "" });
  const [organisationCommunityInterest, setOrganisationCommunityInterest] =
    useState({ value: "", valid: "" });
  const [organisationNumber, setOrganisationNumber] = useState({
    value: "",
    valid: "",
  });
  const [phone, setPhone] = useState({ value: "", valid: "" });
  const [address1, setAddress1] = useState({ value: "", valid: "" });
  const [address2, setAddress2] = useState({ value: "", valid: "" });
  const [city, setCity] = useState({ value: "", valid: "" });
  const [postcode, setPostcode] = useState({ value: "", valid: "" });
  const [email, setEmail] = useState({ value: "", valid: "" });
  const [password, setPassword] = useState({ value: "", valid: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    valid: "",
  });
  const [accountType, setAccountType] = useState("free");
  const [agree, setAgree] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [formStage, setFormStage] = useState("personal");
  const [mandate, setMandate] = useState();
  const [goCardlessVisible, setGoCardLessVisible] = useState(false);

  useEffect(() => {
    updateBgImage(1);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accountType === "free") {
      setRegistering(true);
      register();
    } else {
      if (formStage === "personal") {
        const response = await axios.post(
          `${constants.PAYMENTS_URL}/gocardless/billing/flow`
        );
        const { success, billingRequestFlowID } = response.data;
        if (success) {
          setFormStage("payment");
          setBillingRequestFlowID(billingRequestFlowID);
        }
      }
    }
  };

  const handlePaymentSubmit = async (e) => {
    const requestData = {
      mandate,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      subscriptionTypeId: 1,
    };
    const response = await axios.post(
      `${constants.PAYMENTS_URL}/subscription`,
      requestData
    );
    const { success } = response.data;
    if (success) {
      register();
    }
  };

  const register = () => {
    const organisationSubType =
      organisationType.value === "community-interest"
        ? organisationSubType === "other"
          ? organisationCommercialOther.value
          : organisationCommunityInterest.value
        : organisationSubType === "other"
          ? organisationCommercialOther.value
          : organisationCommercial.value;

    const request = {
      address: address1.value,
      firstName: firstName.value,
      lastName: lastName.value,
      marketing: marketing,
      organisation: organisation.value,
      organisationNumber: organisationNumber.value,
      organisationType: organisationType.value,
      organisationSubType,
      password: password.value,
      phone: phone.value,
      username: email.value,
    };
    console.log("registration request", request);
    axios
      .post(`${constants.ROOT_URL}/api/user/register`, request)
      .then((response) => {
        console.log("register response", response);
        setRegisterSuccess(true);
        setRegistering(false);
      })
      .catch((err) => {
        console.log(err.message);
        //Catch err 400 here
        const { response } = err;
        if (response?.status === 400) {
          console.log("Hey we get some custom error message from server:");
          console.log(response.data);

          if (response.data.username)
            Swal.fire({ icon: "error", text: response.data.username[0] });
        }
        setRegistering(false);
      });
  };

  let formDisplay = (
    <Fragment>
      <h2 className="title">Register</h2>
      {registerErrors && (
        <div>
          {registerErrors.map((error) => (
            <p key={error}>{error}</p>
          ))}{" "}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`text-input text-input-half text-input-first-half
                                ${firstName.valid !== ""
              ? firstName.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="First name (Required)"
          value={firstName.value}
          onChange={(e) => {
            let value = e.target.value;
            let valid = value.length > 2 && value.length < 20;
            setFirstName({ value, valid });
          }}
          required
          maxLength="101"
        />
        <input
          type="text"
          className={`text-input text-input-half
                                ${lastName.valid !== ""
              ? lastName.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="Last name (Required)"
          value={lastName.value}
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = value.length > 2 && value.length < 20;
            setLastName({ value, valid });
          }}
          required
        />
        <input
          type="email"
          className={`text-input ${email.valid !== "" ? (email.valid ? "valid" : "invalid") : ""
            }`}
          placeholder="Email address (Required)"
          autoComplete="username"
          value={email.value}
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = emailRegexp.test(value);
            setEmail({ value, valid });
          }}
          required
        />
        <input
          type="password"
          className={`text-input text-input-half text-input-first-half
                                ${password.valid !== ""
              ? password.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="Password (Required)"
          autoComplete="new-password"
          value={password.value}
          style={{ marginRight: "2%" }}
          minLength="4"
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = value.length > 5 && value.length < 30;
            setPassword({ value, valid });
          }}
          required
        />
        <input
          type="password"
          className={`text-input text-input-half
                                ${password.value !== ""
              ? confirmPassword.valid !== ""
                ? confirmPassword.valid
                  ? "valid"
                  : "invalid"
                : "invalid"
              : ""
            }`}
          placeholder="Confirm password (Required)"
          autoComplete="new-password"
          value={confirmPassword.value}
          minLength="4"
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = password.value === value;
            setConfirmPassword({ value, valid });
          }}
          required
        />
        <input
          type="tel"
          className={`text-input text-input-half text-input-first-half
                                ${phone.valid !== ""
              ? phone.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="Tel"
          value={phone.value}
          maxLength={15}
          onChange={(e) => {
            let value = e.target.value;
            let valid = ukPhoneRegexp.test(value);
            setPhone({ value, valid });
          }}
        />
        <input
          type="number"
          className={`text-input text-input-half
                                ${organisationNumber.valid !== ""
              ? organisationNumber.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="Organisation / Charity number"
          value={organisationNumber.value}
          onChange={(e) => {
            let value = e.target.value;
            let valid = value !== "";
            if (value.length > 101) {
              alert("Max Characters is 101");
            } else {
              setOrganisationNumber({ value, valid });
            }
          }}
        />
        <input
          type="text"
          className={`text-input
                                ${address1.valid !== ""
              ? address1.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="Address 1"
          value={address1.value}
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = value !== "";
            setAddress1({ value, valid });
          }}
        />
        <input
          type="text"
          className={`text-input`}
          placeholder="Address 2"
          value={address2.value}
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = true;
            setAddress2({ value, valid });
          }}
        />
        <input
          type="text"
          className={`text-input text-input-half text-input-first-half
                                ${city.valid !== ""
              ? city.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="City"
          value={city.value}
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = value !== "";
            setCity({ value, valid });
          }}
        />
        <input
          type="text"
          className={`text-input text-input-half
                                ${postcode.valid !== ""
              ? postcode.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="Postcode"
          value={postcode.value}
          maxLength="7"
          onChange={(e) => {
            let value = e.target.value;
            let valid = ukPostcodeRegexp.test(value);
            setPostcode({ value, valid });
          }}
        />
        <input
          type="text"
          className={`text-input
                                ${organisation.valid !== ""
              ? organisation.valid
                ? "valid"
                : "invalid"
              : ""
            }`}
          placeholder="Organisation Name"
          value={organisation.value}
          maxLength="101"
          onChange={(e) => {
            let value = e.target.value;
            let valid = value !== "";
            setOrganisation({ value, valid });
          }}
        />
        <Select
          name="organisation-type"
          value={organisationType.value}
          onChange={(selectedOption) => {
            let value = selectedOption.value;
            let valid = value !== "";
            setOrganisationType({ value, valid });
          }}
          options={[
            { value: "community-interest", label: "Community Interest" },
            { value: "commercial", label: "Commercial" },
          ]}
          clearable={false}
          searchable={false}
          placeholder="My organisation is..."
        />
        {organisationType.value === "community-interest" && (
          <Select
            name="community-interest"
            value={organisationCommunityInterest.value}
            onChange={(selectedOption) => {
              let value = selectedOption.value;
              let valid = value !== "";
              setOrganisationCommunityInterest({ value, valid });
            }}
            style={{ marginBottom: "6px" }}
            options={[
              { value: "community-energy", label: "Community Energy" },
              {
                value: "community-growing",
                label: "Community Growing or Rural Enterprise",
              },
              {
                value: "community-group",
                label: "Community Group (other)",
              },
              { value: "coop", label: "Co-op" },
              {
                value: "neighbourhood-planning",
                label: "Neighbourhood Planning",
              },
              { value: "renters-union", label: "Renters Union" },
              { value: "woodland-enterprise", label: "Woodland Enterprise" },
            ]}
            clearable={false}
            searchable={false}
            placeholder="Community interest type"
          />
        )}
        {organisationType.value === "commercial" && (
          <Select
            name="community-interest"
            value={organisationCommercial.value}
            onChange={(selectedOption) => {
              let value = selectedOption.value;
              let valid = value !== "";
              setOrganisationCommercial({ value, valid });
            }}
            options={[
              { value: "local-authority", label: "Local Authority" },
              { value: "power-network", label: "Power Network" },
              { value: "utility-company", label: "Utility Company" },
              { value: "other", label: "Other (please specify)" },
            ]}
            style={{ marginBottom: "6px" }}
            clearable={false}
            searchable={false}
            placeholder="Commercial type"
          />
        )}
        {organisationType.value === "commercial" &&
          organisationCommercial.value === "other" && (
            <input
              type="text"
              className={`text-input
                                        ${organisationCommercialOther.valid !==
                  ""
                  ? organisationCommercialOther.valid
                    ? "valid"
                    : "invalid"
                  : ""
                }`}
              placeholder="Other"
              value={organisationCommercialOther.value}
              onChange={(e) => {
                let value = e.target.value;
                let valid = value !== "";
                setOrganisationCommercialOther({ value, valid });
              }}
            />
          )}
        <div className="account-type-container">
          <div
            className={`account-type-card ${accountType == "free" ? "active" : "inactive"
              }`}
            onClick={() => {
              setAccountType("free");
            }}
          >
            <div className="card-inner">
              <p className="account-type-title">Free</p>
              <p className="account-type-text">
                Land Explorer is currently free for everyone!
              </p>
            </div>
          </div>
          <div
            className={`account-type-card ${accountType == "paid" ? "active" : "inactive"
              }`}
            onClick={() => {
              /* disable the payment flow
            this.setState({
              accountType: "paid"
            })
            */
            }}
          >
            <div className="card-inner">
              <p className="account-type-title">Solidarity Supporter</p>
              <p className="account-type-text">Coming soon</p>
            </div>
          </div>
        </div>

        <div className="privacy-policy">
          <label
            className="control control-checkbox"
            style={{ textAlign: "left", fontSize: "14px" }}
          >
            I agree to the{" "}
            <a
              target="_blank"
              className="link-underline"
              href="/privacy-policy.pdf"
            >
              privacy policy
            </a>{" "}and{" "}
            <a
              target="_blank"
              className="link-underline"
              href="https://digitalcommons.coop/terms-of-use/"
            >
              terms of use
            </a>.
            <input
              name="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
              }}
              style={{ display: "inline" }}
            />
            <div className="control_indicator"></div>
          </label>
          <label
            className="control control-checkbox"
            style={{ textAlign: "left", fontSize: "14px" }}
          >
            Keep me up to date with Land Explorer and Digital Commons
            developments
            <input
              name="agree"
              type="checkbox"
              checked={marketing}
              onChange={(e) => {
                setMarketing(e.target.checked);
              }}
              style={{ display: "inline" }}
            />
            <div className="control_indicator"></div>
          </label>
        </div>
        <div className="FormControlButtons" style={{ padding: "10px" }}>
          <Link to="/auth">
            <div
              className="button button-cancel button-medium"
              style={{ display: "inline-block" }}
            >
              Cancel
            </div>
          </Link>
          <input
            type="submit"
            value={accountType == "free" ? "Register" : "Next"}
            className="button button-medium"
            disabled={!agree}
            style={{
              paddingTop: 0,
              marginLeft: "10px",
              display: "inline-block",
              opacity: agree ? 1 : 0.5,
            }}
          />
        </div>
      </form>
    </Fragment>
  );

  if (formStage == "payment")
    formDisplay = (
      <Fragment>
        <h2>Payment</h2>
        <p>
          Click the GoCardless button below to set up a direct debit. After the
          direct debit has been set up, please close the gocardless modals and
          press Register to complete registration for Land Explorer.
        </p>
        {billingRequestFlowID && goCardlessVisible && (
          <GoCardlessModal
            billingRequestFlowID={billingRequestFlowID}
            setMandate={(mandate) => setMandate(mandate)}
            closeModal={() => setGoCardLessVisible(false)}
          />
        )}
        {mandate ? (
          <p>GoCardless Success!</p>
        ) : (
          <button onClick={() => setGoCardLessVisible(true)}>
            Open GoCardless
          </button>
        )}
        <button
          onClick={handlePaymentSubmit}
          disabled={!mandate}
          type="submit"
          className={
            "button button-medium" + (mandate ? "" : " button-reg-disabled")
          }
          style={{
            paddingTop: 0,
            marginLeft: "10px",
            display: "inline-block",
          }}
        >
          Register
        </button>
      </Fragment>
    );

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <TopBar limited={true} />
      <div
        style={{
          display: registering ? "block" : "none",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          position: "absolute",
          textAlign: "center",
        }}
      >
        <Spinner />
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "white",
          display: registerSuccess ? "block" : "none",
          zIndex: 1,
        }}
      >
        <div
          style={{
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            position: "absolute",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Registration Successful</p>
          <Link to="/auth/" className="button button-small">
            Ok
          </Link>
        </div>
      </div>
      <div
        className="registration"
        style={{
          maxWidth: "100vw",
          background: "white",
          textAlign: "center",
          paddingLeft: "24px",
          paddingRight: "24px",
          display: registering ? "none" : "block",
        }}
      >
        {formDisplay}
      </div>
    </div>
  );
};

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ukPhoneRegexp =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
const ukPostcodeRegexp =
  /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;

export default Register;

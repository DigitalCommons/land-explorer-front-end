import axios from "axios/index";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import Spinner from '../components/common/Spinner';
import GoCardlessModal from "../components/modals/GoCardlessModal";
import Navbar from "../components/Navbar";
import constants from "../constants";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registering: false,
      registerSuccess: false,
      registerErrors: null,
      firstName: {
        value: "",
        valid: ""
      },
      lastName: {
        value: "",
        valid: ""
      },
      organisation: {
        value: "",
        valid: ""
      },
      organisationType: {
        value: "",
        valid: ""
      },
      organisationCommercial: {
        value: "",
        valid: ""
      },
      organisationCommercialOther: {
        value: "",
        valid: ""
      },
      organisationCommunityInterest: {
        value: "",
        valid: ""
      },
      organisationNumber: {
        value: "",
        valid: ""
      },
      phone: {
        value: "",
        valid: ""
      },
      address1: {
        value: "",
        valid: ""
      },
      address2: {
        value: "",
        valid: ""
      },
      city: {
        value: "",
        valid: ""
      },
      postcode: {
        value: "",
        valid: ""
      },
      email: {
        value: "",
        valid: ""
      },
      password: {
        value: "",
        valid: ""
      },
      confirmPassword: {
        value: "",
        valid: ""
      },
      accountType: "free",
      agree: false,
      marketing: false,
      formStage: "personal",
    };
  }

  componentDidMount() {
    this.props.updateCarousel(1);
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.accountType == "free") {
      this.setState({ registering: true });
      this.register();
    }
    else {
      if (this.state.formStage == "personal") {
        const response = await axios.post(`${constants.PAYMENTS_URL}/gocardless/billing/flow`);
        const { success, billingRequestFlowID } = response.data;
        if (success)
          this.setState({ formStage: "payment", billingRequestFlowID: billingRequestFlowID })
      }
    }
  };

  handlePaymentSubmit = async e => {
    const requestData = {
      mandate: this.state.mandate,
      email: this.state.email.value,
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      subscriptionTypeId: 1
    }
    const response = await axios.post(`${constants.PAYMENTS_URL}/subscription`, requestData);
    const { success } = response.data;
    if (success)
      this.register();
  }

  printErrors = () => {
    let errors = this.state.registerErrors;
    let keys = Object.keys(errors);
    return keys.map((key, index) => {
      return <p key={index}>{errors[key]}</p>;
    });
  };

  register = () => {
    const organisationType = this.state.organisationType.value;
    let organisationSubType =
      organisationType === "community-interest"
        ? this.state.organisationCommunityInterest.value
        : this.state.organisationCommercial.value;
    organisationSubType =
      organisationSubType === "other"
        ? this.state.organisationCommercialOther.value
        : organisationSubType;

    const request = {
      address: this.state.address1.value,
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      marketing: this.state.marketing,
      organisation: this.state.organisation.value,
      organisationNumber: this.state.organisationNumber.value,
      organisationType,
      organisationSubType,
      password: this.state.password.value,
      phone: this.state.phone.value,
      username: this.state.email.value
    };
    console.log("registration request", request);
    axios
      .post(`${constants.ROOT_URL}/api/user/register`, request)
      .then(response => {
        console.log("register response", response);
        if (response.status === 200) {
          console.log("register response 200", response);
          this.setState({ registerSuccess: true });
        } else if (response.status === 400) {
          this.setState({ registerErrors: response.data.errors });
        }
        this.setState({ registering: false });
      })
      .catch(err => {
        //Catch err 400 her
        let response = err.response;
        if (response.status === 400) {
          console.log("Hey we get some custom error message from server:");
          console.log(response.data);

          if (response.data.username)
            Swal.fire({ icon: "error", text: response.data.username[0] });
        }
        //console.log("err", err.response);
        this.setState({ registering: false });
      });
  };

  render() {
    const {
      firstName,
      lastName,
      organisation,
      organisationType,
      organisationCommercial,
      organisationCommunityInterest,
      organisationNumber,
      password,
      email,
      confirmPassword,
      address1,
      address2,
      city,
      postcode,
      phone,
      registering,
      registerSuccess,
      registerErrors,
      accountType,
      agree,
      marketing,
      formStage,
      billingRequestFlowID,
      mandate,
      goCardlessVisible
    } = this.state;

    let formDisplay = <Fragment>
      <h2 className="title">Register</h2>
      {registerErrors && <div>{this.printErrors()} </div>}
      <form onSubmit={this.handleSubmit}>
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
          onChange={e => {
            let value = e.target.value;
            let valid = value.length > 2 && value.length < 20;
            this.setState({
              firstName: { value, valid }
            });
          }}
          required
          maxlength="101"
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
          maxlength="101"
          onChange={e => {
            let value = e.target.value;
            let valid = value.length > 2 && value.length < 20;
            this.setState({
              lastName: { value, valid }
            });
          }}
          required
        />
        <input
          type="email"
          className={`text-input ${email.valid !== "" ? (email.valid ? "valid" : "invalid") : ""
            }`}
          placeholder="Email address (Required)"
          value={email.value}
          maxlength="101"
          onChange={e => {
            let value = e.target.value;
            let valid = emailRegexp.test(value);
            this.setState({ email: { value, valid } });
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
          value={password.value}
          style={{ marginRight: "2%" }}
          minlength="4"
          maxlenght="101"
          onChange={e => {
            let value = e.target.value;
            let valid = value.length > 5 && value.length < 30;
            this.setState({ password: { value, valid } });
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
          value={confirmPassword.value}
          minlength="4"
          maxlength="101"
          onChange={e => {
            let value = e.target.value;
            let valid = password.value === value;
            this.setState({ confirmPassword: { value, valid } });
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
          onChange={e => {
            let value = e.target.value;
            let valid = ukPhoneRegexp.test(value);
            this.setState({ phone: { value, valid } });
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
          onChange={e => {
            let value = e.target.value;
            let valid = value !== "";
            if (value.length > 101) {
              alert("Max Characters is 101");
            } else {
              this.setState({ organisationNumber: { value, valid } });
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
          maxlength="101"
          onChange={e => {
            let value = e.target.value;
            let valid = value !== "";
            this.setState({ address1: { value, valid } });
          }}
        />
        <input
          type="text"
          className={`text-input`}
          placeholder="Address 2"
          value={address2.value}
          maxlength="101"
          onChange={e => {
            let value = e.target.value;
            let valid = true;
            this.setState({ address2: { value, valid } });
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
          maxlength="101"
          onChange={e => {
            let value = e.target.value;
            let valid = value !== "";
            this.setState({ city: { value, valid } });
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
          maxlength="7"
          onChange={e => {
            let value = e.target.value;
            let valid = ukPostcodeRegexp.test(value);
            this.setState({ postcode: { value, valid } });
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
          maxlength="101"
          onChange={e => {
            let value = e.target.value;
            let valid = value !== "";
            this.setState({ organisation: { value, valid } });
          }}
        />
        <Select
          name="organisation-type"
          value={organisationType.value}
          onChange={selectedOption => {
            let value = selectedOption.value;
            let valid = value !== "";
            this.setState({ organisationType: { value, valid } });
          }}
          options={[
            { value: "community-interest", label: "Community Interest" },
            { value: "commercial", label: "Commercial" }
          ]}
          clearable={false}
          searchable={false}
          placeholder="My organisation is..."
        />
        {organisationType.value === "community-interest" && (
          <Select
            name="community-interest"
            value={organisationCommunityInterest.value}
            onChange={selectedOption => {
              let value = selectedOption.value;
              let valid = value !== "";
              this.setState({
                organisationCommunityInterest: { value, valid }
              });
            }}
            style={{ marginBottom: "6px" }}
            options={[
              { value: "community-energy", label: "Community Energy" },
              {
                value: "community-growing",
                label: "Community Growing or Rural Enterprise"
              },
              {
                value: "community-group",
                label: "Community Group (other)"
              },
              { value: "coop", label: "Co-op" },
              {
                value: "neighbourhood-planning",
                label: "Neighbourhood Planning"
              },
              { value: "renters-union", label: "Renters Union" },
              { value: "woodland-enterprise", label: "Woodland Enterprise" }
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
            onChange={selectedOption => {
              let value = selectedOption.value;
              let valid = value !== "";
              this.setState({ organisationCommercial: { value, valid } });
            }}
            options={[
              { value: "local-authority", label: "Local Authority" },
              { value: "power-network", label: "Power Network" },
              { value: "utility-company", label: "Utility Company" },
              { value: "other", label: "Other (please specify)" }
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
                                        ${this.state.organisationCommercialOther
                  .valid !== ""
                  ? this.state
                    .organisationCommercialOther
                    .valid
                    ? "valid"
                    : "invalid"
                  : ""
                }`}
              placeholder="Other"
              value={this.state.organisationCommercialOther.value}
              onChange={e => {
                let value = e.target.value;
                let valid = value !== "";
                this.setState({
                  organisationCommercialOther: { value, valid }
                });
              }}
            />
          )}
        <div className="account-type-container" >
          <div className={`account-type-card ${accountType == "free" ? "active" : "inactive"}`}
            onClick={() => {
              this.setState({
                accountType: "free"
              })
            }}>
            <p className="account-type-title">Free</p>
            <p className="account-type-text">Land Explorer is currently free for everyone!</p>
          </div>
          <div className={`account-type-card ${accountType == "paid" ? "active" : "inactive"}`}
            onClick={() => {
              /* disable the payment flow
              this.setState({
                accountType: "paid"
              })
              */
            }}>
            <p className="account-type-title">Solidarity Supporter</p>
            <p className="account-type-text">Coming soon</p>
          </div>
        </div>

        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "3px",
            marginLeft: "15%"
          }}
        >
          <label
            className="control control-checkbox"
            style={{ textAlign: "left", fontSize: "14px" }}
          >
            I agree to the{" "}
            <a
              target="_blank"
              className="link-underline"
              href="http://www.sharedassets.org.uk/about-us/privacy-policy/"
            >
              privacy policy
            </a>
            <input
              name="agree"
              type="checkbox"
              checked={agree}
              onChange={e => {
                this.setState({ agree: e.target.checked });
              }}
              style={{ display: "inline" }}
            />
            <div className="control_indicator"></div>
          </label>
          <label
            className="control control-checkbox"
            style={{ textAlign: "left", fontSize: "14px" }}
          >
            Keep me up to date with Land Explorer and Digital Commons developments
            <input
              name="agree"
              type="checkbox"
              checked={marketing}
              onChange={e => {
                this.setState({ marketing: e.target.checked });
              }}
              style={{ display: "inline" }}
            />
            <div className="control_indicator"></div>
          </label>
        </div>
        <div className="FormControlButtons" style={{ padding: "10px" }}>
          <Link to="/auth/">
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
            disabled={!this.state.agree}
            style={{
              paddingTop: 0,
              marginLeft: "10px",
              display: "inline-block",
              opacity: this.state.agree ? 1 : 0.5,
            }}
          />
        </div>
      </form>
    </Fragment>

    if (formStage == "payment")
      formDisplay = <Fragment>
        <h2>Payment</h2>
        <p>
          Click the GoCardless button below to set up a direct debit.
          After the direct debit has been set up, please close the gocardless modals
          and press Register to complete registration for Land Explorer.
        </p>
        {
          (billingRequestFlowID && goCardlessVisible) &&
          <GoCardlessModal
            billingRequestFlowID={billingRequestFlowID}
            setMandate={mandate => this.setState({ mandate: mandate })}
            closeModal={() => this.setState({ goCardlessVisible: false })}
          />
        }
        {
          mandate ?
            <p>GoCardless Success!</p>
            :
            <button onClick={() => this.setState({ goCardlessVisible: true })}>Open GoCardless</button>
        }
        <button
          onClick={this.handlePaymentSubmit}
          disabled={!mandate}
          type="submit"
          className={"button button-medium" + (mandate ? "" : " button-reg-disabled")}
          style={{
            paddingTop: 0,
            marginLeft: "10px",
            display: "inline-block"
          }}
        >Register</button>
      </Fragment>

    return (
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          position: "relative"
        }}
      >
        <Navbar limited={true} />
        <div
          style={{
            display: registering ? "block" : "none",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            position: "absolute",
            textAlign: "center"
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
            zIndex: 1
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
              alignItems: "center"
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
  }
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ukPhoneRegexp = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
const ukPostcodeRegexp = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;

Register.propTypes = {};

export default Register;

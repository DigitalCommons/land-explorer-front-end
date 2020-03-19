import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';
import Spinner from 'react-spinkit';
import axios from "axios/index";
import constants from '../constants';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registering: false,
            registerSuccess: false,
            registerErrors: null,
            firstName: {
                value: '',
                valid: ''
            },
            lastName: {
                value: '',
                valid: ''
            },
            organisation: {
                value: '',
                valid: '',
            },
            organisationType: {
                value: '',
                valid: '',
            },
            organisationCommercial: {
                value: '',
                valid: '',
            },
            organisationCommercialOther: {
                value: '',
                valid: '',
            },
            organisationCommunityInterest: {
                value: '',
                valid: '',
            },
            organisationNumber: {
                value: '',
                valid: '',
            },
            phone: {
                value: '',
                valid: '',
            },
            address1: {
                value: '',
                valid: '',
            },
            address2: {
                value: '',
                valid: '',
            },
            city: {
                value: '',
                valid: '',
            },
            postcode: {
                value: '',
                valid: '',
            },
            email: {
                value: '',
                valid: ''
            },
            password: {
                value: '',
                valid: ''
            },
            confirmPassword: {
                value: '',
                valid: ''
            },
            agree: false,
            marketing: {
                yes: false,
                no: false,
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({registering: true});
        this.register();
    }

    printErrors = () => {
        let errors = this.state.registerErrors;
        let keys = Object.keys(errors);
        return keys.map((key, index) => {
            return <p key={index}>{errors[key]}</p>;
        });
    }

    register = () => {
        let organisationType = this.state.organisationType.value;
        let organisationSubType = organisationType === 'community-interest' ? this.state.organisationCommunityInterest.value : this.state.organisationCommercial.value;
        organisationSubType = (organisationSubType === 'other') ? this.state.organisationCommercialOther.value : organisationSubType;
        let request = {
            address: this.state.address1.value,
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            marketing: this.state.marketing.yes,
            organisation: this.state.organisation.value,
            organisationNumber: this.state.organisationNumber.value,
            organisationType: organisationType,
            organisationSubType: organisationSubType,
            password: this.state.password.value,
            phone: this.state.phone.value,
            username: this.state.email.value
        }
        console.log("registration request", request);
        axios.post(`${constants.ROOT_URL}/api/user/register/`, request)
            .then((response) => {
                console.log("register response", response);
                if (response.status === 200) {
                    console.log("register response 200", response);
                    this.setState({ registerSuccess: true });
                }else if (response.status === 400) {
                    this.setState({ registerErrors: response.data.errors });
                }
                this.setState({registering: false})
            })
            .catch(err => {
                //Catch err 400 her
                let response = err.response;
                if(response.status === 400)
                {
                    console.log("Hey we get some custom error message from server:");
                    console.log(response.data);
                }
                //console.log("err", err.response);
                this.setState({registering: false})
            });
    }

    render() {
        let { firstName, lastName, organisation, organisationType, organisationCommercial,
            organisationCommunityInterest, organisationNumber, password, email, confirmPassword,
            address1, address2, city, postcode, phone, registering, registerSuccess, registerErrors, agree, marketing
        } = this.state;
        console.log("organisation", organisation);
        return (
            <div style={{
                minHeight: '100vh'
            }}>
                <Navbar limited={true} />
                <div
                    style={{
                        display: registering ? 'block' : 'none',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        position: 'absolute',
                        textAlign: 'center',
                    }}
                >
                    <Spinner name="pulse" fadeIn="none"/>
                </div>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'white',
                    display: registerSuccess ? 'block' : 'none',
                    zIndex: 1
                }}>
                    <div
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                            position: 'absolute',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <p>Registration Successful</p>
                        <Link to="/auth/"
                              className="button button-small"
                        >Ok</Link>
                    </div>
                </div>
                <div
                    className="registration"
                    style={{
                        minHeight: '200px',
                        width: '600px',
                        height: '600px',
                        maxWidth: '100vw',
                        background: 'white',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        display: registering ? 'none' : 'block',
                        overflow : "auto"
                    }}>
                    <h2>Register</h2>
                   
                    {
                        registerErrors && (
                            <div>{this.printErrors()} </div>
                        )
                    }
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            className={`text-input text-input-half text-input-first-half
                                ${ (firstName.valid !== '') ? firstName.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="First name"
                            value={firstName.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = ((value.length > 2) && (value.length < 20));
                                this.setState({
                                    firstName: { value, valid }
                                })
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input text-input-half
                                ${ (lastName.valid !== '') ? lastName.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Last name"
                            value={lastName.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = ((value.length > 2) && (value.length < 20));
                                this.setState({
                                    lastName: { value, valid }
                                })
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input
                                ${ (email.valid !== '') ? email.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Email address"
                            value={email.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = emailRegexp.test(value);
                                this.setState({ email: { value, valid } })
                            }}
                        />
                        <input
                            type="password"
                            className={`text-input text-input-half text-input-first-half
                                ${ (password.valid !== '') ? password.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Password"
                            value={password.value}
                            style={{ marginRight: '2%' }}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = (value.length > 5) && (value.length < 30);
                                this.setState({ password: { value, valid } });
                            }}
                        />
                        <input
                            type="password"
                            className={`text-input text-input-half
                                ${ (password.value !== '') ? (confirmPassword.valid !== '') ? confirmPassword.valid ? 'valid' : 'invalid' : 'invalid' : '' }`}
                            placeholder="Confirm password"
                            value={confirmPassword.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = password.value === value;
                                this.setState({ confirmPassword: { value, valid } });
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input text-input-half text-input-first-half
                                ${ (phone.valid !== '') ? phone.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Tel"
                            value={phone.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = ukPhoneRegexp.test(value);
                                this.setState({ phone: { value, valid } });
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input text-input-half
                                ${ (organisationNumber.valid !== '') ? organisationNumber.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Organisation / Charity number"
                            value={organisationNumber.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = value !== '';
                                this.setState({ organisationNumber: { value, valid } });
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input
                                ${ (address1.valid !== '') ? address1.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Address 1"
                            value={address1.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = value !== '';
                                this.setState({ address1: { value, valid } });
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input`}
                            placeholder="Address 2"
                            value={address2.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = true;
                                this.setState({ address2: { value, valid } });
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input text-input-half text-input-first-half
                                ${ (city.valid !== '') ? city.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="City"
                            value={city.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = value !== '';
                                this.setState({ city: { value, valid } });
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input text-input-half
                                ${ (postcode.valid !== '') ? postcode.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Postcode"
                            value={postcode.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = ukPostcodeRegexp.test(value);
                                this.setState({ postcode: { value, valid } });
                            }}
                        />
                        <input
                            type="text"
                            className={`text-input
                                ${ (organisation.valid !== '') ? organisation.valid ? 'valid' : 'invalid' : '' }`}
                            placeholder="Organisation Name"
                            value={organisation.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = value !== '';
                                this.setState({ organisation: { value, valid } });
                            }}
                        />
                        <Select
                            name="organisation-type"
                            value={organisationType.value}
                            onChange={(selectedOption) => {
                                let value = selectedOption.value;
                                let valid = value !== '';
                                this.setState({ organisationType: { value, valid }})
                            }}
                            options={[
                                {value: 'community-interest', label: 'Community Interest'},
                                {value: 'commercial', label: 'Commercial'}
                            ]}
                            clearable={false}
                            searchable={false}
                            placeholder="My organisation is..."
                        />
                        {
                            organisationType.value === 'community-interest' && (
                                <Select
                                    name="community-interest"
                                    value={organisationCommunityInterest.value}
                                    onChange={(selectedOption) => {
                                        let value = selectedOption.value;
                                        let valid = value !== '';
                                        this.setState({ organisationCommunityInterest: { value, valid }})
                                    }}
                                    style={{ marginBottom: '6px'}}
                                    options={[
                                        {value: 'community-energy', label: 'Community Energy'},
                                        {value: 'community-growing', label: 'Community Growing or Rural Enterprise'},
                                        {value: 'community-group', label: 'Community Group (other)'},
                                        {value: 'coop', label: 'Co-op'},
                                        {value: 'neighbourhood-planning', label: 'Neighbourhood Planning'},
                                        {value: 'renters-union', label: 'Renters Union'},
                                        {value: 'woodland-enterprise', label: 'Woodland Enterprise'},
                                    ]}
                                    clearable={false}
                                    searchable={false}
                                    placeholder="Community interest type"
                                />
                            )
                        }
                        {
                            organisationType.value === 'commercial' && (
                                <Select
                                    name="community-interest"
                                    value={organisationCommercial.value}
                                    onChange={(selectedOption) => {
                                        let value = selectedOption.value;
                                        let valid = value !== '';
                                        this.setState({ organisationCommercial: { value, valid }})
                                    }}
                                    options={[
                                        {value: 'local-authority', label: 'Local Authority'},
                                        {value: 'power-network', label: 'Power Network'},
                                        {value: 'utility-company', label: 'Utility Company'},
                                        {value: 'other', label: 'Other (please specify)'},
                                    ]}
                                    style={{ marginBottom: '6px' }}
                                    clearable={false}
                                    searchable={false}
                                    placeholder="Commercial type"
                                />
                            )
                        }
                        {
                            (organisationType.value === 'commercial' &&
                                organisationCommercial.value === 'other') && (
                                <input
                                    type="text"
                                    className={`text-input
                                        ${ (this.state.organisationCommercialOther.valid !== '') ? this.state.organisationCommercialOther.valid ? 'valid' : 'invalid' : '' }`}
                                    placeholder="Other"
                                    value={this.state.organisationCommercialOther.value}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let valid = value !== '';
                                        this.setState({ organisationCommercialOther: { value, valid } })
                                    }}
                                />
                            )
                        }
                        <br/>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '3px'
                        }}>
                            <label className="control control-checkbox"
                                   style={{ textAlign: 'left', fontSize: '14px' }}
                            >
                                I agree to the <a target="_blank" className="link-underline" href="http://www.sharedassets.org.uk/about-us/privacy-policy/">privacy policy</a>
                                <input
                                    name="agree"
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => { this.setState({ agree: e.target.checked })}}
                                    style={{ display: 'inline' }}
                                />
                                <div className="control_indicator"></div>
                            </label>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '12px', opacity: .7, marginTop: 0}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <br/>
                        <p style={{ marginTop: 0, marginBottom: '6px'}}>Would you like to receive marketing emails?</p>
                        
                <label classNameName="control control-radio"style={{ textAlign: 'left', fontSize: '14px', display: 'inline', marginRight: '24px' }} >
                            Yes
                            <input name="marketing-yes" type="radio" checked={marketing.yes}
                                onChange={(e) => {
                                    let on = e.target.value === 'on';
                                    this.setState({
                                        marketing: {
                                            yes: on,
                                            no: !on
                                        }
                                    })
                                }}
                                style={{ display: 'inline' }}
                            />
                            <div classNameName="control_indicator"></div>
                        </label>
                        <label className="control control-radio"
                               style={{ textAlign: 'left', fontSize: '14px', display: 'inline'  }}
                        >
                            No
                            <input
                                name="marketing-no"
                                type="radio"
                                checked={marketing.no}
                                onChange={(e) => {
                                    let on = e.target.value === 'on';
                                    this.setState({
                                        marketing: {
                                            yes: !on,
                                            no: on
                                        }
                                    })
                                }}
                                style={{ display: 'inline' }}
                            />
                            <div className="control_indicator"></div>
                        </label>
                        
                        <div className = "FormControlButtons" style = {{ padding:'10px'}}>
                            <Link to="/auth/">
                                <div className="button button-cancel button-medium" style={{ display: 'inline-block' }}>
                                    Cancel
                                </div>
                            </Link>
                            
                            <input type="submit" value="Register" className="button button-medium"
                                style={{
                                    paddingTop: 0,
                                    marginBottom: '120px',
                                    marginLeft:'10px',
                                    display: 'inline-block'
                                    
                                }}
                            />
                        </div>
                    </form>
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
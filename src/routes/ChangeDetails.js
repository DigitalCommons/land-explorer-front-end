import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../components/common/Spinner';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import constants from '../constants';
import { getUserDetails } from '../actions/UserActions';
import analytics from "../analytics";
import { getAuthHeader } from '../utils/Auth';


class ChangeDetails extends Component {
    constructor(props) {
        super(props);
        let { user } = this.props;
        let organisationTypes = [
            'academic-institution',
            'community-group',
            'not-for-profit',
            'private-sector',
            'public-sector',
            'sole-trader',
        ];
        let activityTypes = [
            'amenity-recreation',
            'community-development',
            'conservation-biodiversity',
            'economic-development',
            'food-growing',
            'health-services',
            'housing',
            'neighbourhood-planning',
            'policy-development',
            'professional-consultancy',
            'public-services',
            'renewable-energy-generation',
            'training-education',
            'woodland-management'
        ];
        let organisationType = user.organisationType;
        let organisationTypeOther = '';
        if (organisationType !== '') {
            if (organisationTypes.indexOf(organisationType) === -1) {
                organisationTypeOther = organisationType;
                organisationType = 'other';
            };
        }
        let organisationActivity = user.organisationActivity;
        let organisationActivityOther = '';
        if (organisationActivity !== '') {
            if (activityTypes.indexOf(organisationActivity) === -1) {
                organisationActivityOther = organisationActivity;
                organisationActivity = 'other';
            }
        }
        this.state = {
            firstName: {
                value: user.firstName,
                valid: ''
            },
            lastName: {
                value: user.lastName,
                valid: ''
            },
            organisation: {
                value: user.organisation,
                valid: '',
            },
            organisationType: {
                value: organisationType,
                valid: '',
            },
            organisationTypeOther: {
                value: organisationTypeOther,
                valid: '',
            },
            organisationActivity: {
                value: organisationActivity,
                valid: '',
            },
            organisationActivityOther: {
                value: organisationActivityOther,
                valid: '',
            },
            organisationNumber: {
                value: user.organisationNumber,
                valid: '',
            },
            phone: {
                value: user.phone,
                valid: '',
            },
            address1: {
                value: user.address1,
                valid: '',
            },
            address2: {
                value: user.address2,
                valid: '',
            },
            city: {
                value: user.city,
                valid: '',
            },
            postcode: {
                value: user.postcode,
                valid: '',
            },
            submitting: false,
            errors: false,
            success: false,
        }
    }

    componentDidMount() {
        analytics.pageview(window.location.pathname);
    }

    printErrors = () => {
        let errors = this.state.errors;
        let keys = Object.keys(errors);
        return keys.map((key, index) => {
            return <p key={index}>{errors[key]}</p>;
        });
    }
    changeDetails = (e) => {
        e.preventDefault();
        this.setState({ submitting: true });

        let organisationType = this.state.organisationType.value;
        organisationType = organisationType === 'other' ? this.state.organisationTypeOther.value : organisationType;
        let organisationActivity = this.state.organisationActivity.value;
        organisationActivity = (organisationActivity === 'other') ? this.state.organisationActivityOther.value : organisationActivity;

        let body = {
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            organisation: this.state.organisation.value,
            organisationNumber: this.state.organisationNumber.value,
            organisationType: organisationType,
            organisationActivity: organisationActivity,
            address1: this.state.address1.value,
            address2: this.state.address2.value,
            city: this.state.city.value,
            postcode: this.state.postcode.value,
            phone: this.state.phone.value,
        }
        axios.post(`${constants.ROOT_URL}/api/user/details`, body, getAuthHeader())
            .then((response) => {
                console.log("response", response);
                console.log("change details", response);
                if (response.status === 200) {
                    console.log("register response 200", response);
                    this.setState({ success: true });
                } else {
                    this.setState({ errors: true });
                }
                this.setState({ submitting: false })
            })
            .catch(err => {
                this.setState({ errors: ["We could not change your details at the moment. Please try again later."] });
                this.setState({ submitting: false });
            });
    }

    render() {
        let { firstName, lastName, organisation, organisationType, organisationTypeOther, organisationActivity,
            organisationActivityOther, organisationNumber,
            address1, address2, city, postcode, phone, submitting, errors, success
        } = this.state;
        let { getUserDetails } = this.props;

        if (this.state.success) {
            return (
                <div
                    className="registration modal"
                    style={{
                        height: 'auto',
                        width: '340px',
                        maxWidth: '90vw',
                        background: 'white',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingBottom: '24px',
                        paddingTop: '28px',
                        borderRadius: '8px',
                        margin: '0',
                    }}>
                    <div>
                        <div>
                            Your details have been changed successfully.
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <Link to="/app/my-account">
                                <div
                                    className="button button-small"
                                    style={{ display: 'inline-block', marginRight: '12px' }}
                                    onClick={getUserDetails}
                                >
                                    Ok
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else if (submitting) {
            return (
                <div
                    style={{
                        display: submitting ? 'block' : 'none',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        position: 'absolute',
                        textAlign: 'center',
                    }}
                >
                    <Spinner />
                </div>
            )
        } else {
            return (
                <div style={{
                    height: '200vh'
                }}>
                    <div
                        className="registration modal"
                        style={{
                            height: 'auto',
                            minHeight: '200px',
                            width: '340px',
                            maxWidth: '90vw',
                            background: 'white',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            paddingBottom: '12px',
                            paddingTop: '6px',
                            borderRadius: '8px',
                            margin: '0'
                        }}>
                        <div
                            style={{
                                display: submitting ? 'none' : 'block'
                            }}>
                            <h3 style={{ fontWeight: 600 }}>Details</h3>
                            <Link to="/app/my-account"
                                className="modal-close"
                            />
                            <br />
                            {
                                errors && (
                                    <div>
                                        {this.printErrors()}
                                        <br />
                                    </div>
                                )
                            }
                            <form onSubmit={this.changeDetails}>
                                <input
                                    type="text"
                                    className={`text-input
                                ${(organisation.valid !== '') ? organisation.valid ? 'valid' : 'invalid' : ''}`}
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
                                        this.setState({ organisationType: { value, valid } })
                                    }}
                                    options={[
                                        { value: 'academic-institution', label: 'Academic institution' },
                                        { value: 'community-group', label: 'Community group' },
                                        { value: 'not-for-profit', label: 'Not for profit organisation' },
                                        { value: 'private-sector', label: 'Private sector' },
                                        { value: 'public-sector', label: 'Public sector' },
                                        { value: 'sole-trader', label: 'Sole trader' },
                                        { value: 'other', label: 'Other' }
                                    ]}
                                    clearable={false}
                                    searchable={false}
                                    placeholder="Organisation type"
                                />
                                {
                                    (organisationType.value === 'other') && (
                                        <input
                                            type="text"
                                            className={`text-input
                                            ${(organisationTypeOther.valid !== '') ? organisationTypeOther.valid ? 'valid' : 'invalid' : ''}`}
                                            placeholder="Specify organisation type"
                                            value={organisationTypeOther.value}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                let valid = value !== '';
                                                this.setState({ organisationTypeOther: { value, valid } })
                                            }}
                                        />
                                    )
                                }
                                <Select
                                    name="organisation-activity"
                                    value={organisationActivity.value}
                                    onChange={(selectedOption) => {
                                        let value = selectedOption.value;
                                        let valid = value !== '';
                                        this.setState({ organisationActivity: { value, valid } })
                                    }}
                                    options={[
                                        { value: 'amenity-recreation', label: 'Amenity and recreation' },
                                        { value: 'community-development', label: 'Community development' },
                                        { value: 'conservation-biodiversity', label: 'Conservation and biodiversity' },
                                        { value: 'economic-development', label: 'Economic development' },
                                        { value: 'food-growing', label: 'Food growing' },
                                        { value: 'health-services', label: 'Health services' },
                                        { value: 'housing', label: 'Housing' },
                                        { value: 'neighbourhood-planning', label: 'Neighbourhood planning' },
                                        { value: 'policy-development', label: 'Policy development' },
                                        { value: 'professional-consultancy', label: 'Professional / consultancy services' },
                                        { value: 'public-services', label: 'Public services' },
                                        { value: 'renewable-energy-generation', label: 'Renewable energy generation' },
                                        { value: 'training-education', label: 'Training and education services' },
                                        { value: 'woodland-management', label: 'Woodland management' },
                                        { value: 'other', label: 'Other' }
                                    ]}
                                    clearable={false}
                                    searchable={false}
                                    placeholder="Organisation activity"
                                />
                                {
                                    (organisationActivity.value === 'other') && (
                                        <input
                                            type="text"
                                            className={`text-input
                                            ${(organisationActivityOther.valid !== '') ? organisationActivityOther.valid ? 'valid' : 'invalid' : ''}`}
                                            placeholder="Specify organisation activity"
                                            value={organisationActivityOther.value}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                let valid = value !== '';
                                                this.setState({ organisationActivityOther: { value, valid } })
                                            }}
                                        />
                                    )
                                }
                                <input
                                    type="text"
                                    className={`text-input
                                ${(firstName.valid !== '') ? firstName.valid ? 'valid' : 'invalid' : ''}`}
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
                                    className={`text-input
                                ${(lastName.valid !== '') ? lastName.valid ? 'valid' : 'invalid' : ''}`}
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
                                ${(address1.valid !== '') ? address1.valid ? 'valid' : 'invalid' : ''}`}
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
                                    className={`text-input
                                ${(city.valid !== '') ? city.valid ? 'valid' : 'invalid' : ''}`}
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
                                    className={`text-input
                                ${(postcode.valid !== '') ? postcode.valid ? 'valid' : 'invalid' : ''}`}
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
                                ${(phone.valid !== '') ? phone.valid ? 'valid' : 'invalid' : ''}`}
                                    placeholder="Tel"
                                    value={phone.value}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let valid = ukPhoneRegexp.test(value);
                                        this.setState({ phone: { value, valid } });
                                    }}
                                />
                                <div style={{ marginTop: '24px' }}>
                                    <input
                                        type="submit"
                                        value="Save Changes"
                                        className="button button-full"
                                        style={{
                                            paddingTop: 0,
                                            marginBottom: '12px',
                                            display: 'inline-block'
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
const ukPhoneRegexp = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
const ukPostcodeRegexp = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;

const mapStateToProps = ({ user }) => ({
    user: user
});

export default connect(mapStateToProps, { getUserDetails })(ChangeDetails);

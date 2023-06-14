import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Spinner from '../components/common/Spinner';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import constants from '../constants';
import { getUserDetails } from '../actions/UserActions';
import analytics from "../analytics";
import { getAuthHeader } from '../utils/Auth';

const organisationTypes = [
    'academic-institution',
    'community-group',
    'not-for-profit',
    'private-sector',
    'public-sector',
    'sole-trader',
];
const activityTypes = [
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


const ChangeDetails = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState(false);
    const [firstName, setFirstName] = useState({
        value: user.firstName,
        valid: ''
    });
    const [lastName, setLastName] = useState({
        value: user.lastName,
        valid: ''
    });
    const [organisation, setOrganisation] = useState({
        value: user.organisation,
        valid: ''
    });
    const [organisationType, setOrganisationType] = useState({
        value: user.organisationType,
        valid: ''
    });
    const [organisationTypeOther, setOrganisationTypeOther] = useState({
        value: user.organisationTypeOther,
        valid: ''
    });
    const [organisationActivity, setOrganisationActivity] = useState({
        value: user.organisationActivity,
        valid: ''
    });
    const [organisationActivityOther, setOrganisationActivityOther] = useState({
        value: organisationActivityOther,
        valid: ''
    });
    const [organisationNumber, setOrganisationNumber] = useState({
        value: user.organisationNumber,
        valid: ''
    });
    const [phone, setPhone] = useState({
        value: user.phone,
        valid: ''
    });
    const [address1, setAddress1] = useState({
        value: user.address1,
        valid: ''
    });
    const [address2, setAddress2] = useState({
        value: user.address2,
        valid: ''
    });
    const [city, setCity] = useState({
        value: user.city,
        valid: ''
    });
    const [postcode, setPostcode] = useState({
        value: user.postcode,
        valid: ''
    });

    console.log(organisationType, organisationActivity)

    useEffect(() => {
        if (organisationType.value !== '') {
            if (organisationTypes.indexOf(organisationType.value) === -1) {
                setOrganisationTypeOther({
                    value: organisationType.value,
                    valid: ''
                })
                setOrganisationType({
                    value: "other",
                    valid: ''
                })
            };
        }
        if (user.organisationActivity !== '') {
            if (activityTypes.indexOf(organisationActivity) === -1) {
                setOrganisationActivityOther({
                    value: organisationActivity.value,
                    valid: ''
                })
                setOrganisationActivity({
                    value: 'other',
                    valid: ''
                })
            }
        }
    }, []);

    useEffect(() => {
        analytics.pageview(window.location.pathname);
        dispatch(getUserDetails());
    }, []);

    const printErrors = () => {
        if (errors)
            return Object.keys(errors).map((key, index) => {
                return <p key={index}>{errors[key]}</p>;
            });
    }

    const changeDetails = (e) => {
        e.preventDefault();
        setSubmitting(true);

        let organisationType = organisationType.value;
        organisationType = organisationType === 'other' ? organisationTypeOther.value : organisationType;
        let organisationActivity = organisationActivity.value;
        organisationActivity = (organisationActivity === 'other') ? organisationActivityOther.value : organisationActivity;

        const body = {
            firstName: firstName.value,
            lastName: lastName.value,
            organisation: organisation.value,
            organisationNumber: organisationNumber.value,
            organisationType: organisationType,
            organisationActivity: organisationActivity,
            address1: address1.value,
            address2: address2.value,
            city: city.value,
            postcode: postcode.value,
            phone: phone.value,
        }
        axios.post(`${constants.ROOT_URL}/api/user/details`, body, getAuthHeader())
            .then((response) => {
                console.log("response", response);
                console.log("change details", response);
                setSuccess(true);
            })
            .catch(err => {
                setErrors({ errors: ["We could not change your details at the moment. Please try again later."] })
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (<>
        {success ? <div
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
                            onClick={() => dispatch(getUserDetails())}
                        >
                            Ok
                        </div>
                    </Link>
                </div>
            </div>
        </div>
            :
            submitting ?
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
                :
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
                                        {printErrors()}
                                        <br />
                                    </div>
                                )
                            }
                            <form onSubmit={changeDetails}>
                                <input
                                    type="text"
                                    className={`text-input
                            ${(organisation.valid !== '') ? organisation.valid ? 'valid' : 'invalid' : ''}`}
                                    placeholder="Organisation Name"
                                    value={organisation.value}
                                    onChange={(e) => {
                                        setOrganisation({ value: e.target.value, valid: e.target.value !== '' });
                                    }}
                                />
                                <Select
                                    name="organisation-type"
                                    value={organisationType.value}
                                    onChange={(selectedOption) => {
                                        setOrganisationType({ value: selectedOption.value, valid: selectedOption.value !== '' });
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
                                                setOrganisationTypeOther({ value: e.target.value, valid: e.target.value !== '' });
                                            }}
                                        />
                                    )
                                }
                                <Select
                                    name="organisation-activity"
                                    value={organisationActivity.value}
                                    onChange={(selectedOption) => {
                                        setOrganisationActivity({ value: e.target.value, valid: e.target.value !== '' });
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
                                                setOrganisationActivityOther({ value: e.target.value, valid: e.target.value !== '' });
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
                                        const valid = ((e.target.value.length > 2) && (e.target.value.length < 20));
                                        setFirstName({ value: e.target.value, valid });
                                    }}
                                />
                                <input
                                    type="text"
                                    className={`text-input
                            ${(lastName.valid !== '') ? lastName.valid ? 'valid' : 'invalid' : ''}`}
                                    placeholder="Last name"
                                    value={lastName.value}
                                    onChange={(e) => {
                                        const valid = ((e.target.value.length > 2) && (e.target.value.length < 20));
                                        setLastName({ value: e.target.value, valid });
                                    }}
                                />
                                <input
                                    type="text"
                                    className={`text-input
                            ${(address1.valid !== '') ? address1.valid ? 'valid' : 'invalid' : ''}`}
                                    placeholder="Address 1"
                                    value={address1.value}
                                    onChange={(e) => {
                                        setAddress1({ value: e.target.value, valid: e.target.value !== '' });
                                    }}
                                />
                                <input
                                    type="text"
                                    className={`text-input`}
                                    placeholder="Address 2"
                                    value={address2.value}
                                    onChange={(e) => {
                                        setAddress2({ value: e.target.value, valid: true });
                                    }}
                                />
                                <input
                                    type="text"
                                    className={`text-input
                            ${(city.valid !== '') ? city.valid ? 'valid' : 'invalid' : ''}`}
                                    placeholder="City"
                                    value={city.value}
                                    onChange={(e) => {
                                        setCity({ value: e.target.value, valid: e.target.value !== '' });
                                    }}
                                />
                                <input
                                    type="text"
                                    className={`text-input
                            ${(postcode.valid !== '') ? postcode.valid ? 'valid' : 'invalid' : ''}`}
                                    placeholder="Postcode"
                                    value={postcode.value}
                                    onChange={(e) => {
                                        setPostcode({ value: e.target.value, valid: ukPostcodeRegexp.test(e.target.value) });
                                    }}
                                />
                                <input
                                    type="text"
                                    className={`text-input
                            ${(phone.valid !== '') ? phone.valid ? 'valid' : 'invalid' : ''}`}
                                    placeholder="Tel"
                                    value={phone.value}
                                    onChange={(e) => {
                                        setPhone({ value: e.target.value, valid: ukPhoneRegexp.test(e.target.value) });
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
        }
    </>
    )
}

const ukPhoneRegexp = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
const ukPostcodeRegexp = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;

export default ChangeDetails;

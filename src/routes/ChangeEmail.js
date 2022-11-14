import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../components/common/Spinner';
import { Link } from 'react-router-dom';
import constants from '../constants';
import { getUserDetails } from '../actions/UserActions';
import analytics from "../analytics";
import { getAuthHeader } from '../utils/Auth';

class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: {
                value: '',
                valid: '',
            },
            confirmNewEmail: {
                value: '',
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
    changeEmail = (e) => {
        e.preventDefault();
        if ((this.state.confirmNewEmail.valid && this.state.newEmail.valid)) {
            this.setState({ submitting: true });
            let body = {
                username: this.state.newEmail.value
            }
            axios.post(`${constants.ROOT_URL}/api/user/email/`, body, getAuthHeader())
                .then((response) => {
                    console.log("change email", response);
                    if (response.status === 200) {
                        this.setState({ success: true });
                    } else {
                        this.setState({ errors: response.data.errors });
                    }
                    this.setState({ submitting: false })
                })
                .catch(err => {
                    if (err.response.data.Message.includes("Duplicate")) {
                        this.setState({ errors: ["This email is already registered."] });
                    } else {
                        this.setState({ errors: ["We could not change your email at the moment. Please try again later."] });
                    }
                    this.setState({ submitting: false });
                });
        }
    }

    render() {
        let { submitting, success, newEmail, confirmNewEmail, errors } = this.state;
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
                        margin: '0'
                    }}>
                    <div>
                        <div>
                            Your email has been changed successfully.
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <Link to="/app/my-account">
                                <div
                                    className="button button-medium"
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
                        <h3 style={{ fontWeight: 600 }}>Email</h3>
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
                        <form onSubmit={this.changeEmail}>
                            <input
                                type="text"
                                className={`text-input
                                ${(newEmail.valid !== '') ? newEmail.valid ? 'valid' : 'invalid' : ''}`}
                                placeholder="New email address"
                                value={newEmail.value}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let valid = emailRegexp.test(value);
                                    this.setState({ newEmail: { value, valid } })
                                }}
                            />
                            <input
                                type="text"
                                className={`text-input
                                ${(confirmNewEmail.valid !== '') ? confirmNewEmail.valid ? 'valid' : 'invalid' : ''}`}
                                placeholder="Confirm new email address"
                                value={confirmNewEmail.value}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let valid = newEmail.value === value;
                                    this.setState({ confirmNewEmail: { value, valid } })
                                }}
                            />
                            <div>
                                <input
                                    type="submit"
                                    value="Save Changes"
                                    className={`button button-full ${(confirmNewEmail.valid && newEmail.valid) ? '' : 'button-grey'}`}
                                    style={{
                                        paddingTop: 0,
                                        marginTop: '12px',
                                        marginBottom: '12px',
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
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const mapStateToProps = ({ user }) => ({
    user: user
});

export default connect(mapStateToProps, { getUserDetails })(ChangeEmail);

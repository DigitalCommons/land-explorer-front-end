import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-spinkit';
import Navbar from '../components/Navbar';
import {Link} from 'react-router-dom';
import constants from '../constants';
import analytics from "../analytics";


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: {
                value: '',
                valid: '',
            },
            confirmNewPassword: {
                value: '',
                valid: '',
            },
            submitting: false,
            errors: false,
            success: false,
        }
    }

    componentDidMount (){
        analytics.pageview(window.location.pathname);
    }

    printErrors = () => {
        let errors = this.state.errors;
        let keys = Object.keys(errors);
        return keys.map((key, index) => {
            return <p key={index}>{errors[key]}</p>;
        });
    }
    changePassword = (e) => {
        e.preventDefault();
        if (this.state.confirmNewPassword.valid && this.state.newPassword.valid) {
            this.setState({submitting: true});
            let body = {
                password: this.state.newPassword.value,
                passwordConfirm: this.state.confirmNewPassword.value,
            }
            let config = {headers: {'Authorization': "bearer " + localStorage.getItem('token')}};

            axios.post(`${constants.ROOT_URL}/api/user/password/`, body, config)
                .then((response) => {
                    console.log("change password", response);
                    if (response.status = 200) {
                        console.log("register response 200", response);
                        if (response.data.status) {
                            this.setState({errors: response.data.errors});
                        } else {
                            this.setState({success: true});
                        }
                    }
                    this.setState({submitting: false})
                })
                .catch(err => {
                    console.log("err", err);
                    this.setState({registering: false})
                });
        }
    }

    render() {
        let {submitting, success, newPassword, confirmNewPassword, errors} = this.state;
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
                            Your password has been changed successfully.
                        </div>
                        <div style={{marginTop: '24px'}}>
                            <Link to="/app/my-account">
                                <div
                                    className="button button-medium"
                                    style={{display: 'inline-block', marginRight: '12px'}}
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
                    <Spinner name="pulse" fadeIn="none" color="white"/>
                </div>
            )
        } else {
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
                        paddingBottom: '12px',
                        paddingTop: '6px',
                        borderRadius: '8px',
                        margin: '0'
                    }}>
                    <div
                        style={{
                            display: submitting ? 'none' : 'block'
                        }}>
                        <h3 style={{ fontWeight: 600 }}>Password</h3>
                        <Link to="/app/my-account"
                              className="modal-close"
                        />
                        <br/>
                        {
                            errors && (
                                <div>
                                    {this.printErrors()}
                                    <br/>
                                </div>
                            )
                        }
                        <form onSubmit={this.changePassword}>
                            <input
                                type="password"
                                className={`text-input
                                ${ (newPassword.valid !== '') ? newPassword.valid ? 'valid' : 'invalid' : '' }`}
                                placeholder="New password"
                                value={newPassword.value}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let valid = (value.length > 5) && (value.length < 30);
                                    this.setState({newPassword: {value, valid}})
                                }}
                            />
                            <input
                                type="password"
                                className={`text-input
                                ${ (confirmNewPassword.valid !== '') ? confirmNewPassword.valid ? 'valid' : 'invalid' : '' }`}
                                placeholder="Confirm new password"
                                value={confirmNewPassword.value}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let valid = newPassword.value === value;
                                    this.setState({confirmNewPassword: {value, valid}})
                                }}
                            />
                            <div style={{marginTop: '24px'}}>
                                <input
                                    type="submit"
                                    value="Save Changes"
                                    className={`button button-full ${(newPassword.valid && confirmNewPassword.valid) ? '' : 'button-grey'}`}
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
            );
        }
    }
}

const mapStateToProps = ({user}) => ({
    user: user
});

export default connect(mapStateToProps)(ChangePassword);

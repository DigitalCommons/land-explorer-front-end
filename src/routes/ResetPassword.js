import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../constants';
import analytics from '../analytics';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                valid: ''
            },
            success: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email.valid) {
            this.reset();
        }
    }

    reset = () => {
        let request = {
            username: this.state.email.value,
        }
        axios.post(`${constants.ROOT_URL}/api/user/password-reset/`, request)
            .then((response) => {
                console.log("reset response", response);
                this.setState({ success: true });
                analytics.event(analytics._event.PASSWORD_RESET, 'Success');
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        analytics.pageview(window.location.pathname);
        this.props.updateCarousel(2);
    }

    render() {
        let { email, success } = this.state;
        if (this.state.success) {
            return (
                <div style={{
                    minHeight: '100vh',
                    overflowY: 'scroll',
                }}>
                    <div
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                            position: 'absolute',
                            height: 'auto',
                            width: '340px',
                            maxWidth: '90vw',
                            background: 'white',
                            left: '50%',
                            top: '50%',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            paddingBottom: '12px',
                            borderRadius: '8px'
                        }}
                    >
                        <h3 style={{ fontWeight: 600 }}>Password reset requested</h3>
                        <Link to="/auth/">
                            <div className="button button-small" style={{ margin: 'auto' }}>Ok</div>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{
                    minHeight: '100vh',
                }}>
                    <div style={{
                        height: 'auto',
                        width: '340px',
                        maxWidth: '90vw',
                        background: 'white',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        boxSizing: 'border-box',
                        transform: 'translateX(-50%) translateY(-50%)',
                        textAlign: 'center',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingBottom: '12px',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{ fontWeight: 600 }}>Reset Password</h3>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className="text-input"
                                placeholder="Email address"
                                value={email.value}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let valid = emailRegexp.test(value);
                                    this.setState({
                                        email: { value, valid }
                                    })
                                }}
                            />
                            <div style={{ marginTop: '16px' }}>
                                <input
                                    type="submit"
                                    value="Reset"
                                    className="button button-full"
                                    style={{
                                        paddingTop: 0,
                                    }}
                                />
                                <p><Link to="/auth/" style={{
                                    textDecoration: 'none',
                                    color: 'rgba(208, 2, 78, 0.95)',
                                    fontSize: '14px',
                                    borderBottom: '1px solid rgba(208, 2, 78, 0.95)'
                                }}>Cancel</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default connect(null)(ResetPassword);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { Link, Redirect, Route, Routes } from 'react-router-dom';
import Select from 'react-select';
//import Spinner from 'react-spinkit';
import axios from "axios/index";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangeDetails from "./ChangeDetails";
import { connect } from 'react-redux';
import constants from '../constants';
import { getUserDetails } from '../actions/UserActions';
import { closeMenus } from '../actions/MenuActions';
import analytics from '../analytics';

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: 0
        }
    }

    componentDidMount() {
        analytics.pageview(window.location.pathname);
        this.props.closeMenus();
        this.props.getUserDetails();
        setTimeout(() => {
            this.setState({
                background: 1
            })
        }, 50)
    }

    render() {
        return this.props.populated ? (
            <div>
                <div className="Modal"
                    style={{
                        opacity: this.state.background,
                        transition: 'opacity 300ms'
                    }}
                />
                <div className="my-account-container">
                    <Routes>
                        <Route exact path="/app/my-account" render={() => (
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
                                    paddingTop: '28px',
                                    borderRadius: '8px',
                                    margin: '0',
                                }}>
                                <div className="my-account--userlogo">
                                    {this.props.initials}
                                </div>
                                <h3 style={{ fontWeight: 600 }}>My Account</h3>
                                <br />
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <Link to="/app/"
                                        className="modal-close"
                                    />
                                    <div className="my-account--option">
                                        <div className="my-account--option--left">
                                            <img src={require('../assets/img/icon-details.svg')} alt=""
                                                style={{
                                                    height: '18px',
                                                    width: '18px',
                                                    marginRight: '18px'
                                                }}
                                            />
                                            Details
                                        </div>
                                        <Link to="/app/my-account/details"
                                            className="button button-small"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                    <div className="my-account--option">
                                        <div className="my-account--option--left">
                                            <img src={require('../assets/img/icon-mail.svg')} alt=""
                                                style={{
                                                    height: '24px',
                                                    width: '24px',
                                                    marginRight: '12px'
                                                }}
                                            />
                                            Email
                                        </div>
                                        <Link to="/app/my-account/email"
                                            className="button button-small"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                    <div className="my-account--option">
                                        <div className="my-account--option--left">
                                            <img src={require('../assets/img/icon-lock.svg')} alt=""
                                                style={{
                                                    height: '22px',
                                                    width: '22px',
                                                    marginRight: '12px'
                                                }}
                                            />
                                            Password
                                        </div>
                                        <Link to="/app/my-account/password"
                                            className="button button-small"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )} />
                        <Route exact path="/app/my-account/details" component={ChangeDetails} />
                        <Route exact path="/app/my-account/email" component={ChangeEmail} />
                        <Route exact path="/app/my-account/password" component={ChangePassword} />
                    </Routes>
                </div>
            </div>
        ) : (
            <div> {/*<Spinner />*/}</div>

        );
    }
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ukPhoneRegexp = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
const ukPostcodeRegexp = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;


MyAccount.propTypes = {};

const mapStateToProps = ({ user }) => ({
    populated: user.populated,
    initials: user.initials
});

export default connect(mapStateToProps, { closeMenus, getUserDetails })(MyAccount);

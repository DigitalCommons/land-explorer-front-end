import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import * as Auth from '../components/Auth';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Spinner from 'react-spinkit';
import constants from '../constants';
import { tokensToFunction } from 'path-to-regexp';

const qs = require('querystring');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggingIn: false,
            error: false,
            email: {
                value: '',
                valid: ''
            },
            password: {
                value: '',
                valid: ''
            }
        }

        //If user is already logged in, redirect to app
        if(Auth.isTokenActive()){
            this.props.history.push('/app');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.login();
    };



    login = () => {

        this.setState({error: false, loggingIn: true});

        const requestBody = {
            username: this.state.email.value,
            password: this.state.password.value,
            grant_type: 'password'
          };
          
          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };
          
          axios.post(`${constants.ROOT_URL}/token`, qs.stringify(requestBody), config)
            .then((response) => {
                console.log(response.data);

                if (response.status === 200) {
                    Auth.setToken(response.data.access_token, response.data.expires_in);
                    this.props.history.push('/app');
                }else if (response.status === 400){
                    console.log("wrong credentials");
                    this.setState({loggingIn: false, error: true})
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({loggingIn: false, error: true})
            })
    }

    render() {
        let { password, email, loggingIn } = this.state;
        return (
            <div style={{
                minHeight: '100vh',
            }}>
                <Navbar limited={true} />
                <div
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        position: 'absolute',
                        textAlign: 'center',
                        display: loggingIn ? 'block' : 'none',
                    }}
                >
                    <Spinner name="pulse" fadeIn="none" />
                </div>
                <div style={{
                    height: 'auto',
                    minHeight: '200px',
                    width: '500px',
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
                    display: loggingIn ? 'none' : 'block'
                }}>
                    <h2>Log In</h2>
                    {
                        this.state.error && (
                            <p style={{marginBottom: '12px'}}>You have entered an invalid username or password</p>
                        )
                    }
                    <br/>
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
                        <input
                            type="password"
                            className="text-input"
                            placeholder="Password"
                            value={password.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                let valid = (value.length > 5) && (value.length < 13);
                                this.setState({
                                    password: { value, valid }
                                });
                            }}
                        />
                        <input
                            type="submit"
                            value="Log In"
                            className="button button-medium"
                            style={{
                                paddingTop: 0,
                                marginTop: '6px',
                            }}
                        />
                    </form>
                    <p>or, <Link to="/auth/register" style={{
                        textDecoration: 'none',
                        color: 'rgb(46, 203, 112)',
                        paddingBottom: '4px',
                        borderBottom: '1px solid rgb(46, 203, 112)'
                    }}>register new account</Link></p>
                    <p>or, <Link to="/auth/reset-password" style={{
                        textDecoration: 'none',
                        color: 'rgb(46, 203, 112)',
                        paddingBottom: '4px',
                        borderBottom: '1px solid rgb(46, 203, 112)'
                    }}>reset password</Link></p>
                </div>
            </div>
        );
    }
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Login.propTypes = {};

//export default connect(null)(Login);

const mapStateToProps = ({authentication, user}) => ({
    authenticated: authentication.authenticated,
    loggedIn: authentication.loggedIn,
    user: user,
});

export default withRouter(connect(mapStateToProps)(Login));
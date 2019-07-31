import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from 'react-spinkit';
import constants from '../constants';

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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.login();
    }

    login = () => {
        this.setState({error: false, loggingIn: true});
        let request = {
            username: this.state.email.value,
            password: this.state.password.value
        }
        //todo look at changing the login mechanism to be json post
        axios.post(`${constants.ROOT_URL}/login?username=`  + request.username + `&password=` + request.password, request)
            .then((response) => {
                console.log("response a", response);
                if (response.status === 200) {
                    if (response.data.status === "200") {
                        // success
                        window.location = "/app"
                    } else if (response.data.status = "403") {
                        // error
                        this.setState({loggingIn: false, error: true})
                    }
                    //{"expires":1527679145681,"message":"Success","status":"200","token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiZXhwIjoxNTI3Njc5MTQ1fQ.rA6ZfGx2ekQmTEVJHf34REwAA1ot_3SzMLzrUcPybyYdK30NYFMiOCkfxhSXhVnBdKKpdd0EBb1zvR6XtRpdCA"
                }
            })
            .catch(err => console.log(err));
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
                </div>
            </div>
        );
    }
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Login.propTypes = {};

export default connect(null)(Login);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import { closeMenus } from '../actions/MenuActions';
import { getUserDetails } from '../actions/UserActions';
import analytics from '../analytics';
import Spinner from '../components/common/Spinner';
import ChangeDetails from "./ChangeDetails";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

const AccountView = ({ initials }) => {
    return <div
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
            {initials}
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
}

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
                        <Route exact path="/" element={<AccountView initials={this.props.initials} />} />
                        <Route exact path="/details" element={<ChangeDetails />} />
                        <Route exact path="/email" element={<ChangeEmail />} />
                        <Route exact path="/password" element={<ChangePassword />} />
                    </Routes>
                </div>
            </div>
        ) : (
            <div> <Spinner /></div>

        );
    }
}

MyAccount.propTypes = {};

const mapStateToProps = ({ user }) => ({
    populated: user.populated,
    initials: user.initials
});

export default connect(mapStateToProps, { closeMenus, getUserDetails })(MyAccount);

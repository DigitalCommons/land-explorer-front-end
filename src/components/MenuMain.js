import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import constants from '../constants';
import analytics from "../analytics";
import { logout } from '../utils/Auth';

class MenuMain extends Component {
    constructor(props) {
        super(props);
    }

    logoutUser() {
        logout();
        this.props.history.push('/auth');
    }

    render() {
        let { open, limited } = this.props;
        let mobile = window.innerWidth < 480;
        return (
            <div style={{
                display: open ? 'block' : 'none',
                zIndex: 1000001,
            }}>
                <div className="tooltip-menu tooltip-menu-main modal"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <a target="_blank" href={`${constants.STATIC_SITE_URL}`}>
                        <div className="tooltip-menu-item">
                            Home
                        </div>
                    </a>
                    {
                        (!mobile) && (
                            <React.Fragment>
                                <a target="_blank" href={`${constants.STATIC_SITE_URL}/#about`}>
                                    <div className="tooltip-menu-item">About</div>
                                </a>
                                <a target="_blank" href={`${constants.STATIC_SITE_URL}/#partners`}>
                                    <div className="tooltip-menu-item">Partners</div>
                                </a>
                                <a target="_blank" href={`${constants.STATIC_SITE_URL}/#community`}>
                                    <div className="tooltip-menu-item">Community</div>
                                </a>
                                <a target="_blank" href={`${constants.STATIC_SITE_URL}/#news`}>
                                    <div className="tooltip-menu-item">Blog</div>
                                </a>
                                <a target="_blank" href={`${constants.STATIC_SITE_URL}/#contact`}>
                                    <div className="tooltip-menu-item">Contact</div>
                                </a>
                            </React.Fragment>
                        )
                    }
                    {
                        (!limited && mobile) && (
                            <Link to="/app/my-account">
                                <div className="tooltip-menu-item">My Account</div>
                            </Link>
                        )
                    }
                    {
                        (!limited && mobile) && (
                            <div
                                onClick={() => {
                                    analytics.pageview('/app/my-maps');
                                    this.props.dispatch({ type: 'OPEN_MODAL', payload: 'myMaps' })
                                }
                                }
                                className="tooltip-menu-item"
                            >My Maps</div>
                        )
                    }
                    {
                        (!limited && mobile) && (
                            <div
                                onClick={() => {
                                    analytics.pageview('/app/my-shared-maps');
                                    this.props.dispatch({ type: 'OPEN_MODAL', payload: 'mySharedMaps' })
                                }
                                }
                                className="tooltip-menu-item"
                            >Shared Maps</div>
                        )
                    }
                    {
                        (!limited && mobile) && (
                            <div className="tooltip-menu-item no-hover"
                                style={{
                                    marginBottom: '10px'
                                }}
                            >
                                <div className="button button-medium" onClick={this.logoutUser}
                                /*onClick={(e) => {
                                    e.preventDefault();
                                    window.location = "/logout";
                                }}*/
                                >Logout</div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

MenuMain.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ menu }) => ({
    open: menu.main
})

export default connect(mapStateToProps)(MenuMain);

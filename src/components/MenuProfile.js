import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../actions/ModalActions';
import { changeUser } from '../actions/UserActions'
import analytics from '../analytics';
import constants from '../constants';
import { logout } from '../utils/Auth';
import withRouter from "../components/common/withRouter";

class MenuProfile extends Component {
    constructor(props) {
        super(props);
        this.dispatchUserChange = this.dispatchUserChange.bind(this);
    }

    logoutUser(e) {
        logout();
        this.props.router.navigate("/auth")
    }

    dispatchUserChange(event) {
        this.props.changeUser(event.target.id);
    }

    ifPrivilegedDisplayButtons(privileged) {
        if (privileged)
            return <div>
                <div className="tooltip-menu-item"
                    onClick={this.dispatchUserChange}
                    id="core"
                >Core</div>
                <div className="tooltip-menu-item"
                    onClick={this.dispatchUserChange}
                    id="council"
                >Council</div>
            </div>
    }

    render() {
        let { open, openModal, privileged } = this.props;
        return (
            <div style={{
                display: open ? 'block' : 'none',
            }}>
                <div className="tooltip-menu tooltip-menu-profile modal">
                    <Link to="/app/my-account">
                        <div className="tooltip-menu-item">
                            My Account
                        </div>
                    </Link>
                    <div className="tooltip-menu-item"
                        onClick={() => {
                            analytics.pageview('/app/my-maps');
                            openModal('myMaps');
                        }}
                    >
                        My Maps
                    </div>
                    <div className="tooltip-menu-item"
                        onClick={() => {
                            analytics.pageview('/app/my-shared-maps');
                            openModal('mySharedMaps');
                        }}
                    >
                        Shared Maps
                    </div>
                    {this.ifPrivilegedDisplayButtons(privileged)}
                    <div className="tooltip-menu-item no-hover"
                        style={{
                            marginTop: '10px'
                        }}
                    >

                        <div className="button button-medium"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(constants.STATIC_SITE_URL + '/#donate');
                            }}
                        >Donate</div>
                    </div>
                    <div className="tooltip-menu-item no-hover"
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <div className="button button-medium" onClick={this.logoutUser.bind(this)}
                        /*onClick={(e) => {
                            e.preventDefault();
                            window.location = "/logout";
                        }}*/
                        >Logout</div>
                    </div>
                </div>
            </div>
        );
    }
}

MenuProfile.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ menu, user }) => ({
    open: menu.profile,
    privileged: user.privileged
});

export default connect(mapStateToProps, { openModal, changeUser })(withRouter(MenuProfile));

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyMaps } from '../actions/MapActions';
import { openModal } from '../actions/ModalActions';
import analytics from '../analytics';
import constants from '../constants';

class MenuProfile extends Component {
    render() {
        let { open, getMyMaps, openModal } = this.props;
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
                             getMyMaps();
                             analytics.pageview('/app/my-maps');
                             openModal('myMaps');
                         }}
                    >
                        My Maps
                    </div>
                    <div className="tooltip-menu-item"
                         onClick={() => {
                             getMyMaps();
                             analytics.pageview('/app/my-shared-maps');
                             openModal('mySharedMaps');
                         }}
                    >
                        Shared Maps
                    </div>
                    <div className="tooltip-menu-item no-hover"
                         style={{
                             marginTop: '10px'
                         }}
                    >
                        <div className="button button-medium"
                             onClick={(e) => {
                                e.preventDefault();
                                window.open(constants.WP_URL+'/#donate');
                              }}
                        >Donate</div>
                    </div>
                    <div className="tooltip-menu-item no-hover"
                         style={{
                             marginBottom: '10px'
                         }}
                    >
                        <div className="button button-medium button-outline"
                             onClick={(e) => {
                                 e.preventDefault();
                                 window.location = "/logout";
                             }}
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

const mapStateToProps = ({ menu }) => ({
    open: menu.profile
});

export default connect(mapStateToProps, { getMyMaps, openModal })(MenuProfile);

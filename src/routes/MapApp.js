import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../constants';
import withRouter from "../components/common/withRouter";
import { isMobile } from 'react-device-detect';
import analytics from '../analytics';

import MapboxMap from '../components/MapboxMap';
import Navbar from '../components/Navbar';
import '../assets/styles/style.scss';
import Tooltips from '../components/Tooltips';
import Controls from '../components/Controls';
import * as Auth from '../utils/Auth';
import Spinner from '../components/common/Spinner';
import { logout, getAuthHeader } from '../utils/Auth';

class MapApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: false,
            success: false
        }
    }

    logoutUser() {
        logout();
        this.props.router.navigate("/auth", { replace: true });
    }

    componentDidMount() {
        if (!Auth.isTokenActive()) {
            console.log("no token, redirecting")
            this.props.router.navigate("/auth", { replace: true });
        }

        this.fetchUserDetails();
        this.fetchUserMaps();

        // if mobile, disable drawing tools
        if (isMobile) {
            this.props.dispatch({ type: 'READ_ONLY_ON' });
        }
    }

    async fetchUserDetails() {
        try {
            const details = await axios.get(`${constants.ROOT_URL}/api/user/details/`, getAuthHeader());

            if (details.status === 200) {
                analytics.setDimension(analytics._dimension.ORG_TYPE, details.data.organisationType);
                analytics.setDimension(analytics._dimension.ORG_ACTIVITY, details.data.organisationActivity);
                //fire the initial page load analytics
                analytics.pageview('/app/');
                this.props.dispatch({ type: 'POPULATE_USER', payload: details.data[0] })
            } if (details.status === 401) {
                //Service denied due to auth denied
                //Most probably token expired
                this.logoutUser();

            } else {
                this.setState({ errors: details.data.errors })
            }
        } catch (err) {
            console.log("There was an error", err);

            if (err.response.status === 401) {
                //Service denied due to auth denied
                //Most probably token expired
                this.logoutUser();
            }
        }
    }

    async fetchUserMaps() {
        try {
            const maps = await axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())

            if (maps.status === 200) {
                this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: maps.data })
            }
        }
        catch (err) {
            console.log("There was an error", err);

            this.props.dispatch({ type: 'MAP_ERROR', payload: err });
        }
    }

    render() {
        const { populated } = this.props.user;
        console.log(this.props.user)
        // If user details and maps have been populated render map
        if (populated) {
            /*
                MapboxMap - MapboxGL instance, drawing tools, nav, ui etc.
                Navbar - navbar at top of page
                Tooltips - hover tooltips for nav items
                Controls - map and layer controls in bottom right of app
             */
            return (
                <div>
                    <Tooltips />
                    <MapboxMap user={this.props.user} />
                    <Navbar limited={false} />
                    <Controls />
                </div>
            )
        } else {
            // else render loading spinner
            return (
                <div className="full-height overflow-y">
                    <Navbar limited={true} />
                    <div className="centered">
                        <Spinner />
                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = ({ authentication, user }) => ({
    authenticated: authentication.authenticated,
    loggedIn: authentication.loggedIn,
    token: authentication.token,
    user: user,
});

export default withRouter(connect(mapStateToProps)(MapApp));

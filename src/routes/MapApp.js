import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../constants';
import { withRouter } from 'react-router';
import { isMobile } from 'react-device-detect';
import analytics from '../analytics';

import MapboxMap from '../components/MapboxMap';
import Navbar from '../components/Navbar';
import '../assets/styles/style.scss';
import Tooltips from '../components/Tooltips';
import Controls from '../components/Controls';
import * as Auth from '../components/Auth';
import Spinner from 'react-spinkit';
import { logout, getAuthHeader } from '../components/Auth';

class MapApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: false,
            success: false
        }

        //If uuser does not have valid token, redirect to auth
        if (!Auth.isTokenActive()) {
            this.props.history.push('/auth');
        }
        //console.log(Auth.isTokenActive());
    }

    logoutUser() {
        logout();
        this.props.history.push('/auth');
    }

    componentDidMount() {

        // let details = JSON.parse('{"eid": "e4389df1310f15f1bf883bd2528beb0af9b50be7b0bb1cd8e120087535317b52","username": "testing@wearespork.net","firstName": "Testing","lastName": "User","marketing": false,"organisation": "","organisationNumber": "","organisationType": "not-for-profit","organisationActivity": "community-development","address1": "","address2": "","city": "","postcode": "","phone": ""}');



        // Populate user details and maps
        Promise.all([
            axios.get(`${constants.ROOT_URL}/api/user/details/`, getAuthHeader()),
            axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
        ]).then(([details, maps]) => {

            //console.log("Logging here ============");
            //console.log(details.data[0]);
            //details.data = JSON.parse(details.data);
            //details.data = details.data);
            // populate user details
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
            // if mobile, disable drawing tools
            if (isMobile) {
                this.props.dispatch({ type: 'READ_ONLY_ON' });
            }
            // populate user maps
            if (maps.status === 200) {
                //this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: maps.data })
                this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: maps.data })
                //this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: JSON.parse(maps.data) })
            }
        }).catch((err) => {
            console.log("There was an error", err);
            this.logoutUser();
            /*
            //The response.status
            if (err.response.status === 401) {
                //Service denied due to auth denied
                //Most probably token expired
                this.logoutUser();
            }
            */
        })

    }

    render() {
        let { populated } = this.props.user;
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
                    <MapboxMap user={this.props.user} />
                    <Navbar limited={false} />
                    <Tooltips />
                    <Controls />
                </div>
            )
        } else {
            // else render loading spinner
            return (
                <div className="full-height overflow-y">
                    <Navbar limited={true} />
                    <div className="centered">
                        <Spinner name="pulse" fadeIn="none" />
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

import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import Spinner from 'react-spinkit';

class MapApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: false,
            success: false
        }
    }

    componentDidMount() {
        //console.log(localStorage.getItem('token'));
        //console.log(localStorage.getItem('token_expiry'));

        var config = {headers: {'Authorization': "bearer " + localStorage.getItem('token')}};
        // Populate user details and maps
        Promise.all([
            axios.get(`${constants.ROOT_URL}/api/user/details/`,config),
            axios.get(`${constants.ROOT_URL}/api/user/maps/`,config)
        ]).then(([details, maps]) => {
            
            console.log("Logging here ============");
            console.log(details.data[0]);
            //details.data = JSON.parse(details.data);
            //details.data = details.data);
            // populate user details
            if (details.status === 200) {
                analytics.setDimension(analytics._dimension.ORG_TYPE, details.data.organisationType);
                analytics.setDimension(analytics._dimension.ORG_ACTIVITY, details.data.organisationActivity);
                //fire the initial page load analytics
                analytics.pageview('/app/');
                this.props.dispatch({ type: 'POPULATE_USER', payload: details.data[0] })
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
                this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: [] })
                //this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: JSON.parse(maps.data) })
            }
        }).catch((err) => {
            console.log("There was an error", err);
        })
        /*
        */
    }

    render() {
        let { populated } = this.props.user;
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
                    <MapboxMap />
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
                        <Spinner name="pulse" fadeIn="none"/>
                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = ({authentication, user}) => ({
    authenticated: authentication.authenticated,
    loggedIn: authentication.loggedIn,
    token: authentication.token,
    user: user,
});

export default withRouter(connect(mapStateToProps)(MapApp));

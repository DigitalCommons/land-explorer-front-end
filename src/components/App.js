import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import MapApp from '../routes/MapApp';
import MyAccount from '../routes/MyAccount';
import axios from "axios/index";
import constants from '../constants';
import { getAuthHeader } from "../components/Auth";

class App extends Component {

    componentDidMount() {
        axios.get(`${constants.ROOT_URL}/api/user/details/`, getAuthHeader())
            .then((response) => {
                if (response.status === 200) {
                    if (response.status === 200) {
                        this.props.dispatch({ type: 'POPULATE_USER', payload: response.data[0] })
                    } else if (response.status === 400) {
                        this.setState({ errors: response.data.errors });
                    }
                }
            })
            .catch((err) => {
                console.log("error", err);
            })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/app" component={MapApp} />
                <Route path="/app/my-account" component={MyAccount} />
            </Switch>
        );
    }

}

App.propTypes = {};

const mapStateToProps = ({ authentication, user }) => ({
    authenticated: authentication.authenticated,
    loggedIn: authentication.loggedIn,
    user: user
});

export default connect(mapStateToProps)(App);

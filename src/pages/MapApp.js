import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MapboxMap from '../components/map/MapboxMap';
import TopBar from '../components/top-bar/TopBar';
import Tooltips from '../components/common/Tooltips';
import ControlButtons from '../components/map-controls/ControlButtons';
import Spinner from '../components/common/Spinner';
import * as Auth from "../utils/Auth";
import { getMyMaps } from '../actions/MapActions'
import { getUserDetails } from '../actions/UserActions';
import NoConnectionToast from '../components/map/NoConnectionToast';

const MapApp = () => {
    const authenticated = useSelector(state => state.authentication.authenticated);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getMyMaps());
    }, [])

    useEffect(() => {
        // If not authenticated, remove token and redirect to login page
        if (!authenticated || !Auth.isTokenActive()) {
            Auth.removeToken();
            console.log("no token, redirecting to login page");
            navigate("/auth", { replace: true });
        }
    }, [authenticated])

    // If user details have been populated, render map, else render loading spinner
    if (user.populated) {
        /*
            Tooltips - hover tooltips for buttons
            MapboxMap - MapboxGL instance, drawing tools, left pane, ui etc.
            TopBar - navigation bar at top of page
            Controls - map and layer controls in bottom right of app
         */
        return (
            <div>
                <Tooltips />
                <MapboxMap />
                <TopBar limited={false} />
                <NoConnectionToast />
                <ControlButtons />
            </div>
        )
    } else {
        return (
            <div className="full-height overflow-y">
                <TopBar limited={true} />
                <div className="centered">
                    <Spinner />
                </div>
            </div>
        )
    }
}

export default MapApp;

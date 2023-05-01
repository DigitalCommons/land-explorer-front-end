import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import MapboxMap from '../components/MapboxMap';
import Navbar from '../components/Navbar';
import '../assets/styles/style.scss';
import Tooltips from '../components/Tooltips';
import Controls from '../components/Controls';
import Spinner from '../components/common/Spinner';
import * as Auth from "../utils/Auth";
import { getMyMaps } from '../actions/MapActions'
import { getUserDetails } from '../actions/UserActions';
import NoConnectionToast from '../components/NoConnectionToast';

const MapApp = () => {
    const authenticated = useSelector(state => state.authentication.authenticated);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getMyMaps());

        // if mobile, disable drawing tools
        if (isMobile) {
            dispatch({ type: 'READ_ONLY_ON' });
        }
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
            Tooltips - hover tooltips for nav items
            MapboxMap - MapboxGL instance, drawing tools, nav, ui etc.
            Navbar - navbar at top of page
            Controls - map and layer controls in bottom right of app
         */
        return (
            <div>
                <Tooltips />
                <MapboxMap user={user} />
                <Navbar limited={false} />
                <NoConnectionToast />
                <Controls />
            </div>
        )
    } else {
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

export default MapApp;

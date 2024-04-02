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
import {
  establishSocketConnection,
  closeSocketConnection,
} from "../actions/WebSocketActions";

const MapApp = () => {
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && Auth.isTokenActive()) {
      // If authenticated, get user details, maps, and setup websocket connection with the server
      dispatch(getUserDetails());
      dispatch(getMyMaps());
      dispatch(establishSocketConnection());
    } else {
      // If not authenticated, remove token, disconnect websocket, and redirect to login page
      Auth.removeToken();
      dispatch(closeSocketConnection());
      console.log("no token, redirecting to login page");
      navigate("/auth", { replace: true });
    }
  }, [authenticated]);

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
        <MapboxMap />
        <TopBar limited={false} />
        <NoConnectionToast />
        <ControlButtons />
        <Tooltips />
      </div>
    );
  } else {
    return (
      <div className="full-height overflow-y">
        <TopBar limited={true} />
        <div className="centered">
          <Spinner />
        </div>
      </div>
    );
  }
};

export default MapApp;

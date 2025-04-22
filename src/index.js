import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import MapApp from "./pages/MapApp";
import MyAccount from "./pages/MyAccount";
import FourOhFour from "./pages/FourOhFour";
import constants from "./constants";
import Authentication from "./pages/Authentication";
import ErrorFallback from "./pages/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

// Styles
import "./index.css";
import "./assets/styles/style.scss";

// Enable Redux DevTools if in dev mode
console.log("dev mode: ", constants.DEV_MODE);

// Properties fetched from boundary service can be long, so we should prevent Redux DevTools from
// displaying the whole list and using excessive memory
const LONG_LIST_THRESHOLD = 1000;

const actionSanitizer = (action) =>
  (action.type === "FETCH_RELATED_PROPERTIES_SUCCESS" ||
    action.type === "CLEAR_HIGHLIGHTED_PROPERTIES" ||
    action.type === "HIGHLIGHT_PROPERTIES" ||
    action.type === "SET_VISIBLE_PROPERTIES") &&
  action.payload &&
  action.payload.length > LONG_LIST_THRESHOLD
    ? { ...action, payload: "<<LONG_LIST>>" }
    : action;

const stateSanitizer = (state) => {
  const highlightedProperties =
    state.landOwnership.highlightedProperties.length > LONG_LIST_THRESHOLD
      ? "<<LONG_LIST>>"
      : state.landOwnership.highlightedProperties;
  const relatedProperties =
    state.landOwnership.relatedProperties.length > LONG_LIST_THRESHOLD
      ? "<<LONG_LIST>>"
      : state.landOwnership.relatedProperties;

  return {
    ...state,
    landOwnership: {
      ...state.landOwnership,
      highlightedProperties,
      relatedProperties,
    },
  };
};

const composeEnhancers =
  constants.DEV_MODE && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer,
      })
    : compose;

// Create store from rootReducer with Thunk middleware
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/app" element={<MapApp />} />
          <Route path="/app/my-account/*" element={<MyAccount />} />
          <Route path="/auth/*" element={<Authentication />} />
          <Route path="/" element={<Navigate to="/app" replace={true} />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

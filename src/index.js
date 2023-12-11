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
import analytics from "./analytics";
import constants from "./constants";
import Authentication from "./pages/Authentication";
import ErrorFallback from "./components/errorFallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

// Styles
import "./index.css";
import "./assets/styles/style.scss";

analytics.init();

//Enable REDUX DevTools if in dev mode
const composeEnhancers = constants.DEV_MODE
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
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

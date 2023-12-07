import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {
    BrowserRouter,
    Route,
    Navigate,
    Routes
} from 'react-router-dom';

import MapApp from "./pages/MapApp";
import MyAccount from "./pages/MyAccount";
import FourOhFour from './pages/FourOhFour';
import analytics from './analytics'
import constants from './constants';
import Authentication from './pages/Authentication';

// Styles
import './index.css';
import './assets/styles/style.scss';

analytics.init();

//Enable REDUX DevTools if in dev mode
console.log('dev mode: ', constants.DEV_MODE);
const composeEnhancers = constants.DEV_MODE ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
// Create store from rootReducer with Thunk middleware
const store = createStore(rootReducer, {}, composeEnhancers(
    applyMiddleware(ReduxThunk)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<MapApp />} />
                <Route path="/app/my-account/*" element={<MyAccount />} />
                <Route path="/auth/*" element={<Authentication />} />
                <Route path="/" element={<Navigate to="/app" replace={true} />} />
                <Route path="*" element={<FourOhFour />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

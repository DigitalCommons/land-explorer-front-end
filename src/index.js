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
import '../node_modules/leaflet-draw/dist/leaflet.draw.css';
import './index.css';
import MapApp from "./routes/MapApp";
import MyAccount from "./routes/MyAccount";
import FourOhFour from './routes/FourOhFour';
import analytics from './analytics'
import constants from './constants';
import Authentication from './routes/Authentication';

analytics.init();

//Enable REDUX DevTools if not in production
const composeEnhancers = constants.PROD ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Create store from rootReducer with Thunk middleware
const store = createStore(rootReducer, {}, composeEnhancers(
    applyMiddleware(ReduxThunk)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<MapApp />} />
                <Route path="/app/my-account" element={<MyAccount />} />
                <Route path="/auth/*" element={<Authentication />} />
                <Route exact path="/" element={<Navigate to="/app" replace={true} />} />
                <Route path="*" element={<FourOhFour />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
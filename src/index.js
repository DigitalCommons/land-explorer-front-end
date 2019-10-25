import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from 'react-router-dom';
import '../node_modules/leaflet-draw/dist/leaflet.draw.css';
import './index.css';
import 'react-select/dist/react-select.css';
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


const AppRoute = (path) => (
    <div>
        <Route path="/app" component={MapApp} />
        <Route path="/app/my-account" component={MyAccount} />
    </div>
)


const AuthRoute = (path) => (
    <div>
    <Authentication/>
    </div>
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/app" component={AppRoute} />
                <Route path="/auth" component={AuthRoute} />
                <Route component={FourOhFour} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
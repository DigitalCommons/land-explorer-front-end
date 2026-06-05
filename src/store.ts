import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk as ReduxThunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import constants from "./constants";
import { Action } from "./types";


// Enable Redux DevTools if in dev mode
console.log("dev mode: ", constants.DEV_MODE);

// Properties fetched from boundary service can be long, so we should prevent Redux DevTools from
// displaying the whole list and using excessive memory
const LONG_LIST_THRESHOLD = 100;

const actionSanitizer = <A extends Action<any>>(action: A): A => {
  switch (action.type) {
    case "CLEAR_HIGHLIGHTED_PROPERTIES":
      return action.payload && action.payload.length > LONG_LIST_THRESHOLD
        ? { ...action, payload: "<<LONG_LIST>>" }
        : action;
    case "FETCH_RELATED_PROPERTIES_SUCCESS":
    case "SET_VISIBLE_PROPERTIES":
    case "HIGHLIGHT_PROPERTIES":
      return action.payload &&
        Object.keys(action.payload).length > LONG_LIST_THRESHOLD
        ? { ...action, payload: "<<LARGE_MAP>>" }
        : action;
    default:
      return action;
  }
};

const stateSanitizer = (state: any) => {
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
    ? composeWithDevTools({
        actionSanitizer,
        stateSanitizer,
      })
    : compose;

// Create store from rootReducer with Thunk middleware
const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

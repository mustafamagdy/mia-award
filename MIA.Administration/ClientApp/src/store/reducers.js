import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

export default function createReducer(asyncReducers, history) {
  return combineReducers({
    router: connectRouter(history),
    global: require("./app/reducers").reducer,
    // account: require("./accounts/reducers").reducer,
    auth: require("./auth/reducers").reducer,
    lookups: require("./lookups/reducers").reducer, ...asyncReducers,
    booths: require("./booth/reducers").reducer, ...asyncReducers
  });
}

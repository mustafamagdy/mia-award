import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

export default function createReducer(asyncReducers, history) {
 debugger;
  return combineReducers({
    router: connectRouter(history),
    global: require("./app/reducers").reducer,
    // account: require("./accounts/reducers").reducer,
    auth: require("./auth/reducers").reducer,
    lookups: require("./lookups/reducers").reducer,
    booths: require("./booth/reducers").reducer,
    votingcriterias: require("./votingcriteria/reducers").reducer,
    photoAlbums: require("./photoalbum/reducers").reducer,
    //
    ...asyncReducers,
  });
}

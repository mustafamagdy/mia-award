import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["router", "auth", "home", "global", "news", "account"]
};

export default function createReducer(asyncReducers, history) {
  return persistReducer(
    rootPersistConfig,
    combineReducers({
      router: connectRouter(history),
      global: require("./app/reducers").reducer,
      account: require("./accounts/reducers").reducer,
      auth: require("./auth/reducers").reducer,
      home: require("./home/reducers").reducer,
      news: require("./news/reducers").reducer,
      ...asyncReducers
    })
  );
}

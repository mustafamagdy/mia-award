import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const initialState = {
};

const _reducer = createReducer(initialState, {
});

const homePersistConfig = {
  key: "home",
  storage: storage,
  stateReconciler: hardSet
};

export const reducer = persistReducer(homePersistConfig, _reducer);

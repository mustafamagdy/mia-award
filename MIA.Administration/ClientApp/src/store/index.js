import configureStore from "./configureStore";

// Create redux store with history
import { createBrowserHistory } from "history";
const initialState = {};
export const history = createBrowserHistory();
export const { store, persistedStore } = configureStore(initialState, history);

// console.log('state:', store.getState());

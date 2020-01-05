/**
 * Main App
 */
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { store, persistedStore, history } from "Store";
import axios from "axios";
import appActions from "Store/app/actions";
import authActions from "Store/auth/actions";
import setAuthorizationToken from "Util/setAuthorizationToken";

// css
import "./lib/reactifyCss";

// app component
import App from "./container/App";

const MainApp = () => (
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>
);

try {
  if (sessionStorage.jwtToken) {
    //set jwt token by default on page refresh
    setAuthorizationToken(sessionStorage.jwtToken);
    store.dispatch(authActions.setAuthToken(sessionStorage.jwtToken));
  }

  //get user ip on every page refresh
  // axios
  //   .get("https://api.ipify.org")
  //   .then(res => sessionStorage.setItem("userIp", res.data))
  //   .catch(err => {
  //     console.log("Failed to resolve IP");
  //   });

  //get user culture only if it's not exist
  if (!sessionStorage.culture) {
    let culture = window.navigator.language.split("-")[0];
    sessionStorage.setItem("culture", culture);
    store.dispatch(appActions.changeLocale(culture));
  } else {
    store.dispatch(appActions.changeLocale(sessionStorage.culture));
  }
} catch (error) {
  console.log("Startup error @App ", error);
}
export default MainApp;

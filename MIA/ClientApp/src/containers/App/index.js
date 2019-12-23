import React from "react";
import {
  //Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import axios from "axios";

import { PersistGate } from "redux-persist/integration/react";

import setAuthorizationToken from "utils/setAuthorizationToken";
import { store, persistedStore, history } from "store";

import appActions from "store/app/actions";
import authActions from "store/auth/actions";

import Layout from "components/Layout";
import Home from "containers/Home";
import LanguageProvider from "containers/Providers/LanguageProvider";
import DirectionProvider from "containers/Providers/DirectionProvider";
import ConfirmEmail from "containers/User/ConfirmEmail";
import Profile from "containers/User/Profile";
import CheckYourEmail from "containers/User/CheckYourEmail";
import ResetPasswordByEmail from "containers/User/ResetPasswordByEmail";
import ScrollToTop from "./ScrollToTop";

import AboutUs from "../AboutUs";

import SignIn from "../User/SignIn";
import Signup from "../User/Signup";
import { UserContext } from "../Providers/UserProvider";
import CookieGDPR from "./CookieGDPR";

import LoadingScreen from "./Loading";

history.listen((location, action) => {
  //todo: use this for query string sync
  // console.log("route changed ", location, action);
});

class App extends React.Component {
  componentDidMount() {

  }

  render = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <LanguageProvider>
            <DirectionProvider>
              <ConnectedRouter history={history}>
                <Layout>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route path="/account/checkYourEmail" component={CheckYourEmail} />
                    <Route path="/account/profile" component={Profile} />
                    <Route exact path="/account" component={Profile} />
                    <Route path="/account/confirm" component={ConfirmEmail} />
                    <Route path="/account/resetPassword" component={ResetPasswordByEmail} />

                    <Redirect from="*" to="/" />
                  </Switch>
                  <CookieGDPR />
                  <ScrollToTop />
                  {/*
                   <UserContext.Consumer>
                    {({
                      signinModalOpened,
                      closeSigninModal,
                      createAccountModalOpened,
                      closeCreateAccountModal,
                      switchToSignInModal,
                      switchToCreateAccountModal,
                      login,
                      signinFailed,
                      signinErrors,
                      resetSigninErrors,
                      forgotPassword,
                      forgotPasswordErrors,
                      forgotPasswordFailed,
                      resetForgotPasswordErrors
                    }) => (
                        <React.Fragment>
                          <SignIn
                            signinModalOpened={signinModalOpened}
                            closeSigninModal={closeSigninModal}
                            switchToCreateAccountModal={switchToCreateAccountModal}
                            login={login}
                            signinFailed={signinFailed}
                            signinErrors={signinErrors}
                            resetSigninErrors={resetSigninErrors}
                            forgotPassword={forgotPassword}
                            forgotPasswordErrors={forgotPasswordErrors}
                            forgotPasswordFailed={forgotPasswordFailed}
                            resetForgotPasswordErrors={resetForgotPasswordErrors}
                          />
                          <Signup
                            createAccountModalOpened={createAccountModalOpened}
                            closeCreateAccountModal={closeCreateAccountModal}
                            switchToSignInModal={switchToSignInModal}
                          />
                          <LoadingScreen>
                            <div>welcomeeeee</div>
                          </LoadingScreen>
                        </React.Fragment>
                      )}
                  </UserContext.Consumer> 
                  */}
                </Layout>
              </ConnectedRouter>
            </DirectionProvider>
          </LanguageProvider>
        </PersistGate>
      </Provider>
    );
  };
}

try {
  if (localStorage.jwtToken) {
    //set jwt token by default on page refresh
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(authActions.setAuthToken(localStorage.jwtToken));
  }

  //get user ip on every page refresh
  axios
    .get("https://api.ipify.org")
    .then(res => localStorage.setItem("userIp", res.data))
    .catch(err => {
      console.log("Failed to resolve IP");
    });

  //get user culture only if it's not exist
  if (!localStorage.culture) {
    let culture = window.navigator.language.split("-")[0];
    localStorage.setItem("culture", culture);
    store.dispatch(appActions.changeLocale(culture));
  } else {
    store.dispatch(appActions.changeLocale(localStorage.culture));
  }

} catch (error) {
  console.log("Startup error @App ", error);
}
export default App;

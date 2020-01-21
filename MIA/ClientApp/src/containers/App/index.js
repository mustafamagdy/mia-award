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

import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";

import SignIn from "../User/SignIn";
import Signup from "../User/Signup";
import { UserContext } from "../Providers/UserProvider";
import CookieGDPR from "./CookieGDPR";

import LoadingScreen from "./Loading";
import Awards from "../Pages/Awards";
import Events from "../Pages/Events";
import MediaBrowser from "../Media";
import Booths from "../Booths";
import BuyBooth from "../Booths/BuyBooth";
import Members from "../Members";
import CompleteProfile from "../Members/CompleteProfile";
import PaymentForm from "../Payment/PaymentForm";
import UploadMedia from "../Members/UploadMedia";
import MyDashboard from "../Members/MyDashboard";

import TestUpload from "../Test/Upload";

import "sass/style.scss";

history.listen((location, action) => {
  //todo: use this for query string sync
  // console.log("route changed ", location, action);
});

class App extends React.Component {
  componentDidMount() {}

  render = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <LanguageProvider>
            <DirectionProvider>
              <ConnectedRouter history={history}>
                <Layout>
                  <Switch>
                    {/* General website */}
                    <Route path="test" component={TestUpload} />

                    <Route exact path="/" component={Home} />
                    <Route path="/about-us" component={AboutUs} />
                    <Route path="/events" component={Events} />
                    <Route path="/awards" component={Awards} />
                    <Route path="/contact-us" component={ContactUs} />

                    {/* browse media */}
                    <Route path="/media" component={MediaBrowser} />

                    {/* Account management */}
                    <Route exact path="/account" component={Profile} />
                    <Route path="/account/checkYourEmail" component={CheckYourEmail} />
                    <Route path="/account/profile" component={Profile} />
                    <Route path="/account/confirm" component={ConfirmEmail} />
                    {/* <Route path="/account/resetPassword" component={ResetPasswordByEmail} /> */}

                    {/* booths */}
                    <Route path="/booth" component={Booths} />
                    <Route path="/booth-buy" component={BuyBooth} />

                    {/* Member section */}
                    <Route path="/members" component={Members} />
                    <Route path="/complete-profile" component={CompleteProfile} />
                    <Route path="/pay" component={PaymentForm} />
                    <Route path="/dashboard" component={MyDashboard} />
                    <Route path="/upload-media" component={UploadMedia} />

                    <Redirect from="*" to="/" />
                  </Switch>
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

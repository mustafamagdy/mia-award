/**
 * App.js Layout Start Here
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import RctThemeProvider from "./RctThemeProvider";
import RctDefaultLayout from "./DefaultLayout";

// app signin
import AppSignIn from "./SigninFirebase";
import AppSignUp from "./SignupFirebase";

// async components
import {
  AsyncSessionLoginComponent,
  AsyncSessionRegisterComponent,
  AsyncSessionLockScreenComponent,
  AsyncSessionForgotPasswordComponent,
  AsyncSessionPage404Component,
  AsyncSessionPage500Component
} from "Components/AsyncComponent/AsyncComponent";

// callback component
import Callback from "Components/Callback/Callback";
import Dashboard from "./Dashboard";

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, currentUser, ...rest }) => {
  console.log("inital path ", currentUser, rest);
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  render() {
    const { location, match, currentUser, isLoggedIn } = this.props;
    if (location.pathname === "/") {
      if (!isLoggedIn || !currentUser) {
        console.log("redirect to signin");
        return <Redirect to={"/signin"} />;
      }
    } else if (location.pathname === "/signin" && !!isLoggedIn && !!currentUser) {
      return <Redirect to={"/app/dashboard/news"} />;
    }

    return (
      <RctThemeProvider>
        <NotificationContainer />
        <InitialPath path={`${match.url}app`} currentUser={currentUser} component={RctDefaultLayout} />
        {/* <Route path="/horizontal" component={HorizontalLayout} />
            <Route path="/agency" component={AgencyLayout} />
            <Route path="/boxed" component={RctBoxedLayout} /> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signin" component={AppSignIn} />
        <Route path="/signup" component={AppSignUp} />
        <Route path="/session/login" component={AsyncSessionLoginComponent} />
        <Route path="/session/register" component={AsyncSessionRegisterComponent} />
        <Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
        <Route path="/session/forgot-password" component={AsyncSessionForgotPasswordComponent} />
        <Route path="/session/404" component={AsyncSessionPage404Component} />
        <Route path="/session/500" component={AsyncSessionPage500Component} />
        {/* <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        /> */}
        {/* <Redirect from="*" to="/" /> */}
      </RctThemeProvider>
    );
  }
}

// map state to props
const mapStateToProps = ({ auth: { isLoggedIn, currentUser } }) => ({
  isLoggedIn,
  currentUser
});
export default connect(mapStateToProps)(App);

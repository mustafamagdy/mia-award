import React from "react";
import { useState } from "react";
import classNames from "classnames";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import authActions from "store/auth/actions";
import accountsActions from "store/accounts/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import LoginForm from "./Login";
import ForgetPasswordForm from "./ForgetPassword";
import ResetPasswordForm from "./ResetPassword";
import Register from "./Register";

// let resetPassword =false;
const Auth = ({ location, ...props }) => {
  const [view, setView] = useState("login");
  const [signupActiveTab, setSignupActiveTab] = useState(0);
  const [resetPassword, setResetPassword] = useState(false);
  const signupTabs = ["info", "terms_and_conditions"];
  let { reset } = props;
  if (reset && !resetPassword && view != "reset-password") {
    setView("reset-password");
    setResetPassword(true);
  }

  return (
    <section id="login_page">
      <div className="container">
        <div className="login_area">
          <div
            className={classNames("login_block", {
              active:
                view == "login" ||
                view == "forget-password" ||
                view == "reset-password",
            })}
          >
            <div className="logo">
              <img src="/assets/images/logo_login.png" />
            </div>
            <span>
              {view == "login" ? (
                <Trans id="signin">Sign in</Trans>
              ) : view == "forget-password" ? (
                <Trans id="forget_password">Forgot password</Trans>
              ) : (
                <Trans id="reset_password">Reset Password</Trans>
              )}
            </span>
            {view == "login" && (
              <LoginForm
                switchResetPassword={() => setView("forget-password")}
                loginUser={props.login}
              />
            )}
            {view == "forget-password" && (
              <ForgetPasswordForm
                switchToLogin={() => setView("login")}
                forgetPasswordForUser={props.forgotPassword}
              />
            )}
            {view == "reset-password" && (
              <ResetPasswordForm
                location={location}
                switchToLogin={() => setView("login")}
                resetPasswordForUser={props.resetPassword}
              />
            )}
          </div>
          <div
            className={classNames("register_block", {
              active: view == "signup",
            })}
          >
            <div className="content_div">
              <ul>
                <TabList
                  activeClassName="active"
                  activeIndex={signupActiveTab}
                  handleActiveTab={(t) => setSignupActiveTab(t)}
                >
                  {signupTabs.map((t, i) => (
                    <Tab key={t}>
                      <li>
                        <Trans id={t}>{t}</Trans>
                      </li>
                    </Tab>
                  ))}
                </TabList>
              </ul>
              <div className="tabs_content">
                <Register
                  signupActiveTab={signupActiveTab}
                  setSignupActiveTab={setSignupActiveTab}
                  signupUser={props.signup}
                />
              </div>
            </div>
          </div>
          <div className="signup_block">
            {view == "signup" ? (
              <>
                <span className="title">
                  <Trans id="signin">Sign in</Trans>
                </span>
                <p>
                  <Trans id="login_to_your_account">
                    Login to your account to view your uploaded artworks
                  </Trans>
                </p>
                <span className="action" onClick={() => setView("login")}>
                  <Trans id="login">Login</Trans>
                </span>
              </>
            ) : (
              <>
                <span className="title">
                  <Trans id="signup">Sign Up</Trans>
                </span>
                <p>
                  {" "}
                  <Trans id="signup_text">
                    In order to apply for any award you need be a member in our
                    website and follow all our policies. please signup to start
                    your way to the awards
                  </Trans>
                </p>
                <span className="action" onClick={() => setView("signup")}>
                  <Trans id="register">Register</Trans>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...authActions, ...accountsActions }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(Auth));

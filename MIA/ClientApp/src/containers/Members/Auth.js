import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import classNames from "classnames";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import authActions from "store/auth/actions";
import accountsActions from "store/accounts/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

const ResetPasswordForm = ({ switchToLogin, resetPasswordForUser, ...props }) => {
  const { register, handleSubmit } = useForm();

  const resetPassword = values => {
    resetPasswordForUser(resetPasswordForUser);
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(resetPassword)}>
      <input ref={register} name="email" type="text" placeholder="email" />
      <div className="submit_area">
        <div className="resset">
          <label className="action" onClick={switchToLogin}>
            Login ?
          </label>
        </div>
        <button type="submit">Reset Password</button>
      </div>
    </form>
  );
};

const LoginForm = ({ switchResetPassword, loginUser, props }) => {
  const { register, handleSubmit } = useForm();

  const login = values => {
    loginUser(values);
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(login)}>
      <input ref={register} name="username" type="text" placeholder="username" />
      <input ref={register} name="password" type="password" placeholder="password" />
      <div className="submit_area">
        <div className="resset">
          <label className="action" onClick={switchResetPassword}>
            Forgot password ?
          </label>
        </div>
        <button form="login-form" type="submit">
          Sign in
        </button>
      </div>
    </form>
  );
};

const Register = ({ signupActiveTab, setSignupActiveTab, signupUser, ...props }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register, handleSubmit } = useForm();
  const signUp = values => {
    signupUser(values);
  };

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className={classNames("tab_item info_tab", { active: signupActiveTab == 0 })}>
        <div className="content">
          <input type="text" ref={register} name="fullName" placeholder="full name" />
          <input type="email" ref={register} name="email" placeholder="email" />
          <input type="text" ref={register} name="jobTitle" placeholder="job title" />
          <input type="text" ref={register} name="phoneNumber" placeholder="phone number" />
          <input type="text" ref={register} name="companyName" placeholder="company name" />
          <input type="text" ref={register} name="address" placeholder="address" />
          <input type="password" ref={register} name="password" placeholder="password" />
        </div>
        <div className="next_step">
          <span onClick={() => setSignupActiveTab(1)}>Next</span>
        </div>
      </div>
      <div className={classNames("tab_item upload_tab ", { active: signupActiveTab == 1 })}>
        <div className="imgthumb">
          <img src="/assets/images/related_news_image.png" />
          <span>Upload</span>
          <input name="avatar" ref={register} type="file" />
        </div>
        <div className="next_step">
          <span onClick={() => setSignupActiveTab(2)}>Next</span>
        </div>
      </div>
      <div className={classNames("tab_item term_tab", { active: signupActiveTab == 2 })}>
        <div className="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="chkAccept"
            value={acceptTerms}
            onChange={e => setAcceptTerms(e.target.checked)}
          />
          <label className="custom-control-label" htmlFor="chkAccept">
            Accept Terms & Conditions
          </label>
          <div className="next_step">
            <button className="action" type="submit" disabled={!acceptTerms}>
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const Auth = ({ ...props }) => {
  const [view, setView] = useState("login");
  const [signupActiveTab, setSignupActiveTab] = useState(0);
  const signupTabs = ["info", "upload_avatar", "terms_and_conditions"];

  return (
    <section id="login_page">
      <div className="container">
        <div className="login_area">
          <div className={classNames("login_block", { active: view == "login" || view == "reset-password" })}>
            <div className="logo">
              <img src="/assets/images/logo_login.png" />
            </div>
            <span>{view == "login" ? "Sign in" : "Forgot password?"}</span>
            {view == "login" && <LoginForm switchResetPassword={() => setView("reset-password")} loginUser={props.login} />}
            {view == "reset-password" && (
              <ResetPasswordForm switchToLogin={() => setView("login")} resetPasswordForUser={props.resetPassword} />
            )}
          </div>
          <div className={classNames("register_block", { active: view == "signup" })}>
            <div>
              <ul>
                <TabList activeClassName="active" activeIndex={signupActiveTab} handleActiveTab={t => setSignupActiveTab(t)}>
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
                <Register signupActiveTab={signupActiveTab} setSignupActiveTab={setSignupActiveTab} signupUser={props.signup} />
              </div>
            </div>
          </div>
          <div className="signup_block">
            {view == "signup" ? (
              <>
                <span className="title">Sign In</span>
                <p>Login to your account to view your uploaded artworks</p>
                <span className="action" onClick={() => setView("login")}>
                  Login
                </span>
              </>
            ) : (
              <>
                <span className="title">Sign Up</span>
                <p>
                  In order to apply for any award you need be a member in our website and follow all our policies. please signup to start
                  your way to the awards
                </p>
                <span className="action" onClick={() => setView("signup")}>
                  Register
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions, ...accountsActions }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(Auth));

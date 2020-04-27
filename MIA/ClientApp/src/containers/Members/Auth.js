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

import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";
import * as Yup from "yup";

const ResetPasswordForm = ({
  switchToLogin,
  resetPasswordForUser,
  location,
  match,
  ...props
}) => {
  const { register, handleSubmit } = useForm();
  const resetPassword = (values) => {
    resetPasswordForUser(values);
  };
  const urlParams = new URLSearchParams(location.search);
  const userId = urlParams.get("userId");
  const code = urlParams.get("code");

  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: "",
        code: code,
        userId: userId,
      }}
      validationSchema={Yup.object().shape({
        newPassword: Yup.string().required("Required"),
        confirmPassword: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        handleSubmit(resetPassword(values));
      }}
    >
      {({ values, errors, touched, isSubmitting, formik }) => {
        return (
          <Form className="form popup__form" method="post">
            <div className="content">
              <Field
                type="password"
                className={`form-group__input ${
                  errors.newPassword && touched.newPassword ? "has-error" : ""
                }`}
                placeholder="newPassword"
                name="newPassword"
              />
              <Field
                type="password"
                className={`form-group__input ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "has-error"
                    : ""
                }`}
                placeholder="confirmPassword"
                name="confirmPassword"
              />
            </div>
            <div className="submit_area">
              <div className="resset">
                <label className="action" onClick={switchToLogin}>
                  Login ?
                </label>
              </div>
              <button type="submit">Reset Password</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const ForgetPasswordForm = ({
  switchToLogin,
  forgetPasswordForUser,
  ...props
}) => {
  const { register, handleSubmit } = useForm();
  const forgetPassword = (values) => {
    forgetPasswordForUser(values);
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(forgetPassword)}>
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

const LoginForm = ({ switchResetPassword, loginUser, demoLogin, props }) => {
  const { register, handleSubmit } = useForm();

  const login = (values) => {
    loginUser(values);
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(login)}>
      <input
        ref={register}
        name="username"
        type="text"
        placeholder="username"
      />
      <input
        ref={register}
        name="password"
        type="password"
        placeholder="password"
      />
      <div className="submit_area">
        <div className="resset">
          <label className="action" onClick={switchResetPassword}>
            Forgot password ?
          </label>
        </div>
        <button form="login-form" type="submit">
          Sign in
        </button>
        <button type="button" onClick={() => demoLogin()}>
          demo-login
        </button>
      </div>
    </form>
  );
};

const Register = ({
  signupActiveTab,
  setSignupActiveTab,
  signupUser,
  ...props
}) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register, handleSubmit } = useForm();
  const signUp = (values) => {
    signupUser(values);
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        jobTitle: "",
        phoneNumber: "",
        companyName: "",
        password: "",
        confirmPassword: "",
        reCaptchaToken: "",
        address: "",
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
        companyName: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
        confirmPassword: Yup.string()
          .required("Required")
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
          }),
        reCaptchaToken: Yup.string().required("reCaptcha is required"),
      })}
      onSubmit={(values, { actions, setFieldValue, setSubmitting }) => {
        setTimeout(function () {
          setSubmitting(false);
          setFieldValue("reCaptchaToken", undefined);
          // this.recaptcha.reset();
          // history.push("/");
        }, 1200);

        handleSubmit(signUp(values));
      }}
    >
      {({ values, errors, touched, isSubmitting, formik }) => {
        return (
          <Form className="form popup__form" method="post">
            <div
              className={classNames("tab_item info_tab", {
                active: signupActiveTab == 0,
              })}
            >
              <div className="content">
                <label htmlFor="email">Email</label>
                <Field
                  type="text"
                  className={`form-group__input ${
                    errors.email && touched.email ? "has-error" : ""
                  }`}
                  placeholder="email"
                  name="email"
                />
                <span style={{ color: "crimson" }}>
                  {errors.email && touched.email && errors.email}{" "}
                </span>

                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  className={`form-group__input ${
                    errors.password && touched.password ? "has-error" : ""
                  }`}
                  placeholder="password"
                  name="password"
                />
                <span style={{ color: "crimson" }}>
                  {errors.password && touched.password && errors.password}{" "}
                </span>
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field
                  type="password"
                  className={`form-group__input ${
                    errors.password && touched.password ? "has-error" : ""
                  }`}
                  placeholder="Confirm password"
                  name="confirmPassword"
                />
                <span style={{ color: "crimson" }}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}{" "}
                </span>
              </div>
              <Field
                name="reCaptchaToken"
                component={Recaptcha}
                setRecaptcha={(recpat) => (this.recaptcha = recpat)}
              />
              <div className="next_step">
                <span onClick={() => setSignupActiveTab(1)}>Next</span>
              </div>
            </div>
            <div
              className={classNames("tab_item upload_tab tab_info", {
                active: signupActiveTab == 1,
              })}
            >
              <div className="content">
                <label htmlFor="fullName">Full name</label>
                <Field
                  type="text"
                  className={`form-group__input ${
                    errors.fullName && touched.fullName ? "has-error" : ""
                  }`}
                  placeholder="full name"
                  name="fullName"
                />
                <span style={{ color: "crimson" }}>
                  {errors.fullName && touched.fullName && errors.fullName}{" "}
                </span>
                <label htmlFor="jobTitle">Job title</label>
                <Field
                  type="text"
                  className={`form-group__input ${
                    errors.jobTitle && touched.jobTitle ? "has-error" : ""
                  }`}
                  placeholder="job title"
                  name="jobTitle"
                />
                <span style={{ color: "crimson" }}>
                  {errors.jobTitle && touched.jobTitle && errors.jobTitle}{" "}
                </span>
                <label htmlFor="phoneNumber">Phone number</label>
                <Field
                  type="text"
                  className={`form-group__input ${
                    errors.phoneNumber && touched.phoneNumber ? "has-error" : ""
                  }`}
                  placeholder="phone number"
                  name="phoneNumber"
                />
                <span style={{ color: "crimson" }}>
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}{" "}
                </span>
                <label htmlFor="companyName">Company name</label>
                <Field
                  type="text"
                  className={`form-group__input ${
                    errors.companyName && touched.companyName ? "has-error" : ""
                  }`}
                  placeholder="company name"
                  name="companyName"
                />
                <span style={{ color: "crimson" }}>
                  {errors.companyName &&
                    touched.companyName &&
                    errors.companyName}{" "}
                </span>
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  className={`form-group__input ${
                    errors.address && touched.address ? "has-error" : ""
                  }`}
                  placeholder="address"
                  name="address"
                />
                <span style={{ color: "crimson" }}>
                  {errors.address && touched.address && errors.address}{" "}
                </span>
              </div>
              <div className="imgthumb">
                <img src="/assets/images/related_news_image.png" />
                <span>Upload</span>
                <input name="avatar" ref={register} type="file" />
              </div>
              <div className="next_step">
                <span onClick={() => setSignupActiveTab(2)}>Next</span>
              </div>
            </div>
            <div
              className={classNames("tab_item term_tab", {
                active: signupActiveTab == 2,
              })}
            >
              <div className="content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="chkAccept"
                  value={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <label className="custom-control-label" htmlFor="chkAccept">
                  Accept Terms & Conditions
                </label>
                <div className="next_step">
                  <button
                    className="action"
                    type="submit"
                    disabled={!acceptTerms}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

// let resetPassword =false;
const Auth = ({ location, ...props }) => {
  const [view, setView] = useState("login");
  const [signupActiveTab, setSignupActiveTab] = useState(0);
  const [resetPassword, setResetPassword] = useState(false);
  const signupTabs = ["info", "details", "terms_and_conditions"];
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
              {view == "login"
                ? "Sign in"
                : view == "forget-password"
                ? "Forgot password?"
                : "Reset password"}
            </span>
            {view == "login" && (
              <LoginForm
                switchResetPassword={() => setView("forget-password")}
                loginUser={props.login}
                demoLogin={props.demoLogin}
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
            <div>
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
                  In order to apply for any award you need be a member in our
                  website and follow all our policies. please signup to start
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...authActions, ...accountsActions }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(Auth));

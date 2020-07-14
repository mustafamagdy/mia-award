import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";
import * as Yup from "yup";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import config from "config";
import terms from "./terms.json";
import { I18n } from "@lingui/react";
import { connect } from "react-redux";
import { fileToBase64 } from "utils";

const Register = ({
  signupActiveTab,
  setSignupActiveTab,
  signupUser,
  signupSubmitting,
  ...props
}) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(undefined);

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
        password: "",
        confirmPassword: "",
        reCaptchaToken: "",
        address: "",
        avatar: undefined,
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required("Required"),
        email: Yup.string().required("Required").email("not_valid_email"),
        phoneNumber: Yup.string()
          .required("Required")
          .matches(
            config.validationRules.phoneExp,
            "phone_number_is_not_valid"
          ),
        password: Yup.string()
          .required("Required")
          .min(6, "password_too_short")
          .matches(
            config.validationRules.passwordStrength,
            "not_valid_password"
          ),
        confirmPassword: Yup.string()
          .required("Required")
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "booth_password_must_match"
            ),
          }),
        reCaptchaToken: Yup.string().required("reCaptcha is required"),
      })}
      onSubmit={async (values, { actions, setFieldValue, setSubmitting }) => {
        setTimeout(function () {
          setFieldValue("reCaptchaToken", undefined);
        }, 1200);

        if (values.avatar) {
          const file = await fileToBase64(values.avatar);
          values.avatarFileName = values.avatar.name;
          values.avatar = file;
        }

        values.username = values.email;
        signUp(values);
      }}
    >
      {({ values, errors, touched, isSubmitting, formik, setFieldValue }) => {
        return (
          <Form className="form popup__form" method="post">
            <div
              className={classNames("tab_item info_tab", {
                active: signupActiveTab == 0,
              })}
            >
              <div className="fields">
                <div className="avatar">
                  <div className="imgthumb">
                    <img
                      src={
                        tempAvatar != undefined
                          ? tempAvatar
                          : "/assets/images/user_avatar.png"
                      }
                      alt=""
                    />
                    <label htmlFor="avatar">
                      <Trans id="upload">Upload</Trans>
                    </label>
                    <Field
                      noLabel={true}
                      isFile={true}
                      hasError={
                        errors &&
                        errors.avatar !== undefined &&
                        touched &&
                        touched.avatar !== undefined
                      }
                      name="avatar"
                      id="avatar"
                      accept="image/*"
                      onChange={(e) => {
                        setFieldValue("avatar", e.target.files[0]);
                        if (e.target.files && e.target.files[0]) {
                          var reader = new FileReader();
                          reader.onload = function (e) {
                            setTempAvatar(e.target.result);
                          };

                          reader.readAsDataURL(e.target.files[0]);
                        } else {
                          setTempAvatar(undefined);
                        }
                      }}
                    />
                  </div>
                </div>
                <Field
                  type="text"
                  placeholder="email"
                  name="email"
                  transId="email"
                  placeholderKey="email"
                  transdDefaultVal="Email"
                  errors={errors && errors.email}
                  touched={touched || (touched && touched.email)}
                  hasError={
                    touched &&
                    touched.email !== undefined &&
                    errors &&
                    errors.email !== undefined
                  }
                />
                <Field
                  type="password"
                  placeholder="password"
                  name="password"
                  transId="password"
                  placeholderKey="password"
                  transdDefaultVal="Password"
                  errors={errors && errors.password}
                  touched={touched || (touched && touched.password)}
                  hasError={
                    touched &&
                    touched.password !== undefined &&
                    errors &&
                    errors.password !== undefined
                  }
                />
                <Field
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  transId="confirmPassword"
                  placeholderKey="confirmPassword"
                  transdDefaultVal="Confirm Password"
                  errors={errors && errors.confirmPassword}
                  touched={touched || (touched && touched.confirmPassword)}
                  hasError={
                    touched &&
                    touched.confirmPassword !== undefined &&
                    errors &&
                    errors.confirmPassword !== undefined
                  }
                />
                <Field
                  placeholder="Full name"
                  name="fullName"
                  transId="fullName"
                  placeholderKey="fullName"
                  transdDefaultVal="Full name"
                  errors={errors && errors.fullName}
                  touched={touched || (touched && touched.fullName)}
                  hasError={
                    touched &&
                    touched.fullName !== undefined &&
                    errors &&
                    errors.fullName !== undefined
                  }
                />
                <Field
                  placeholder="Job title"
                  name="jobTitle"
                  transId="jobTitle"
                  placeholderKey="jobTitle"
                  transdDefaultVal="Job title"
                  errors={errors && errors.jobTitle}
                  touched={touched || (touched && touched.jobTitle)}
                  hasError={
                    touched &&
                    touched.jobTitle !== undefined &&
                    errors &&
                    errors.jobTitle !== undefined
                  }
                />
                <Field
                  placeholder="Phone number"
                  name="phoneNumber"
                  transId="phoneNumber"
                  placeholderKey="phoneNumber"
                  transdDefaultVal="Phone number"
                  errors={errors && errors.phoneNumber}
                  touched={touched || (touched && touched.phoneNumber)}
                  hasError={
                    touched &&
                    touched.phoneNumber !== undefined &&
                    errors &&
                    errors.phoneNumber !== undefined
                  }
                />
                <Field
                  name="reCaptchaToken"
                  component={Recaptcha}
                  setRecaptcha={(recpat) => (this.recaptcha = recpat)}
                />
                <div className="next_step">
                  <span onClick={() => setSignupActiveTab(1)}>
                    <Trans id="next">Next</Trans>
                  </span>
                </div>
              </div>
            </div>

            <div
              className={classNames("tab_item term_tab", {
                active: signupActiveTab == 1,
              })}
            >
              <div className="content">
                <div className="terms">
                  <I18n>
                    {({ i18n }) =>
                      terms[i18n.language].map((t, i) => (
                        <p key={i}>{t.text}</p>
                      ))
                    }
                  </I18n>
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
                    <Trans id="accept_terms">Accept Terms & Conditions</Trans>
                  </label>
                  <div className="next_step">
                    <button
                      className="normal_button"
                      type="submit"
                      disabled={!acceptTerms || signupSubmitting}
                    >
                      <Trans id="register">Register</Trans>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({ account: { signupSubmitting } }, ownProps) => ({
  signupSubmitting,
});

export default connect(mapStateToProps, null)(Register);

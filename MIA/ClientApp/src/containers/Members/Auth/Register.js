import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Trans } from "@lingui/macro";

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
        password: "",
        confirmPassword: "",
        reCaptchaToken: "",
        address: "",
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
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
              <div className="fields">
                <div className="avatar">
                  <div className="imgthumb">
                    <img src="/assets/images/user_avatar.png" alt="" />
                    <span>
                      <Trans id="upload">Upload</Trans>
                    </span>
                    <input name="avatar" ref={register} type="file" />
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
                  touched={touched && touched.email}
                />
                <Field
                  type="password"
                  placeholder="password"
                  name="password"
                  transId="password"
                  placeholderKey="password"
                  transdDefaultVal="Password"
                  errors={errors && errors.password}
                  touched={touched && touched.password}
                />
                <Field
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  transId="confirmPassword"
                  placeholderKey="confirmPassword"
                  transdDefaultVal="Confirm Password"
                  errors={errors && errors.confirmPassword}
                  touched={touched && touched.confirmPassword}
                />
                <Field
                  placeholder="Full name"
                  name="fullName"
                  transId="fullName"
                  placeholderKey="fullName"
                  transdDefaultVal="Full name"
                  errors={errors && errors.fullName}
                  touched={touched && touched.fullName}
                />
                <Field
                  placeholder="Job title"
                  name="jobTitle"
                  transId="jobTitle"
                  placeholderKey="jobTitle"
                  transdDefaultVal="Job title"
                  errors={errors && errors.jobTitle}
                  touched={touched && touched.jobTitle}
                />
                <Field
                  placeholder="Phone number"
                  name="phoneNumber"
                  transId="phoneNumber"
                  placeholderKey="phoneNumber"
                  transdDefaultVal="Phone number"
                  errors={errors && errors.phoneNumber}
                  touched={touched && touched.phoneNumber}
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
                  <Trans id="signup_terms"></Trans>
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
                      disabled={!acceptTerms}
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

export default Register;

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";

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
                    className="normal_button"
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

export default Register;

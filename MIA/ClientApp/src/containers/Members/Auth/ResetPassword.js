import React from "react";
import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";

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

export default ResetPasswordForm;

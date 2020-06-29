import React from "react";
import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Trans } from "@lingui/macro";


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
          <Trans id="login">Login</Trans> ?
          </label>
        </div>
        <button type="submit"><Trans id="reset_password">Reset Password</Trans></button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;

import React from "react";
import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";

const ForgetPasswordForm = ({
  switchToLogin,
  forgetPasswordForUser,
  ...props
}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("not_valid_email"),
  });

  const { register, handleSubmit, formState } = useForm({
    validationSchema: validationSchema,
  });
  const forgetPassword = (values) => {
    forgetPasswordForUser(values);
  };

  return (
    <I18n>
      {({ i18n }) => (
        <form id="login-form" onSubmit={handleSubmit(forgetPassword)}>
          <input
            ref={register}
            name="email"
            type="text"
            placeholder={i18n._("email")}
          />
          <div className="submit_area">
            <div className="resset">
              <label className="action" onClick={switchToLogin}>
                <Trans id="login">Login</Trans> ?
              </label>
            </div>
            <button type="submit" disabled={formState.isSubmitting}>
              <Trans id="reset_password">Reset Password</Trans>
            </button>
          </div>
        </form>
      )}
    </I18n>
  );
};

export default ForgetPasswordForm;

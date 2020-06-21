import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Trans } from "@lingui/macro";

const LoginForm = ({ switchResetPassword, loginUser, props }) => {
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
           <Trans id="forget_password">Forgot password</Trans> ?
          </label>
        </div>
        <button form="login-form" type="submit">
        <Trans id="signin">Sign in</Trans>
        </button>
        {/* <button
          type="button"
          onClick={() =>
            loginUser({ username: "nominee1", password: "nominee@123456.com" })
          }
        >
          demo-login
        </button> */}
      </div>
    </form>
  );
};

export default LoginForm;

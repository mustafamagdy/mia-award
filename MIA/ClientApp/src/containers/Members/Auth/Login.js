import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";

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

export default LoginForm;

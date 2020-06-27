import React from "react";
import * as Yup from "yup";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { Formik, Form } from "formik";
import { Recaptcha, Field } from "components/Forms";

const LoginForm = ({ switchResetPassword, loginUser, props }) => {
  const login = (values) => {
    loginUser(values);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values, { actions, setFieldValue, setSubmitting }) => {
        login(values);
      }}
    >
      {({ values, errors, touched, isSubmitting, formik }) => {
        return (
          <Form id="login-form" method="post">
            <Field
              type="text"
              placeholder="username"
              name="username"
              placeholderKey="username"
              transdDefaultVal="username"
              errors={errors && errors.username}
              touched={touched || (touched && touched.username)}
              noLabel={true}
              formGroupWrapClasses="form-group__wrap  col-12 col-md-12 col-sm-12"
              hasError={touched && touched.username !== undefined && errors && errors.username !== undefined}
            />
            <Field
              type="password"
              placeholder="password"
              name="password"
              placeholderKey="password"
              transdDefaultVal="password"
              errors={errors && errors.password}
              touched={touched || (touched && touched.password)}
              noLabel={true}
              formGroupWrapClasses="form-group__wrap  col-12 col-md-12 col-sm-12"
              hasError={
                touched &&
                touched.password !== undefined &&
                errors &&
                errors.password !== undefined
              }
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
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

{
  /* <button
          type="button"
          onClick={() =>
            loginUser({ username: "nominee1", password: "nominee@123456.com" })
          }
        >
          demo-login
        </button> */
}

{
  /* <form id="login-form" onSubmit={handleSubmit(login)}>
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
      
    </form> */
}

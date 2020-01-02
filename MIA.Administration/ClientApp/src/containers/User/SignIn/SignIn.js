import React from "react";
import { Trans } from "@lingui/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import keys from "ramda/es/keys";

import { Field, FormGroup, ErrorMessage } from "components/Forms";

const ErrorSignin = styled.div`
  ${({ hasError }) => (!hasError ? "display: none" : "")}
`;

const SigninErrors = ({ errors }) => {
  return !!errors ? keys(errors).map(k => <div key={k}>{errors[k]}</div>) : null;
};

class SignIn extends React.PureComponent {
  resetFormAndState = () => {
    this.form.resetForm();
  };

  render() {
    const { switchToForgotPasswordView, switchToCreateAccountModal, closeDlg, login, signinFailed, signinErrors } = this.props;

    return (
      <div className="grid grid--1 grid--md-2 grid--space-xl _md-flex-row-reverse">
        <div className="gcell _pb-none _md-hide">
          <div className="popup__title">
            <Trans id="sign_in_with_one_click">Sign In with one click</Trans>
          </div>
        </div>
        <div className="gcell _pb-none popup__line">
          <ErrorSignin hasError={!!signinFailed} className="error-msg">
            <SigninErrors errors={signinErrors} />
          </ErrorSignin>
          <div className="_md-pr-ms _pt-ms">
            <Formik
              ref={r => (this.form = r)}
              initialValues={{ userName: "", password: "", recaptcha: "" }}
              onSubmit={async (values, actions) => {
                await login(values);
                actions.setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                userName: Yup.string()
                  .required()
                  .email(),
                password: Yup.string().required()
              })}
              render={({ values, isSubmitting, setFieldValue, errors }) => (
                <Form noValidate>
                  <FormGroup>
                    <Field name="userName" type="email" svgIconHref="mail" placeholder="Your email" hasError={!!errors["userName"]} />
                    <ErrorMessage name="userName" />
                  </FormGroup>

                  <FormGroup>
                    <Field
                      name="password"
                      type="password"
                      svgIconHref="icon-lock"
                      placeholder="Your password"
                      hasError={!!errors["password"]}
                    />
                  </FormGroup>
                  <div className="form-group__forgot">
                    <button className="button button--link" onClick={switchToForgotPasswordView}>
                      <Trans id="forgot_your_password">Forgot your password?</Trans>
                    </button>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="button button--full-width">
                      <span className="button__text">
                      <Trans id="sign_in"> sign in </Trans>
                      </span>
                    </button>
                  </div>
                  <div className="form__policy">
                    <Trans id="by_signing_in_i_agree"> By signing in, I agree to </Trans>{" "}
                      <a target="_blank" href="/terms">
                        <Trans id="terms_of_use"> Terms of Use </Trans>
                      </a>{" "}
                      <Trans id="_and"> and </Trans> {" "}
                      <a target="_blank" href="/privacy">
                        <Trans id="privacy_policy"> Pravicy Policy </Trans> .
                      </a>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
        <div className="gcell _pb-none">
          <div className="_md-plr-def">
            <div className="_md-pr-lg _md-mr-md _md-pt-none">
              <div className="popup__title _md-show">
                <Trans id="sign_in_with_one_click">Sign In with one click</Trans>
              </div>
              <div className="popup__image _md-show">
                <img src="./assets/images/sign-in.png" alt="" />
              </div>
              <div className="popup__sub-title">
                <Trans id="no_account_yet">No account yet?</Trans>
              </div>
              <button type="button" className="button button--outline button--full-width" onClick={switchToCreateAccountModal}>
                <span className="button__text">
                  <Trans id="create_account">Create account</Trans>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <SignIn {...props} ref={ref} />);

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Trans } from '@lingui/macro';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import keys from "ramda/es/keys";

import { Field, FormGroup, Recaptcha } from "components/Forms";
import accountsActions from "store/accounts/actions";

const ErrorSignup = styled.div`
  ${({ hasError }) => (!hasError ? "display: none" : "")}
`;

const SignupErrors = ({ errors }) => {
  return !!errors ? keys(errors).map(k => <div key={k}>{errors[k]}</div>) : null;
};

class Signup extends React.Component {
  resetFormAndState = () => {
    this.form.resetForm();
    this.props.resetSignupErrors();
  };

  render() {
    const {
      props: { createAccountModalOpened, closeCreateAccountModal, switchToSignInModal, signup, signupFailed, signupErrors },
      resetFormAndState
    } = this;

    return (
      <div className={`modal-wrap${createAccountModalOpened ? " modal-ready" : ""}`} style={{ overflow: "hidden auto" }}>
        <div className="modal-container">
          <div className="modal-content">
            <div className="popup">
              <div className="popup-logo">
                <div className="popup-logo__title"><Trans id="mia"> MIA </Trans></div>
              </div>
              <div className="grid grid--1 grid--md-2 grid--space-xl _md-flex-row-reverse">
                <div className="gcell _pb-none _md-hide">
                  <div className="popup__title popup__title--strong"><Trans id="sign_up"> Sign Up </Trans></div>
                </div>
                <div className="gcell _pb-none popup__line">
                  <ErrorSignup hasError={!!signupFailed} className="error-msg">
                    <SignupErrors errors={signupErrors} />
                  </ErrorSignup>
                  <div className="_md-pr-ms _pt-ms">
                    <Formik
                      ref={r => (this.form = r)}
                      initialValues={{ email: "", password: "", firstName: "", lastName: "", recaptcha: "" }}
                      onSubmit={async (values, actions) => {
                        await signup(values);
                        actions.setSubmitting(false);
                      }}
                      validationSchema={Yup.object().shape({
                        recaptcha: Yup.string().required(),
                        email: Yup.string()
                          .required()
                          .email(),
                        firstName: Yup.string()
                          .required()
                          .min(2),
                        lastName: Yup.string()
                          .required()
                          .min(2),
                        //todo, password validators
                        password: Yup.string().required()
                      })}
                      render={({ values, isSubmitting, setFieldValue, errors }) => (
                        <Form noValidate>
                          <FormGroup>
                            <Field name="email" type="email" svgIconHref="mail" placeholder="Your email" hasError={!!errors["email"]} />
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
                          <FormGroup>
                            <Field
                              name="firstName"
                              type="text"
                              svgIconHref="user"
                              placeholder="First Name"
                              hasError={!!errors["firstName"]}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Field name="lastName" type="text" svgIconHref="user" placeholder="Last Name" hasError={!!errors["lastName"]} />
                          </FormGroup>
                          <div className="form-group">
                            <label className="form-check">
                              <Field type="checkbox" name="sendMePromotions" />
                              <span>
                                <Trans id="email_me_exclusive_mia_promotions"> Email me exclusive MIA promotions. I can unsubscribe at any time as stated in the Privacy Policy. </Trans>
                              </span>
                            </label>
                          </div>
                          <div className="form-group">
                            <Field name="recaptcha" component={Recaptcha} />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="button button--outline button--full-width">
                              <span className="button__text"><Trans id="create_account"> Create account </Trans></span>
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
                      <div className="popup__title popup__title--strong _md-show"><Trans id="sign_up"> Sign Up </Trans></div>
                      <div className="popup__image _md-show">
                        <img src="./assets/images/sign-up.png" alt="" />
                      </div>
                      <div className="popup__sub-title"><Trans id="already_have_an_account"> Already have an account? </Trans></div>
                      <button type="button" className="button button--full-width" onClick={switchToSignInModal}>
                        <span className="button__text"><Trans id="sign_in"> sign in </Trans> </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                title="Close (ESC)"
                type="button"
                className="modal-close"
                onClick={() => {
                  resetFormAndState();
                  closeCreateAccountModal();
                }}
              >
                <span className="svg">
                  <svg width="30" height="30">
                    <use href="#cancel" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="modal-preloader"> <Trans id="loading"> Loading.... </Trans> </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ account: { signupErrors, signupFailed } }) => ({ signupErrors, signupFailed });
const mapDispatchToProps = dispatch => bindActionCreators({ ...accountsActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Signup));

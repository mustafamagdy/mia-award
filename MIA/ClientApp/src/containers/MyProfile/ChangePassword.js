import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import config from 'config';

class ChangePassword extends Component {
  render() {
    const { isOpen, onClose, onChangePassword } = this.props;
    return (
      <div
        className={`modal-wrap ${isOpen === true ? "modal-ready" : ""}`}
        id="js-open-change-pass"
        style={{ overflow: "hidden auto" }}
      >
        <div className="modal-container">
          <div className="modal-content">
            <div className="popup popup--cp">
              <div className="popup-logo">
                <div className="popup-logo__title">
                  {" "}
                  <Trans id="mia"> MIA </Trans>{" "}
                </div>
              </div>
              <div className="popup__title popup__title--md">
                {" "}
                <Trans id="change_password"> Change Password </Trans>{" "}
              </div>
              <div className="popup__image">
                <img src="./assets/images/popup/password.png" alt="" />
              </div>
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object().shape({
                  currentPassword: Yup.string().required("Required"),
                  newPassword: Yup.string().required("Required")
                  .min(6, "password_too_short")
                  .matches(config.validationRules.passwordStrength,"not_valid_password"),
                  confirmPassword: Yup.string()
                    .required("Required")
                    .when("newPassword", {
                      is: (val) => (val && val.length > 0 ? true : false),
                      then: Yup.string().oneOf(
                        [Yup.ref("newPassword")],
                        "booth_password_must_match"
                      ),
                    }),
                })}
                onSubmit={(values) => {
                  onChangePassword(values);
                }}
              >
                {({ values, errors, touched }) => (
                  <Form className="form popup__form" method="post">
                    <div className="form-group">
                      <label className="form-group__label" htmlFor="old-pass">
                        <Trans id="old_password"> Old password </Trans>
                        <span className="form-group__required">*</span>
                        <span style={{ color: "crimson" }}>
                          {errors.currentPassword &&
                            touched.currentPassword &&
                            errors.currentPassword}{" "}
                        </span>
                      </label>
                      <div className="form-group__wrap">
                        <Field
                          type="password"
                          className={`form-group__input ${
                            errors.currentPassword && touched.currentPassword
                              ? "has-error"
                              : ""
                          }`}
                          required
                          placeholder="Your old password"
                          values={values.currentPassword}
                          name="currentPassword"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-group__label" htmlFor="new-pass">
                        <Trans id="new_password"> New password </Trans>
                        <span className="form-group__required">*</span>
                        <span style={{ color: "crimson" }}>
                          {errors.newPassword &&
                            touched.newPassword &&
                            errors.newPassword}{" "}
                        </span>
                      </label>
                      <div className="form-group__wrap">
                        <Field
                          type="password"
                          className={`form-group__input ${
                            errors.newPassword && touched.newPassword
                              ? "has-error"
                              : ""
                          }`}
                          required
                          placeholder="Create a password"
                          values={values.newPassword}
                          name="newPassword"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="form-group__label"
                        htmlFor="repeat-new-pass"
                      >
                        <Trans id="confirm_password"> Confirm password </Trans>
                        <span className="form-group__required">*</span>
                        <span style={{ color: "crimson" }}>
                          {errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword}{" "}
                        </span>
                      </label>
                      <div className="form-group__wrap">
                        <Field
                          type="password"
                          className={`form-group__input ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "has-error"
                              : ""
                          }`}
                          required
                          placeholder="Repeat new password"
                          values={values.confirmPassword}
                          name="confirmPassword"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="button button--full-width"
                      >
                        <span className="button__text">
                          <Trans id="accept_changes"> Accept changes </Trans>
                        </span>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <button
                title="Close (ESC)"
                type="button"
                className="modal-close"
                onClick={onClose}
              >
                <span className="svg">
                  <svg width="30" height="30">
                    <use href="#cancel"></use>
                  </svg>
                </span>
              </button>
            </div>
            <div className="modal-preloader">
              <Trans id="loading"> Loading.... </Trans>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;

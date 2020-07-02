import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BookingSideNav from "../MyBookings/BookingSideNav";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ChangePassword from "./ChangePassword";
import ImageUpload from "./ImageUpload";
import myProfileActions from "store/accounts/actions";
import myAuthActions from "store/auth/actions";
import BreadCrumbNavBar from "../MyBookings/BreadCrumbNavBar";
import config from "config";

class MyProfile extends Component {
  state = {
    isEnableEditMode: false,
    isDialogOpen: false,
    isUploadDialogOpen: false,
    avatar: {},
  };

  componentDidMount() {
    const { fetchUserProfile } = this.props;
    fetchUserProfile();
  }

  toggleEnableEditingMode = () => {
    const { isLoggedIn } = this.props;
    if (isLoggedIn)
      this.setState({ isEnableEditMode: !this.state.isEnableEditMode });
  };

  openChangePasswordDialog = () =>
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
      isEnableEditMode: true,
    });

  closeDialog = () =>
    this.setState({
      isDialogOpen: false,
      isUploadDialogOpen: false,
      isEnableEditMode: true,
    });

  openUploadImageDialog = () =>
    this.setState({
      isUploadDialogOpen: !this.state.isUploadDialogOpen,
      isEnableEditMode: true,
    });

  updateAvatar = (avatar) => this.setState({ avatar, isEnableEditMode: true });

  submitChangePassword = (newPasswords) => {
    const { changePassword, logout } = this.props;
    changePassword(newPasswords);
    this.closeDialog();
    logout();
  };

  render() {
    const {
      profile: { firstName, lastName, email, phoneNumber, avatarImageUrl },
      location,
    } = this.props;
    const { isEnableEditMode, isDialogOpen, isUploadDialogOpen } = this.state;

    return (
      <div className="pc pc--booking">
        <div className="pc__container">
          <div className="pc__content">
            <ChangePassword
              isOpen={isDialogOpen}
              onClose={this.closeDialog}
              onChangePassword={(values) => this.submitChangePassword(values)}
            />
            <ImageUpload
              isOpen={isUploadDialogOpen}
              onClose={this.closeDialog}
              updateAvatar={(avatar) => this.updateAvatar(avatar)}
            />
            <BookingSideNav location={location} />
            <div className="pc-profile">
              <div className="container">
                <BreadCrumbNavBar location={location} />
              </div>
              <Formik
                initialValues={{
                  name: `${firstName && firstName} ${lastName && lastName}`,
                  avatar: avatarImageUrl && avatarImageUrl,
                  email: email && email,
                  phone: phoneNumber && phoneNumber,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Required"),
                  email: Yup.string()
                    .email("not_valid_email")
                    .required("Required"),
                  phone: Yup.string()
                    .required("Required")
                    .matches(
                      config.validationRules.phoneExp,
                      "phone_number_is_not_valid"
                    ),
                })}
                onSubmit={(values) => {
                  this.toggleEnableEditingMode();
                  let userName = values.name.split(" ");
                  let userDate = {
                    firstName: userName[0],
                    lastName: userName[1],
                    avatar: this.state.avatar,
                  };
                  this.props.updateUserProfile(userDate);
                }}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <div className="pc-profile__content">
                      <div className="container">
                        <div className="grid grid--hspace-def">
                          <div className="gcell gcell--12 gcell--ms-3 gcell--def-2">
                            <div className="pc-profile__view">
                              <div className="pc-profile__img">
                                {avatarImageUrl ? (
                                  <img
                                    alt=""
                                    src={`${avatarImageUrl}?w=158&h=198&mode=stretch`}
                                  />
                                ) : (
                                  <img
                                    src="./assets/images/no-user.png"
                                    alt=""
                                  />
                                )}
                              </div>
                              {(!isEnableEditMode && (
                                <span
                                  className="pc-profile__change-photo"
                                  style={{ display: "none" }}
                                >
                                  <Trans id="change_photo">
                                    {" "}
                                    Change photo{" "}
                                  </Trans>{" "}
                                </span>
                              )) || (
                                <a
                                  href="#"
                                  className="pc-profile__change-photo"
                                  onClick={this.openUploadImageDialog}
                                >
                                  <Trans id="change_photo">
                                    {" "}
                                    Change photo{" "}
                                  </Trans>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="gcell gcell--12 gcell--ms-7 gcell--md-6 gcell--def-7">
                            <div className="pc-profile__info">
                              <div className="pc-profile__info-it is-editing">
                                <div
                                  className="pc-profile__info-name"
                                  style={{ minWidth: 100 }}
                                >
                                  <Trans id="name"> Name </Trans>:
                                </div>
                                {(!isEnableEditMode && (
                                  <div className="pc-profile__info-text">
                                    {values.name}
                                  </div>
                                )) || (
                                  <>
                                    <div className="pc-profile__info-text">
                                      <div className="form-group">
                                        <div className="form-group__wrap">
                                          <Field
                                            className={`form-group__input ${
                                              errors.name && touched.name
                                                ? "has-error"
                                                : ""
                                            }`}
                                            required=""
                                            placeholder=""
                                            values={values.name}
                                            name="name"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {!errors.name && touched.name && (
                                      <div className="pc-profile__info-edit">
                                        <button className="pc-profile__info-link">
                                          <svg
                                            width="16"
                                            height="16"
                                            style={{ fill: "#01bab4" }}
                                          >
                                            <use href="#checked-arrow"></use>
                                          </svg>
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>

                              <div className="pc-profile__info-it is-editing">
                                <div
                                  className="pc-profile__info-name"
                                  style={{ minWidth: 100 }}
                                >
                                  <Trans id="email">EMail</Trans>:
                                </div>
                                {(!isEnableEditMode && (
                                  <div className="pc-profile__info-text">
                                    {values.email}
                                  </div>
                                )) || (
                                  <>
                                    <div className="pc-profile__info-text">
                                      <div className="form-group">
                                        <div className="form-group__wrap">
                                          <Field
                                            className={`form-group__input ${
                                              errors.email && touched.email
                                                ? "has-error"
                                                : ""
                                            }`}
                                            required=""
                                            placeholder=""
                                            values={values.email}
                                            name="email"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {!errors.email && touched.email && (
                                      <div className="pc-profile__info-edit">
                                        <button className="pc-profile__info-link">
                                          <svg
                                            width="16"
                                            height="16"
                                            style={{ fill: "#01bab4" }}
                                          >
                                            <use href="#checked-arrow"></use>
                                          </svg>
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>

                              <div className="pc-profile__info-it is-editing">
                                <div
                                  className="pc-profile__info-name"
                                  style={{ minWidth: 100 }}
                                >
                                  <Trans id="phone"> Phone </Trans>:
                                </div>
                                {(!isEnableEditMode && (
                                  <div className="pc-profile__info-text">
                                    {values.phone}
                                  </div>
                                )) || (
                                  <>
                                    <div className="pc-profile__info-text">
                                      <div className="form-group">
                                        <div className="form-group__wrap">
                                          <Field
                                            className={`form-group__input ${
                                              errors.phone && touched.phone
                                                ? "has-error"
                                                : ""
                                            }`}
                                            required=""
                                            placeholder=""
                                            values={values.phone}
                                            name="phone"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {!errors.phone && touched.phone && (
                                      <div className="pc-profile__info-edit">
                                        <button className="pc-profile__info-link">
                                          <svg
                                            width="16"
                                            height="16"
                                            style={{ fill: "#01bab4" }}
                                          >
                                            <use href="#checked-arrow"></use>
                                          </svg>
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="gcell gcell--12 gcell--ms-2 gcell--md-3">
                            <div className="pc-profile__change">
                              {(!isEnableEditMode && (
                                <button
                                  className="pc-profile__change-pass js-change-pass"
                                  style={{ color: "#999" }}
                                  disabled
                                >
                                  <Trans id="change_password">
                                    {" "}
                                    Change Password{" "}
                                  </Trans>{" "}
                                </button>
                              )) || (
                                <button
                                  className="pc-profile__change-pass js-change-pass"
                                  style={{ cursor: "pointer" }}
                                  onClick={this.openChangePasswordDialog}
                                >
                                  <Trans id="change_password">
                                    {" "}
                                    Change Password{" "}
                                  </Trans>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="summary-nav"
                      style={{ margin: 40, justifyContent: "flex-end" }}
                    >
                      {!isEnableEditMode ? (
                        <span
                          title="enable Edit"
                          type="button"
                          className="button button--outline summary-nav__prev"
                          onClick={this.toggleEnableEditingMode}
                        >
                          <span className="button__text">
                            <Trans id="enable_edit"> Enable Edit </Trans>
                          </span>
                        </span>
                      ) : (
                        <>
                          <span
                            title="enable Edit"
                            className="button button--outline summary-nav__prev"
                            onClick={this.toggleEnableEditingMode}
                          >
                            <span className="button__text">
                              <Trans id="cancel"> Cancel </Trans>
                            </span>
                          </span>
                          <button
                            title="Save"
                            type="submit"
                            className="button summary-nav__next"
                          >
                            <span className="button__text">
                              <Trans id="update"> Update </Trans>
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  account: { profile },
  auth: { currentUser, isLoggedIn },
}) => ({
  profile,
  currentUser,
  isLoggedIn,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...myProfileActions, ...myAuthActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

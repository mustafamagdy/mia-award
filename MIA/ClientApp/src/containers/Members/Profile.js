import React, { useState, useRef, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { Field, LocalizedDataField } from "components/Forms";
import * as Yup from "yup";
import { connect } from "react-redux";
import accountsActions from "store/accounts/actions";
import { bindActionCreators } from "redux";

import "../../sass/bootstrap-grid.scss";
import { NavLink } from "react-router-dom";

const Profile = ({
  userProfile,
  userAwards,
  fetchUserProfile,
  updateUserProfile,
  updateUserAvatar,
  avatarImageUrl,
  ...props
}) => {
  const tabs = ["info", "awards"];
  const [mode, setMode] = useState("view"); //view/edit
  const [mode_avatar, setMode_Avatar] = useState("view"); //view/edit
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");
  const avatarFileRef = useRef(undefined);

  const handleActiveTab = (tabKey) => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };

  useEffect(() => {
    if (userProfile == null || userProfile == undefined) {
      fetchUserProfile();
    }
  }, [userProfile]);

  return (
    <div className="profile_area">
      {mode_avatar == "view" ? (
        <div className="edit_profile">
          <div className="imgthumb">
            <img src={avatarImageUrl} />
          </div>
          <button type="button" onClick={() => setMode_Avatar("edit")}>
            <Trans id="change_avatar">Change Avatar</Trans>
          </button>
        </div>
      ) : (
        <div className="edit_profile">
          <div className="imgthumb">
            <label htmlFor="chooseAvatar">
              <img src={avatarImageUrl} />
            </label>
            <input
              type="file"
              id="chooseAvatar"
              ref={avatarFileRef}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                if (
                  avatarFileRef &&
                  avatarFileRef.current &&
                  avatarFileRef.current.files[0]
                ) {
                  updateUserAvatar &&
                    updateUserAvatar({
                      avatar: avatarFileRef.current.files[0],
                    });
                }
                setMode_Avatar("view");
              }}
            >
              <Trans id="save">Save</Trans>
            </button>
            <button type="button" onClick={() => setMode_Avatar("view")}>
              <Trans id="cancel">Cancel</Trans>
            </button>
          </div>
        </div>
      )}
      <div className="profile_tabs">
        <ul>
          <TabList
            activeClassName="active"
            activeIndex={activeIndex}
            activeTabKey={activeTabKey}
            handleActiveTabWithKey={handleActiveTab}
          >
            {tabs.map((t, i) => (
              <Tab key={t} tabKey={t}>
                <li>
                  <Trans id={t}>{t}</Trans>
                </li>
              </Tab>
            ))}
          </TabList>
        </ul>
        {activeTabKey == "info" && (
          <div
            className={classNames("content_tab info_tab", {
              active: activeTabKey == "info",
            })}
          >
            {mode == "edit" ? (
              <div className="container-fluid">
                <Formik
                  initialValues={userProfile}
                  // ref={(r) => setFormRef(r)}
                  validationSchema={Yup.object().shape({
                    fullName: Yup.string().required("Required"),
                    jobTitle: Yup.string().required("Required"),
                    email: Yup.string().required("Required"),
                  })}
                  onSubmit={(values, actions) => {
                    updateUserProfile && updateUserProfile(values);
                    setMode("info");
                  }}
                >
                  {({
                    values,
                    isSubmitting,
                    setFieldValue,
                    errors,
                    isValid,
                    touched,
                    ...props
                  }) => {
                    return (
                      <Form noValidate id="userProfileForm">
                        <div className="row">
                          <div className="col-12">
                            <Field
                              transId="full_name"
                              transdDefaultVal="Full Name"
                              hasError={
                                errors &&
                                errors.fullName !== undefined &&
                                touched &&
                                touched.fullName !== undefined
                              }
                              name="fullName"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <Field
                              transId="job_title"
                              transdDefaultVal="Job Title"
                              hasError={
                                errors &&
                                errors.jobTitle !== undefined &&
                                touched &&
                                touched.jobTitle !== undefined
                              }
                              name="jobTitle"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <Field
                              transId="email"
                              transdDefaultVal="Email"
                              hasError={
                                errors &&
                                errors.email !== undefined &&
                                touched &&
                                touched.email !== undefined
                              }
                              name="email"
                            />
                          </div>
                        </div>
                        <>
                          <button type="submit" form="userProfileForm">
                            <Trans id="save">Save</Trans>
                          </button>
                          <button
                            type="reset"
                            onClick={() => setMode("view")}
                            form="userProfileForm"
                          >
                            <Trans id="cancel">Cancel</Trans>
                          </button>
                        </>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            ) : (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4">
                    <Trans id="full_name">Full Name</Trans>
                  </div>
                  <div className="col-12">{userProfile?.fullName}</div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Trans id="job_title">Job Title</Trans>
                  </div>
                  <div className="col-12">{userProfile?.jobTitle}</div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Trans id="email">Email</Trans>
                  </div>
                  <div className="col-12">{userProfile?.email}</div>
                </div>
                <div className="row">
                  <button type="button" onClick={() => setMode("edit")}>
                    <Trans id="edit_profile">Edit profile</Trans>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTabKey == "awards" && (
          <div
            className={classNames("content_tab awards_tab ", {
              active: activeTabKey == "awards",
            })}
          >
            {userAwards ? (
              userAwards.map((award, i) => (
                <AwardItem key={i} awardAndArtwork={award} />
              ))
            ) : (
              <div>You didn't win any awards yet</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AwardItem = ({ awardAndArtwork, ...props }) => (
  <div className="item">
    <div className="col-one">
      <div className="imgthumb">
        <img src="/assets/images/award.png" />
      </div>
      <LanguageContext.Consumer>
        {({ locale }) => (
          <>
            <span
              dangerouslySetInnerHTML={{
                __html: awardAndArtwork.projectName[locale.code],
              }}
            ></span>
            <p
              dangerouslySetInnerHTML={{
                __html: awardAndArtwork.description[locale.code],
              }}
            ></p>
          </>
        )}
      </LanguageContext.Consumer>
    </div>
    <div className="col-two">
      <div className="imgthumb">
        <NavLink to={`/artwork/${awardAndArtwork.artworkId}`}>
          <img src={awardAndArtwork.posterUrl} />
        </NavLink>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ account: { profile, avatarImageUrl } }) => ({
  userProfile: profile,
  avatarImageUrl,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...accountsActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

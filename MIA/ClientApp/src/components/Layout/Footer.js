import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";

import "sass/footer.scss";

const Footer = ({
  sendNewsletter,
  newsLetterSuccess = undefined,
  resetNewsLetterSuccess,
  newsLetterSubmitting,
  ...props
}) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    sendNewsletter(data);
  };

  useEffect(() => {
    if (newsLetterSuccess === true || newsLetterSuccess === false) {
      reset();
      setTimeout(() => {
        resetNewsLetterSuccess();
      }, 2000);
    }
  }, [newsLetterSuccess]);

  return (
    <React.Fragment>
      <footer>
        <div className="container">
          <div className="row">
            <div className="about_mia">
              <div className="logo">
                <a href="/">
                  <img src="/assets/images/logo.png" />
                </a>
              </div>
              <p>
                <Trans id="footer_text"></Trans>
              </p>
            </div>
            <div className="quick_links">
              <div className="title">
                <Trans id="quick_links">QUICK LINKS</Trans>
              </div>
              <ul>
                <li>
                  <a href="/members">
                    <Trans id="members">Members</Trans>
                  </a>
                </li>
                <li>
                  <a href="/about-us">
                    <Trans id="about_us">About Us</Trans>
                  </a>
                </li>
                <li>
                  <a href="/timeline">
                    <Trans id="program">Program</Trans>
                  </a>
                </li>
                <li>
                  <a href="/terms">
                    <Trans id="terms_conditions">Terms & Conditions</Trans>
                  </a>
                </li>
              </ul>
            </div>
            <div className="news_letter">
              <div className="title">
                <Trans id="newsletter">NEWSLETTER</Trans>
              </div>
              <p>
                <Trans id="if_you_want_to_keep_updated">
                  Are you interested, enter your email address and we will keep
                  you updated
                </Trans>
              </p>
              <I18n>
                {({ i18n }) => (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      name="email"
                      ref={register({ required: true })}
                      placeholder={i18n._("email")}
                    />
                    <button type="submit" disabled={newsLetterSubmitting}>
                      <i className="icofont-send-mail"></i>
                    </button>
                  </form>
                )}
              </I18n>
              {newsLetterSuccess === true && (
                <div className="msg_success">
                  <Trans id="newsletter_success">
                    You have successfully subscribed to the newsletter
                  </Trans>
                </div>
              )}
              {newsLetterSuccess === false && (
                <div className="msg_wrong">
                  <Trans id="newsletter_failed">
                    There is an error, subscription failed. Please try again
                    later
                  </Trans>
                </div>
              )}{" "}
            </div>
          </div>
          <div className="copyrights">
            <Trans id="copyright_media_industry">
              Copyright 2020 Media Industry Awards. All rights reserved.
            </Trans>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

const mapStateToProps = (
  { home: { sendNewsletter, newsLetterSuccess, resetNewsLetterSuccess, newsLetterSubmitting } },
  ownProps
) => ({ sendNewsletter, newsLetterSuccess, resetNewsLetterSuccess,newsLetterSubmitting });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...homeActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

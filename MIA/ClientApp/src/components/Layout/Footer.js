import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trans } from "@lingui/macro";

import "sass/footer.scss";

const Footer = (props) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    //TODO: submit form for news letter
    console.log("newsletter ", data);

    setSubmitSuccess(true);

    setTimeout(() => {
      reset();
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000);
    }, 1000);
  };

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
                  if you want to keep updated with all new properties enter your
                  mail and we will send you latest updates
                </Trans>
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="email"
                  ref={register({ required: true })}
                  placeholder="Email"
                />
                <button type="submit">
                  <i className="icofont-send-mail"></i>
                </button>
              </form>
              {submitSuccess && (
                <div className="msg_success">
                  The message was sent successfully
                </div>
              )}
              {submitFailed && (
                <div className="msg_wrong">
                  There is an error, the message could not be sent
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

export default Footer;

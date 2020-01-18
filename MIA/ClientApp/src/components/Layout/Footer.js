import React from "react";
import { useForm } from "react-hook-form";
import { Trans } from "@lingui/macro";

import "sass/footer.scss";

const Footer = props => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log("newsletter ", data);
  };

  return (
    <React.Fragment>
      <footer>
        <div className="container">
          <div className="row">
            <div className="about_mia">
              <div className="logo">
                <a href="#" title="#">
                  <img src="assets/images/logo.png" alt="#" />
                </a>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                unchanged.
              </p>
            </div>
            <div className="quick_links">
              <div className="title">QUICK LINKS</div>
              <ul>
                <li>
                  <a href="#" title="#">
                    <Trans id="mia_awards">MIA Awards</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="about_us">About Us</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="members">Members</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="terms_conditions">Terms & Conditions</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="privacy_policy">Privacy & Policy</Trans>
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
                  if you want to keep updated with all new properties enter your mail and we will send you latest updates
                </Trans>
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="email" ref={register} placeholder="Email" />
                <button type="submit">
                  <i className="icofont-send-mail"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="copyrights">
            <Trans id="copyright_media_industry">Copyright 2020 Media Industry Awards. All rights reserved.</Trans>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

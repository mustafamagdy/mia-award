import React from "react";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import config from "config";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "store/home/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import * as Yup from "yup";
import Map from "components/Map";

// import {} from 'react-redux'
// import "sass/contactus.scss";

const ContactUs = ({
  fetchContactUsMessageSubjects,
  sendContactUsMessage,
  contactUsMessageSubjects,
  contactUsSuccess,
  contactUsFailed,
  ...props
}) => {
  useEffect(() => {
    fetchContactUsMessageSubjects();
  }, []);

  const { register, handleSubmit, setValue } = useForm({
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
      subject: Yup.string().required(),
      message: Yup.string()
        .required()
        .min(100)
        .max(4000)
    })
  });

  const onSubmit = values => {
    sendContactUsMessage(values);
  };

  return (
    <section id="contact_us">
      <div className="container">
        <div className="map_area">
          <div className="title">
            <Trans id="contact_us">Contact Us</Trans>
          </div>
          <div className="content">
            <div className="contact_info">
              <div className="item">
                <i className="icofont-google-map item-icon"></i>
                <span>
                  <Trans id="address">Address</Trans>
                </span>
                <p>
                  <Trans id="dubai_address">Dubai, Dubai Media City, Building No. 1, Second Floor - Office No. 214</Trans>
                </p>
              </div>
              <div className="item">
                <i className="icofont-phone item-icon"></i>
                <span>
                  <Trans id="phone">Phone</Trans>
                </span>
                <p style={{ direction: "ltr" }}>
                  <Trans id="phone_1">+971 4 57 2636 7</Trans>
                </p>
                <p style={{ direction: "ltr" }}>
                  <Trans id="phone_2">+971 4 57 2636 8</Trans>
                </p>
              </div>
              <div className="item">
                <i className="icofont-fax  item-icon"></i>
                <span>
                  <Trans id="fax">Fax</Trans>
                </span>
                <p style={{ direction: "ltr" }}>
                  <Trans id="fax_1">+971 4 57 2636 6</Trans>
                </p>
              </div>
              <div className="item">
                <i className="icofont-email item-icon"></i>
                <span>
                  <Trans id="email">EMail</Trans>
                </span>
                <p style={{ direction: "ltr" }}>Info@mediaindustry.me</p>
              </div>
            </div>
            <div className="google_map">
              <Map
                lat={config.companyLocation.lat}
                long={config.companyLocation.long}
                zoom={config.companyLocation.zoom}
                landMarks={[config.companyLocation.landMarker]}
              />
            </div>
          </div>
        </div>
        <div className="form_area">
          <div className="title">
            <Trans id="get_in_touch">Get In Touch</Trans>
          </div>
          <div className="content">
            <form className="form_contact" onSubmit={handleSubmit(onSubmit)}>
              <div className="item">
                <input ref={register} name="name" type="text" placeholder="Name*" />
              </div>
              <div className="item">
                <input ref={register} name="email" type="email" placeholder="E-mail*" />
              </div>
              <div className="item">
                <input ref={register} name="phone" type="number" placeholder="Phone" />
              </div>
              <div className="item">
                <LanguageContext.Consumer>
                  {({ locale }) => (
                    <select key={locale.code} ref={register} name="subject">
                      {contactUsMessageSubjects.map((c, i) => (
                        <option key={c.name[locale.code]} value={c.id}>
                          {c.name[locale.code]}
                        </option>
                      ))}
                    </select>
                  )}
                </LanguageContext.Consumer>
              </div>
              <textarea
                ref={register}
                name="message"
                id=""
                cols="30"
                rows="10"
                placeholder="Type here your Comment (100 character minimum)"
              ></textarea>
              <ReCAPTCHA
                className="captcha_item"
                theme="dark"
                sitekey={config.reCaptchaKey}
                ref={() =>
                  register(
                    { name: "reCaptchaToken" },
                    {
                      validate: value => {
                        return !!value;
                      }
                    }
                  )
                }
                onChange={v => {
                  setValue("reCaptchaToken", v);
                }}
              />
              <button type="submit">
                <Trans id="send_message">Send Message</Trans>
              </button>
              {contactUsSuccess && (
                <div className="msg_success">
                  <Trans id="contact_us_message_sent_success">The message was sent successfully</Trans>
                </div>
              )}
              {contactUsFailed && (
                <div className="msg_wrong">
                  <Trans id="contact_us_message_sent_fail">There is an error, the message could not be sent</Trans>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ home: { contactUsMessageSubjects, contactUsSuccess, contactUsFailed } }) => ({
  contactUsMessageSubjects,
  contactUsSuccess,
  contactUsFailed
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);

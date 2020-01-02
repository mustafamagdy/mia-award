import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

class Recaptcha extends React.PureComponent {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    const {
      form: { setFieldValue },
      field: { name }
    } = this.props;
    return (
      <ReCAPTCHA
        sitekey={TEST_SITE_KEY}
        render="explicit"
        theme="light"
        onChange={value => {
          setFieldValue(name, value);
        }}
      />
    );
  }
}

export default Recaptcha;

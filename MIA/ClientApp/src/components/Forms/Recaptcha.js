import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

import config from "config";

class Recaptcha extends React.PureComponent {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    const { setValue, name } = this.props;
    return (
      <ReCAPTCHA
        theme="dark"
        sitekey={config.reCaptchaKey}
        render="explicit"
        theme="light"
        onChange={value => {
          setValue(name, value);
        }}
      />
    );
  }
}

export default Recaptcha;

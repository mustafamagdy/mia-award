import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import config from "config";

class Recaptcha extends React.PureComponent {
  state = {
    captcha: undefined
  };
  render() {
    const {
      form: { setFieldValue },
      field: { name }
    } = this.props;
    return (
      <ReCAPTCHA
        ref={e => this.setState({ captcha: e })}
        sitekey={config.reCaptchaKey}
        render="explicit"
        theme="light"
        onChange={value => {
          setFieldValue(name, value);
        }}
        onExpired={() => {
          const { captcha } = this.state;
          captcha.reset();
        }}
      />
    );
  }
}

export default Recaptcha;

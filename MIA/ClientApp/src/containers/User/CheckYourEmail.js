import React from "react";
import { Trans } from '@lingui/macro';

class CheckYourEmail extends React.Component {

  render() {
    return <section id="login_page">
      <div className="container">
        <div> <Trans id="confirm_your_email_first"> confirm your email first </Trans></div>
      </div></section>
  }
}

export default CheckYourEmail;

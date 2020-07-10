import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Trans } from "@lingui/macro";
import accountActions from "store/accounts/actions";

class VerifyEmail extends React.Component {
  componentDidMount() {
    const userDetails = queryString.parse(this.props.location.search);
    const { verifyEmail } = this.props;
    verifyEmail({ ...userDetails });
  }

  render() {
    const { emailVerified, emailVerifing } = this.props;

    return emailVerifing ? (
      <section id="login_page">
        <div className="container">
          <div className="main-title">
            <Trans id="verifying_your_email_please_wait">
              Please wait, we are verifying your email
            </Trans>
          </div>
        </div>
      </section>
    ) : emailVerified ? (
      <Redirect to="/members" />
    ) : (
      <section id="login_page">
        <div className="container">
          <div className="main-title">
            <Trans id="failed_to_verify">
              Failed to verify your email
            </Trans>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({
  account: { emailVerified, emailVerifing, errors },
}) => ({ emailVerified, emailVerifing, errors });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...accountActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerifyEmail));

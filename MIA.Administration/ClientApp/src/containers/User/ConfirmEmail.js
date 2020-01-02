import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Trans } from '@lingui/macro';
import accountActions from "store/accounts/actions";

class VerifyEmail extends React.Component {
  componentDidMount() {
    const userDetails = queryString.parse(this.props.location.search);
    const { verifyEmail } = this.props;
    verifyEmail({ ...userDetails });
  }

  render() {
    const { emailVerified, emailVerifing } = this.props;
    return emailVerifing ? <Trans id="loading"> Loading.... </Trans> : emailVerified ? <Redirect to="/home" /> : <div><Trans id="failed"> Failed </Trans></div>;
  }
}

const mapStateToProps = ({ account: { emailVerified, emailVerifing, errors } }) => ({ emailVerified, emailVerifing, errors });
const mapDispatchToProps = dispatch => bindActionCreators({ ...accountActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerifyEmail));

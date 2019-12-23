import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { Trans } from '@lingui/macro';
import accountActions from "store/accounts/actions";
import { ErrorMessage } from "components/Forms";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

class ResetPasswordByEmail extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "", recaptcha: "" }}
        onSubmit={async (values, actions) => {
          const { userId, code } = queryString.parse(this.props.location.search);
          const { resetPassword, history } = this.props;
          await resetPassword({ ...values, userId, code });
          setTimeout(() => {
            this.recaptcha.reset();
            actions.setSubmitting(false);
            history.push("/");
          }, 1200);
        }}
        render={({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Field type="password" name="newPassword" placeholder="New Password" />
            <ErrorMessage name="newPassword" component="div" />
            <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
            <ErrorMessage name="confirmPassword" component="div" />
            <ReCAPTCHA
              style={{ display: "inline-block" }}
              ref={r => (this.recaptcha = r)}
              sitekey={TEST_SITE_KEY}
              onChange={val => setFieldValue("recaptcha", val)}
            />
            <button type="submit" disabled={isSubmitting}>
              <Trans id="change_password">Change Password</Trans>
            </button>
          </Form>
        )}
      />
    );
  }
}

const mapStateToProps = ({ account: { errors } }) => ({ errors });
const mapDispatchToProps = dispatch => bindActionCreators({ ...accountActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPasswordByEmail));

// import React from "react";
// import { Trans } from "@lingui/macro";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { Field, FormGroup, Recaptcha } from "components/Forms";
// import styled from "styled-components";
// import keys from "ramda/es/keys";

// const ErrorForgotPassword = styled.div`
//   ${({ hasError }) => (hasError ? "" : "display: none")}
// `;

// const ForgotPasswordErrors = ({ errors }) => {
//   return !!errors ? keys(errors).map(k => <div key={k}>{errors[k]}</div>) : null;
// };

// class ForgotPassword extends React.PureComponent {
//   resetFormAndState = () => {
//     this.form.resetForm();
//   };

//   render() {
//     const { switchToSignInView, forgotPassword, forgotPasswordFailed, forgotPasswordErrors } = this.props;
//     return (
//       <div className="grid grid--1 grid--md-2 grid--space-xl _md-flex-row-reverse">
//         <div className="gcell _pb-none _md-hide">
//           <div className="popup__title">Password recovery</div>
//         </div>
//         <div className="gcell _pb-none popup__line">
//           <ErrorForgotPassword hasError={!!forgotPasswordFailed} className="error-msg">
//             <ForgotPasswordErrors errors={forgotPasswordErrors} />
//           </ErrorForgotPassword>
//           <div className="_md-pr-ms _pt-ms">
//             <Formik
//               ref={r => (this.form = r)}
//               initialValues={{ email: "", recaptcha: "" }}
//               onSubmit={async (values, actions) => {
//                 await forgotPassword(values);
//                 actions.setSubmitting(false);
//               }}
//               validationSchema={Yup.object().shape({
//                 recaptcha: Yup.string().required(),
//                 email: Yup.string()
//                   .required()
//                   .email()
//               })}
//               render={({ values, isSubmitting, setFieldValue, errors }) => (
//                 <Form noValidate>
//                   <FormGroup>
//                     <Field name="email" type="email" svgIconHref="mail" placeholder="Your email" hasError={!!errors["email"]} />
//                   </FormGroup>
//                   <div className="form-group">
//                     <div className="form-check form-check--text">
//                       <span>
//                         <Trans id="enter_your_email_address_and_we_will_send_you">
//                           Enter your email adress and we`ll send you a link to reset your password
//                         </Trans>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <Field name="recaptcha" component={Recaptcha} />
//                   </div>
//                   <div className="form-group">
//                     <button type="submit" className="button button--full-width">
//                       <span className="button__text">
//                         <Trans id="submit">Submit</Trans>
//                       </span>
//                     </button>
//                   </div>
//                   <div className="form__policy">
//                     <Trans id="by_signing_in_i_agree"> By signing in, I agree to </Trans>{" "}
//                       <a target="_blank" href="/terms">
//                         <Trans id="terms_of_use"> Terms of Use </Trans>
//                       </a>{" "}
//                       <Trans id="_and"> and </Trans> {" "}
//                       <a target="_blank" href="/privacy">
//                         <Trans id="privacy_policy"> Pravicy Policy </Trans> .
//                       </a>
//                   </div>
//                 </Form>
//               )}
//             />
//           </div>
//         </div>
//         <div className="gcell _pb-none">
//           <div className="_md-plr-def">
//             <div className="_md-pr-lg _md-mr-md _md-pt-none">
//               <div className="popup__title _md-show">
//                 <Trans id="password_recovery">Password recovery</Trans>
//               </div>
//               <div className="popup__image _md-show">
//                 <img src="./assets/images/password.png" alt="" />
//               </div>
//               <div className="popup__sub-title">
//                 <Trans id="already_have_an_account">Already have an account?</Trans>
//               </div>
//               <button type="button" className="button button--full-width" onClick={switchToSignInView}>
//                 <span className="button__text">
//                 <Trans id="sign_in"> sign in </Trans>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default React.forwardRef((props, ref) => <ForgotPassword {...props} ref={ref} />);

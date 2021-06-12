// import React from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { Trans } from '@lingui/macro';
// import authActions from "store/auth/actions";
// import SignIn from "./SignIn";
// import ForgotPassword from "./ForgotPassword";

// const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

// class SignInAndForgotPassword extends React.PureComponent {
//   state = {
//     //used to switch between signin and forgot password view
//     signInView: true
//   };

//   toogleState = () => this.setState({ signInView: !this.state.signInView });
//   switchToForgotPasswordView = () => this.toogleState();
//   switchToSignInView = () => this.toogleState();
//   signinRef = React.createRef();
//   forgotPasswordRef = React.createRef();

//   render() {
//     const {
//       props: {
//         signinModalOpened,
//         closeSigninModal,
//         switchToCreateAccountModal,
//         login,
//         signinFailed,
//         signinErrors,
//         resetSigninErrors,
//         forgotPassword,
//         forgotPasswordErrors,
//         forgotPasswordFailed,
//         resetForgotPasswordErrors
//       },
//       state: { signInView },
//       switchToForgotPasswordView,
//       switchToSignInView
//     } = this;

//     return (
//       <div className={`modal-wrap${signinModalOpened ? " modal-ready" : ""}`} style={{ overflow: "hidden auto" }}>
//         <div className="modal-container">
//           <div className="modal-content">
//             <div className="popup">
//               <div className="popup-logo">
//                 <div className="popup-logo__title"><Trans id="mia"> MIA </Trans></div>
//               </div>

//               {signInView ? (
//                 <SignIn
//                   switchToForgotPasswordView={switchToForgotPasswordView}
//                   switchToCreateAccountModal={switchToCreateAccountModal}
//                   login={login}
//                   signinFailed={signinFailed}
//                   signinErrors={signinErrors}
//                   closeDlg={closeSigninModal}
//                   ref={this.signinRef}
//                 />
//               ) : (
//                 <ForgotPassword
//                   forgotPassword={forgotPassword}
//                   switchToSignInView={switchToSignInView}
//                   forgotPasswordErrors={forgotPasswordErrors}
//                   forgotPasswordFailed={forgotPasswordFailed}
//                   ref={this.forgotPasswordRef}
//                 />
//               )}
//               <button
//                 title="Close (ESC)"
//                 type="button"
//                 className="modal-close"
//                 onClick={() => {
//                   if (this.signinRef.current) {
//                     this.signinRef.current.resetFormAndState();
//                     resetSigninErrors();
//                   }

//                   if (this.forgotPasswordRef.current) {
//                     this.forgotPasswordRef.current.resetFormAndState();
//                     resetForgotPasswordErrors();
//                   }

//                   closeSigninModal();
//                   this.setState({ signInView: true });
//                 }}
//               >
//                 <span className="svg">
//                   <svg width="30" height="30">
//                     <use href="#cancel" />
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           </div>
//           <div className="modal-preloader"><Trans id="loading"> Loading.... </Trans></div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(SignInAndForgotPassword);

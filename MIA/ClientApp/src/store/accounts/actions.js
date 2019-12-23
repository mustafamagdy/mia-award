import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    signup: { args: ["user"], meta: { async: true } },
    verifyEmail: { args: ["verifyEmailRequest"], meta: { async: true } },
    forgotPassword: { args: ["forgotPasswordRequest"], meta: { async: true } },
    resetPassword: { args: ["resetPasswordRequest"], meta: { async: true } },
    resetSignupErrors: {},
    resetForgotPasswordErrors: {},
    fetchUserProfile: { meta: { async: true }},
    updateUserProfile: { args: ["userData"], meta: { async: true }},
    changePassword: {args: ["changedPasswords"], meta: { async: true }}
  },
  {
    prefix: "@app/accounts/"
  }
);
export const ActionTypes = Types;
export default Creators;

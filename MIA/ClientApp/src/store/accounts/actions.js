import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    signup: { args: ["payload"], meta: { async: true } },
    verifyEmail: { args: ["payload"], meta: { async: true } },
    forgotPassword: { args: ["payload"], meta: { async: true } },
    resetPassword: { args: ["payload"], meta: { async: true } },
    resetSignupErrors: {},
    resetForgotPasswordErrors: {},
    fetchUserProfile: { meta: { async: true } },
    updateUserProfile: { args: ["payload"], meta: { async: true } },
    changePassword: { args: ["payload"], meta: { async: true } },
  },
  {
    prefix: "@app/accounts/",
  }
);
export const ActionTypes = Types;
export default Creators;

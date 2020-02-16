import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    login: { args: ["loginRequest"], meta: { async: true } },
    logout: { args: ["token"], meta: { async: true } },
    setAuthToken: { args: ["token"], meta: { async: false } },
    demoLogin: {},
    resetSigninErrors: {},
    closeSigninModal: {},
    openSigninModal: {},
    closeCreateAccountModal: {},
    openCreateAccountModal: {},
    switchToCreateAccountModal: {},
    switchToSignInModal: {}
  },
  {
    prefix: "@app/auth/"
  }
);

export const ActionTypes = Types;
export default Creators;

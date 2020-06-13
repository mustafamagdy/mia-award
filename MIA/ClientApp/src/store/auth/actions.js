import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    login: { args: ["payload"], meta: { async: true } },
    logout: { args: ["payload"], meta: { async: true } },
    setAuthToken: { args: ["token"], meta: { async: false } },
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

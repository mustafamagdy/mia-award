import { createReducer } from "reduxsauce";
import { produce } from "immer";
import isEmpty from "ramda/es/isEmpty";
import jwtDecoder from "jwt-decode";

import { ActionTypes } from "./actions";

const initialState = {
  signinModalOpened: false,
  createAccountModalOpened: false,
  currentUser: null,
  isLoggedIn: false,
  token: null,
  signinErrors: [],
  signinFailed: false,
};

const resetAll = (state, { payload: token }) => {
  return produce(state, (draft) => {
    draft.currentUser = null;
    draft.isLoggedIn = false;
    draft.token = null;
  });
};

const login = (state, { payload: token }) => {
  return produce(state, (draft) => {
    try {
      draft.token = token;
      draft.isLoggedIn = !isEmpty(token);
      draft.currentUser = jwtDecoder(token);
      draft.signinModalOpened = false;
      draft.signinErrors = [];
      draft.signinFailed = false;

      localStorage.setItem("jwtToken", token);
    } catch {
      console.error("failed to decode jwt");
      draft.isLoggedIn = false;
      draft.token = null;
      draft.currentUser = null;
    }
  });
};

const loginFail = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.signinErrors = payload;
    draft.signinFailed = true;
  });
};

const logout = (state, action) => {
  return produce(state, (draft) => {
    draft.isLoggedIn = false;
    draft.token = null;
    draft.currentUser = null;
    localStorage.removeItem("jwtToken");
  });
};

const setAuthToken = (state, { token }) => {
  return produce(state, (draft) => {
    try {
      draft.token = token;
      draft.isLoggedIn = !isEmpty(token);
      draft.currentUser = jwtDecoder(token);
    } catch {
      console.error("failed to decode jwt");
      draft.isLoggedIn = false;
      draft.token = null;
      draft.currentUser = null;
    }
  });
};

const resetSigninErrors = (state, action) => {
  return produce(state, (draft) => {
    draft.signinErrors = [];
    draft.signinFailed = false;
  });
};

const closeSigninModal = (state, action) => {
  return produce(state, (draft) => {
    draft.signinModalOpened = false;
  });
};
const openSigninModal = (state, action) => {
  return produce(state, (draft) => {
    draft.signinModalOpened = true;
  });
};

const closeCreateAccountModal = (state, action) => {
  return produce(state, (draft) => {
    draft.createAccountModalOpened = false;
  });
};
const openCreateAccountModal = (state, action) => {
  return produce(state, (draft) => {
    draft.createAccountModalOpened = true;
  });
};

const switchToCreateAccount = (state, action) => {
  return produce(state, (draft) => {
    draft.createAccountModalOpened = true;
    draft.signinModalOpened = false;
  });
};

const switchToSignInModal = (state, action) => {
  return produce(state, (draft) => {
    draft.createAccountModalOpened = false;
    draft.signinModalOpened = true;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.RESET]: resetAll,
  [ActionTypes.LOGIN_SUCCESS]: login,
  [ActionTypes.LOGIN_FAIL]: loginFail,
  [ActionTypes.LOGOUT_SUCCESS]: logout,
  [ActionTypes.SET_AUTH_TOKEN]: setAuthToken,
  [ActionTypes.RESET_SIGNIN_ERRORS]: resetSigninErrors,
  [ActionTypes.CLOSE_SIGNIN_MODAL]: closeSigninModal,
  [ActionTypes.OPEN_SIGNIN_MODAL]: openSigninModal,
  [ActionTypes.CLOSE_CREATE_ACCOUNT_MODAL]: closeCreateAccountModal,
  [ActionTypes.OPEN_CREATE_ACCOUNT_MODAL]: openCreateAccountModal,
  [ActionTypes.SWITCH_TO_CREATE_ACCOUNT_MODAL]: switchToCreateAccount,
  [ActionTypes.SWITCH_TO_SIGN_IN_MODAL]: switchToSignInModal,
});

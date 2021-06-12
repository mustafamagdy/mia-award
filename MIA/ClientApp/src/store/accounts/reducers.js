import { createReducer } from "reduxsauce";
import { produce } from "immer";
import isEmpty from "ramda/es/isEmpty";
import jwtDecoder from "jwt-decode";
import { push } from "connected-react-router";
import { store } from "store";

import { ActionTypes } from "./actions";

const initialState = {
  emailVerifing: true,
  profile: null,
  emailVerified: false,
  signupErrors: [],
  signupFailed: undefined,
  forgotPasswordErrors: [],
  forgotPasswordFailed: false,
  avatarImageUrl: "",
  profileSubmitting: false,
  signupSubmitting: false,
};

const signup = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.signupSubmitting = true;
  });
};
const signupSuccess = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.signupSubmitting = false;

  });
};

const signupFailed = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.signupErrors = payload;
    draft.signupFailed = true;
    draft.signupSubmitting = false;
  });
};

const verifyEmail = (state) => {
  return produce(state, (draft) => {
    draft.emailVerified = true;
    draft.error = false;
    draft.errors = undefined;
    draft.emailVerifing = false;
  });
};

const verifyEmailFailed = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.errors = payload;
    draft.error = true;
    draft.emailVerifing = false;
  });
};

const forgotPassword = (state) => {
  return produce(state, (draft) => {
    draft.forgotPasswordErrors = [];
    draft.forgotPasswordFailed = false;
  });
};

const forgotPasswordFailed = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.forgotPasswordErrors = payload;
    draft.forgotPasswordFailed = true;
  });
};

const resetPassword = (state) => {
  return produce(state, (draft) => {
    draft.error = false;
    draft.errors = undefined;
  });
};

const resetPasswordFailed = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.errors = payload;
    draft.error = true;
  });
};

const resetSignupErrors = (state, action) => {
  return produce(state, (draft) => {
    draft.signupErrors = [];
    draft.signupFailed = false;
  });
};

const resetForgotPasswordErrors = (state, action) => {
  return produce(state, (draft) => {
    draft.forgotPasswordErrors = [];
    draft.forgotPasswordFailed = false;
  });
};

const fetchUserProfile = (state, action) => {
  return produce(state, (draft) => {});
};
const fetchUserProfileSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.profile = action.payload;
    draft.avatarImageUrl = action.payload.avatarImageUrl;
  });
};
const fetchUserProfileFailed = (state, action) => {
  return produce(state, (draft) => {});
};

const changePassword = (state) => {
  return produce(state, (draft) => {
    draft.error = false;
    draft.errors = undefined;
  });
};

const changePasswordFailed = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.errors = payload;
    draft.error = true;
  });
};

const updateUserProfile = (state, action) => {
  return produce(state, (draft) => {
    draft.profileSubmitting = true;
  });
};

const updateUserProfileSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.profile = action.payload;
    draft.profileSubmitting = false;
  });
};
const updateUserAvatarSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.avatarImageUrl = action.payload.avatarImageUrl;
  });
};

const updateUserProfileFailed = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.profileSubmitting = false;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.SIGNUP]: signup,
  [ActionTypes.SIGNUP_SUCCESS]: signupSuccess,
  [ActionTypes.SIGNUP_FAIL]: signupFailed,
  [ActionTypes.RESET_SIGNUP_ERRORS]: resetSignupErrors,
  [ActionTypes.VERIFY_EMAIL_SUCCESS]: verifyEmail,
  [ActionTypes.VERIFY_EMAIL_FAIL]: verifyEmailFailed,
  [ActionTypes.FORGOT_PASSWORD_SUCCESS]: forgotPassword,
  [ActionTypes.FORGOT_PASSWORD_FAIL]: forgotPasswordFailed,
  [ActionTypes.RESET_FORGOT_PASSWORD_ERRORS]: resetForgotPasswordErrors,
  [ActionTypes.RESET_PASSWORD_SUCCESS]: resetPassword,
  [ActionTypes.RESET_PASSWORD_FAIL]: resetPasswordFailed,

  [ActionTypes.FETCH_USER_PROFILE]: fetchUserProfile,
  [ActionTypes.FETCH_USER_PROFILE_SUCCESS]: fetchUserProfileSuccess,
  [ActionTypes.FETCH_USER_PROFILE_FAIL]: fetchUserProfileFailed,

  [ActionTypes.CHANGE_PASSWORD_SUCCESS]: changePassword,
  [ActionTypes.CHANGE_PASSWORD_FAIL]: changePasswordFailed,

  [ActionTypes.UPDATE_USER_PROFILE]: updateUserProfile,
  [ActionTypes.UPDATE_USER_PROFILE_SUCCESS]: updateUserProfileSuccess,
  [ActionTypes.UPDATE_USER_PROFILE_FAIL]: updateUserProfileFailed,

  [ActionTypes.UPDATE_USER_AVATAR_SUCCESS]: updateUserAvatarSuccess,
});

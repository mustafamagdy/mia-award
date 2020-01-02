import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";
import { ActionTypes as Authactions } from "../auth/actions";

export const signupLogic = createLogic({
  type: ActionTypes.SIGNUP,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.accounts.signup(action.user);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.SIGNUP_FAIL,
          payload: res.data.Error || res.data.Message || 'Unknown Error',
          error: true
        });
      } else {
        dispatch({ type: ActionTypes.SIGNUP_SUCCESS });
        dispatch({ type: Authactions.CLOSE_CREATE_ACCOUNT_MODAL });
      }
    } catch (err) {
      dispatch({ type: ActionTypes.SIGNUP_FAIL, payload: err, error: true });
    }

    done();
  }
});

export const verifyEmailLogic = createLogic({
  type: ActionTypes.VERIFY_EMAIL,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.accounts.verifyEmail(action.verifyEmailRequest);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.VERIFY_EMAIL_FAIL,
          payload: res.data.Error || res.data.Message || 'Unknown Error',
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.VERIFY_EMAIL_SUCCESS,
          token: res.data.result
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.VERIFY_EMAIL_FAIL,
        payload: err,
        error: true
      });
    }

    done();
  }
});

export const forgotPasswordLogic = createLogic({
  type: ActionTypes.FORGOT_PASSWORD,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.accounts.forgotPassword(
        action.forgotPasswordRequest
      );
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FORGOT_PASSWORD_FAIL,
          payload: res.data.Error || res.data.Message || 'Unknown Error',
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
          token: res.data.result
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FORGOT_PASSWORD_FAIL,
        payload: err,
        error: true
      });
    }

    done();
  }
});

export const resetPasswordLogic = createLogic({
  type: ActionTypes.RESET_PASSWORD,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    console.log('log', action.changedPasswords);
    
    try {
      const res = await api.accounts.resetPassword(action.resetPasswordRequest);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.RESET_PASSWORD_FAIL,
          payload: res.data.Error || res.data.Message || 'Unknown Error',
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.RESET_PASSWORD_SUCCESS,
          token: res.data.result
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.RESET_PASSWORD_FAIL,
        payload: err,
        error: true
      });
    }

    done();
  }
});

export const fetchUserProfileDataLogic = createLogic({
  type: ActionTypes.FETCH_USER_PROFILE,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.accounts.getUserProfile();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_USER_PROFILE_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_USER_PROFILE_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_USER_PROFILE_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const updateUserProfileLogic = createLogic({
  type: ActionTypes.UPDATE_USER_PROFILE,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    console.log('data logic', action.userData);
    
    try {
      const res = await api.accounts.updateUserProfile(action.userData);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.UPDATE_USER_PROFILE_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.UPDATE_USER_PROFILE_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.UPDATE_USER_PROFILE_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const changePasswordLogic = createLogic({
  type: ActionTypes.CHANGE_PASSWORD,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.accounts.changePassword(action.changedPasswords);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.CHANGE_PASSWORD_FAIL,
          payload: res.data.Error || res.data.Message || 'Unknown Error',
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
          token: res.data.result
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.CHANGE_PASSWORD_FAIL,
        payload: err,
        error: true
      });
    }

    done();
  }
});

export default [
  signupLogic,
  verifyEmailLogic,
  forgotPasswordLogic,
  resetPasswordLogic,
  fetchUserProfileDataLogic,
  changePasswordLogic,
  updateUserProfileLogic
];

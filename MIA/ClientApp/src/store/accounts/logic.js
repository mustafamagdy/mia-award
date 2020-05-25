import { ActionTypes } from "./actions";
import { ActionTypes as Authactions } from "../auth/actions";
import { push } from "connected-react-router";

import logic from "utils/genLogic";

const apiNamespace = "accounts";
const signupLogic = logic(apiNamespace, ActionTypes.SIGNUP, (dispatch) => {
  dispatch(push("/account/checkYourEmail"));
});
const verifyEmailLogic = logic(apiNamespace, ActionTypes.VERIFY_EMAIL);
const forgotPasswordLogic = logic(apiNamespace, ActionTypes.FORGOT_PASSWORD);
const resetPasswordLogic = logic(
  apiNamespace,
  ActionTypes.RESET_PASSWORD,
  (dispatch) => {
    dispatch(push({ pathname: "/members", search: "" }));
  }
);
const fetchUserProfileLogic = logic(
  apiNamespace,
  ActionTypes.FETCH_USER_PROFILE
);
const updateUserProfileLogic = logic(
  apiNamespace,
  ActionTypes.UPDATE_USER_PROFILE
);
const updateUserAvatarLogic = logic(
  apiNamespace,
  ActionTypes.UPDATE_USER_AVATAR
);
const changePasswordLogic = logic(apiNamespace, ActionTypes.CHANGE_PASSWORD);

export default [
  signupLogic,
  verifyEmailLogic,
  forgotPasswordLogic,
  resetPasswordLogic,
  fetchUserProfileLogic,
  changePasswordLogic,
  updateUserProfileLogic,
  updateUserAvatarLogic,
];

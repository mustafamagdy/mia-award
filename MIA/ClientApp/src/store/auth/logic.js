import { ActionTypes } from "./actions";
import { push } from "connected-react-router";
import logic from "utils/genLogic";

const apiNamespace = "auth";

export const loginLogic = logic(apiNamespace, ActionTypes.LOGIN, (dispatch) =>
  dispatch(push("/members"))
);

const logoutLogic = logic(apiNamespace, ActionTypes.LOGOUT, (dispatch) => {
  dispatch(push("/"));
});

export default [loginLogic, logoutLogic];

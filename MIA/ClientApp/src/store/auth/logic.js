import { ActionTypes } from "./actions";
import { push } from "connected-react-router";
import logic from "utils/genLogic";
import { toast } from "react-toastify";
const apiNamespace = "auth";

export const loginLogic = logic(
  apiNamespace,
  ActionTypes.LOGIN,
  (dispatch) => dispatch(push("/members")),
  (dispatch, res) => {
    if (res && res.errorCode == "404") {
      toast.error(`Login failed`);
    }
  }
);

const logoutLogic = logic(apiNamespace, ActionTypes.LOGOUT, (dispatch) => {
  dispatch(push("/"));
});

export default [loginLogic, logoutLogic];

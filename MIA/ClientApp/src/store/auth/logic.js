import { ActionTypes } from "./actions";
import { push } from "connected-react-router";
import logic from "utils/genLogic";
import { toast } from "react-toastify";
import memberActions from "../members/actions";
const apiNamespace = "auth";

export const loginLogic = logic(
  apiNamespace,
  ActionTypes.LOGIN,
  (dispatch) => dispatch(push("/members")),
  (dispatch, res) => {
    if (res && (res.errorCode == "404" || res.errorCode == "403")) {
      toast.error(`Login failed`);
    }
  }
);

const logoutLogic = logic(
  apiNamespace,
  ActionTypes.LOGOUT,
  (dispatch) => {
    dispatch(memberActions.reset());
    dispatch(push("/"));
  },
  (dispatch) => {
    dispatch(memberActions.reset());
    dispatch(push("/"));
  }
);

export default [loginLogic, logoutLogic];

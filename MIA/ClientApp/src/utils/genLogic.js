import { createLogic } from "redux-logic";
import { toast } from "react-toastify";

const normalizeActionName = (actionName) =>
  actionName
    .toLowerCase()
    .split("/")
    .pop()
    .split("_")
    .map((a, i) => (i > 0 ? a.charAt(0).toUpperCase() + a.substring(1) : a))
    .join("");

export const logic = (apiNamespace, actionName, successCb, failCb) => {
  const api_name = normalizeActionName(actionName);
  const logic = createLogic({
    type: actionName,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        _validateApi(api, apiNamespace, api_name, action);
        const res = await api[apiNamespace][api_name](action.payload);
        if (!res.ok) {
          const _errorMsg =
            res.data.Error || res.data.Message || "Unknown Error";
          dispatch({
            type: `${actionName}_FAIL`,
            payload: _errorMsg,
            error: true,
          });
          if (failCb) {
            failCb(dispatch, res.data);
          } else {
            if (res.data && res.data.errorCode == "404") {
              toast.error("No data found");
            } else {
              toast.error(_errorMsg);
            }
          }
        } else {
          dispatch({ type: `${actionName}_SUCCESS`, payload: res.data });
          successCb && successCb(dispatch, res.data);
        }
      } catch (err) {
        console.error("Unhandled error in logic ", err);
        dispatch({ type: `${actionName}_FAIL`, payload: err, error: true });
        failCb && failCb(dispatch);
      }
      done();
    },
  });
  return logic;
};

function _validateApi(api, apiNamespace, api_name, action) {
  //todo: validatte api
  const func = api[apiNamespace][api_name];
  if (!func) {
    
  }
}

export default logic;

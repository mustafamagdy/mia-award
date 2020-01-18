import { createLogic } from "redux-logic";
const normalizeActionName = actionName =>
  actionName
    .toLowerCase()
    .split("/")
    .pop()
    .split("_")
    .map((a, i) => (i > 0 ? a.charAt(0).toUpperCase() + a.substring(1) : a))
    .join("");

export const generateLogic = (apiNamespace, actionName) => {
  const api_name = normalizeActionName(actionName);
  const logic = createLogic({
    type: actionName,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        const res = await api[apiNamespace][api_name](action.payload);
        if (!res.ok) {
          dispatch({
            type: `${actionName}_FAIL`,
            payload: res.data.Error || res.data.Message || "Unknown Error",
            error: true
          });
        } else {
          dispatch({ type: `${actionName}_SUCCESS`, payload: res.data });
        }
      } catch (err) {
        dispatch({ type: `${actionName}_FAIL`, payload: err, error: true });
      }

      done();
    }
  });
  return logic;
};

export default generateLogic;

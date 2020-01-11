import { createLogic } from "redux-logic";
import { NotificationManager } from "react-notifications";
const normalizeActionName = actionName =>
  actionName
    .toLowerCase()
    .split("/")
    .pop()
    .split("_")
    .map((a, i) => (i > 0 ? a.charAt(0).toUpperCase() + a.substring(1) : a))
    .join("");
export const generateCrudLogics = (apiNamespace, fetchAction, saveAction, updateAction, deleteAction) => {
  const api_fetch = normalizeActionName(fetchAction);
  const api_save = normalizeActionName(saveAction);
  const api_update = normalizeActionName(updateAction);
  const api_delete = normalizeActionName(deleteAction);

  const fetchLogic = createLogic({
    type: fetchAction,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        const res = await api[apiNamespace][api_fetch](action.payload);
        if (!res.ok) {
          dispatch({
            type: `${fetchAction}_FAIL`,
            payload: res.data.Error || res.data.Message || "Unknown Error",
            error: true
          });
        } else {
          dispatch({ type: `${fetchAction}_SUCCESS`, payload: res.data });
        }
      } catch (err) {
        dispatch({ type: `${fetchAction}_FAIL`, payload: err, error: true });
      }

      done();
    }
  });

  const saveLogic = createLogic({
    type: saveAction,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        const res = await api[apiNamespace][api_save](action.payload);
        if (!res.ok) {
          dispatch({
            type: `${saveAction}_FAIL`,
            payload: res.data.Error || res.data.Message || "Unknown Error",
            error: true
          });
        } else {
          dispatch({ type: `${saveAction}_SUCCESS`, payload: res.data });
          NotificationManager.success("Record saved!");
        }
      } catch (err) {
        dispatch({ type: `${saveAction}_FAIL`, payload: err, error: true });
      }

      done();
    }
  });

  const updateLogic = createLogic({
    type: updateAction,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        const res = await api[apiNamespace][api_update](action.payload);
        if (!res.ok) {
          dispatch({
            type: `${updateAction}_FAIL`,
            payload: res.data.Error || res.data.Message || "Unknown Error",
            error: true
          });
        } else {
          dispatch({ type: `${updateAction}_SUCCESS`, payload: res.data });
          NotificationManager.success("Record saved!");
        }
      } catch (err) {
        dispatch({ type: `${updateAction}_FAIL`, payload: err, error: true });
      }

      done();
    }
  });

  const deleteLogic = createLogic({
    type: deleteAction,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        const res = await api[apiNamespace][api_delete](action.payload);
        if (!res.ok) {
          dispatch({
            type: `${deleteAction}_FAIL`,
            payload: res.data.Error || res.data.Message || "Unknown Error",
            error: true
          });
        } else {
          dispatch({ type: `${deleteAction}_SUCCESS`, payload: action.payload });
          NotificationManager.success("Record deleted!");
        }
      } catch (err) {
        dispatch({ type: `${deleteAction}_FAIL`, payload: err, error: true });
      }

      done();
    }
  });

  return [fetchLogic, saveLogic, updateLogic, deleteLogic];
};

export default generateCrudLogics;

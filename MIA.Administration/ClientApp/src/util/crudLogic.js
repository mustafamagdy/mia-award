import { createLogic } from "redux-logic";
import { NotificationManager } from "react-notifications";

export const generateCrudLogics = (fetchAction, saveAction, updateAction, deleteAction) => {
  const fetchLogic = createLogic({
    type: fetchAction,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        const res = await api.lookups.fetchNews(action.payload);
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
        const res = await api.lookups.saveNews(action.payload);
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
        const res = await api.lookups.updateNews(action.payload);
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
        const res = await api.lookups.deleteNews(action.payload);
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

import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";
import { NotificationManager } from "react-notifications";

export const fetchNewsLogic = createLogic({
  type: ActionTypes.FETCH_NEWS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.fetchNews(action.payload);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_NEWS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: ActionTypes.FETCH_NEWS_SUCCESS, payload: res.data });
      }
    } catch (err) {
      dispatch({ type: ActionTypes.FETCH_NEWS_FAIL, payload: err, error: true });
    }

    done();
  }
});

export const saveNewsLogic = createLogic({
  type: ActionTypes.SAVE_NEWS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.saveNews(action.payload);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.SAVE_NEWS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: ActionTypes.SAVE_NEWS_SUCCESS, payload: res.data });
        NotificationManager.success("Record saved!");
      }
    } catch (err) {
      dispatch({ type: ActionTypes.SAVE_NEWS_FAIL, payload: err, error: true });
    }

    done();
  }
});

export const updateNewsLogic = createLogic({
  type: ActionTypes.UPDATE_NEWS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.updateNews(action.payload);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.UPDATE_NEWS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: ActionTypes.UPDATE_NEWS_SUCCESS, payload: res.data });
        NotificationManager.success("Record saved!");
      }
    } catch (err) {
      dispatch({ type: ActionTypes.UPDATE_NEWS_FAIL, payload: err, error: true });
    }

    done();
  }
});

export const deleteNewsLogic = createLogic({
  type: ActionTypes.DELETE_NEWS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.deleteNews(action.payload);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.DELETE_NEWS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: ActionTypes.DELETE_NEWS_SUCCESS, payload: action.payload });
        NotificationManager.success("Record deleted!");
      }
    } catch (err) {
      dispatch({ type: ActionTypes.DELETE_NEWS_FAIL, payload: err, error: true });
    }

    done();
  }
});

export default [fetchNewsLogic, saveNewsLogic, updateNewsLogic, deleteNewsLogic];

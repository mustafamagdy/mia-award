import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";

export const fetchNewsLogic = createLogic({
  type: ActionTypes.FETCH_NEWS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {

    console.log('fetch news logic');

    try {
      console.log('fetch news before api');
      const res = await api.lookups.fetchNews();
      console.log('fetch news after api', res);

      if (!res.ok) {
        console.log('fetch news res not ok');

        dispatch({
          type: ActionTypes.FETCH_NEWS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        console.log('fetch news res ok');

        dispatch({ type: ActionTypes.FETCH_NEWS_SUCCESS, payload: res.data });

        console.log('fetch news data received');

      }
    } catch (err) {
      dispatch({ type: ActionTypes.FETCH_NEWS_FAIL, payload: err, error: true });
    }

    done();
  }
});

export default [fetchNewsLogic];

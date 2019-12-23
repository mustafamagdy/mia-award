import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";

export const pingLogic = createLogic({
  type: ActionTypes.PING,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    var res = await api.app.ping();
    dispatch({ type: ActionTypes.PING_SUCCESS, payload: res.data });
    done();
  }
});

export default [pingLogic];

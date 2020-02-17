import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";
import { push } from "connected-react-router";

export const demoLoginLogic = createLogic({
  type: ActionTypes.DEMO_LOGIN,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.auth.login({ username: "nominee", password: "nominee@123456.com" });
      if (!res.ok) {
        dispatch({
          type: ActionTypes.LOGIN_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {

        dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: res.data });
        dispatch(push('/members'));
      }
    } catch (err) {
      dispatch({ type: ActionTypes.LOGIN_FAIL, payload: err, error: true });
    }

    done();
  }
});

export const loginLogic = createLogic({
  type: ActionTypes.LOGIN,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
     
      const res = await api.auth.login(action.loginRequest);
      console.log(res); 
      if (!res.ok) {
        dispatch({
          type: ActionTypes.LOGIN_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: res.data });
        dispatch(push('/members'));
      }
    } catch (err) {
      dispatch({ type: ActionTypes.LOGIN_FAIL, payload: err, error: true });
    }

    done();
  }
});

export const logoutLogic = createLogic({
  type: ActionTypes.LOGOUT,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      
      const token = localStorage.jwtToken;
      const res = await api.auth.logout(token);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.LOGOUT_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
        dispatch(push('/'));
      }
    } catch (err) {
      dispatch({ type: ActionTypes.LOGOUT_FAIL, payload: err, error: true });
    }

    done();
  }
});

export default [loginLogic, logoutLogic, demoLoginLogic];

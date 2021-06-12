import appActions from "./app/actions";
export const loadingBarMiddleware = store => next => action => {
  const { dispatch } = store;
  const actionName = action.type && action.type.toLowerCase();
  const done =
    actionName &&
    (actionName.endsWith("success") || actionName.endsWith("fail"));
  if (action.meta && action.meta.async) {
    dispatch(appActions.setLoading(1));
  } else if ((action.meta && action.meta.done) || done) {
    dispatch(appActions.setLoading(-1));
  }
  next(action);
};

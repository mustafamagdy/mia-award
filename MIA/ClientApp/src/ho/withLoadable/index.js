import React from "react";
import Loadable from "react-loadable";
import Loading from "./loading";
import Error from "./error";
import TimeOut from "./timeout";

import { store } from "store";
import { getAsyncInjectors } from "utils/asyncInjectors";
import { isEmpty, zip } from "ramda";

// import delay from "utils/delay";

const LoadingPlaceholder = props => {
  if (props.error) {
    return <Error {...props} />;
  } else if (props.timedOut) {
    return <TimeOut {...props} />;
  } else if (props.pastDelay) {
    return <Loading {...props} />;
  } else {
    return null;
  }
};
const defaultOptions = {
  loading: LoadingPlaceholder,
  delay: 200,
  timeout: 3000
};

export const loadComponent = ({ component }) => {
  return Loadable({
    loader: async () => {
      return component();
    },
    ...defaultOptions
  });
};

export const loadWithReducerAndLogic = ({ reducerName, component, logic, reducer }) => {
  return Loadable({
    loader: async () => {
      //testing timeout
      // await delay(Math.random() * 10000);

      const [logic_, reducer_] = await Promise.all([logic(), reducer()]);
      const { injectReducer, injectLogic } = getAsyncInjectors(store);
      injectReducer(reducerName, reducer_.reducer);
      if (!isEmpty(logic_)) {
        injectLogic(logic_.default);
        if (logic_.onLogicInit) {
          logic_.onLogicInit(store);
        }
      }
      return component();
    },
    ...defaultOptions
  });
};

export const loadWithReducersAndLogics = ({ reducerNames, component, logics, reducers }) => {
  return Loadable({
    loader: async () => {
      //testing timeout
      // await delay(Math.random() * 10000);

      const logics_ = await Promise.all([...logics.map(f => f())]);
      const reducers_ = await Promise.all([...reducers.map(f => f())]);
      const { injectReducer, injectLogic } = getAsyncInjectors(store);
      for (let i = 0; i < reducerNames.length; i++) {
        const reducerName = reducerNames[i];
        const logic = logics_[i];
        const reducer = reducers_[i];
        injectReducer(reducerName, reducer.reducer);
        if (!isEmpty(logic)) {
          injectLogic(logic.default);
          if (logic.onLogicInit) {
            logic.onLogicInit(store);
          }
        }
      }

      return component();
    },
    ...defaultOptions
  });
};

import { createReducer } from "reduxsauce";
import { produce } from "immer";

import { ActionTypes } from "./actions";

const initialState = {
  news: [],
  loading: false
};

const fetchNews = (state, action) => {
  console.log('fetch news reducer');
  
  return produce(state, draft => {
    draft.loading = true;
  });
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.news = action.payload;
    draft.loading = false;
  });
};
const fetchNewsFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_NEWS]: fetchNews,
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_NEWS_FAIL]: fetchNewsFailed
});

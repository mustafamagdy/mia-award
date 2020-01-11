import { createReducer } from "reduxsauce";
import { produce } from "immer";

import { ActionTypes } from "./actions";

const initialState = {
  news: [],
  news_metadata: {
    pageNumber: 1,
    pageSize: 10
  },
  loading: false
};

const fetchNews = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.news = action.payload.items;
    draft.news_metadata = action.payload.metadata;
    draft.loading = false;
  });
};

const fetchNewsFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const saveNews = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const saveNewsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.news.push(action.payload);
    draft.loading = false;
  });
};
const saveNewsFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const updateNews = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const updateNewsSuccess = (state, action) => {
  return produce(state, draft => {
    const index = draft.news.findIndex(a => a.id == action.payload.id);
    draft.news[index] = action.payload;
    draft.loading = false;
  });
};
const updateNewsFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const deleteNews = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const deleteNewsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.news = draft.news.filter(a => a.id != action.payload);
    draft.loading = false;
  });
};
const deleteNewsFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_NEWS]: fetchNews,
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_NEWS_FAIL]: fetchNewsFailed,
  [ActionTypes.SAVE_NEWS]: saveNews,
  [ActionTypes.SAVE_NEWS_SUCCESS]: saveNewsSuccess,
  [ActionTypes.SAVE_NEWS_FAIL]: saveNewsFailed,
  [ActionTypes.UPDATE_NEWS]: updateNews,
  [ActionTypes.UPDATE_NEWS_SUCCESS]: updateNewsSuccess,
  [ActionTypes.UPDATE_NEWS_FAIL]: updateNewsFailed,
  [ActionTypes.DELETE_NEWS]: deleteNews,
  [ActionTypes.DELETE_NEWS_SUCCESS]: deleteNewsSuccess,
  [ActionTypes.DELETE_NEWS_FAIL]: deleteNewsFailed
});
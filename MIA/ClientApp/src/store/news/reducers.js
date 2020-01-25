import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  categories: [],
  newsList: [],
  news_pagination: {}
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.newsList = [...action.payload.items];
    draft.news_pagination = { ...action.payload.metadata };
  });
};

const fetchCategoriesSuccess = (state, action) => {
  return produce(state, draft => {
    draft.categories = action.payload;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_CATEGORIES_SUCCESS]: fetchCategoriesSuccess
});

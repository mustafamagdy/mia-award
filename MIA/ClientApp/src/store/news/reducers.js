import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  categories: [],
  newsList: [],
  featuredNews: [],
  news_pagination: {},
  newsItem: {},
  commentsSuccess: undefined,
  submittingComment: false,
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.newsList = [...action.payload.items];
    draft.news_pagination = { ...action.payload.metadata };
    draft.newsItem = {};
    draft.commentsSuccess = undefined;
  });
};

const fetchFeaturedNewsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.featuredNews = [...action.payload];
  });
};

const fetchCategoriesSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.categories = action.payload;
  });
};

const fetchNewsItemSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.newsItem = action.payload;
  });
};

const postNewsComment = (state, action) => {
  return produce(state, (draft) => {
    draft.submittingComment = true;
  });
};

const postNewsCommentFailed = (state, action) => {
  return produce(state, (draft) => {
    draft.submittingComment = false;
  });
};

const postNewsCommentSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.newsItem.comments = [action.payload, ...state.newsItem.comments];
    draft.commentsSuccess = true;
    draft.submittingComment = false;
  });
};

const clearCommentSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.commentsSuccess = undefined;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_CATEGORIES_SUCCESS]: fetchCategoriesSuccess,
  [ActionTypes.FETCH_NEWS_ITEM_SUCCESS]: fetchNewsItemSuccess,
  [ActionTypes.POST_NEWS_COMMENT]: postNewsComment,
  [ActionTypes.POST_NEWS_COMMENT_SUCCESS]: postNewsCommentSuccess,
  [ActionTypes.POST_NEWS_COMMENT_FAIL]: postNewsCommentFailed,
  [ActionTypes.CLEAR_COMMENT_SUCCESS]: clearCommentSuccess,
  [ActionTypes.FETCH_FEATURED_NEWS_SUCCESS]: fetchFeaturedNewsSuccess,
});

import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  items: [],
  items_pagination: {},
  featuredItems: [],
  showReviewSuccess: undefined,
  selectedShow: {},
  submittingComment: false,
};

const fetchFeaturedItemsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.featuredItems = [...action.payload];
  });
};

const fetchItemsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.items = [...action.payload.items];
    draft.items_pagination = { ...action.payload.metadata };
  });
};

const fetchShowDetailsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.selectedShow = action.payload;
  });
};

const postShowReview = (state, action) => {
  return produce(state, (draft) => {
    draft.submittingComment = true;
  });
};
const postShowReviewFailed = (state, action) => {
  return produce(state, (draft) => {
    draft.submittingComment = false;
  });
};
const postShowReviewSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.selectedShow.reviews = [
      action.payload,
      ...state.selectedShow.reviews,
    ];
    draft.showReviewSuccess = true;
    draft.submittingComment = false;
  });
};

const clearReviewSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.showReviewSuccess = undefined;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_FEATURED_ITEMS_SUCCESS]: fetchFeaturedItemsSuccess,
  [ActionTypes.FETCH_ITEMS_SUCCESS]: fetchItemsSuccess,
  [ActionTypes.FETCH_SHOW_DETAILS_SUCCESS]: fetchShowDetailsSuccess,
  [ActionTypes.POST_SHOW_REVIEW]: postShowReview,
  [ActionTypes.POST_SHOW_REVIEW_SUCCESS]: postShowReviewSuccess,
  [ActionTypes.POST_SHOW_REVIEW_FAIL]: postShowReviewFailed,
  [ActionTypes.CLEAR_REVIEW_SUCCESS]: clearReviewSuccess,
});

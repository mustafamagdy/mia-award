import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  items: [],
  items_pagination: {},
  featuredItems: []
};

const fetchFeaturedItemsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.featuredItems = [...action.payload];
  });
};

const fetchItemsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.items = [...action.payload.items];
    draft.items_pagination = { ...action.payload.metadata };
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_FEATURED_ITEMS_SUCCESS]: fetchFeaturedItemsSuccess,
  [ActionTypes.FETCH_ITEMS_SUCCESS]: fetchItemsSuccess
});

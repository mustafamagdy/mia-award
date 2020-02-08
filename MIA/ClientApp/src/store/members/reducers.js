import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  myAwards: [],
  myArtworks: [],
  artworkDetails: undefined,
  infoStep: {}
};

const fetchMyAwardsSuccess = (state, action) => {
  return produce(state, draft => {});
};
const fetchMyArtworksSuccess = (state, action) => {
  return produce(state, draft => {});
};
const addNewArtworkSuccess = (state, action) => {
  return produce(state, draft => {});
};
const fetchArtworkWithDetailsSuccess = (state, action) => {
  return produce(state, draft => {});
};
const updateTrailerSuccess = (state, action) => {
  return produce(state, draft => {});
};
const updateCoverImageSuccess = (state, action) => {
  return produce(state, draft => {});
};
const postFileChunkSuccess = (state, action) => {
  return produce(state, draft => {});
};
const saveInfoStep = (state, action) => {
  return produce(state, draft => {
    draft.infoStep = { ...action.payload };
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.SAVE_INFO_STEP]: saveInfoStep,
  [ActionTypes.FETCH_MY_AWARDS_SUCCESS]: fetchMyAwardsSuccess,
  [ActionTypes.FETCH_MY_ARTWORKS_SUCCESS]: fetchMyArtworksSuccess,
  [ActionTypes.ADD_NEW_ARTWORK_SUCCESS]: addNewArtworkSuccess,
  [ActionTypes.FETCH_ARTWORK_WITH_DETAILS_SUCCESS]: fetchArtworkWithDetailsSuccess,
  [ActionTypes.UPDATE_TRAILER_SUCCESS]: updateTrailerSuccess,
  [ActionTypes.UPDATE_COVER_IMAGE_SUCCESS]: updateCoverImageSuccess,
  [ActionTypes.POST_FILE_CHUNK_SUCCESS]: postFileChunkSuccess
});

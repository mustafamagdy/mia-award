import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  myAwards: [],
  myAwardsLoaded: false,
  myArtworks: [],
  myArtworksLoaded: false,
  artworkDetails: undefined,
  artworkMode: "add" //add, view, edit
};

const fetchMyAwardsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.myAwardsLoaded = true;
    draft.myAwards = [...action.payload];
  });
};
const fetchMyArtworksSuccess = (state, action) => {
  return produce(state, draft => { 
    draft.myArtworksLoaded = true;
    draft.myArtworks = [...action.payload];
  });
};
const addNewArtworkSuccess = (state, action) => {
  return produce(state, draft => {
    draft.artworkDetails = { ...action.payload };
    draft.myArtworks = [...state.myArtworks, action.payload];
    draft.artworkMode = "view";
  });
};
const saveArtworkInfoSuccess = (state, action) => {
  return produce(state, draft => { });
};
const fetchArtworkWithDetailsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.artworkDetails = { ...action.payload };
    draft.myArtworks = [...state.myArtworks, action.payload];
  });
};
const updateTrailerSuccess = (state, action) => {
  return produce(state, draft => { });
};
const updateCoverImageSuccess = (state, action) => {
  return produce(state, draft => { });
};
const postFileChunkSuccess = (state, action) => {
  return produce(state, draft => { });
};
const editArtwork = (state, action) => {
  return produce(state, draft => {
    draft.artworkMode = "edit";
  });
};
const switchToView = (state, action) => {
  return produce(state, draft => {
    draft.artworkMode = "view";
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_MY_AWARDS_SUCCESS]: fetchMyAwardsSuccess,
  [ActionTypes.FETCH_MY_ARTWORKS_SUCCESS]: fetchMyArtworksSuccess,
  [ActionTypes.ADD_NEW_ARTWORK_SUCCESS]: addNewArtworkSuccess,
  [ActionTypes.SAVE_ARTWORK_INFO_SUCCESS]: saveArtworkInfoSuccess,
  [ActionTypes.FETCH_ARTWORK_WITH_DETAILS_SUCCESS]: fetchArtworkWithDetailsSuccess,
  [ActionTypes.UPDATE_TRAILER_SUCCESS]: updateTrailerSuccess,
  [ActionTypes.UPDATE_COVER_IMAGE_SUCCESS]: updateCoverImageSuccess,
  [ActionTypes.POST_FILE_CHUNK_SUCCESS]: postFileChunkSuccess,
  [ActionTypes.EDIT_ARTWORK]: editArtwork,
  [ActionTypes.SWITCH_TO_VIEW]: switchToView
});

import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  myAwards: [],
  myAwardsLoaded: false,
  myArtworks: [],
  myArtworksLoaded: false,
  artwork: undefined,
  artworkMode: "add", //add, view, edit
  myContestants: [],
  submitting: false,
};

const resetAll = (state, action) => {
  return produce(state, (draft) => {
    draft.myAwards = [];
    draft.myAwardsLoaded = false;
    draft.myArtworks = [];
    draft.myArtworksLoaded = false;
    draft.artwork = undefined;
    draft.artworkMode = "add";
    draft.myContestants = [];
    draft.submitting = false;
  });
};

const fetchMyAwardsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.myAwardsLoaded = true;
    draft.myAwards = [...action.payload];
  });
};
const fetchMyArtworksSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.myArtworksLoaded = true;
    const artworks = action.payload.filter((a) => a.awardType == "artwork");
    const contestants = action.payload.filter((a) => a.awardType == "person");

    draft.myArtworks = [...artworks];
    draft.myContestants = [...contestants];
  });
};
const addNewArtwork = (state, action) => {
  return produce(state, (draft) => {
    draft.submitting = true;
  });
};

const addNewArtworkSuccess = (state, action) => {
  return produce(state, (draft) => {
    if (action.payload.awardType == "person") {
      draft.contestant = { ...action.payload };
      draft.myContestants = [...state.myContestants, action.payload];
      draft.artworkMode = "view";
      draft.submitting = false;
    } else {
      draft.artwork = { ...action.payload };
      draft.myArtworks = [...state.myArtworks, action.payload];
      draft.artworkMode = "view";
      draft.submitting = false;
    }
  });
};
const saveArtworkInfoSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.artworkMode = "view";
    draft.artwork = { ...action.payload };
    draft.submitting = false;
  });
};
const fetchArtworkWithDetailsSuccess = (state, action) => {
  return produce(state, (draft) => {
    if (action.payload.awardType == "person") {
      draft.artwork = { ...action.payload };
      const indx = state.myContestants.findIndex(
        (a) => a.id == action.payload.id
      );
      if (indx == -1) {
        draft.myContestants = [...state.myContestants, action.payload];
      } else {
        draft.myContestants[indx] = action.payload;
      }
    } else {
      draft.artwork = { ...action.payload };
      const indx = state.myArtworks.findIndex((a) => a.id == action.payload.id);
      if (indx == -1) {
        draft.myArtworks = [...state.myArtworks, action.payload];
      } else {
        draft.myArtworks[indx] = action.payload;
      }
    }
  });
};
const updateTrailerSuccess = (state, action) => {
  return produce(state, (draft) => {});
};
const updateCoverImageSuccess = (state, action) => {
  return produce(state, (draft) => {});
};

const updatePosterImageSuccess = (state, action) => {
  return produce(state, (draft) => {});
};

const postFileChunkSuccess = (state, action) => {
  return produce(state, (draft) => {});
};
const editArtwork = (state, action) => {
  return produce(state, (draft) => {
    draft.artworkMode = "edit";
  });
};
const switchToView = (state, action) => {
  return produce(state, (draft) => {
    draft.artworkMode = "view";
  });
};
const publishArtwork = (state, action) => {
  return produce(state, (draft) => {});
};
const publishArtworkSuccess = (state, action) => {
  return produce(state, (draft) => {});
};
const removeFileSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.artwork.files = state.artwork.files.filter(
      (a) => a.id != action.payload
    );
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.RESET]: resetAll,
  [ActionTypes.FETCH_MY_AWARDS_SUCCESS]: fetchMyAwardsSuccess,
  [ActionTypes.FETCH_MY_ARTWORKS_SUCCESS]: fetchMyArtworksSuccess,
  [ActionTypes.ADD_NEW_ARTWORK]: addNewArtwork,
  [ActionTypes.ADD_NEW_ARTWORK_SUCCESS]: addNewArtworkSuccess,
  [ActionTypes.SAVE_ARTWORK_INFO_SUCCESS]: saveArtworkInfoSuccess,
  [ActionTypes.FETCH_ARTWORK_WITH_DETAILS_SUCCESS]: fetchArtworkWithDetailsSuccess,
  [ActionTypes.UPDATE_TRAILER_SUCCESS]: updateTrailerSuccess,
  [ActionTypes.UPDATE_COVER_IMAGE_SUCCESS]: updateCoverImageSuccess,
  [ActionTypes.UPDATE_POSTER_IMAGE_SUCCESS]: updatePosterImageSuccess,
  [ActionTypes.POST_FILE_CHUNK_SUCCESS]: postFileChunkSuccess,
  [ActionTypes.EDIT_ARTWORK]: editArtwork,
  [ActionTypes.SWITCH_TO_VIEW]: switchToView,
  [ActionTypes.PUBLISH_ARTWORK]: publishArtwork,
  [ActionTypes.PUBLISH_ARTWORK_SUCCESS]: publishArtworkSuccess,
  [ActionTypes.REMOVE_ARTWORK_FILE_SUCCESS]: removeFileSuccess,
});

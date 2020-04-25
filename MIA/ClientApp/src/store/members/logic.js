import { ActionTypes } from "./actions";
import logic from "utils/genLogic";
import { push } from "connected-react-router";

const apiNamespace = "members";
const fetchMyAwardsLogic = logic(apiNamespace, ActionTypes.FETCH_MY_AWARDS);
const fetchMyArtworksLogic = logic(apiNamespace, ActionTypes.FETCH_MY_ARTWORKS);
const saveArtworkInfoLogic = logic(apiNamespace, ActionTypes.SAVE_ARTWORK_INFO, (dispatch, res) => {
  dispatch(push(`/members/artwork/${res.id}`));
});
const addNewArtworkLogic = logic(apiNamespace, ActionTypes.ADD_NEW_ARTWORK, (dispatch, res) => {
  dispatch(push(`/members/artwork/${res.id}`));
});
const fetchArtworkWithDetailsLogic = logic(apiNamespace, ActionTypes.FETCH_ARTWORK_WITH_DETAILS);
const updateTrailerLogic = logic(apiNamespace, ActionTypes.UPDATE_TRAILER);
const updateCoverImageLogic = logic(apiNamespace, ActionTypes.UPDATE_COVER_IMAGE);
const postFileChunkLogic = logic(apiNamespace, ActionTypes.POST_FILE_CHUNK);
const publishArtworkLogic = logic(apiNamespace, ActionTypes.PUBLISH_ARTWORK);

export default [
  fetchMyAwardsLogic,
  fetchMyArtworksLogic,
  addNewArtworkLogic,
  saveArtworkInfoLogic,
  fetchArtworkWithDetailsLogic,
  updateTrailerLogic,
  updateCoverImageLogic,
  postFileChunkLogic,
  publishArtworkLogic
];

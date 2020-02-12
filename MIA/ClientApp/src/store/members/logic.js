import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";
import { push } from "connected-react-router";

const apiNamespace = "members";
const fetchMyAwardsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_MY_AWARDS);
const fetchMyArtworksLogic = generateLogic(apiNamespace, ActionTypes.FETCH_MY_ARTWORKS);
const saveArtworkInfoLogic = generateLogic(apiNamespace, ActionTypes.SAVE_ARTWORK_INFO, (dispatch, res) => {
  dispatch(push(`/members/artwork/${res.id}`));
});
const addNewArtworkLogic = generateLogic(apiNamespace, ActionTypes.ADD_NEW_ARTWORK, (dispatch, res) => {
  dispatch(push(`/members/artwork/${res.id}`));
});
const fetchArtworkWithDetailsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_ARTWORK_WITH_DETAILS);
const updateTrailerLogic = generateLogic(apiNamespace, ActionTypes.UPDATE_TRAILER);
const updateCoverImageLogic = generateLogic(apiNamespace, ActionTypes.UPDATE_COVER_IMAGE);
const postFileChunkLogic = generateLogic(apiNamespace, ActionTypes.POST_FILE_CHUNK);

export default [
  fetchMyAwardsLogic,
  fetchMyArtworksLogic,
  addNewArtworkLogic,
  saveArtworkInfoLogic,
  fetchArtworkWithDetailsLogic,
  updateTrailerLogic,
  updateCoverImageLogic,
  postFileChunkLogic
];

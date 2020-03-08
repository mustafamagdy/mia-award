import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "home";
const fetchMainAlbumLogic = generateLogic(apiNamespace, ActionTypes.FETCH_MAIN_ALBUM);
const fetchMetadataLogic = generateLogic(apiNamespace, ActionTypes.FETCH_METADATA);
const fetchNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS);
const fetchTimelineLogic = generateLogic(apiNamespace, ActionTypes.FETCH_TIMELINE);
const fetchBoothsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_BOOTHS);
const fetchAwardsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_AWARDS);
const fetchRecentShowsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_RECENT_SHOWS);
const sendContactUsMessageLogic = generateLogic(apiNamespace, ActionTypes.SEND_CONTACT_US_MESSAGE);
const bookBoothLogic = generateLogic(apiNamespace, ActionTypes.BOOK_BOOTH, (dispatch, res) => {
  //update booth list again
  dispatch(ActionTypes.FETCH_BOOTHS);
});

export default [
  fetchMetadataLogic,
  fetchMainAlbumLogic,
  fetchNewsLogic,
  fetchTimelineLogic,
  fetchBoothsLogic,
  fetchAwardsLogic,
  fetchRecentShowsLogic,
  sendContactUsMessageLogic,
  bookBoothLogic
];

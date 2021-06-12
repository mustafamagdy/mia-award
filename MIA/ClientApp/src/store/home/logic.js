import { ActionTypes } from "./actions";
import logic from "utils/genLogic";

const apiNamespace = "home";
const fetchMainAlbumLogic = logic(apiNamespace, ActionTypes.FETCH_MAIN_ALBUM);
const fetchOptionsLogic = logic(apiNamespace, ActionTypes.FETCH_OPTIONS);
const fetchMetadataLogic = logic(apiNamespace, ActionTypes.FETCH_METADATA);
const fetchNewsLogic = logic(apiNamespace, ActionTypes.FETCH_NEWS);
const fetchTimelineLogic = logic(apiNamespace, ActionTypes.FETCH_TIMELINE);
const fetchSponsersLogic = logic(apiNamespace, ActionTypes.FETCH_SPONSERS);
const fetchBoothsLogic = logic(apiNamespace, ActionTypes.FETCH_BOOTHS);
const fetchAwardsLogic = logic(apiNamespace, ActionTypes.FETCH_AWARDS);
const fetchRecentShowsLogic = logic(apiNamespace, ActionTypes.FETCH_RECENT_SHOWS);
const sendContactUsMessageLogic = logic(apiNamespace, ActionTypes.SEND_CONTACT_US_MESSAGE);
const bookBoothLogic = logic(apiNamespace, ActionTypes.BOOK_BOOTH, (dispatch, res) => {
  //update booth list again
  dispatch(ActionTypes.fetchBooths());
});
const sendNewsletterLogic = logic(apiNamespace, ActionTypes.SEND_NEWSLETTER);

export default [
  fetchOptionsLogic,
  fetchMetadataLogic,
  fetchMainAlbumLogic,
  fetchNewsLogic,
  fetchTimelineLogic,
  fetchSponsersLogic,
  fetchBoothsLogic,
  fetchAwardsLogic,
  fetchRecentShowsLogic,
  sendContactUsMessageLogic,
  bookBoothLogic,
  sendNewsletterLogic
];

import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "home";
const fetchNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS);
const fetchTimelineLogic = generateLogic(apiNamespace, ActionTypes.FETCH_TIMELINE);
const fetchAwardsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_AWARDS);
const fetchRecentShowsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_RECENT_SHOWS);
const fetchContactUsMessageSubjectsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_CONTACT_US_MESSAGE_SUBJECTS);
const sendContactUsMessageLogic = generateLogic(apiNamespace, ActionTypes.SEND_CONTACT_US_MESSAGE);

export default [
  fetchNewsLogic,
  fetchTimelineLogic,
  fetchAwardsLogic,
  fetchRecentShowsLogic,
  fetchContactUsMessageSubjectsLogic,
  sendContactUsMessageLogic
];

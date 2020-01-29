import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "home";
const fetchNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS);
const fetchRecentShowsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_RECENT_SHOWS);
const fetchContactUsMessageSubjectsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_CONTACT_US_MESSAGE_SUBJECTS);

export default [fetchNewsLogic, fetchRecentShowsLogic, fetchContactUsMessageSubjectsLogic];

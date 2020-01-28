import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "home";
// const fetchNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS);
const contactUsMessageSubjectsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_CONTACT_US_MESSAGE_SUBJECTS);

export default [contactUsMessageSubjectsLogic]; //[fetchNewsLogic];

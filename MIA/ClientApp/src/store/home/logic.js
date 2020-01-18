import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "home";
const fetchNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS);

export default [fetchNewsLogic];

import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "news";
const fetchCategoriesLogic = generateLogic(apiNamespace, ActionTypes.FETCH_CATEGORIES);
const fetchNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS);

export default [fetchNewsLogic, fetchCategoriesLogic];

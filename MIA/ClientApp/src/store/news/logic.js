import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "news";
const fetchCategoriesLogic = generateLogic(apiNamespace, ActionTypes.FETCH_CATEGORIES);
const fetchFeaturedNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_FEATURED_NEWS);
const fetchNewsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS);
const fetchNewsItemLogic = generateLogic(apiNamespace, ActionTypes.FETCH_NEWS_ITEM);
const postNewsCommentLogic = generateLogic(apiNamespace, ActionTypes.POST_NEWS_COMMENT);

export default [fetchNewsLogic, fetchFeaturedNewsLogic, fetchCategoriesLogic, fetchNewsItemLogic, postNewsCommentLogic];

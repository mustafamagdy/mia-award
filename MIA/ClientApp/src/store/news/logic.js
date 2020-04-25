import { ActionTypes } from "./actions";
import logic from "utils/genLogic";

const apiNamespace = "news";
const fetchCategoriesLogic = logic(apiNamespace, ActionTypes.FETCH_CATEGORIES);
const fetchFeaturedNewsLogic = logic(apiNamespace, ActionTypes.FETCH_FEATURED_NEWS);
const fetchNewsLogic = logic(apiNamespace, ActionTypes.FETCH_NEWS);
const fetchNewsItemLogic = logic(apiNamespace, ActionTypes.FETCH_NEWS_ITEM);
const postNewsCommentLogic = logic(apiNamespace, ActionTypes.POST_NEWS_COMMENT);

export default [fetchNewsLogic, fetchFeaturedNewsLogic, fetchCategoriesLogic, fetchNewsItemLogic, postNewsCommentLogic];

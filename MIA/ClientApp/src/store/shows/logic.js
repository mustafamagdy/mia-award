import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "shows";
const fetchFeaturedItemsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_FEATURED_ITEMS);
const fetchItemsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_ITEMS);
const fetchShowDetails = generateLogic(apiNamespace, ActionTypes.FETCH_SHOW_DETAILS);
const postShowReview = generateLogic(apiNamespace, ActionTypes.POST_SHOW_REVIEW);

export default [fetchFeaturedItemsLogic, fetchItemsLogic, fetchShowDetails, postShowReview];

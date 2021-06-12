import { ActionTypes } from "./actions";
import logic from "utils/genLogic";

const apiNamespace = "shows";
const fetchFeaturedItemsLogic = logic(apiNamespace, ActionTypes.FETCH_FEATURED_ITEMS);
const fetchItemsLogic = logic(apiNamespace, ActionTypes.FETCH_ITEMS);
const fetchShowDetails = logic(apiNamespace, ActionTypes.FETCH_SHOW_DETAILS);
const postShowReview = logic(apiNamespace, ActionTypes.POST_SHOW_REVIEW);

export default [fetchFeaturedItemsLogic, fetchItemsLogic, fetchShowDetails, postShowReview];

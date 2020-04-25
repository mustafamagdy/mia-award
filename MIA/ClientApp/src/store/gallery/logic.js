import { ActionTypes } from "./actions";
import logic from "utils/genLogic";

const apiNamespace = "gallery";
const fetchFeaturedItemsLogic = logic(apiNamespace, ActionTypes.FETCH_FEATURED_ITEMS);
const fetchItemsLogic = logic(apiNamespace, ActionTypes.FETCH_ITEMS);

export default [fetchFeaturedItemsLogic, fetchItemsLogic];

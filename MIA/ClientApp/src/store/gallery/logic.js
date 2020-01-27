import { ActionTypes } from "./actions";
import generateLogic from "utils/genLogic";

const apiNamespace = "gallery";
const fetchFeaturedItemsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_FEATURED_ITEMS);
const fetchItemsLogic = generateLogic(apiNamespace, ActionTypes.FETCH_ITEMS);

export default [fetchFeaturedItemsLogic, fetchItemsLogic];

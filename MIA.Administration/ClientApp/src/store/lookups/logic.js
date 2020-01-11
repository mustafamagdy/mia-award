import { ActionTypes } from "./actions";
import generateCrudLogics from "Util/crudLogic";

const [fetchNewsLogic, saveNewsLogic, updateNewsLogic, deleteNewsLogic] = generateCrudLogics(
  "lookups",
  ActionTypes.FETCH_NEWS,
  ActionTypes.SAVE_NEWS,
  ActionTypes.UPDATE_NEWS,
  ActionTypes.DELETE_NEWS
);

export default [fetchNewsLogic, saveNewsLogic, updateNewsLogic, deleteNewsLogic];

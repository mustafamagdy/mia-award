import { ActionTypes } from "./actions";
import generateCrudLogics from "Util/crudLogic";

const [fetchBoothLogic, saveBoothLogic, updateBoothLogic, deleteBoothLogic] = generateCrudLogics(
  "booths",
  ActionTypes.FETCH_BOOTH,
  ActionTypes.SAVE_BOOTH,
  ActionTypes.UPDATE_BOOTH,
  ActionTypes.DELETE_BOOTH
);

export default [fetchBoothLogic, saveBoothLogic, updateBoothLogic, deleteBoothLogic];

import { ActionTypes } from "./actions";
import generateCrudLogics from "Util/crudLogic";

const [fetchVotingCriteriaLogic, saveVotingCriteriaLogic, updateVotingCriteriaLogic, deleteVotingCriteriaLogic] = generateCrudLogics(
  "votingCriteria",
  ActionTypes.FETCH_VOTING_CRITERIAS,
  ActionTypes.SAVE_VOTING_CRITERIA,
  ActionTypes.UPDATE_VOTING_CRITERIA,
  ActionTypes.DELETE_VOTING_CRITERIA
);

export default [fetchVotingCriteriaLogic, saveVotingCriteriaLogic, updateVotingCriteriaLogic, deleteVotingCriteriaLogic];

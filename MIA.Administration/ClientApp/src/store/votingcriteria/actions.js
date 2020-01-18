import { createActions } from "Util/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchVotingCriterias: { args: ["payload"], meta: { async: true } },
    saveVotingCriteria: { args: ["payload"], meta: { async: true } },
    updateVotingCriteria: { args: ["payload"], meta: { async: true } },
    deleteVotingCriteria: { args: ["payload"], meta: { async: true } }
  },
  {
    prefix: "@app/votingCriteria/"
  }
);
export const ActionTypes = Types;
export default Creators;

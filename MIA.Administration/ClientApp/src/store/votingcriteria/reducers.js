import { createReducer } from "reduxsauce";
import { produce } from "immer";

import { ActionTypes } from "./actions";

const initialState = {
  votingcriteriaList: [],
  votingcriteria_metadata: {
    pageNumber: 1,
    pageSize: 10
  },
  loading: false
};

const fetchVotingCriterias = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const fetchVotingCriteriaSuccess = (state, action) => {
  return produce(state, draft => {
    draft.votingcriteriaList = action.payload.items;
    draft.votingcriteria_metadata = action.payload.metadata;
    draft.loading = false;
  });
};

const fetchVotingCriteriaFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const saveVotingCriteria = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const saveVotingCriteriaSuccess = (state, action) => {
  return produce(state, draft => {
    draft.votingcriteriaList.push(action.payload);
    draft.loading = false;
  });
};
const saveVotingCriteriaFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const updateVotingCriteria = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const updateVotingCriteriaSuccess = (state, action) => {
  return produce(state, draft => {
    const index = draft.votingcriteriaList.findIndex(a => a.id == action.payload.id);
    draft.votingcriteriaList[index] = action.payload;
    draft.loading = false;
  });
};
const updateVotingCriteriaFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const deleteVotingCriteria = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const deleteVotingCriteriaSuccess = (state, action) => {
  return produce(state, draft => {
    draft.votingcriteriaList = draft.votingcriteriaList.filter(a => a.id != action.payload);
    draft.loading = false;
  });
};
const deleteVotingCriteriaFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};
//no

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_VOTING_CRITERIAS]: fetchVotingCriterias,
  [ActionTypes.FETCH_VOTING_CRITERIAS_SUCCESS]: fetchVotingCriteriaSuccess,
  [ActionTypes.FETCH_VOTING_CRITERIAS_FAIL]: fetchVotingCriteriaFailed,
  [ActionTypes.SAVE_VOTING_CRITERIA]: saveVotingCriteria,
  [ActionTypes.SAVE_VOTING_CRITERIA_SUCCESS]: saveVotingCriteriaSuccess,
  [ActionTypes.SAVE_VOTING_CRITERIA_FAIL]: saveVotingCriteriaFailed,
  [ActionTypes.UPDATE_VOTING_CRITERIA]: updateVotingCriteria,
  [ActionTypes.UPDATE_VOTING_CRITERIA_SUCCESS]: updateVotingCriteriaSuccess,
  [ActionTypes.UPDATE_VOTING_CRITERIA_FAIL]: updateVotingCriteriaFailed,
  [ActionTypes.DELETE_VOTING_CRITERIA]: deleteVotingCriteria,
  [ActionTypes.DELETE_VOTING_CRITERIA_SUCCESS]: deleteVotingCriteriaSuccess,
  [ActionTypes.DELETE_VOTING_CRITERIA_FAIL]: deleteVotingCriteriaFailed
});   
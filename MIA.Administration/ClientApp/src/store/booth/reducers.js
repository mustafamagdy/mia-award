import { createReducer } from "reduxsauce";
import { produce } from "immer";

import { ActionTypes } from "./actions";

const initialState = {
  boothList: [],
  booth_metadata: {
    pageNumber: 1,
    pageSize: 10
  },
  loading: false
};

const fetchBooth = (state, action) => {
  debugger;
  return produce(state, draft => {
    draft.loading = true;
  });
};

const fetchBoothSuccess = (state, action) => {
  return produce(state, draft => {
    draft.boothList = action.payload.items;
    draft.booth_metadata = action.payload.metadata;
    draft.loading = false;
  });
};

const fetchBoothFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const saveBooth = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const saveBoothSuccess = (state, action) => {
  return produce(state, draft => {
    draft.boothList.push(action.payload);
    draft.loading = false;
  });
};
const saveBoothFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const updateBooth = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const updateBoothSuccess = (state, action) => {
  return produce(state, draft => {
    const index = draft.boothList.findIndex(a => a.id == action.payload.id);
    draft.boothList[index] = action.payload;
    draft.loading = false;
  });
};
const updateBoothFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const deleteBooth = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const deleteBoothSuccess = (state, action) => {
  return produce(state, draft => {
    draft.boothList = draft.boothList.filter(a => a.id != action.payload);
    draft.loading = false;
  });
};
const deleteBoothFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_BOOTH]: fetchBooth,
  [ActionTypes.FETCH_BOOTH_SUCCESS]: fetchBoothSuccess,
  [ActionTypes.FETCH_BOOTH_FAIL]: fetchBoothFailed,
  [ActionTypes.SAVE_BOOTH]: saveBooth,
  [ActionTypes.SAVE_BOOTH_SUCCESS]: saveBoothSuccess,
  [ActionTypes.SAVE_BOOTH_FAIL]: saveBoothFailed,
  [ActionTypes.UPDATE_BOOTH]: updateBooth,
  [ActionTypes.UPDATE_BOOTH_SUCCESS]: updateBoothSuccess,
  [ActionTypes.UPDATE_BOOTH_FAIL]: updateBoothFailed,
  [ActionTypes.DELETE_BOOTH]: deleteBooth,
  [ActionTypes.DELETE_BOOTH_SUCCESS]: deleteBoothSuccess,
  [ActionTypes.DELETE_BOOTH_FAIL]: deleteBoothFailed
});
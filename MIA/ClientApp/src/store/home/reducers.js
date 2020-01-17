import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  news: [],
  awards: [],
  sponsers: [],
  albumContents: [],
  recentShows: []
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchNewsFailed = (state, action) => {
  return produce(state, draft => {});
};

const fetchAwardsSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchAwardsFailed = (state, action) => {
  return produce(state, draft => {});
};

const fetchSponsersSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchSponsersFailed = (state, action) => {
  return produce(state, draft => {});
};

const fetchLatestAlbumContentSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchLatestAlbumContentFailed = (state, action) => {
  return produce(state, draft => {});
};

const fetchRecentShowsSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchRecentShowsFailed = (state, action) => {
  return produce(state, draft => {});
};

const searchForShow = (state, action) => {
  return produce(state, draft => {});
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_NEWS_FAIL]: fetchNewsFailed,
  [ActionTypes.FETCH_AWARDS_SUCCESS]: fetchAwardsSuccess,
  [ActionTypes.FETCH_AWARDS_FAIL]: fetchAwardsFailed,
  [ActionTypes.FETCH_SPONSERS_SUCCESS]: fetchSponsersSuccess,
  [ActionTypes.FETCH_SPONSERS_FAIL]: fetchSponsersFailed,
  [ActionTypes.FETCH_LATEST_ALBUM_CONTENTS_SUCCESS]: fetchLatestAlbumContentSuccess,
  [ActionTypes.FETCH_LATEST_ALBUM_CONTENTS_FAIL]: fetchLatestAlbumContentFailed,
  [ActionTypes.FETCH_RECENT_SHOWS_SUCCESS]: fetchRecentShowsSuccess,
  [ActionTypes.FETCH_RECENT_SHOWS_FAIL]: fetchRecentShowsFailed,
  [ActionTypes.SEARCH_FOR_SHOW]: searchForShow
});

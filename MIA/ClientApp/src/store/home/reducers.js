import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  contactUsMessageSubjects: [],
  news: [],
  awards: [],
  sponsers: [],
  timeline: [],
  booths: [],
  mainAlbum: {},
  recentShows: [],
  recentShows_pagination: {
    pageCount: 1,
    hasNextPage: false,
    hasPreviousPage: false
  },
  shows_categories: [],
  shows_countries: [],
  shows_generas: [],
  shows_years: [],
  contactUsSuccess: false,
  contactUsFailed: false
};

const fetchBoothsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.booths = [...action.payload];
  });
};

const fetchTimelineSuccess = (state, action) => {
  return produce(state, draft => {
    draft.timeline = [...action.payload];
  });
};

const sendContactUsMessageSuccess = (state, action) => {
  return produce(state, draft => {
    draft.contactUsSuccess = true;
    draft.contactUsFailed = false;
  });
};
const sendContactUsMessageFailed = (state, action) => {
  return produce(state, draft => {
    draft.contactUsFailed = true;
  });
};

const fetchMainAlbumSuccess = (state, action) => {
  return produce(state, draft => {
    draft.mainAlbum = { ...action.payload };
  });
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.news = [...action.payload, ...action.payload];
  });
};

const fetchRecentShowsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.recentShows = [...action.payload.items];
    draft.recentShows_pagination = {
      pageCount: action.payload.metadata.pageCount,
      hasNextPage: action.payload.metadata.hasNextPage,
      hasPreviousPage: action.payload.metadata.hasPreviousPage
    };
  });
};

const fetchAwardsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.awards = [...action.payload];
  });
};

const contactUsMessageSubjectsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.contactUsMessageSubjects = [...action.payload];
  });
};

const fetchSponsersSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchLatestmainAlbumuccess = (state, action) => {
  return produce(state, draft => {});
};

const bookBoothSuccess = (state, action) => {
  return produce(state, draft => {
    draft.boothBooked = true;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_MAIN_ALBUM_SUCCESS]: fetchMainAlbumSuccess,
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_TIMELINE_SUCCESS]: fetchTimelineSuccess,
  [ActionTypes.FETCH_BOOTHS_SUCCESS]: fetchBoothsSuccess,
  [ActionTypes.FETCH_RECENT_SHOWS_SUCCESS]: fetchRecentShowsSuccess,
  [ActionTypes.FETCH_CONTACT_US_MESSAGE_SUBJECTS_SUCCESS]: contactUsMessageSubjectsSuccess,
  [ActionTypes.FETCH_AWARDS_SUCCESS]: fetchAwardsSuccess,
  [ActionTypes.FETCH_SPONSERS_SUCCESS]: fetchSponsersSuccess,
  [ActionTypes.FETCH_LATEST_ALBUM_CONTENTS_SUCCESS]: fetchLatestmainAlbumuccess,
  [ActionTypes.SEND_CONTACT_US_MESSAGE_SUCCESS]: sendContactUsMessageSuccess,
  [ActionTypes.SEND_CONTACT_US_MESSAGE_FAIL]: sendContactUsMessageFailed,
  [ActionTypes.BOOK_BOOTH_SUCCESS]: bookBoothSuccess
});

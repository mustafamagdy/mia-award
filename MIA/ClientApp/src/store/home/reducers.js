import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  contactUsMessageSubjects: [],
  news: [],
  news_pagination: {
    hasNextPage: false,
    hasPreviousPage: false
  },
  awards: [],
  sponsers: [],
  albumContents: [],
  recentShows: []
};

const _news = [
  {
    id: "1",
    date: "15-01-2020",
    category: "sports",
    posterUrl: "/assets/images/news_image_1.png",
    title: "And Mo Salah Makes football history for real"
  },
  {
    id: "2",
    date: "15-01-2020",
    category: "media",
    posterUrl: "/assets/images/news_image_2.jpg",
    title: "And Mo Salah Makes football history for real"
  },
  {
    id: "3",
    date: "15-01-2020",
    category: "sports",
    posterUrl: "/assets/images/news_image_1.png",
    title: "And Mo Salah Makes football history for real"
  },
  {
    id: "4",
    date: "15-01-2020",
    category: "media",
    posterUrl: "/assets/images/news_image_2.jpg",
    title: "And Mo Salah Makes football history for real"
  },
  {
    id: "5",
    date: "15-01-2020",
    category: "sports",
    posterUrl: "/assets/images/news_image_1.png",
    title: "And Mo Salah Makes football history for real"
  },
  {
    id: "6",
    date: "15-01-2020",
    category: "media",
    posterUrl: "/assets/images/news_image_2.jpg",
    title: "And Mo Salah Makes football history for real"
  }
];
const fetchNews = (state, action) => {
  return produce(state, draft => {
    draft.news = _news;
    draft.news_pagination = {
      hasNextPage: true,
      hasPreviousPage: true
    };
  });
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.news = _news; //[...action.payload.items];
    draft.news_pagination = {
      hasNextPage: action.payload.metadata.hasNextPage,
      hasPreviousPage: action.payload.metadata.hasPreviousPage
    };
  });
};

const fetchAwardsSuccess = (state, action) => {
  return produce(state, draft => {});
};

const contactUsMessageSubjectsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.contactUsMessageSubjects = [...action.payload];
  });
};

const fetchSponsersSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchLatestAlbumContentSuccess = (state, action) => {
  return produce(state, draft => {});
};

const fetchRecentShowsSuccess = (state, action) => {
  return produce(state, draft => {});
};
const searchForShow = (state, action) => {
  return produce(state, draft => {});
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_NEWS]: fetchNews,
  [ActionTypes.FETCH_CONTACT_US_MESSAGE_SUBJECTS_SUCCESS]: contactUsMessageSubjectsSuccess,
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_AWARDS_SUCCESS]: fetchAwardsSuccess,
  [ActionTypes.FETCH_SPONSERS_SUCCESS]: fetchSponsersSuccess,
  [ActionTypes.FETCH_LATEST_ALBUM_CONTENTS_SUCCESS]: fetchLatestAlbumContentSuccess,
  [ActionTypes.FETCH_RECENT_SHOWS_SUCCESS]: fetchRecentShowsSuccess,
  [ActionTypes.SEARCH_FOR_SHOW]: searchForShow
});

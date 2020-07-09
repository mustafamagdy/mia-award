import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  options: {},
  news: [],
  awards: [],
  sponsers: [],
  timeline: [],
  booths: [],
  mainAlbum: {
    /*
    title: {en,ar}
    items: []
     */
  },
  recentShows: [],
  recentShows_pagination: {
    pageCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  contactUsMessageSubjects: [],
  shows_countries: [],
  genres: [],
  artworkSubjectRoles: [],
  shows_years: [],
  contactUsSuccess: false,
  contactUsFailed: false,
  newsLetterSuccess: undefined,
  newsLetterSubmitting: false,
  boothSubmitting: false,
  contactUsSubmitting: false,
};

const fetchBoothsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.booths = [...action.payload];
  });
};

const fetchTimelineSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.timeline = [...action.payload];
  });
};

const fetchSponsersSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.sponsers = [...action.payload];
  });
};

const sendContactUsMessage = (state, action) => {
  return produce(state, (draft) => {
    draft.contactUsSubmitting = true;
  });
};
const sendContactUsMessageSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.contactUsSubmitting = false;
    draft.contactUsSuccess = true;
    draft.contactUsFailed = false;
  });
};
const sendContactUsMessageFailed = (state, action) => {
  return produce(state, (draft) => {
    draft.contactUsSubmitting = false;
    draft.contactUsFailed = true;
  });
};

const fetchMainAlbumSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.mainAlbum = { ...action.payload };
  });
};

const fetchNewsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.news = [...action.payload, ...action.payload];
  });
};

const fetchRecentShowsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.recentShows = [...action.payload.items];
    draft.recentShows_pagination = {
      pageCount: action.payload.metadata.pageCount,
      hasNextPage: action.payload.metadata.hasNextPage,
      hasPreviousPage: action.payload.metadata.hasPreviousPage,
    };
  });
};

const fetchAwardsSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.awards = [...action.payload];
  });
};

const fetchLatestmainAlbumuccess = (state, action) => {
  return produce(state, (draft) => {});
};

const bookBooth = (state, action) => {
  return produce(state, (draft) => {
    draft.boothSubmitting = true;
  });
};
const bookBoothSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.boothSubmitting = false;
    draft.boothBooked = true;
  });
};
const bookBoothFailed = (state, action) => {
  return produce(state, (draft) => {
    draft.boothSubmitting = false;
    draft.boothBooked = true;
  });
};
const sendNewsletter = (state, action) => {
  return produce(state, (draft) => {
    draft.newsLetterSubmitting = true;
  });
};
const sendNewsletterSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.newsLetterSuccess = true;
    draft.newsLetterSubmitting = false;
  });
};

const sendNewsletterFailed = (state, action) => {
  return produce(state, (draft) => {
    draft.newsLetterSuccess = false;
    draft.newsLetterSubmitting = false;
  });
};

const resetNewsletterSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.newsLetterSuccess = undefined;
  });
};

const fetchMetadataSuccess = (state, action) => {
  return produce(state, (draft) => {
    draft.contactUsMessageSubjects = [...action.payload.contactUsSubjects];
    draft.shows_countries = [...action.payload.countries];
    draft.genres = [...action.payload.genres];
    draft.artworkSubjectRoles = [...action.payload.artworkSubjectRoles];
    draft.shows_years = [...action.payload.years];
  });
};

const fetchOptionsSucess = (state, action) => {
  return produce(state, (draft) => {
    draft.options = action.payload;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_OPTIONS_SUCCESS]: fetchOptionsSucess,
  [ActionTypes.FETCH_METADATA_SUCCESS]: fetchMetadataSuccess,
  [ActionTypes.FETCH_MAIN_ALBUM_SUCCESS]: fetchMainAlbumSuccess,
  [ActionTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [ActionTypes.FETCH_TIMELINE_SUCCESS]: fetchTimelineSuccess,
  [ActionTypes.FETCH_SPONSERS_SUCCESS]: fetchSponsersSuccess,
  [ActionTypes.FETCH_BOOTHS_SUCCESS]: fetchBoothsSuccess,
  [ActionTypes.FETCH_RECENT_SHOWS_SUCCESS]: fetchRecentShowsSuccess,
  [ActionTypes.FETCH_AWARDS_SUCCESS]: fetchAwardsSuccess,
  [ActionTypes.FETCH_LATEST_ALBUM_CONTENTS_SUCCESS]: fetchLatestmainAlbumuccess,
  [ActionTypes.SEND_CONTACT_US_MESSAGE]: sendContactUsMessage,
  [ActionTypes.SEND_CONTACT_US_MESSAGE_SUCCESS]: sendContactUsMessageSuccess,
  [ActionTypes.SEND_CONTACT_US_MESSAGE_FAIL]: sendContactUsMessageFailed,
  [ActionTypes.BOOK_BOOTH]: bookBooth,
  [ActionTypes.BOOK_BOOTH_SUCCESS]: bookBoothSuccess,
  [ActionTypes.BOOK_BOOTH_FAIL]: bookBoothFailed,
  [ActionTypes.SEND_NEWSLETTER]: sendNewsletter,
  [ActionTypes.SEND_NEWSLETTER_SUCCESS]: sendNewsletterSuccess,
  [ActionTypes.SEND_NEWSLETTER_FAIL]: sendNewsletterFailed,
  [ActionTypes.RESET_NEWS_LETTER_SUCCESS]: resetNewsletterSuccess,
});

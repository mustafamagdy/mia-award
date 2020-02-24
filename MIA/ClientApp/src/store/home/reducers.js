import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";

const initialState = {
  contactUsMessageSubjects: [],
  news: [],
  awards: [
    {
      id: "01e1qajcatthtmrrazk9z3asrm",
      code: "drama",
      title: { ar: "MIA دراما", en: "MIA Drama" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل درامي؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en: "The jury will grant MIA Award for Best Drama Series a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 200.0
    },
    {
      id: "01e1qajcbb3yer9hv8pajaajfq",
      code: "competition",
      title: { ar: "MIA مسابقات", en: "MIA Game Show" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل مسابقات ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en: "The jury will grant MIA Award for Best Game Show a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 500.0
    },
    {
      id: "01e1qajcbb59584bqakqxzy4rt",
      code: "political",
      title: { ar: "MIA سياسة", en: "MIA Political" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل سياسي ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en:
          "The jury will grant MIA Award for Best Political TV Show a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 200.0
    },
    {
      id: "01e1qajcbb8fad5gbgj33c64qz",
      code: "talkshow",
      title: { ar: "MIA حوار", en: "MIA Talk Show" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل حواري ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en: "The jury will grant MIA Award for Best Talk Show a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 250.0
    },
    {
      id: "01e1qajcbb8zhcq841sp5mctwh",
      code: "sports",
      title: { ar: "MIA رياضة", en: "MIA Sports" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل رياضي ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en:
          "The jury will grant MIA Award for Best Sports TV Show a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 200.0
    },
    {
      id: "01e1qajcbbath7m0pyqdj147h9",
      code: "documentary",
      title: { ar: "MIA وثائقي", en: "MIA Documentary" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل وثائقي ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en:
          "The jury will grant MIA Award for Best Documentary Series a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 200.0
    },
    {
      id: "01e1qajcbbrdn92w47pdmz0eah",
      code: "human",
      title: { ar: "MIA إنساني", en: "MIA Humanitarian Show" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل إنساني ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en:
          "The jury will grant MIA Award for Best Humanitarian Show a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 100.0
    },
    {
      id: "01e1qajcbbrw6zvqb1wvy60vv0",
      code: "comedy",
      title: { ar: "MIA كوميدي", en: "MIA Comedy" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل كوميدي ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en: "The jury will grant MIA Award for Best Comedy Series a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 200.0
    },
    {
      id: "01e1qajcbbx0p7e01vzkx75k9w",
      code: "economic",
      title: { ar: "MIA اقتصاد", en: "MIA Economic" },
      trophyUrl: "https://mia-content.s3.amazonaws.com/awards/trophy/award.png",
      order: 0,
      description: {
        ar: "تمنح لجنة تحكيم جائزة MIA لأفضل عمل اقتصادي ؛ جائزة ذهبية للمرتبة الأولى وجائزة فضية للمرتبة الثانية",
        en:
          "The jury will grant MIA Award for Best Economic TV Show a golden award for the first place and a silver one for the second place."
      },
      artworkFee: 350.0
    }
  ],
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

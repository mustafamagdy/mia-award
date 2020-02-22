import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchNews: { args: [], meta: { async: true } },
    fetchTimeline: { args: ["payload"], meta: { async: true } },
    fetchBooths: { args: ["payload"], meta: { async: true } },
    fetchAwards: { args: [], meta: { async: true } },
    fetchRecentShows: { args: ["payload"], meta: { async: true } },
    fetchContactUsMessageSubjects: { args: ["payload"], meta: { async: true } },
    sendContactUsMessage: { args: ["payload"], meta: { async: true } },
    fetchSponsers: { args: [], meta: { async: true } },
    fetchLatestAlbumContents: { args: [], meta: { async: true } },
    searchForShow: { args: ["showTitle"] },
    bookBooth: { args: ["payload"], meta: { async: true } },
  },
  {
    prefix: "@app/home/"
  }
);

export const ActionTypes = Types;
export default Creators;

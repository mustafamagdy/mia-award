import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchMetadata: { args: [], meta: { async: true } },
    fetchMainAlbum: { args: [], meta: { async: true } },
    fetchNews: { args: [], meta: { async: true } },
    fetchTimeline: { args: ["payload"], meta: { async: true } },
    fetchSponsers: { args: ["payload"], meta: { async: true } },
    fetchBooths: { args: ["payload"], meta: { async: true } },
    fetchAwards: { args: [], meta: { async: true } },
    fetchRecentShows: { args: ["payload"], meta: { async: true } },
    sendContactUsMessage: { args: ["payload"], meta: { async: true } },
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

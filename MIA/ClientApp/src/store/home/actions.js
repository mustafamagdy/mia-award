import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchNews: { args: [], meta: { async: true } },
    fetchAwards: { args: [], meta: { async: true } },
    fetchSponsers: { args: [], meta: { async: true } },
    fetchLatestAlbumContents: { args: [], meta: { async: true } },
    fetchRecentShows: { args: [], meta: { async: true } },
    searchForShow: { args: ["showTitle"] }
  },
  {
    prefix: "@app/home/"
  }
);

export const ActionTypes = Types;
export default Creators;

import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchMyAwards: { args: [], meta: { async: true } },
    fetchMyArtworks: { args: [], meta: { async: true } },
    addNewArtwork: { args: ["payload"], meta: { async: true } },
    fetchArtworkWithDetails: { args: ["id"], meta: { async: true } },
    updateTrailer: { args: ["payload"], meta: { async: true } },
    updateCoverImage: { args: ["payload"], meta: { async: true } },
    postFileChunk: { args: ["payload"], meta: { async: true } },
  },
  {
    prefix: "@app/members/"
  }
);

export const ActionTypes = Types;
export default Creators;

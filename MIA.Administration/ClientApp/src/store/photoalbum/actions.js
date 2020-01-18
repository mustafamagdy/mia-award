import { createActions } from "Util/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchPhotoAlbums: { args: ["payload"], meta: { async: true } },
    savePhotoAlbum: { args: ["payload"], meta: { async: true } },
    updatePhotoAlbum: { args: ["payload"], meta: { async: true } },
    deletePhotoAlbum: { args: ["payload"], meta: { async: true } }
  },
  {
    prefix: "@app/photoAlbums/"
  }
);
export const ActionTypes = Types;
export default Creators;

import { ActionTypes } from "./actions";
import generateCrudLogics from "Util/crudLogic";

const [fetchPhotoAlbumLogic, savePhotoAlbumLogic, updatePhotoAlbumLogic, deletePhotoAlbumLogic] = generateCrudLogics(
  "photoAlbums",
  ActionTypes.FETCH_PHOTO_ALBUMS,
  ActionTypes.SAVE_PHOTO_ALBUM,
  ActionTypes.UPDATE_PHOTO_ALBUM,
  ActionTypes.DELETE_PHOTO_ALBUM
);

export default [fetchPhotoAlbumLogic, savePhotoAlbumLogic, updatePhotoAlbumLogic, deletePhotoAlbumLogic];

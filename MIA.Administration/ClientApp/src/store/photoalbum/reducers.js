import { createReducer } from "reduxsauce";
import { produce } from "immer";

import { ActionTypes } from "./actions";

const initialState = {
  photoAlbumList: [],
  photoAlbum_metadata: {
    pageNumber: 1,
    pageSize: 10
  },
  loading: false
};

const fetchPhotoAlbums = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const fetchPhotoAlbumSuccess = (state, action) => {
  return produce(state, draft => {
    draft.photoAlbumList = action.payload.items;
    draft.photoAlbum_metadata = action.payload.metadata;
    draft.loading = false;
  });
};

const fetchPhotoAlbumFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const savePhotoAlbum = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const savePhotoAlbumSuccess = (state, action) => {
  return produce(state, draft => {
    draft.photoAlbumList.push(action.payload);
    draft.loading = false;
  });
};
const savePhotoAlbumFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const updatePhotoAlbum = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const updatePhotoAlbumSuccess = (state, action) => {
  return produce(state, draft => {
    const index = draft.photoAlbumList.findIndex(a => a.id == action.payload.id);
    draft.photoAlbumList[index] = action.payload;
    draft.loading = false;
  });
};
const updatePhotoAlbumFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

const deletePhotoAlbum = (state, action) => {
  return produce(state, draft => {
    draft.loading = true;
  });
};

const deletePhotoAlbumSuccess = (state, action) => {
  return produce(state, draft => {
    draft.photoAlbumList = draft.photoAlbumList.filter(a => a.id != action.payload);
    draft.loading = false;
  });
};
const deletePhotoAlbumFailed = (state, action) => {
  return produce(state, draft => {
    draft.loading = false;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.FETCH_PHOTO_ALBUMS]: fetchPhotoAlbums,
  [ActionTypes.FETCH_PHOTO_ALBUMS_SUCCESS]: fetchPhotoAlbumSuccess,
  [ActionTypes.FETCH_PHOTO_ALBUMS_FAIL]: fetchPhotoAlbumFailed,
  [ActionTypes.SAVE_PHOTO_ALBUM]: savePhotoAlbum,
  [ActionTypes.SAVE_PHOTO_ALBUM_SUCCESS]: savePhotoAlbumSuccess,
  [ActionTypes.SAVE_PHOTO_ALBUM_FAIL]: savePhotoAlbumFailed,
  [ActionTypes.UPDATE_PHOTO_ALBUM]: updatePhotoAlbum,
  [ActionTypes.UPDATE_PHOTO_ALBUM_SUCCESS]: updatePhotoAlbumSuccess,
  [ActionTypes.UPDATE_PHOTO_ALBUM_FAIL]: updatePhotoAlbumFailed,
  [ActionTypes.DELETE_PHOTO_ALBUM]: deletePhotoAlbum,
  [ActionTypes.DELETE_PHOTO_ALBUM_SUCCESS]: deletePhotoAlbumSuccess,
  [ActionTypes.DELETE_PHOTO_ALBUM_FAIL]: deletePhotoAlbumFailed
});
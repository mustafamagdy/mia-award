export default function(/**@type {ApisauceInstance} */ api) {
  const fetchPhotoAlbums = query => api.post("/albums/search", query);
  const savePhotoAlbum = data => {
    const headers = { "Content-Type": "multipart/form-data" };
    const form = new FormData();
    Object.keys(data).forEach(key => {
      if (key == "files") {
        Object.keys(data[key])
          .map(f => data[key][f])
          .forEach(f => {
            form.append(key, f);
          });
      } else {
        form.append(key, data[key]);
      }
    });
    return api.post("albums", form, { headers });
  };
  const updatePhotoAlbum = data => {
    const headers = { "Content-Type": "multipart/form-data" };
    const form = new FormData();
    Object.keys(data).forEach(key => {
      if (key == "newFiles") {
        Object.keys(data[key])
          .map(f => data[key][f])
          .forEach(f => {
            form.append(key, f);
          });
      } else {
        form.append(key, data[key]);
      }
    });
    return api.put("albums", form, { headers });
  };
  const deletePhotoAlbum = id => api.delete(`/photoAlbums/${id}`);

  return { photoAlbums: { fetchPhotoAlbums, savePhotoAlbum, updatePhotoAlbum, deletePhotoAlbum } };
}

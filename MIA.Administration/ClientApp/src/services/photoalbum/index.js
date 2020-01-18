export default function(/**@type {ApisauceInstance} */ api) {
  const fetchPhotoAlbums = query => api.post("/photoAlbums/search", query);
  const savePhotoAlbum = data => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(data).map(key => {
      return form.append(key, data[key]);
    });
    return api.post("photoAlbums", form, { headers });
  };
  const updatePhotoAlbum = data => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(data).map(key => {
      return form.append(key, data[key]);
    });
    return api.put("photoAlbums", form, { headers });
  };
  const deletePhotoAlbum = id => api.delete(`/photoAlbums/${id}`);

  return { photoAlbums: { fetchPhotoAlbums, savePhotoAlbum, updatePhotoAlbum, deletePhotoAlbum } };
}
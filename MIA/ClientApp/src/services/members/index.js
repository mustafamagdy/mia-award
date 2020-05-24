export default function(/**@type {ApisauceInstance} */ api) {
  const fetchMyAwards = () => api.get("/members/myawards");
  const fetchMyArtworks = () => api.get("/members/artworks");
  const addNewArtwork = data => api.post("/members/add-artwork", data);
  const saveArtworkInfo = ({ id, ...data }) => api.put(`/members/artwork/${id}`, data);
  const fetchArtworkWithDetails = id => api.get(`/members/artwork/${id}`);
  const updateTrailer = ({ id, ...data }) => api.put(`/members/artwork/${id}/trailer`, data);
  const updateCoverImage = ({ id, ...data }) => api.put(`/members/artwork/${id}/cover`, data);
  const updatePosterImage = ({ id, ...data }) => api.put(`/members/artwork/${id}/POSTER`, data);
  const postFileChunk = ({ id, ...data }) => api.post(`/members/artwork/${id}/files`, data);
  const publishArtwork = ({ id, ...data } ) =>api.put(`/members/artwork/${id}/publish`,data);

  return {
    members: {
      fetchMyAwards,
      fetchMyArtworks,
      addNewArtwork,
      saveArtworkInfo,
      fetchArtworkWithDetails,
      updateTrailer,
      updateCoverImage,
      updatePosterImage,
      postFileChunk,
      publishArtwork
    }
  };
}

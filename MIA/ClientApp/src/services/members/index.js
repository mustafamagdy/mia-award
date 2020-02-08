export default function(/**@type {ApisauceInstance} */ api) {
  const fetchMyAwards = () => api.get("/members/awards");
  const fetchMyArtworks = () => api.get("/members/artworks");
  const addNewArtwork = data => api.post("/members/add-artwork", data);
  const fetchArtworkWithDetails = id => api.get(`/members/artwork/${id}`);
  const updateTrailer = ({ id, ...data }) => api.put(`artwork/${id}/trailer`, data);
  const updateCoverImage = ({ id, ...data }) => api.put(`artwork/${id}/cover`, data);
  const postFileChunk = ({ id, ...data }) => api.post(`"artwork/${id}/files`, data);

  return {
    members: {
      fetchMyAwards,
      fetchMyArtworks,
      addNewArtwork,
      fetchArtworkWithDetails,
      updateTrailer,
      updateCoverImage,
      postFileChunk
    }
  };
}

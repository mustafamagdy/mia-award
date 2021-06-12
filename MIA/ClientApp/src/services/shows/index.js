export default function showsApi(/**@type {ApisauceInstance} */ api) {
  const fetchFeaturedItems = () => api.get("shows/featured");
  const fetchItems = (query = {}) => api.post("shows/filter", query);
  const fetchShowDetails = id => api.get(`shows/with-comments/${id}`);
  const postShowReview = ({ id, ...values }) => api.post(`shows/${id}/review`, values);

  return {
    shows: {
      fetchFeaturedItems,
      fetchItems,
      fetchShowDetails,
      postShowReview
    }
  };
}

export default function(/**@type {ApisauceInstance} */ api) {
  const fetchFeaturedItems = () => api.get("shows/featured");
  const fetchItems = (query = {}) => api.post("shows/filter", query);

  return {
    shows: {
      fetchFeaturedItems,
      fetchItems
    }
  };
}

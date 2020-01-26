export default function(/**@type {ApisauceInstance} */ api) {
  const fetchFeaturedItems = () => api.get("gallery/featured");
  const fetchItems = (query = {}) => api.post("gallery/by-type", query);

  return {
    gallery: {
      fetchFeaturedItems,
      fetchItems
    }
  };
}

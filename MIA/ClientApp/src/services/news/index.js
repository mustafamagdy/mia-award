export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = (query = {}) => api.post("news", query);
  const fetchCategories = () => api.get("news/categories");

  return {
    news: {
      fetchNews,
      fetchCategories
    }
  };
}

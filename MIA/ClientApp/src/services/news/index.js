export default function(/**@type {ApisauceInstance} */ api) {
  const fetchFeaturedNews  = () => api.get("news/featured");
  const fetchNews = (query = {}) => api.post("news/list", query);
  const fetchCategories = () => api.get("news/categories");
  const fetchNewsItem = id => api.get(`news/with-comments/${id}`);
  const postNewsComment = ({ id, ...comment }) => api.post(`news/${id}/comment`, comment);

  return {
    news: {
      fetchFeaturedNews ,
      fetchNews,
      fetchCategories,
      fetchNewsItem,
      postNewsComment
    }
  };
}

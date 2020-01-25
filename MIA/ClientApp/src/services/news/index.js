export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = (query = {}) => api.post("news", query);
  const fetchCategories = () => api.get("news/categories");
  const fetchNewsItem = id => api.get(`news/with-comments/${id}`);
  const postNewsComment = ({ id, ...comment }) => api.post(`news/${id}/comment`, comment);

  return {
    news: {
      fetchNews,
      fetchCategories,
      fetchNewsItem,
      postNewsComment
    }
  };
}

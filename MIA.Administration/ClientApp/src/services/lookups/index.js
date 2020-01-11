export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = query => api.post("/news/search", query);
  const saveNews = data => api.post("/news", data);
  const updateNews = data => api.put("/news", data);
  const deleteNews = id => api.delete(`/news/${id}`);

  return { lookups: { fetchNews, saveNews, updateNews, deleteNews } };
}

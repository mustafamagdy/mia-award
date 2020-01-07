export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = query => api.post("/news/search", query);
  const saveNews = data => api.post("/news/save", data);
  const updateNews = data => api.post("/news/update", data);
  const deleteNews = id => api.post("/news/delete", `"${id}"`);

  return { lookups: { fetchNews, saveNews, updateNews, deleteNews } };
}

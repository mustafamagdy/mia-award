export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = query => api.post("/news/search", query);
  const saveNews = data => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(data).map(key => {
      return form.append(key, data[key]);
    });
    return api.post("news", form, { headers });
  };
  const updateNews = data => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(data).map(key => {
      return form.append(key, data[key]);
    });
    return api.put("news", form, { headers });
  };
  const deleteNews = id => api.delete(`/news/${id}`);

  return { lookups: { fetchNews, saveNews, updateNews, deleteNews } };
}

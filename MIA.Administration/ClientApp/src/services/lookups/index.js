export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = () => api.post("/news/search", { pageNumber: 1, pageSize: 10 });

  return { lookups: { fetchNews } };
}

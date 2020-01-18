export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = (query = {}) =>  api.post("home/latest-news", query);

  return {
    home: {
      fetchNews
    }
  };
}

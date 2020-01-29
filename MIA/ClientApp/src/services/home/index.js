export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = (query = {}) => api.post("home/latest-news", query);
  const fetchRecentShows = (query = {}) => api.post("home/recent-shows", query);
  const fetchContactUsMessageSubjects = () => api.get("home/contact-message-subject");

  return {
    home: {
      fetchNews,
      fetchRecentShows,
      fetchContactUsMessageSubjects
    }
  };
}

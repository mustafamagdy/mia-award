export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = (query = {}) => api.post("home/latest-news", query);
  const fetchTimeline = () => api.get("home/timeline");
  const fetchAwards = () => api.get("home/awards");
  const fetchRecentShows = (query = {}) => api.post("home/recent-shows", query);
  const fetchContactUsMessageSubjects = () => api.get("home/contact-message-subject");
  const sendContactUsMessage = message => api.post("home/send-contactus", message);

  return {
    home: {
      fetchNews,
      fetchTimeline,
      fetchAwards,
      fetchRecentShows,
      fetchContactUsMessageSubjects,
      sendContactUsMessage
    }
  };
}

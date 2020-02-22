export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = () => api.get("home/latest-news");
  const fetchTimeline = () => api.get("home/timeline");
  const fetchBooths = () => api.get("home/booths");
  const fetchAwards = () => api.get("home/awards");
  const fetchRecentShows = (query = {}) => api.post("home/recent-shows", query);
  const fetchContactUsMessageSubjects = () => api.get("home/contact-message-subject");
  const sendContactUsMessage = message => api.post("home/send-contactus", message);
  const bookBooth = data => api.post("home/book-booth", data);

  return {
    home: {
      fetchNews,
      fetchTimeline,
      fetchBooths,
      fetchAwards,
      fetchRecentShows,
      fetchContactUsMessageSubjects,
      sendContactUsMessage,
      bookBooth
    }
  };
}

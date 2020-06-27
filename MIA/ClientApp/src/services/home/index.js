export default function(/**@type {ApisauceInstance} */ api) {
  const fetchMainAlbum = () => api.get("home/main-album");
  const fetchMetadata = () => api.get("home/metadata");
  const fetchNews = () => api.get("home/latest-news");
  const fetchTimeline = () => api.get("home/timeline");
  const fetchSponsers = () => api.get("home/sponsers");
  const fetchBooths = () => api.get("home/booths");
  const fetchAwards = () => api.get("home/awards");
  const fetchRecentShows = (query = {}) => api.post("home/recent-shows", query);
  const sendContactUsMessage = message => api.post("home/send-contactus", message);
  const bookBooth = data => api.post("home/book-booth", data);

  return {
    home: {
      fetchMetadata,
      fetchMainAlbum,
      fetchNews,
      fetchTimeline,
      fetchSponsers,
      fetchBooths,
      fetchAwards,
      fetchRecentShows,
      sendContactUsMessage,
      bookBooth
    }
  };
}

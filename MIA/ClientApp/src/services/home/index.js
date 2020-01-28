export default function(/**@type {ApisauceInstance} */ api) {
  const fetchNews = (query = {}) => api.post("home/latest-news", query);
  const fetchContactUsMessageSubjects = () => api.get("home/contact-message-subject");

  return {
    home: {
      fetchNews,
      fetchContactUsMessageSubjects
    }
  };
}

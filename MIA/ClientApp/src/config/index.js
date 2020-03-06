export default {
  useLocalApi: true,
  appName: "MIA Application",
  appTitle: "MIA Application",
  appDescription: "MIA application",
  apiRoot: "/api",
  devApiRoot: "/api",
  awardDetails: {
    startDate: "01-01-2020",
    endDate: "31-12-2020"
  },
  reCaptchaKey: "6LfQxtIUAAAAAJyXHUzzKShDXhpzF_TZgpVSN7P0",
  paymentPublicKey: "pk_test_3aa743f7-9a44-4254-9334-7a2c03150753",
  companyLocation: {
    lat: 25.0969085,
    long: 55.155664,
    zoom: 16,
    landMarker: {
      id: "1",
      icon: "./assets/images/markers/marker.svg",
      name: "Media Industry",
      lat: 25.0969085,
      long: 55.155664
    }
  },
  tickets: [
    {
      locationId: 1,
      location: {
        lat: 25.1948729,
        long: 55.2654525,
        zoom: 15.76,
        landMarker: {
          id: "1",
          icon: "./assets/images/markers/marker.svg",
          name: "Dubai opera",
          lat: 25.1948729,
          long: 55.2654525
        }
      },
      titleKey: "location1_title",
      title: "Dubai opera",
      descriptionKey: "location1_description",
      description: `TEXT_DEEEDED_HERE`,
      dates: [{ date: "20-05-2020" }, { date: "21-05-2020" }, { date: "22-05-2020" }]
    },
    {
      locationId: 2,
      location: {
        lat: 25.1559204,
        long: 55.2977487,
        zoom: 17,
        landMarker: {
          id: "2",
          icon: "./assets/images/markers/marker.svg",
          name: "Medan hotel",
          lat: 25.1559204,
          long: 55.2977487
        }
      },
      titleKey: "location1_title",
      title: "Medan hotel",
      descriptionKey: "location1_description",
      description: `TEXT_DEEEDED_HERE`,
      dates: [{ date: "29-05-2020" }, { date: "30-05-2020" }]
    }
  ],
  menu: [
    { label: "members", route: "/members" },
    { label: "about_us", route: "/about-us" },
    { label: "news", route: "/news" },
    { label: "program", route: "/timeline" },
    { label: "gallery", route: "/gallery" },
    { label: "shows", route: "/shows" },
    { label: "booths", route: "/booths" },
    { label: "contact_us", route: "/contact-us" }
  ],
  siteShareUrl: "http://miaawards.com",
  social: {
    fb: "https://www.facebook.com/MIAawardArab",
    tw: "https://twitter.com/MIAawardArab",
    in: "https://www.instagram.com/MIAawardarab",
    yt: "https://www.youtube.com/MIAawardarab"
  },
  uploadFileExtension:[
    "video/mp4"
  ]
};

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
  menu: [
    { label: "members", route: "/members" },
    { label: "about_us", route: "about-us" },
    { label: "news", route: "news" },
    { label: "program", route: "timeline" },
    { label: "gallery", route: "/gallery" },
    { label: "shows", route: "/shows" },
    { label: "booths", route: "/booths" },
    { label: "contact_us", route: "/contact-us" }
  ],
  social: {
    fb: "",
    tw: "",
    in: "",
    yt: ""
  }
};

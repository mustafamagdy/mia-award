(function() {
  const apiBaseUrl = "http://localhost:62912";
  angular
    .module("core")
    .constant("appCONSTANTS", {
      API_URL: `${apiBaseUrl}/api/`,
      // SIGNAL_URL: `${apiBaseUrl}/signal/order/`,

      // Image_URL: `${apiBaseUrl}/auth`,
      // Image_URL_ORDER: `${apiBaseUrl}/order`,
      // Image_URL_GLOBAL: `${apiBaseUrl}/global`,
      // Image_URL_ACTOR: `${apiBaseUrl}/actor`,

      defaultLanguage: "ar",
      supportedLanguage: {
        "en": { key: "en", value: "english" },
        "ar": { key: "ar", value: "arabic" }
      }
    })
    .constant("messageTypeEnum", {
      success: 0,
      warning: 1,
      error: 2
    })
    .constant("userRolesEnum", {
      GlobalAdmin: "GlobalAdmin"
    });
})();

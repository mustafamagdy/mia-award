(function() {
  //const apiBaseUrl = "http://localhost:62912";
  const apiBaseUrl = "http://admin.miaaward.com/";
  angular
    .module("core")
    .constant("appCONSTANTS", {
      API_URL: `${apiBaseUrl}/api/`, 

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

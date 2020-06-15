(function () {
    const apiBaseUrl = "http://localhost:62912";
    // const apiBaseUrl = "";
    angular
        .module("core")
        .constant("appCONSTANTS", {
            API_URL: `${apiBaseUrl}/api/`,

            defaultLanguage: "ar",
            supportedLanguage: {
                en: { key: "en", value: "english" },
                ar: { key: "ar", value: "arabic" }
            }
        })
        .constant("messageTypeEnum", {
            success: 0,
            warning: 1,
            error: 2
        })
        .constant("status", {
            StatusList: [
                { Id: 0, shortName: 'Waiting' },
                { Id: 1, shortName: 'Confirmed' },
                { Id: 2, shortName: 'Rejected' },
            ]
        })
        .constant("awardType", {
            TypeList: [
                { Id: 1, shortName: 'Person' },
                { Id: 0, shortName: 'Artwork' }
            ]
        })
        .constant("userRolesEnum", {
            GlobalAdmin: "GlobalAdmin"
        });
})();
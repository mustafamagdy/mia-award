(function () {
    angular
        .module('home')
        .factory('AwardResource', ['$resource', 'appCONSTANTS', AwardResource])

    function AwardResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Awards', {}, {
            getAllAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'Awards/search', useToken: true, params: { lang: '@lang' } },
            getAllJudges: { method: 'GET', url: appCONSTANTS.API_URL + 'Awards/judges', useToken: true, isArray: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getAward: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            getAwardDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Awards/getAwardDetails?id=:id',  useToken: true },
        })
    }

}());

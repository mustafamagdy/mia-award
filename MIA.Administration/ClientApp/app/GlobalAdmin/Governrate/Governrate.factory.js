(function () {
    angular
        .module('home')
        .factory('GovernrateResource', ['$resource', 'appCONSTANTS', GovernrateResource])

    function GovernrateResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            getAllGovernrates: { method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetGovernrateByCountryId/:countryId', useToken: true, params: { lang: '@lang' }  },
            GetAllActiveGovernrates: { method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetAllActiveGovernrates/:countryId', useToken: true, params: { lang: '@lang' }, isArray: true },
            GetGovernrateById: {
                method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetGovernrateById/:countryId',
                useToken: true, params: { lang: '@lang' }
            },
            create: { method: 'POST', useToken: true, url: appCONSTANTS.API_URL + 'Governrate/CreateGovernrate' },
            search: { method: 'GET', useToken: true, url: appCONSTANTS.API_URL + 'Governrate/GetAllGovernrate' },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Governrate/UpdateGovernrate', useToken: true },
            getGovernrate: { method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetGovernrateById/:governrateId', useToken: true },
            ChangeGovernrateStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Governrate/ChangeGovernrateStatus/:governrateId/:status', useToken: true },

        })
    }

}());

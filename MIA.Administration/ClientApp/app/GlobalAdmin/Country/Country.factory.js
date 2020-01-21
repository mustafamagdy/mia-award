(function () {
    angular
        .module('home')
        .factory('CountryResource', ['$resource', 'appCONSTANTS', CountryResource])

    function CountryResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Country/CreateCountry', {}, {
            getAllCountries: { method: 'GET', url: appCONSTANTS.API_URL + 'Country/GetAllCountry',useToken: true, params: { lang: '@lang' } },
            GetAllActiveCountries: { method: 'GET', url: appCONSTANTS.API_URL + 'Country/GetAllActiveCountries',useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Country/UpdateCountry', useToken: true },
            getCountry: { method: 'GET', url: appCONSTANTS.API_URL + 'Country/GetCountryById/:countryId', useToken: true }

        })
    }

}());

(function () {
    angular
      .module('home')
        .factory('CityResource', ['$resource', 'appCONSTANTS', CityResource]) 

    function CityResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL+ 'City/CreateCity' , {}, {
            getAllCities: { method: 'GET', url: appCONSTANTS.API_URL + 'City/GetCityByGovernrateId/:governrateId', useToken: true, params: { lang: '@lang' } , isArray:true },
            getAllActiveCities: { method: 'GET', url: appCONSTANTS.API_URL + 'City/GetAllActiveCities/:governrateId', useToken: true, params: { lang: '@lang' } , isArray:true },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'City/UpdateCity', useToken: true },
            getCity: { method: 'GET', url: appCONSTANTS.API_URL + 'City/GetCityById/:cityId', useToken: true },
            ChangeCityStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'City/ChangeCityStatus/:cityId/:status', useToken: true},

        })
    } 

}());

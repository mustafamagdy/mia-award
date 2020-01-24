(function () {
    angular
        .module('home')
        .factory('ZoneResource', ['$resource', 'appCONSTANTS', ZoneResource])

    function ZoneResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Zone/CreateZone', {}, {
            getAllZones: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GetAllZones', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Zone/UpdateZone', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Zone/DeleteZone/:id', useToken: true },
            getZone: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GetZoneById/:zoneId', useToken: true },
            generateNewZoneCode: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GenerateNewZoneCode', useToken: true },
            getZoneDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GetAllZoneDetialsByZoneId/:produdctId ', useToken: true },
            getDistributorZone: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/Search', useToken: true },
            getRetailerZone: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/Search', useToken: true },

        })
    }

}());

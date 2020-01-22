(function () {
    angular
        .module('home')
        .factory('ZoneRelationResource', ['$resource', 'appCONSTANTS', ZoneRelationResource])

    function ZoneRelationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            getDistributor: { method: 'GET', url: appCONSTANTS.API_URL + 'Relation/GetDistributorZone/:zoneId', useToken: true },
            setDistributor: { method: 'POST', url: appCONSTANTS.API_URL + 'Relation/SetDistributor/:zoneId/:distributorId', useToken: true, params: { lang: '@lang' } },

            getZoneRetailer: { method: 'GET', url: appCONSTANTS.API_URL + 'Relation/GetZoneRetailer/:zoneId', useToken: true },
            zoneRetailerStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Relation/ZoneRetailerStatus/:zoneId/:zoneRetailerId/:status', useToken: true },

            getZoneProduct: { method: 'GET', url: appCONSTANTS.API_URL + 'Relation/GetZoneProduct/:zoneId', useToken: true },
            zoneProductStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Relation/ZoneProductStatus/:zoneId/:zoneProductId/:status', useToken: true },

        })
    }

}());

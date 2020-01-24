(function () {
    angular
        .module('home')
        .factory('ManufactureResource', ['$resource', 'appCONSTANTS', ManufactureResource])

    function ManufactureResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'Manufacture/CreateManufacture', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Manufacture/UpdateManufacture', useToken: true},
            GenerateNewManufactureId: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/GenerateNewManufactureCode', useToken: true },
            getAllManufactures: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/GetAllManufacture', useToken: true, params: { lang: '@lang' } },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Manufacture/DeleteManufacture/:manufactureId', useToken: true },
            getManufacture: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/GetManufactureById/:manufactureId', useToken: true },
            ChangeManufacture: { method: 'POST', url: appCONSTANTS.API_URL + 'Manufacture/ChangeManufactureStatus/:manufactureId/:status', useToken: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/Search', useToken: true },

        })
    }

}());

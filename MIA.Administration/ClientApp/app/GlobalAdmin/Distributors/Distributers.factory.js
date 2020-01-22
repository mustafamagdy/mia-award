(function () {
    angular
        .module('home')
        .factory('DistributorsResource', ['$resource', 'appCONSTANTS', DistributorsResource])

    function DistributorsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'Distributor/CreateDistributor', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Distributor/UpdateDistributor', useToken: true},
            GenerateNewDistributorId: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GenerateDistributorCode', useToken: true },
            getAllDistributors: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GetAllDistributors', useToken: true, params: { lang: '@lang' } },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Distributor/DeleteDistributor/:distributorId', useToken: true },
            getDistributors: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GetDistributorById/:distributorId', useToken: true },
            ChangeDistributors: { method: 'POST', url: appCONSTANTS.API_URL + 'Distributor/ChangeDistributorStatus/:distributorId/:status', useToken: true },
            GetAllActiveDistributers: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GetAllActiveDistributor', useToken: true, isArray: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/Search', useToken: true},
            // getAllCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributors/GetAllCategs', useToken: true, params: { lang: '@lang' } , isArray:true},
            // GetAllActiveCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributors/GetAllActiveCategories', useToken: true, isArray:true},
            // GetAllActiveItems: { method: 'GET', url: appCONSTANTS.API_URL + 'Categories/:DistributorsId/GetAllActiveItems', useToken: true},

        })
    }

}());

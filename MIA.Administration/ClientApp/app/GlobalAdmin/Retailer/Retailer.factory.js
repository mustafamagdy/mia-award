(function () {
    angular
        .module('home')
        .factory('RetailerResource', ['$resource', 'appCONSTANTS', RetailerResource])

    function RetailerResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'Retailer/CreateRetailer', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Retailer/UpdateRetailer', useToken: true},
            GenerateNewRetailerId: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GenerateRetailerCode', useToken: true },
            getAllRetailers: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetAllRetailer', useToken: true, params: { lang: '@lang' } },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Retailer/DeleteRetailer/:retailerId', useToken: true },
            getRetailer: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetRetailerById/:retailerId', useToken: true },
            ChangeRetailer: { method: 'POST', url: appCONSTANTS.API_URL + 'Retailer/ChangeRetailerStatus/:retailerId/:status', useToken: true },
            // getRetailerMap: { method: 'POST', url: appCONSTANTS.API_URL + 'Retailer/ChangeRetailerStatus/:retailerId/:status', useToken: true },
            GetAllActiveRetailers: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetAllActiveRetailer', useToken: true, isArray: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/Search', useToken: true},

        // getAllCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetAllCategs', useToken: true, params: { lang: '@lang' } , isArray:true},
            // GetAllActiveCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetAllActiveCategories', useToken: true, isArray:true},
            // GetAllActiveItems: { method: 'GET', url: appCONSTANTS.API_URL + 'Categories/:RetailerId/GetAllActiveItems', useToken: true},

        })
    }

}());

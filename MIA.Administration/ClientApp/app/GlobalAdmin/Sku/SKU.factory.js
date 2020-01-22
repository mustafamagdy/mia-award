(function () {
    angular
        .module('home')
        .factory('SKUResource', ['$resource', 'appCONSTANTS', SKUResource])

    function SKUResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL , {}, {
            getAllSKUs: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GetAllSKU',useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'SKU/CreateSKU',useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'SKU/UpdateSKU', useToken: true },
            getSKU: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GetSKUById/:skuId', useToken: true },
            GenerateNewSKUCode: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GenerateNewSKUCode', useToken: true },
            ChangeSKYStatus: { method: 'POST', url: appCONSTANTS.API_URL  + 'SKU/ChangeSKUStatus/:skuId/:status', useToken: true},
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'SKU/DeleteSKU/:skuId', useToken: true },


        })
    }
     

}());

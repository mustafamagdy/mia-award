(function () {
    angular
        .module('home')
        .factory('ProductResource', ['$resource', 'appCONSTANTS', ProductResource])

    function ProductResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Product/CreateProduct', {}, {
            getAllProducts: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetAllProduct', useToken: true, params: { lang: '@lang' } },
            getAllActivateProduct: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetAllActivateProduct', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/UpdateProduct', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Product/DeleteProduct/:id', useToken: true },
            getProduct: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetProductById/:id', useToken: true },
            generateNewProductCode: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GenerateNewProductCode', useToken: true },
            getProductDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetAllProductDetialsByProductId/:produdctId ', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/ChangeProductStatus/:productId/:status', useToken: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/ProdudctSearch', useToken: true },

            //SKU
            getAllSKUConversion: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GetAllActivatedSKU ', useToken: true,isArray:true },
            createSKUConversion: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/CreateProductDetial', useToken: true },
            updateSKUConversion: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/UpdateProductDetails', useToken: true },

        })
    }

}());

(function () {
    angular
        .module('home')
        .factory('CategoryResource', ['$resource', 'appCONSTANTS', CategoryResource])

    function CategoryResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Category/CreateCategory', {}, {
            getAllCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'Category/GetAllCategory', useToken: true, params: { lang: '@lang' }  },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Category/UpdateCategory', useToken: true },
            getCategory: { method: 'GET', url: appCONSTANTS.API_URL + 'Category/GetCategoryById/:id', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Category/DeleteCategory/:id', useToken: true }, 
            getAllActiveCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'Category/GetallActivateCategories', useToken: true, isArray:true},
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Category/ChangeCategoryStatus/:categoryId/:status', useToken: true },

        })
    }

}());

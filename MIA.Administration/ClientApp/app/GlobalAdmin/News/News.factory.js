(function () {
    angular
        .module('home')
        .factory('NewsResource', ['$resource', 'appCONSTANTS', NewsResource])

    function NewsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'news', {}, {
            getAllCategories: { method: 'POST', url: appCONSTANTS.API_URL + 'news/search', useToken: true, params: { lang: '@lang' }  },
            create: { method: 'POST', useToken: true },
            create: { method: 'POST', useToken: true },
           // update: { method: 'POST', url: appCONSTANTS.API_URL + 'News/UpdateNews', useToken: true },
            getNews: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetNewsById/:id', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'News/DeleteNews/:id', useToken: true }, 
            getAllActiveCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetallActivateCategories', useToken: true, isArray:true},
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'News/ChangeNewsStatus/:NewsId/:status', useToken: true },

        })
    }

}());

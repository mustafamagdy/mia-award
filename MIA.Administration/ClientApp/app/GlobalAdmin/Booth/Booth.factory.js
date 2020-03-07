(function () {
    angular
        .module('home')
        .factory('BoothResource', ['$resource', 'appCONSTANTS', BoothResource])

    function BoothResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'booths', {}, {
            getAllBooths: { method: 'POST', url: appCONSTANTS.API_URL + 'booths/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getBooth: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'booths/ChangeStatus/:id/:status', useToken: true },
            getPayment: { method: 'GET', url: appCONSTANTS.API_URL + 'booths/getPayment?id=:id', useToken: true },
            updatePayment: { method: 'PUT', url: appCONSTANTS.API_URL + 'booths/updatePayment', useToken: true },
            createPayment: { method: 'POST', url: appCONSTANTS.API_URL + 'booths/createPayment', useToken: true },
        })
    }

}());

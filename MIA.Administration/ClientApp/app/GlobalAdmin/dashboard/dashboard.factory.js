(function () {
    angular
        .module('home')
        .factory('dashboardResource', ['$resource', 'appCONSTANTS', dashboardResource])

    function dashboardResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Tickets/', {}, {
            getTicketsDashboard: { method: 'GET', url: appCONSTANTS.API_URL + 'Tickets/dashboard', useToken: true,isArray:true },
        })
    }

}());

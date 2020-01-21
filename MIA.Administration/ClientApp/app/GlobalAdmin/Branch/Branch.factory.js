(function () {
    angular
      .module('home')
        .factory('BranchResource', ['$resource', 'appCONSTANTS', BranchResource]) 

    function BranchResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Branchs/', {}, {
            getAllBranchs: { method: 'GET', url: appCONSTANTS.API_URL + 'Branchs/GetAllBranchs', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Branchs/EditBranch', useToken: true },
            getBranch: { method: 'GET', url: appCONSTANTS.API_URL + 'Branchs/GetBranchById/:BranchId', useToken: true }
        })
    } 

}());

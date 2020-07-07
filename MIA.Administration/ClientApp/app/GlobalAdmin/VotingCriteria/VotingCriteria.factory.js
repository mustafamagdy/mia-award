(function () {
    angular
        .module('home')
        .factory('VotingCriteriaResource', ['$resource', 'appCONSTANTS', VotingCriteriaResource])

    function VotingCriteriaResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'VotingCriterias', {}, {
            getAllVotingCriterias: { method: 'POST', url: appCONSTANTS.API_URL + 'VotingCriterias/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getVotingCriteria: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'VotingCriterias/ChangeStatus/:id/:status', useToken: true },
            getVotingCriteriaByAward: { method: 'POST', url: appCONSTANTS.API_URL + 'VotingCriterias/getVotingCriteriaByAward', useToken: true },
           
            
        })
    }

}());

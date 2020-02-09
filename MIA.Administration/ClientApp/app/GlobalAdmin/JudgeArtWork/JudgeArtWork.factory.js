(function () {
    angular
        .module('home')
        .factory('JudgeArtWorkResource', ['$resource', 'appCONSTANTS', JudgeArtWorkResource])

    function JudgeArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            getAllVotingCriterias: { method: 'POST', url: appCONSTANTS.API_URL + 'votingCriterias/search', useToken: true, params: { lang: '@lang' } },
            update: { method: 'PUT', useToken: true },
            getJudgeArtWork: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            getJudgeArtWorks: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getJudgeArtWorks?id=:id', isArray: true, useToken: true },
        })
    }

}());

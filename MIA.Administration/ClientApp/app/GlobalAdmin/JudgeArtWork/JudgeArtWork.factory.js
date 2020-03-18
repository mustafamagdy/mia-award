(function () {
    angular
        .module('home')
        .factory('JudgeArtWorkResource', ['$resource', 'appCONSTANTS', JudgeArtWorkResource])

    function JudgeArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'judgeVote', {}, {
            getAllVotingCriterias: { method: 'POST', url: appCONSTANTS.API_URL + 'votingCriterias/search', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'judgeVote/submitJudgeVote', useToken: true },
            getJudgeArtWork: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            getJudgeArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/getJudgeArtWorks?id=:id', isArray: true, useToken: true },
            getMediaFile: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getMediaFile?id=:id', useToken: true },
            getJudgeVoteCriteriaValues: { method: 'GET', url: appCONSTANTS.API_URL + 'judgeVote/getJudgeVoteCriteriaValues?id=:id', isArray: true, useToken: true }
        })
    }

}());

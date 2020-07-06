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
            getJudgeArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'judgeVote/my-artworks', useToken: true },
            getMyStatistics: { method: 'POST', url: appCONSTANTS.API_URL + 'judgeVote/my-statistics', useToken: true },
            getJudgeAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'judgeVote/my-awards', isArray: true, useToken: true },
            getArtworkStatistics: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/artwork-statistics', useToken: true },
            getMediaFile: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getMediaFile?id=:id', useToken: true },
            getJudgeVoteCriteriaValues: { method: 'GET', url: appCONSTANTS.API_URL + 'judgeVote/getJudgeVoteCriteriaValues?id=:id', isArray: true, useToken: true },
            getCriteriaByLevel: { method: 'GET', url: appCONSTANTS.API_URL + 'judgeVote/getCriteriaByLevel?level=:level', isArray: true, useToken: true },

            postComment: { method: 'POST', url: appCONSTANTS.API_URL + 'judgeVote/submitJudgeComment', useToken: true },
            getCommetsListByMedia: { method: 'GET', url: appCONSTANTS.API_URL + 'judgeVote/getCommetsListByMedia?id=:id', isArray: true, useToken: true },
            postFinalThoughts: { method: 'POST', url: appCONSTANTS.API_URL + 'judgeVote/final-thoughts', useToken: true },
            getArtWorkWithFilesAndScore: { method: 'GET',url: appCONSTANTS.API_URL + 'artWorks/:id/withFiles-and-score/:level', useToken: true },
            
        })
    }

}());

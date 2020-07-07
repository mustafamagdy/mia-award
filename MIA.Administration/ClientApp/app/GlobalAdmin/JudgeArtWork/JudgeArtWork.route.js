(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('JudgeArtWork', {
                    url: '/JudgeArtWork',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/JudgeArtWork.html',
                    controller: 'JudgeArtWorkController',
                    'controllerAs': 'JudgeArtWorkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('viewJudgeArtWork', {
                    url: '/viewJudgeArtWork/:id',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/view.html',
                    controller: 'viewJudgeArtWorkController',
                    'controllerAs': 'viewJudgeArtWorkCtrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService,
                        ArtWorkMediaByArtWorkIdPrepService: ArtWorkMediaByArtWorkIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('displayVideo', {
                    url: '/displayVideo/:id',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/displayVideo.html',
                    controller: 'DisplayVideoController',
                    'controllerAs': 'displayVideoCtrl',
                    resolve: {
                        MediaFileByIdPrepService: MediaFileByIdPrepService,
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('artWorkDetails', {
                    url: '/artWorkDetails/:id/:level',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/artworkdetails.html',
                    controller: 'judgeArtWorkDetailsController',
                    'controllerAs': 'judgeArtWorkDetailsCtrl',
                    resolve: {
                        // ArtWorkWithFilesByIdPrepService: ArtWorkWithFilesByIdPrepService,
                        ArtWorkWithFilesAndScoresByIdPrepService: ArtWorkWithFilesAndScoresByIdPrepService,
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('my-dashboard', {
                    url: '/my-dashboard',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/judge-dashboard.html',
                    controller: 'judgeDashboardController',
                    'controllerAs': 'ctrl',
                    resolve: {
                        JudgeDashboardPrepService: JudgeDashboardPrepService,
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('my-judges', {
                    url: '/my-judges',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/my-judges.html',
                    controller: 'myJudgesController',
                    'controllerAs': 'ctrl',
                    resolve: {
                        // myAwardJudgesWorkPrepService: myAwardJudgesWorkPrepService,
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('artwork-statistics', {
                    url: '/artwork-statistics',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/artwork-statistics.html',
                    controller: 'artworkStatisticsController',
                    'controllerAs': 'ctrl',
                    resolve: {
                        ArtworkStatisticsPrepService: ArtworkStatisticsPrepService,
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('artwork-votes', {
                    url: '/artwork-votes',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/artwork-vote-details.html',
                    controller: 'artworkVoteDetailsController',
                    'controllerAs': 'ctrl',
                    resolve: {
                       
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

        });

    JudgeArtWorkPrepService.$inject = ['JudgeArtWorkResource']
    function JudgeArtWorkPrepService(JudgeArtWorkResource) {
        return JudgeArtWorkResource.getAllJudgeArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    JudgeArtWorkByIdPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function JudgeArtWorkByIdPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getJudgeArtWork({ id: $stateParams.id }).$promise;
    }

    AllJudgeArtWorkPrepService.$inject = ['JudgeArtWorkResource']
    function AllJudgeArtWorkPrepService(JudgeArtWorkResource) {
        return JudgeArtWorkResource.getAllJudgeArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    JudgeArtWorkDetailsByArtWorkIdPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function JudgeArtWorkDetailsByArtWorkIdPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getJudgeArtWorkDetails({ id: $stateParams.id }).$promise;
    }

    ArtWorkByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWork({ id: $stateParams.id }).$promise;
    }

    ArtWorkWithFilesByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkWithFilesByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWorkWithFiles({ id: $stateParams.id }).$promise;
    }
    ArtWorkWithFilesAndScoresByIdPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function ArtWorkWithFilesAndScoresByIdPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getArtWorkWithFilesAndScore({ id: $stateParams.id, level: $stateParams.level }).$promise;
    }
    
    JudgeDashboardPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function JudgeDashboardPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getMyStatistics({  }).$promise;
    }

    ArtworkStatisticsPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function ArtworkStatisticsPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getArtworkStatistics({pageSize: 10, pageNumber:1 }).$promise;
    }

    ArtWorkMediaByArtWorkIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkMediaByArtWorkIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise;
    }
    MediaFileByIdPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function MediaFileByIdPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getMediaFile({ id: $stateParams.id }).$promise;
    }
}());

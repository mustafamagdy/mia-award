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

    ArtWorkMediaByArtWorkIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkMediaByArtWorkIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise;
    }
}());

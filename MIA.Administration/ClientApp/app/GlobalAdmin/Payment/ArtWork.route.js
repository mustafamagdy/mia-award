(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ArtWork', {
                    url: '/ArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/ArtWork.html',
                    controller: 'ArtWorkController',
                    'controllerAs': 'ArtWorkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newArtWork', {
                    url: '/newArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/new.html',
                    controller: 'createArtWorkDialogController',
                    'controllerAs': 'newArtWorkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editArtWork', {
                    url: '/editArtWork/:countryId',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/edit.html',
                    controller: 'editArtWorkDialogController',
                    'controllerAs': 'editArtWorkCtrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ArtWorkPrepService.$inject = ['ArtWorkResource']
    function ArtWorkPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWork({ countryId: $stateParams.countryId }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkResource']
    function AllAwardPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());

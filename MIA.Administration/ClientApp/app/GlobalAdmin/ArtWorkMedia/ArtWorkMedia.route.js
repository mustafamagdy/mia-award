(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ArtWorkMedia', {
                    url: '/ArtWorkMedia',
                    templateUrl: './app/GlobalAdmin/ArtWorkMedia/templates/ArtWorkMedia.html',
                    controller: 'ArtWorkMediaController',
                    'controllerAs': 'ArtWorkMediaCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newArtWorkMedia', {
                    url: '/newArtWorkMedia',
                    templateUrl: './app/GlobalAdmin/ArtWorkMedia/templates/new.html',
                    controller: 'createArtWorkMediaDialogController',
                    'controllerAs': 'newArtWorkMediaCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editArtWorkMedia', {
                    url: '/editArtWorkMedia/:countryId',
                    templateUrl: './app/GlobalAdmin/ArtWorkMedia/templates/edit.html',
                    controller: 'editArtWorkMediaDialogController',
                    'controllerAs': 'editArtWorkMediaCtrl',
                    resolve: {
                        ArtWorkMediaByIdPrepService: ArtWorkMediaByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ArtWorkMediaPrepService.$inject = ['ArtWorkMediaResource']
    function ArtWorkMediaPrepService(ArtWorkMediaResource) {
        return ArtWorkMediaResource.getAllArtWorkMedias({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkMediaByIdPrepService.$inject = ['ArtWorkMediaResource', '$stateParams']
    function ArtWorkMediaByIdPrepService(ArtWorkMediaResource, $stateParams) {
        return ArtWorkMediaResource.getArtWorkMedia({ countryId: $stateParams.countryId }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkMediaResource']
    function AllAwardPrepService(ArtWorkMediaResource) {
        return ArtWorkMediaResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());

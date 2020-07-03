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
                    url: '/editArtWork/:id',
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
                .state('viewArtWork', {
                    url: '/artWork/:id',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/view.html',
                    controller: 'viewArtWorkDialogController',
                    'controllerAs': 'ctrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('ArtWorkpayment', {
                    url: '/ArtWorkpayment/:id',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/payment.html',
                    controller: 'artWorkPaymentDialogController',
                    'controllerAs': 'artWorkPaymentCtrl',
                    resolve: {
                        ArtWorkPaymentByArtWorkIdPrepService: ArtWorkPaymentByArtWorkIdPrepService
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
        return ArtWorkResource.getArtWork({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkResource']
    function AllAwardPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
    ArtWorkPaymentByArtWorkIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkPaymentByArtWorkIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getPayment({ id: $stateParams.id }).$promise;
    }
}());

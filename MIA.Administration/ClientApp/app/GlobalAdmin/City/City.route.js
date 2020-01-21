(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Cities', {
                    url: '/:governrateId/City',
                    views: {
                        '@': {
                            templateUrl: './app/GlobalAdmin/City/templates/Cities.html',
                            controller: 'CityController',
                            'controllerAs': 'CityCtrl',
                        }
                    },
                    resolve: {
                        CitiesPrepService: CitiesPrepService,
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    parent:"Governrates",
                    ncyBreadcrumb: {
                        label: '{{GovernrateName}}'
                    }
                })
                .state('newCity', {
                    url: '/:governrateId/newCity',
                    views: {
                        '@': {
                            templateUrl: './app/GlobalAdmin/City/templates/new.html',
                            controller: 'createCityDialogController',
                            'controllerAs': 'newCityCtrl',
                        }
                    },
                    resolve: {
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    parent:"Governrates",
                    ncyBreadcrumb: {
                        label: '{{GovernrateName}}'
                    }

                })
                .state('editCity', {
                    url: '/:governrateId/editCity/:cityId',
                    views: {
                        '@': {
                            templateUrl: './app/GlobalAdmin/City/templates/edit.html',
                            controller: 'editCityDialogController',
                            'controllerAs': 'editCityCtrl',
                        }
                        
                    },
                    resolve: {
                        CityByIdPrepService: CityByIdPrepService,
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    parent:"Governrates",
                    ncyBreadcrumb: {
                        label: '{{GovernrateName}}'
                    }

                })
        });

    CitiesPrepService.$inject = ['CityResource', '$stateParams']
    function CitiesPrepService(CityResource, $stateParams) {
        return CityResource.getAllCities({ governrateId: $stateParams.governrateId }).$promise;
    }

    CityByIdPrepService.$inject = ['CityResource', '$stateParams']
    function CityByIdPrepService(CityResource, $stateParams) {
        return CityResource.getCity({ cityId: $stateParams.cityId }).$promise;
    }

    GovernrateByIdPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernrateByIdPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getGovernrate({ governrateId: $stateParams.governrateId }).$promise;
    }
}());

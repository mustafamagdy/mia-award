(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Governrates', {
                    url: '/Country/:countryId/Governrate',
                    templateUrl: './app/GlobalAdmin/Governrate/templates/Governrate.html',
                    controller: 'GovernrateController',
                    'controllerAs': 'GovernrateCtrl',
                    resolve: {
                        GovernratesPrepService: GovernratesPrepService,
                        CountryByIdPrepService: CountryByIdPrepService ,
                        GovernrateSearchPrepService:GovernrateSearchPrepService                       
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }
                })
                .state('newGovernrate', {
                    url: '/Country/:countryId/newGovernrate',
                    templateUrl: './app/GlobalAdmin/Governrate/templates/new.html',
                    controller: 'createGovernrateDialogController',
                    'controllerAs': 'newGovernrateCtrl',
                    resolve: {
                        CountryByIdPrepService: CountryByIdPrepService                        
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }

                })
                
                .state('editGovernrate', {
                    url: '/Country/:countryId/editGovernrate/:governrateId',
                    templateUrl: './app/GlobalAdmin/Governrate/templates/edit.html',
                    controller: 'editGovernrateDialogController',
                    'controllerAs': 'editGovernrateCtrl',
                    resolve: {
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                        CountryByIdPrepService: CountryByIdPrepService                        
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }

                })
        });

    GovernratesPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernratesPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getAllGovernrates({ countryId: $stateParams.countryId }).$promise;
    }

    GovernrateByIdPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernrateByIdPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getGovernrate({ governrateId: $stateParams.governrateId }).$promise;
    }
    CountryByIdPrepService.$inject = ['CountryResource', '$stateParams']
    function CountryByIdPrepService(CountryResource, $stateParams) {
        return CountryResource.getCountry({ countryId: $stateParams.countryId }).$promise;
    }
    GovernrateSearchPrepService.$inject = ['GovernrateResource']
    function GovernrateSearchPrepService(GovernrateResource) {
        return GovernrateResource.search().$promise;
    }
    

}());

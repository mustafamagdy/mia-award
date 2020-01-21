(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Regions', {
                    url: '/Country/:countryId/Region',
                    templateUrl: './app/GlobalAdmin/Region/templates/Regions.html',
                    controller: 'RegionController',
                    'controllerAs': 'RegionCtrl',
                    resolve: {
                        RegionsPrepService: RegionsPrepService,
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
                .state('newRegion', {
                    url: '/Country/:countryId/newRegion',
                    templateUrl: './app/GlobalAdmin/Region/templates/new.html',
                    controller: 'createRegionDialogController',
                    'controllerAs': 'newRegionCtrl',
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
                .state('editRegion', {
                    url: '/Country/:countryId/editRegion/:regionId',
                    templateUrl: './app/GlobalAdmin/Region/templates/edit.html',
                    controller: 'editRegionDialogController',
                    'controllerAs': 'editRegionCtrl',
                    resolve: {
                        RegionByIdPrepService: RegionByIdPrepService,
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

    RegionsPrepService.$inject = ['RegionResource', '$stateParams']
    function RegionsPrepService(RegionResource, $stateParams) {
        return RegionResource.getAllRegions({ countryId: $stateParams.countryId }).$promise;
    }

    RegionByIdPrepService.$inject = ['RegionResource', '$stateParams']
    function RegionByIdPrepService(RegionResource, $stateParams) {
        return RegionResource.getRegion({ regionId: $stateParams.regionId }).$promise;
    }
    CountryByIdPrepService.$inject = ['CountryResource', '$stateParams']
    function CountryByIdPrepService(CountryResource, $stateParams) {
        return CountryResource.getCountry({ countryId: $stateParams.countryId }).$promise;
    }

}());

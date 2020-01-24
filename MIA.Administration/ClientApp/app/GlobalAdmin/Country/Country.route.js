(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Countries', {
                    url: '/Country',
                    templateUrl: './app/GlobalAdmin/Country/templates/Countries.html',
                    controller: 'CountryController',
                    'controllerAs': 'CountryCtrl',
                    resolve: {
                        CountryPrepService: CountryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['9'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newCountry', {
                    url: '/newCountry',
                    templateUrl: './app/GlobalAdmin/Country/templates/new.html',
                    controller: 'createCountryDialogController',
                    'controllerAs': 'newCountryCtrl',
                    data: {
                        permissions: {
                            only: ['9'],
                            redirectTo: 'root'
                        }
                    }


                })
                .state('editCountry', {
                    url: '/editCountry/:countryId',
                    templateUrl: './app/GlobalAdmin/Country/templates/edit.html',
                    controller: 'editCountryDialogController',
                    'controllerAs': 'editCountryCtrl',
                    resolve: {
                        CountryByIdPrepService: CountryByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['9'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    CountryPrepService.$inject = ['CountryResource']
    function CountryPrepService(CountryResource) {
        return CountryResource.getAllCountries().$promise;
    }

    CountryByIdPrepService.$inject = ['CountryResource', '$stateParams']
    function CountryByIdPrepService(CountryResource, $stateParams) {
        return CountryResource.getCountry({ countryId: $stateParams.countryId }).$promise;
    }

}());

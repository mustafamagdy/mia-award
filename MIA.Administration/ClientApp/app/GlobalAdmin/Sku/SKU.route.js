(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('SKU', {
                    url: '/SKU',
                    templateUrl: './app/GlobalAdmin/Sku/templates/SKU.html',
                    controller: 'SKUController',
                    'controllerAs': 'SKUCtrl',
                    resolve: {
                        SKUPrepService: SKUPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newSKU', {
                    url: '/newSKU',
                    templateUrl: './app/GlobalAdmin/Sku/templates/new.html',
                    controller: 'createSKUDialogController',
                    'controllerAs': 'newSKUCtrl',
                    resolve: {
                        GeneratCodePrepService: GeneratCodePrepService
                    },
                    
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }


                })
                .state('editSKU', {
                    url: '/editSKU/:skuId',
                    templateUrl: './app/GlobalAdmin/Sku/templates/edit.html',
                    controller: 'editSKUDialogController',
                    'controllerAs': 'editSKUCtrl',
                    resolve: {
                        SKUByIdPrepService: SKUByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    SKUPrepService.$inject = ['SKUResource']
    function SKUPrepService(SKUResource) {
        return SKUResource.getAllSKUs().$promise;
    }
    GeneratCodePrepService.$inject = ['SKUResource', '$stateParams']
    function GeneratCodePrepService(SKUResource, $stateParams) {
        return SKUResource.GenerateNewSKUCode().$promise;
    }
    SKUByIdPrepService.$inject = ['SKUResource', '$stateParams']
    function SKUByIdPrepService(SKUResource, $stateParams) {
        return SKUResource.getSKU({ skuId: $stateParams.skuId }).$promise;
    }

}());

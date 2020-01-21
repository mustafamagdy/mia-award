(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Zone', {
                    url: '/Zone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/Zone.html',
                    controller: 'ZoneController',
                    'controllerAs': 'ZoneCtrl',
                    resolve: {
                        ZonePrepService: ZonePrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newZone', {
                    url: '/newZone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/new.html',
                    controller: 'createZoneDialogController',
                    'controllerAs': 'newZoneCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                        ZoneNewCodePrepService: ZoneNewCodePrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editZone', {
                    url: '/editZone/:id',
                    templateUrl: './app/GlobalAdmin/Zone/templates/edit.html',
                    controller: 'editZoneDialogController',
                    'controllerAs': 'editZoneCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                     //   ZoneByIdPrepService: ZoneByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                
                .state('CreateMap', {
                    url: '/CreateMap/:zoneId',
                    templateUrl: './app/GlobalAdmin/Zone/templates/newMap.html',
                    controller: 'zoneMapController',
                    'controllerAs': 'zoneMapCtrl',
                    resolve: { 
                        ZoneByIdPrepService: ZoneByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('ZoneDetails', {
                    url: '/ZoneDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Zone/templates/ZoneDetails.html',
                    controller: 'ZoneDetailsController',
                    'controllerAs': 'ZoneDetailsCtrl',
                    resolve: {
                        ZoneDetaqilsByZoneIdPrepService: ZoneDetaqilsByZoneIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                
                .state('newZoneDetails', {
                    url: '/newZoneDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Zone/templates/NewZoneDetailsDialog.html',
                    controller: 'createZoneDetailsDialog',
                    'controllerAs': 'createZoneDetailsDialoglCtrl',
                    resolve: {
                        SKUConversionPrepService: SKUConversionPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('RetailerZone', {
                    url: '/RetailerZone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/RetailerZone.html',
                    controller: 'createRetailerZoneController',
                    'controllerAs': 'createRetailerZoneCtrl',
                    resolve: {
                        getRetailerZonePrepService: getRetailerZonePrepService
                    },
                    data: {
                        permissions: {
                            only: ['19'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('DistributorZone', {
                    url: '/DistributorZone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/DistributorZone.html',
                    controller: 'createDistributorZoneController',
                    'controllerAs': 'createDistributorZoneCtrl',
                    resolve: {
                        getDistributorZonePrepService: getDistributorZonePrepService
                    },
                    data: {
                        permissions: {
                            only: ['19'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ZonePrepService.$inject = ['ZoneResource']
    function ZonePrepService(ZoneResource) {
        return ZoneResource.getAllZones().$promise;
    }

    ZoneByIdPrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneByIdPrepService(ZoneResource, $stateParams) {
        return ZoneResource.getZone({ zoneId: $stateParams.zoneId }).$promise;
    }

    ZoneDetaqilsByZoneIdPrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneDetaqilsByZoneIdPrepService(ZoneResource, $stateParams) {
        return ZoneResource.getZoneDetails({ produdctId: $stateParams.produdctId }).$promise;
    }
    getDistributorZonePrepService.$inject = ['ZoneResource', '$stateParams']
    function getDistributorZonePrepService(ZoneResource, $stateParams) {
        return ZoneResource.getDistributorZone({forTenant:true}).$promise;
    }
    getRetailerZonePrepService.$inject = ['ZoneResource', '$stateParams']
    function getRetailerZonePrepService(ZoneResource, $stateParams) {
        return ZoneResource.getRetailerZone({forTenant:true}).$promise;
    }
    

    ZoneNewCodePrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneNewCodePrepService(ZoneResource, $stateParams) {
        return ZoneResource.generateNewZoneCode().$promise;
    }
 
    SKUConversionPrepService.$inject = ['ZoneResource']
    function SKUConversionPrepService(ZoneResource) {
        return ZoneResource.getAllSKUConversion().$promise;
    }

    /*Category */
    CategoryPrepService.$inject = ['CategoryResource']
    function CategoryPrepService(CategoryResource) {
        return CategoryResource.getAllActiveCategories().$promise;
    }
}());

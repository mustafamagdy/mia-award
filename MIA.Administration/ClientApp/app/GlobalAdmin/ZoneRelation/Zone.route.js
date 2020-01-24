(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('newZoneRelation', {
                    url: '/newZoneRelation/:zoneId',
                    templateUrl: './app/GlobalAdmin/ZoneRelation/templates/new.html',
                    controller: 'createZoneRelationDialogController',
                    'controllerAs': 'newZoneRelationCtrl',
                    resolve: {
                        ActiveDistributersPrepService: ActiveDistributersPrepService,
                        ActiveRetailersPrepService: ActiveRetailersPrepService,
                        ActiveProductsPrepService: ActiveProductsPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editZoneRelation', {
                    url: '/editZoneRelation/:zoneId',
                    templateUrl: './app/GlobalAdmin/ZoneRelation/templates/editZone.html',
                    controller: 'editZoneRelationController',
                    'controllerAs': 'editZoneRelationCtrl',
                    resolve: {
                        ActiveDistributersPrepService: ActiveDistributersPrepService,
                        ZoneDistributerPrepService: ZoneDistributerPrepService,
                        ActiveRetailersPrepService: ActiveRetailersPrepService,
                        ActiveProductsPrepService: ActiveProductsPrepService,
                        ZoneByIdPrepService: ZoneByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('zoneRelationDetails', {
                    url: '/zoneRelationDetails/:zoneId',
                    templateUrl: './app/GlobalAdmin/ZoneRelation/templates/ZoneDetails.html',
                    controller: 'zoneRelationDetailsController',
                    'controllerAs': 'zoneRelationDetailsCtrl',
                    resolve: {
                        ActiveDistributersPrepService: ActiveDistributersPrepService,
                        ZoneDistributerPrepService: ZoneDistributerPrepService,
                        SelectedRetailersPrepService: SelectedRetailersPrepService,
                        SelectedProductsPrepService: SelectedProductsPrepService,
                        ZoneByIdPrepService: ZoneByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
        });



    ZoneByIdPrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneByIdPrepService(ZoneResource, $stateParams) {
        return ZoneResource.getZone({ zoneId: $stateParams.zoneId }).$promise;
    }
    ZoneRelationByIdPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ZoneRelationByIdPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneRelation({ zoneId: $stateParams.zoneId }).$promise;
    }

    /**Retail */

    ActiveRetailersPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ActiveRetailersPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneRetailer({ zoneId: $stateParams.zoneId }).$promise;
    }
    SelectedRetailersPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function SelectedRetailersPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneRetailer({ zoneId: $stateParams.zoneId, isChecked: true }).$promise;
    }

    /**Product */
    SelectedProductsPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function SelectedProductsPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneProduct({ zoneId: $stateParams.zoneId , isChecked: true}).$promise;
    }
    ActiveProductsPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ActiveProductsPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneProduct({ zoneId: $stateParams.zoneId }).$promise;
    }

    /**Distribter */
    ZoneDistributerPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ZoneDistributerPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getDistributor({ zoneId: $stateParams.zoneId }).$promise;
    }
    ActiveDistributersPrepService.$inject = ['DistributorsResource']
    function ActiveDistributersPrepService(DistributorsResource) {
        return DistributorsResource.GetAllActiveDistributers().$promise;
    }
}());

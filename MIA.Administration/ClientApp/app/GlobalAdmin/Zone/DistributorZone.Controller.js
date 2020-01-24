(function () {
    'use strict';

    angular
        .module('home')
        .controller('createDistributorZoneController', ['blockUI','$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ZoneResource', 'getDistributorZonePrepService',
            'ToastService', createDistributorZoneController]);


    function createDistributorZoneController(blockUI,$translate, $uibModal, appCONSTANTS, $scope, ZoneResource, getDistributorZonePrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.currentPage = 1;
          // vm.retailers = {};
        // vm.retailers.entities = RetailerPrepService.results;
        // vm.retailerTotalCount = RetailerPrepService.totalCount;
        
        vm.totalCount = getDistributorZonePrepService.totalCount;
        vm.DistributorZoneList = getDistributorZonePrepService.results;
        $scope.DistributorZones = getDistributorZonePrepService;
        console.log(getDistributorZonePrepService);
        console.log($scope.DistributorZones)
        function refreshDistributorZones() {
            blockUI.start("Loading...");
            var k = ZoneResource.getDistributorZone({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.DistributorZones = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshDistributorZones();
        }
        blockUI.stop();

    }


})();

(function () {
    'use strict';

    angular
        .module('home')
        .controller('createRetailerZoneController', ['blockUI','$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ZoneResource', 'getRetailerZonePrepService',
            'ToastService', createRetailerZoneController]);


    function createRetailerZoneController(blockUI,$translate, $uibModal, appCONSTANTS, $scope, ZoneResource, getRetailerZonePrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading...");
 
        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.currentPage = 1;
          // vm.retailers = {};
        // vm.retailers.entities = RetailerPrepService.results;
        // vm.retailerTotalCount = RetailerPrepService.totalCount;
        
        vm.totalCount = getRetailerZonePrepService.totalCount;
        vm.RetailerZoneList = getRetailerZonePrepService.results;
        $scope.RetailerZones = getRetailerZonePrepService;
        console.log(getRetailerZonePrepService);
        console.log($scope.RetailerZones)
        function refreshRetailerZones() {
            blockUI.start("Loading...");
            var k = ZoneResource.getRetailerZone({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.RetailerZones = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.filterRetailer = function (searchText, page) {
            
            refreshRetailer(searchText, page);
            vm.searchText = "";
          }
        function refreshRetailer(searchTitle, page) {
            blockUI.start("Loading...");
            var k = ZoneResource.getRetailer({ productId: $stateParams.productId, description: searchTitle, page: page }).$promise.then(function (results) {
              vm.retailers.entities = results.results;
              vm.retailerTotalCount = results.totalCount;
              blockUI.stop();
            },
              function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
              });
          }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshRetailerZones();
        }
        blockUI.stop();

    }

})();

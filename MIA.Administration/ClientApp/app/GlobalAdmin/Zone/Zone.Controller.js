(function () {
    'use strict';

    angular
        .module('home')
        .controller('ZoneController', ['blockUI','$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ZoneResource', 'ZonePrepService',
            'ToastService', ZoneController]);


    function ZoneController(blockUI,$translate, $uibModal, appCONSTANTS, $scope, ZoneResource, ZonePrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[9].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = ZonePrepService.totalCount;
        $scope.Zones = ZonePrepService;
        console.log($scope.Zones)
  // vm.retailers = {};
        // vm.retailers.entities = RetailerPrepService.results;
        // vm.retailerTotalCount = RetailerPrepService.totalCount;
        
        function confirmationDelete(model) {
            var updateObj = new ZoneResource();
            updateObj.id = model.ZoneId;
            updateObj.$delete({ id: model.ZoneId }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        refreshZones();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }

        function refreshZones() {
            blockUI.start("Loading...");
            var k = ZoneResource.getAllZones({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.Zones = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeStatus = function (model) {
          
            var updateObj = new ZoneResource();
            updateObj.ZoneId = model.ZoneId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$changeStatus({ ZoneId: model.ZoneId, status: updateObj.status }).then(
                function (data, status) {
                    refreshZones();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshZones();
        }
        blockUI.stop();

    }

})();

(function () {
    'use strict';
    angular
        .module('home')
        .controller('ManufactureController', ['ManfacturePrepService', '$rootScope', 'appCONSTANTS', '$translate', 'ManufactureResource',
            'blockUI', '$uibModal', 'ManufacturePrepService',
            'ToastService', ManufactureController]);

    function ManufactureController(ManfacturePrepService, $rootScope, appCONSTANTS, $translate, ManufactureResource,
        blockUI, $uibModal, ManufacturePrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[12].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        vm.Manfactures = {};
        vm.totalCount = ManfacturePrepService.totalCount;
        console.log(ManfacturePrepService.totalCount);
        vm.totalCount = ManufacturePrepService.totalCount;
        vm.ManufactureList = ManufacturePrepService;
        function refreshManufactures() {
            blockUI.start("Loading...");

            var k = ManufactureResource.getAllManufactures({ page: vm.currentPage }).$promise.then(function (results) {
                vm.ManufactureList = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeManufactureStatus = function (model) {
            

            var updateObj = new ManufactureResource();
            updateObj.manufactureId = model.manufactureId;
            updateObj.status = (model.isActive == true ? false : true);
            //updateObj.status = model.status;
            updateObj.$ChangeManufacture({ manufactureId: model.manufactureId, status: updateObj.status }).then(
                function (data, status) {
                    
                    refreshManufactures();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        function confirmationDelete(model) {
            
            var updateObj = new ManufactureResource();
            updateObj.manufactureId = model.manufactureId;
            updateObj.$delete({ manufactureId: model.manufactureId }).then(
                function (data, status) {
                    refreshManufactures();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, manufactureId) {
            
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return manufactureId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
     
        vm.filterManfacture = function (name, page) {
            
            refreshManfacture(name, page);
            vm.name = "";
        }
        function refreshManfacture(name, page) {
            blockUI.start("Loading...");
            var k = ManufactureResource.search({ name: name, page: page }).$promise.then(function (results) {
                vm.ManufactureList = results;
                vm.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshmanufactures();
        }
    }

})();

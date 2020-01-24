(function () {
    'use strict';

    angular
        .module('home')
        .controller('SKUController', ['$uibModal', '$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'SKUResource', 'SKUPrepService', '$localStorage', 'appCONSTANTS',
            'ToastService', SKUController]);

    function SKUController($uibModal, $rootScope, blockUI, $scope, $filter, $translate,
        $state, SKUResource, SKUPrepService, $localStorage, appCONSTANTS, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[8].children[0]).addClass("active")

        blockUI.start("Loading...");
        var vm = this;
        $scope.totalCount = SKUPrepService.totalCount;
        $scope.SKUs = SKUPrepService.results;
        console.log($scope.SKUs);

        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshSKUs();
        }
        function confirmationDelete(model) {
            
            var updateObj = new SKUResource();
            updateObj.skuId = model.skuId;
            updateObj.$delete({ skuId: model.skuId }).then(
                function (data, status) {
                    refreshSKUs();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        vm.openDeleteDialog = function (model, titles, skuId) {

            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return titles },
                    itemId: function () { return skuId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        
        function change(sku, isDeleted) {
            var updateObj = new SKUResource();
            updateObj.skuId = sku.skuId;
            if (!isDeleted)
                updateObj.status = (sku.status == true ? false : true);
            updateObj.isDeleted = sku.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshSKUs();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    sku.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        
        vm.ChangeSKYStatus = function (model) {
            
            var updateObj = new SKUResource();
            updateObj.skuId = model.skuId;
            updateObj.status = (model.isActive == true ? false : true);
            //updateObj.status = model.status;
            updateObj.$ChangeSKYStatus({ skuId: model.skuId, status: updateObj.status }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        refreshSKUs();
                        $state.go('SKU');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        

        function refreshSKUs() {
            blockUI.start("Loading...");

            var k = SKUResource.getAllSKUs({ page: vm.currentPage }).$promise.then(function (result) {
                $scope.SKUs = result.results;
                blockUI.stop();

            },

                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();
    }

})();

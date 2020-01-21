(function () {
    'use strict';

    angular
        .module('home')
        .controller('ProductController', ['blockUI', '$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ProductResource', 'ProductPrepService',
            'ToastService', ProductController]);


    function ProductController(blockUI, $translate, $uibModal, appCONSTANTS, $scope, ProductResource, ProductPrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = ProductPrepService.totalCount;
        $scope.Products = ProductPrepService;
        console.log($scope.Products)


        // vm.Products = {};
        // vm.Products.entities = ProductPrepService.results;
        // vm.ProductTotalCount = ProductPrepService.totalCount;

        function confirmationDelete(model) {
            
            var updateObj = new ProductResource();
            updateObj.id = model.productId;
            updateObj.$delete({ id: model.productId }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        refreshProducts();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
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

        function refreshProducts() {
            blockUI.start("Loading...");
            var k = ProductResource.getAllProducts({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.Products = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeStatus = function (model) {
            
            var updateObj = new ProductResource();
            updateObj.productId = model.productId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$changeStatus({ productId: model.productId, status: updateObj.status }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        refreshProducts();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    } else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }
        vm.filterProduct = function (description, page) {
            
            refreshProduct(description, page);
            vm.description = "";
        }
        function refreshProduct(description, page) {
            blockUI.start("Loading...");
            var k = ProductResource.search({ Title: description, page: page }).$promise.then(function (results) {
                $scope.Products = results;
                $scope.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshProducts();
        }
        blockUI.stop();

    }

})();
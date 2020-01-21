
(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderDetailsByTenantController', ['blockUI', '$translate', '$uibModal', 'appCONSTANTS', '$stateParams', 'OrderResource', 'OrderDetaqilsByOrderIdPrepService',
            'ToastService', OrderDetailsByTenantController]);


    function OrderDetailsByTenantController(blockUI, $translate, $uibModal, appCONSTANTS, $stateParams, OrderResource, OrderDetaqilsByOrderIdPrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.totalCount = OrderDetaqilsByOrderIdPrepService.totalCount;
        vm.OrderDetails = OrderDetaqilsByOrderIdPrepService.results;
        vm.listSelected = [];
        getOrderById();
        function getOrderById() {
            blockUI.start("Loading...");
            var k = OrderResource.getOrderById({ orderId: $stateParams.orderId }).$promise.then(function (results) {

                vm.order = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function getOrderDetailsById() {
            blockUI.start("Loading...");
            var k = OrderResource.getOrderDetails({ orderId: $stateParams.orderId }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.OrderDetails = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();
        vm.forwardSelected = function () {
            blockUI.start("Loading...");
            var updateObj = new OrderResource();
            updateObj.orderItemIds = vm.listSelected;
            updateObj.$forwordFor().then(
                function (data, status) {
                    blockUI.stop();
                    
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        vm.listSelected = [];
                        getOrderDetailsById();
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    blockUI.stop();

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            // var i;
            // for (i = 0; i < vm.OrderDetails.length; i++) {
            //     if (vm.OrderDetails[i].isChecked) {  //   if (vm.listSelected != null)
            //         
            //         if (vm.listSelected !== vm.OrderDetails[i].orderItemId)
            //             vm.listSelected.push(vm.OrderDetails[i].orderItemId);

            //     }
            // else {
            //     var index = vm.listSelected.indexOf(vm.OrderDetails[i].orderItemId);
            //     vm.listSelected.splice(index, 1);
            // }
            // else
            //     vm.listSelected = vm.OrderDetails[i].orderItemId;

            //  }
        }
        vm.cancelSelected = function () {
            blockUI.start("Loading...");
            var updateObj = new OrderResource();
            updateObj.orderItemIds = vm.listSelected;
            updateObj.$cancelFor().then(
                function (data, status) {
                    
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        vm.listSelected = [];
                        getOrderDetailsById();
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    blockUI.stop();

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }

        vm.toggleSelection = function toggleSelection(order) {
            var idx = vm.listSelected.indexOf(order);
            if (idx > -1) {
                // is currently selected
                vm.listSelected.splice(idx, 1);
            }
            else {
                // is newly selected
                vm.listSelected.push(order);
            }
        };
        vm.refreshDetails = function () {
            getOrderDetailsById();
        }
    }

})();

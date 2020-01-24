
(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderDetailsController', ['blockUI', '$stateParams', 'appCONSTANTS', '$scope', 'OrderResource', 'OrderDetaqilsByOrderIdPrepService',
            'ToastService', OrderDetailsController]);


    function OrderDetailsController(blockUI, $stateParams, appCONSTANTS, $scope, OrderResource, OrderDetaqilsByOrderIdPrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.totalCount = OrderDetaqilsByOrderIdPrepService.totalCount;
        vm.OrderDetails = OrderDetaqilsByOrderIdPrepService;
        vm.listSelected = [];
        console.log(vm.OrderDetails);
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
        }
        vm.refreshOrder = function () {
            
            getOrderById();
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


    }

})();

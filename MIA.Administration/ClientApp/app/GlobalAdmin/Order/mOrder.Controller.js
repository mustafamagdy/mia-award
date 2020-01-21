(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderMController', ['blockUI', 'appCONSTANTS', '$scope', '$interval', 'OrderResource', '$state', 'ToastService', OrderMController]);

    function OrderMController(blockUI, appCONSTANTS, $scope, $interval, OrderResource, $state, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");
        var vm = this;
        vm.connectionId = 0;
        vm.connection = new signalR.HubConnectionBuilder().withUrl(appCONSTANTS.SIGNAL_URL + "newOrder").build();

        vm.connection.on("NewOrder", function () {
            //  ToastService.show("right", "bottom", "fadeInUp", "لديك طلب جديد", "success");
            refreshOrders();
            return console.log(vm.connection);
        });

        vm.connection.on("RefreshOrder", function () {
            refreshOrders();
            return console.log(vm.connection);
        });

        vm.connection.start().then(function () {

            console.log(vm.connection);

        }).catch(function (err) {
            return console.error(err.toString());
        });

        vm.appCONSTANTS = appCONSTANTS;
        refreshOrders();
        $scope.openOrder = function (orderId) {
            blockUI.start("Loading...");
            

            vm.connection.invoke('getConnectionId')
                .then(function (connectionId) {
                    
                    vm.connectionId = connectionId;
                    vm.connection.invoke('refresh'); // Send the connectionId to controller
                });


            var updateObj = new OrderResource();
            updateObj.orderId = orderId;
            updateObj.$changeStatusOpen({ orderId: orderId }).then(
                function (data, status) {
                    blockUI.stop();
                    $state.go('OrderDetailsByTenant', { orderId: orderId });
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        function refreshOrders() {
            blockUI.start("Loading...");
            var k = OrderResource.getAllOrdersBy({ page: vm.currentPage }).$promise.then(function (results) {
                vm.Orders = results.results;
                vm.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshOrders();
        }
        blockUI.stop();
        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderIooController', ['blockUI', '$translate', '$uibModal', 'appCONSTANTS', '$scope', 'OrderResource',
            'ToastService', OrderIooController]);

    function OrderIooController(blockUI, $translate, $uibModal, appCONSTANTS, $scope, OrderResource, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        refreshOrders();
        vm.filterOrder = function (all) {

            if (all) { 
                vm.searchBasket = "";
                vm.searchRetailer = "";
                vm.searchOrder = "";
                vm.from = "";
                vm.to = "";
            }
            filterBasket();
        }

        function filterBasket() {
            blockUI.start("Loading...");
            var k = OrderResource.getFilterBaskets({ retailerTitle: vm.searchRetailer, orderNo: vm.searchOrder, basketNo: vm.searchBasket, from: vm.from, to: vm.to, page: vm.currentPage }).$promise.then(function (results) {
                vm.Orders = results.results;
                vm.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        function refreshOrders() {
            blockUI.start("Loading...");
            var k = OrderResource.getAllBasketsBy({ page: vm.currentPage }).$promise.then(function (results) {
                vm.Orders = results.results;
                vm.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeStatus = function (model) {
            
            var updateObj = new OrderResource();
            updateObj.OrderId = model.OrderId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$changeStatus({ OrderId: model.OrderId, status: updateObj.status }).then(
                function (data, status) {
                    refreshOrders();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshOrders();
        }
        blockUI.stop();

        vm.dateIsValid = false;
        $scope.dateFromChange = function () {
            if ($('#startdate').data('date') == null || $('#startdate').data('date') == "") {
                vm.dateIsValid = false;
                // $scope.$apply();
            }
            else {
                
                vm.from = $('#startdate').data('date');
                $scope.$apply();
            }
        }

        $scope.dateToChange = function () {
            if ($('#enddate').data('date') == null || $('#enddate').data('date') == "") {
                vm.dateIsValid = false;
                // $scope.$apply();
            }
            else {
                
                vm.to = $('#enddate').data('date');
                $scope.$apply();
            }
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
    }

})();

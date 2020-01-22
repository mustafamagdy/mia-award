(function () {
    'use strict';

    angular
        .module('home')
        .controller('userManufactureController', ['blockUI', '$translate', '$state', 'UserResource',
            '$scope', 'ToastService', userManufactureController]);

    function userManufactureController(blockUI, $translate, $state, UserResource, $scope, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        
        var vm = this;
        vm.currentTenantType = 0;
        vm.masterUserId = 0;
        blockUI.start("Loading...");
        
        if ($scope.user.userTypeId == 4 || $scope.user.userTypeId == 5)
            refreshUsers()
        if ($scope.user.userTypeId == 2 || $scope.user.userTypeId == 7)
            refreshManufactureUsers($scope.user.tenantId);



        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 2, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        function refreshManufactureUsers(tenant) {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersForManufacture({ tenantId: tenant, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {
            
            var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null){
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                        return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error"); 
                }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {
            
            var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.userType = 2;
            updateObj.$changeRole({ userType: 2, userId: model.userId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());
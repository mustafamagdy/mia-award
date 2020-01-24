(function () {
    'use strict';

    angular
        .module('home')
        .controller('userDistributerController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userDistributerController]);

    function userDistributerController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        vm.close = function () {
            
            $state.go('users');
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        refreshUsers()
        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 3, page: vm.currentPage }).$promise.then(function (results) {

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
                    if (data.message != null) {
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                            return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");

                    } else {
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
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId }).then(
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
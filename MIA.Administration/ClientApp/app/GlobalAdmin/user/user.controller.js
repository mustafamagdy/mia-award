(function () {
    'use strict';

    angular
        .module('home')
        .controller('userController', ['blockUI', '$translate', '$state', 'UserResource',
            'RoleResource', 'ToastService', userController]);

    function userController(blockUI, $translate, $state, UserResource, RoleResource, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        
        refreshRoles();
        vm.close = function () {

            $state.go('users');
        }


        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: vm.currentTenantType, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        vm.changeUserType = function () {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ roleName: vm.selectedRole.name }).$promise.then(function (results) {
                vm.currentTenantType = vm.selectedRole;
                
                vm.totalCount = results.length;
                vm.userList = results;
                console.log(vm.userList);
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
            refreshUsers();
        }
        blockUI.stop();

        vm.ChangeStatus = function (model) {

            var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
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

        function refreshRoles() {
            var k = RoleResource.getAllActivateRoles().$promise.then(function (results) {
                
                vm.roleList = results;
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }
    }

}());
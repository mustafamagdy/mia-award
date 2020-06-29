(function () {
    'use strict';

    angular
        .module('home')
        .controller('userController', ['blockUI', '$translate', '$state', 'UserResource',
            'RoleResource', 'ToastService', userController]);

    function userController(blockUI, $translate, $state, UserResource, RoleResource, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[8].children[0]).addClass("active")

        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");

        refreshRoles();
        vm.close = function () {

            $state.go('users');
        }


        function refreshUsers() {
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


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        vm.changeUserType = function () {
            refreshUsers()
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();

        function refreshRoles() {
            var k = RoleResource.getAllActivateRoles().$promise.then(function (results) {

                vm.roleList = results;
                blockUI.stop();
                vm.selectedRole = vm.roleList[0];
                refreshUsers()
            },
                function (data, status) {

                    blockUI.stop();
                });
        }
    }

}());
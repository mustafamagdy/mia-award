(function () {
    'use strict';

    angular
        .module('home')
        .controller('addUserController', ['blockUI', 'RoleResource', '$stateParams', '$translate', '$state', 'UserResource', '$scope', 'ToastService', addUserController]);

    function addUserController(blockUI, RoleResource, $stateParams, $translate, $state, UserResource, $scope, ToastService, ) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        var vm = this;
        vm.selectedRoleId = 0;
        refreshRoles();
        blockUI.start("Loading...");
        vm.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
        vm.selectedModuleList = [];
        vm.selectedModule = "";
        vm.UnSelectedPermissions = [];

        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.UnSelectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.UnSelectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.UnSelectedPermissions.indexOf(obj.permessionId);
                vm.UnSelectedPermissions.splice(index, 1);
            }
        }
        vm.AddNewUser = function () {

            blockUI.start("Loading...");
            var newUser = new UserResource();
            newUser.fullName = vm.fullName;
            newUser.email = vm.email;
            newUser.phoneNumber = vm.mobileNumber;
            newUser.password = vm.password;
            newUser.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.id == null)
                        ToastService.show("right", "bottom", "fadeInUp", data, "error");
                    else {
                        debugger;
                        vm.selectedRole.forEach(role => {
                            addUserToRole(role.name, data.id);
                        });
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");
                        $state.go('users');
                    }
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        vm.close = function () {
            $state.go('users');
        }
        blockUI.stop();

        function addUserToRole(role, userId) { 

            var newRole = new RoleResource();
            newRole.$addUserToRole({ roleName: role, userId: userId }).then(
                function (data, status) {
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );


        }
        function refreshRoles() {
            var k = RoleResource.getAllActivateRoles().$promise.then(function (results) {
                debugger;
                vm.roleList = results;
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }


    }

}());
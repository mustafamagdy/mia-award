(function () {
    'use strict';

    angular
        .module('home')
        .controller('editRoleDialogController', ['blockUI', '$filter', '$state',
            'appCONSTANTS', '$translate', 'RoleResource', 'PermissionPrepService', 'ToastService',
            'RoleByIdPrepService', editRoleDialogController])

    function editRoleDialogController(blockUI, $filter, $state, appCONSTANTS, $translate, RoleResource,
        PermissionPrepService, ToastService, RoleByIdPrepService) {
        var vm = this;

        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.language = appCONSTANTS.supportedLanguage;
        vm.permissionList = PermissionPrepService;
        vm.Role = RoleByIdPrepService;
        console.log(RoleByIdPrepService);
        vm.selectedPermissions = [];

        var i;
        for (i = 0; i < vm.Role.permessionTree.length; i++) {
            
            angular.forEach(vm.Role.permessionTree[i].permessions, function (valueModule, keyModule) {
                if (valueModule.seclected)
                    vm.selectedPermissions.push(valueModule.permessionId);
            });

        }
        vm.UpdateRole = function () {
            
            blockUI.start("Loading...");
            console.log(vm.Role);
            var updateObj = new RoleResource();
            updateObj.roleId = vm.Role.userGroupId;
            updateObj.roles = vm.selectedPermissions;
            updateObj.titles = vm.Role.titles;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('Role');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.selectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.selectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.selectedPermissions.indexOf(obj.permessionId);
                vm.selectedPermissions.splice(index, 1);
            }
        }
        vm.ChangeSelectedModule = function () {
            angular.forEach(vm.selectedModule, function (value, key) {
                angular.forEach(value.permessions, function (valuePermission, key1) {
                    if (vm.selectedModuleList != 0) {
                        if (!vm.selectedModuleList.includes(valuePermission)) {
                            vm.selectedModuleList.push(valuePermission);
                        }
                        // else
                        //     vm.selectedModuleList.splice(valuePermission, 1);

                    }
                    else
                        vm.selectedModuleList.push(valuePermission);

                });
            });

        }
        vm.Close = function () {
            $state.go('Role');
        }
    }
}());

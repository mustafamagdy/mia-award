(function () {
    'use strict';

    angular
        .module('home')
        .controller('editRoleDialogController', ['blockUI', '$filter', '$state',
            '$stateParams', '$translate', 'RoleResource', 'PermissionPrepService', 'ModulePrepService', 'ToastService',
            'RoleByIdPrepService', editRoleDialogController])

    function editRoleDialogController(blockUI, $filter, $state, $stateParams, $translate, RoleResource,
        PermissionPrepService, ModulePrepService, ToastService, RoleByIdPrepService) {
        var vm = this;

        vm.permissionList = PermissionPrepService;
        vm.moduleList = ModulePrepService;
        console.log(vm.permissionList);
        vm.name = $stateParams.name;
        vm.rolePermissions = RoleByIdPrepService;
        vm.selectedPermissions = [];
        vm.newSelectedPermissions = [];
        vm.removedSelectedPermissions = [];

        var i;
        for (i = 0; i < vm.rolePermissions.length; i++) {
            var indexPerm = vm.permissionList.indexOf($filter('filter')(vm.permissionList, { 'id': vm.rolePermissions[i].id }, true)[0]);
            vm.selectedPermissions.push(vm.permissionList[indexPerm]);
        }
        vm.UpdateRole = function () {

            blockUI.start("Loading...");
            console.log(vm.rolePermissions);
            var updateObj = new RoleResource();
            updateObj.roleId = vm.rolePermissions.userGroupId;
            updateObj.roles = vm.selectedPermissions;
            updateObj.titles = vm.rolePermissions.titles;
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
            var checkIfPermissionExist = vm.selectedPermissions.indexOf(obj.id);
            if (checkIfPermissionExist == -1) {
                vm.selectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.selectedPermissions.indexOf(obj.permessionId);
                vm.selectedPermissions.splice(index, 1);
            }
        }
        vm.changePermissionList = function (name) {
         
            
            refreshPermissions(name);
        }


        function refreshPermissions(name) {
            blockUI.start("Loading..."); 
            var k = RoleResource.getAllPermissionsByModule({ moduleName: name }).$promise.then(function (results) {
 
                vm.newSelectedPermissions = results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
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

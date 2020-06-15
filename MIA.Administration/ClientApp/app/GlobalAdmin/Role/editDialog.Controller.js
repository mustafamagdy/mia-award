(function () {
    'use strict';

    angular
        .module('home')
        .controller('editRoleDialogController', ['blockUI', '$filter', '$state',
            '$stateParams', '$translate', 'RoleResource', 'ToastService',
            'RoleByIdPrepService', editRoleDialogController])

    function editRoleDialogController(blockUI, $filter, $state, $stateParams, $translate, RoleResource, ToastService, RoleByIdPrepService) {
        var vm = this;

        //vm.permissionList = PermissionPrepService;
        // vm.moduleList = ModulePrepService;
        console.log(vm.permissionList);
        vm.name = $stateParams.name;
        vm.rolePermissions = RoleByIdPrepService;
        vm.selectedPermissions = [];
        vm.newSelectedPermissions = [];
        vm.removedSelectedPermissions = [];
        vm.currentPage = 1;
        permissionList();

        // var i;
        // for (i = 0; i < vm.rolePermissions.length; i++) {
        //     var indexPerm = vm.permissionList.indexOf($filter('filter')(vm.permissionList, { 'id': vm.rolePermissions[i].id }, true)[0]);
        //     vm.selectedPermissions.push(vm.permissionList[indexPerm]);
        // }
        vm.UpdateRole = function () {

            blockUI.start("Loading...");
            console.log(vm.rolePermissions);
            var updateObj = new RoleResource();
            updateObj.roleId = vm.rolePermissions.objGroupId;
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

        vm.ChangeSelectedModule = function () {
            angular.forEach(vm.selectedModule, function (value, key) {
                angular.forEach(value.permessions, function (valuePermission, key1) {
                    debugger;
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

        vm.selectPermission = function (obj) {
            debugger;
            const objPermission = this.selectedPermission.find(b => b.id == obj.id)
            if (obj.isSelected && objPermission == null) {
                this.selectedPermission.push(obj);
            } else {
                this.selectedPermission.splice(this.selectedPermission.indexOf(obj), 1);
                this.RemoveLevel1Judges.push(obj);
            }
        }
        vm.selectAllPermission = function (isselectAllJudgeLevel1) {
            this.selectedPermission = [];
            this.RemoveLevel1Judges = [];
            this.newSelectedPermissions.map(x => x.isSelected = isselectAllJudgeLevel1);
            if (isselectAllJudgeLevel1) {
                this.selectedPermission.push(...this.newSelectedPermissions);
            } else {
                this.RemoveLevel1Judges.push(...this.newSelectedPermissions);
            }
        }


        function refreshPermissions(name) {
            blockUI.start("Loading...");
            var k = RoleResource.getAllPermissionsByModule({ moduleName: name }).$promise.then(function (results) {
                debugger;
                if (vm.newSelectedPermissions.length != 0)
                    vm.newSelectedPermissions.push(results);
                else
                    vm.newSelectedPermissions = results;

                console.log(vm.objList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        function permissionList() {  
            blockUI.start("Loading...");
            var k = RoleResource.getAllPermissions({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                vm.newSelectedPermissions = results.items;
                vm.totalCount = results.metadata.totalItemCount;

                console.log(vm.objList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            permissionList();
        }
        vm.Close = function () {
            $state.go('Role');
        }
    }
}());

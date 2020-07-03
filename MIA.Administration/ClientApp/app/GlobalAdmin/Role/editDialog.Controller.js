(function () {
    'use strict';

    angular
        .module('home')
        .controller('editRoleDialogController', ['blockUI', '$filter', '$state',
            '$stateParams', '$translate', 'RoleResource', 'ToastService',
            'RoleByIdPrepService', editRoleDialogController])

    function editRoleDialogController(blockUI, $filter, $state, $stateParams, $translate, RoleResource, ToastService, RoleByIdPrepService) {
        var vm = this;
        vm.name = $stateParams.name;
        vm.rolePermissions = RoleByIdPrepService;
        vm.selectedPermissions = [];
        vm.newSelectedPermissions = [];
        vm.removedSelectedPermissions = [];
        vm.currentPage = 1;
        permissionList();
        console.log('rolePermissions', vm.rolePermissions);




        vm.selectPermission = function (obj) {
            const objPermission = this.selectedPermissions.find(b => b.id == obj.id)
            if (obj.isSelected && objPermission == null) {
                this.selectedPermissions.push(obj);
                addPermissionToRole(obj.id);
            } else {
                this.selectedPermissions.splice(this.selectedPermissions.indexOf(obj), 1);
                this.removedSelectedPermissions.push(obj);
                removePermissionToRole(obj.id);
            }
        }
        vm.selectAllPermission = function (isselectAllJudgeLevel1) {
            this.selectedPermissions = [];
            this.RemoveLevel1Judges = [];
            this.newSelectedPermissions.map(x => x.isSelected = isselectAllJudgeLevel1);
            if (isselectAllJudgeLevel1) {
                this.selectedPermissions.push(...this.newSelectedPermissions);
            } else {
                this.RemoveLevel1Judges.push(...this.newSelectedPermissions);
            }
        }

        function addPermissionToRole(permId) {
            blockUI.start("Loading...");
            var updateObj = new RoleResource();

            updateObj.$addPermissionToRole({ roleName: vm.name, permissionId: permId }).then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                },
                function (data, status) {

                    debugger; blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
                }
            );
        }

        function removePermissionToRole(permId) {
            blockUI.start("Loading...");
            var updateObj = new RoleResource();

            updateObj.$removePermissionToRole({ roleName: vm.name, permissionId: permId }).then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
                }
            );
        }

        function permissionList() {
            blockUI.start("Loading...");
            var k = RoleResource.getAllPermissions({ pageNumber: vm.currentPage, pageSize: 1000 }).$promise.then(function (results) {
                vm.newSelectedPermissions = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                var i;
                for (i = 0; i < vm.rolePermissions.length; i++) {

                    var indexPerm = vm.newSelectedPermissions.indexOf($filter('filter')(vm.newSelectedPermissions, { 'id': vm.rolePermissions[i].id }, true)[0]);
                    vm.newSelectedPermissions[indexPerm].isSelected = true;
                    vm.selectedPermissions.push(vm.newSelectedPermissions[indexPerm]);
                }
                console.log('permissionList', vm.newSelectedPermissions);
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
        // vm.checkPermission = function (obj) {
        //     var checkIfPermissionExist = vm.selectedPermissions.indexOf(obj.id);
        //     if (checkIfPermissionExist == -1) {
        //         vm.selectedPermissions.push(obj.permissionId);
        //     }
        //     else {
        //         var index = vm.selectedPermissions.indexOf(obj.permissionId);
        //         vm.selectedPermissions.splice(index, 1);
        //     }
        // }
        // vm.changePermissionList = function (name) {
        //     refreshPermissions(name);
        // }

        // vm.ChangeSelectedModule = function () {
        //     angular.forEach(vm.selectedModule, function (value, key) {
        //         angular.forEach(value.permessions, function (valuePermission, key1) {
        //             debugger;
        //             if (vm.selectedModuleList != 0) {
        //                 if (!vm.selectedModuleList.includes(valuePermission)) {
        //                     vm.selectedModuleList.push(valuePermission);
        //                 }
        //                 // else
        //                 //     vm.selectedModuleList.splice(valuePermission, 1);

        //             }
        //             else
        //                 vm.selectedModuleList.push(valuePermission);

        //         });
        //     });

        // }
    }
}());

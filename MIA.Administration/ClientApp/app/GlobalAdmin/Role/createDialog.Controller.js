(function () {
    'use strict';

    angular
        .module('home')
        .controller('createRoleDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'RoleResource', 'ToastService', '$rootScope', 'PermissionPrepService', createRoleDialogController])

    function createRoleDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, RoleResource,
        ToastService, $rootScope, PermissionPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        $scope.permissionList = PermissionPrepService 
        vm.selectedModuleList = [];
        vm.selectedModule = "";
        vm.selectedPermissions = [];
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
 
        vm.close = function () {
            $state.go('Role');
        }

        vm.AddNewRole = function () {
            blockUI.start("Loading...");

            var newObj = new RoleResource();
            newObj.titles = vm.titles;
            newObj.roles = vm.selectedPermissions;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Role');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

    }
}());

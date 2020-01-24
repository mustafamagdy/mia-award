(function () {
    'use strict';

    angular
        .module('home')
        .controller('editUserController', ['$stateParams','UserRoleByIdPrepService', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',
            'EditUserPrepService', 'ToastService', editUserController]);


    function editUserController($stateParams,UserRoleByIdPrepService, blockUI, $scope, $filter, $translate, $state, UserResource,
        EditUserPrepService, ToastService) {

        blockUI.start("Loading...");

        $scope.isPaneShown = true;
        $scope.$emit('LOAD')
        var vm = this;

        vm.userObj = EditUserPrepService;

        vm.Role = UserRoleByIdPrepService;
        console.log(UserRoleByIdPrepService);
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
        vm.EditUser = function () {
            blockUI.start("Loading...");
            vm.show = false;
            var updateUser = new UserResource();
            updateUser.userId = vm.userObj.userId;
            updateUser.fullName = vm.userObj.fullName;
            updateUser.username = vm.userObj.userName;
            updateUser.unSelectedRoles = vm.UnSelectedPermissions;
            updateUser.email = vm.userObj.email;
            updateUser.mobileNumber = vm.userObj.mobileNumber;
            updateUser.password = vm.userObj.password;

            updateUser.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        if ($scope.user.userTypeId == 1)
                            $state.go('RetailerUser');
                        if ($scope.user.userTypeId == 2)
                            $state.go('ManufactureUser');
                        if ($scope.user.userTypeId == 3)
                            $state.go('DistributerUser');
                        if ($scope.user.userTypeId == 4)
                            $state.go('users');
                        if ($scope.user.userTypeId == 5)
                            $state.go('IooUser');
                        if ($scope.user.userTypeId == 255)
                            $state.go('IoaUser');

                        // if ($stateParams.userType == 1)
                        //     $state.go('RetailerUser');
                        // if ($stateParams.userType == 2)
                        //     $state.go('ManufactureUser');
                        // if ($stateParams.userType == 3)
                        //     $state.go('DistributerUser');
                        // if ($stateParams.userType == 4)
                        //     $state.go('IooUser');
                        // if ($stateParams.userType == 5)
                        //     $state.go('IoaUser');
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.close = function () {
            
            if ($scope.user.userTypeId == 1)
                $state.go('RetailerUser');
            if ($scope.user.userTypeId == 2)
                $state.go('ManufactureUser');
            if ($scope.user.userTypeId == 3)
                $state.go('DistributerUser');
            if ($scope.user.userTypeId == 4)
                $state.go('users');
            if ($scope.user.userTypeId == 5)
                $state.go('IooUser');
            if ($scope.user.userTypeId == 255)
                $state.go('IoaUser');
        }
        blockUI.stop();

    }

})();
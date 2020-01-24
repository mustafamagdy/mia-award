(function () {
    'use strict';

    angular
        .module('home')
        .controller('addOperationUserController', ['blockUI', 'UserRoleByIdPrepService','$stateParams', '$translate', '$state', 'UserResource', '$scope', 'ToastService', addOperationUserController]);

    function addOperationUserController(blockUI,UserRoleByIdPrepService, $stateParams, $translate, $state, UserResource, $scope, ToastService, ) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        var vm = this;
        vm.selectedTypeId = 0;
        blockUI.start("Loading...");
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
        vm.AddNewUser = function () {
            
            blockUI.start("Loading...");
            var newUser = new UserResource();
            newUser.fullName = vm.fullName;
            newUser.username = vm.userName;
            newUser.unSelectedRoles = vm.UnSelectedPermissions;
            newUser.email = vm.email;
            newUser.mobileNumber = vm.mobileNumber;
            newUser.password = vm.password;
            // newUser.userType = $stateParams.userType;
            newUser.$createOperationUser({ userType: $stateParams.userType }).then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");
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
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
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

}());
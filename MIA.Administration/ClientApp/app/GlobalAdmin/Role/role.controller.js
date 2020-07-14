(function () {
    'use strict';

    angular
        .module('home')
        .controller('RoleController', ['blockUI', '$scope', '$translate', 'RoleResource', 'RolePrepService',
            'ToastService', '$uibModal', RoleController]);


    function RoleController(blockUI, $scope, $translate, RoleResource, RolePrepService, ToastService, $uibModal) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;

        $scope.totalCount = RolePrepService.totalCount;
        $scope.RoleList = RolePrepService;
        function refreshRoles() {
            blockUI.start("Loading...");

            var k = RoleResource.getAllRoles({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.RoleList = results;
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {
            
              var updateObj = new RoleResource();
              updateObj.roleId = model.userGroupId;
              updateObj.status = (model.isActive == true ? false : true);
              updateObj.$changeStatus({ roleId: model.userGroupId, status: updateObj.status }).then(
                  function (data, status) {
                      refreshRoles();
                      ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                      updateObj.status = model.isActive;
                  },
                  function (data, status) {
                      ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                  }
              );
              return;
          }

        function confirmationDelete(model) {
            
            var deleteObj = new RoleResource();
            deleteObj.roleId = model.userGroupId;
            deleteObj.$delete({ roleId : model.userGroupId }).then(
                function (data, status) {
                    refreshRoles();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeleteSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }


        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshRoles();
        }
        blockUI.stop();

    }

})();
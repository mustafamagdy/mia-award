(function () {
    'use strict';

    angular
        .module('home')
        .controller('CategoryController', ['appCONSTANTS','$scope', '$translate', 'CategoryResource', 'blockUI', '$uibModal', 'CategoryPrepService',
            'ToastService', CategoryController]);


    function CategoryController(appCONSTANTS,$scope, $translate, CategoryResource, blockUI, $uibModal, CategoryPrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
        // vm.actionList = [];
        // for (var i = 1; i <= $scope.user.permessionModules[1][2].length; i++)  
        //     vm.actionList.push(i);
       
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = CategoryPrepService.totalCount;
        $scope.CategoryList = CategoryPrepService;
        console.log(CategoryPrepService);
        function refreshCategorys() {
            blockUI.start("Loading...");

            var k = CategoryResource.getAllCategories({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.CategoryList = results;

                console.log($scope.CategoryList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function change(category, isDeleted) {
            var updateObj = new CategoryResource();
            updateObj.CategoryId = category.categoryId;
            if (!isDeleted)
                updateObj.status = (category.status == true ? false : true);
            updateObj.isDeleted = category.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshCategorys();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    category.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateCategory = function (category) {
            change(category, false);
        }

        function confirmationDelete(model) {
            
            var updateObj = new CategoryResource();
            updateObj.id = model.id;
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshCategorys();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
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
        vm.ChangeStatus = function (model) {
            
              var updateObj = new CategoryResource();
              updateObj.categoryId = model.categoryId;
              updateObj.status = (model.isActive == true ? false : true);
              updateObj.$changeStatus({ categoryId: updateObj.categoryId, status: updateObj.status }).then(
                  function (data, status) {
                    refreshCategorys();
                      ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                      updateObj.status = model.isActive;
                  },
                  function (data, status) {
                      ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                  }
              );
              return;
          }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshCategorys();
        }

    }

})();

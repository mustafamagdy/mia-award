(function () {
    'use strict';
    angular
        .module('home')
        .controller('RetailerController', ['RetailersPrepService','appCONSTANTS', '$scope','$stateParams','$translate', 'RetailerResource',
            'blockUI', '$uibModal', 'RetailerPrepService',
            'ToastService', RetailerController]);

    function RetailerController(RetailersPrepService,appCONSTANTS,$scope,$stateParams, $translate, RetailerResource,
        blockUI, $uibModal, RetailerPrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[10].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = RetailersPrepService.totalCount;
        vm.RetailerList = RetailerPrepService;

        console.log("R", RetailerPrepService.results);

        function refreshRetailers() {
            blockUI.start("Loading...");
            var k = RetailerResource.getAllRetailers({ page: vm.currentPage }).$promise.then(function (results) {
                vm.RetailerList = results;
                console.log(vm.RetailerList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        } 
        vm.ChangeRetailerStatus = function (model) {
            

            var updateObj = new RetailerResource();
            updateObj.retailerId = model.retailerId;
            updateObj.status = (model.isActive == true ? false : true);
            //updateObj.status = model.status;
            updateObj.$ChangeRetailer({ retailerId: model.retailerId, status: updateObj.status }).then(
                function (data, status) {
                    refreshRetailers();
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
            
            var updateObj = new RetailerResource();
            updateObj.retailerId = model.retailerId;
            updateObj.$delete({ retailerId: model.retailerId }).then(
                function (data, status) {
                    refreshRetailers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, retailerId) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return retailerId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }


        vm.filterRetailer = function (name, page) {
            
            refreshRetailer(name, page);
            vm.name = "";
          }
        function refreshRetailer(name, page) {
            blockUI.start("Loading...");
            var k = RetailerResource.search({name: name, page: page }).$promise.then(function (results) {
              vm.RetailerList = results;
              vm.totalCount = results.totalCount;
              blockUI.stop();
            },
              function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
              });
          }

        $scope.changePage = function (page) {
             vm.currentPage = page;
            refreshRetailers();
        }
    }

})();

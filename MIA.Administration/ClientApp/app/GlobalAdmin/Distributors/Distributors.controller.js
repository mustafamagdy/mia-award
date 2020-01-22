(function () {
    'use strict';
    angular
        .module('home')
        .controller('DistributorsController', ["DistributorPrepService",'appCONSTANTS','$translate', 'DistributorsResource',
            'blockUI', '$uibModal', 'DistributorsPrepService',
            'ToastService', DistributorsController]);

    function DistributorsController(DistributorPrepService,appCONSTANTS,$translate, DistributorsResource,
        blockUI, $uibModal, DistributorsPrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[11].children[0]).addClass("active")
        var vm = this;
        vm.currentPage =2;
        vm.appCONSTANTS = appCONSTANTS;
        vm.totalCount = DistributorsPrepService.totalCount;
        vm.DistributorsList = DistributorsPrepService.results;

        console.log(DistributorsPrepService);
        
        function refreshDistributors() {
            blockUI.start("Loading...");

            var k = DistributorsResource.getAllDistributors({ page: vm.currentPage }).$promise.then(function (results) {
                vm.DistributorsList = results.results;
                vm.totalCount = results.totalCount;
                 console.log(vm.DistributorsList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function change(Distributors, isDeleted) {
            // var splitImage = appCONSTANTS.image.split(',');
            var updateObj = new DistributorsResource();
            updateObj.distributorId = Distributors.distributorId;
            updateObj.name =Distributors.name;
            updateObj.address = Distributors.address;
            updateObj.code = Distributors.code;
            // updateObj.cityId = Distributors.selectedCityId;
            // updateObj.countryId = Distributors.selectedCountryId;
            // updateObj.governrateId = Distributors.selectedGovernrateId;
            // updateObj.companyLogo = splitImage[1];
            // updateObj.logoContentType = appCONSTANTS.imageType;
            if (!isDeleted)
            updateObj.isActive = (Distributors.isActive == true ? false : true);
            updateObj.isDeleted = Distributors.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshDistributors();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    Distributors.isActive = updateObj.isActive;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.ChangeDistributorsStatus = function (model) {
            

            var updateObj = new DistributorsResource();
            updateObj.distributorId = model.distributorId;
            updateObj.status =   (model.isActive == true ? false : true);
            //updateObj.status = model.isActive;
            updateObj.$ChangeDistributors({distributorId:model.distributorId,status:updateObj.status}).then(
                function (data, status) {
                    refreshDistributors();
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
            
            var updateObj = new DistributorsResource();
            updateObj.distributorId = model.distributorId;
            updateObj.$delete({ distributorId: model.distributorId }).then(
                function (data, status) {
                    refreshDistributors();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, distributorId) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return distributorId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.filterDistributor = function (name, page) {
            
            refreshDistributor(name, page);
            vm.name = "";
          }
        function refreshDistributor(name, page) {
            blockUI.start("Loading...");
            var k = DistributorsResource.search({ name: name, page: page }).$promise.then(function (results) {
              vm.DistributorsList= results.results;
              vm.totalCount = results.totalCount;
              blockUI.stop();
            },
              function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
              });
          }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshDistributors();
        }
    }

})();

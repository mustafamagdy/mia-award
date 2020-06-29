(function () {
    'use strict';

    angular
        .module('home')
        .controller('VotingCriteriaController', ['appCONSTANTS', '$scope', '$translate', 'VotingCriteriaResource', 'blockUI', '$uibModal',
            'ToastService', VotingCriteriaController]);


    function VotingCriteriaController(appCONSTANTS, $scope, $translate, VotingCriteriaResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshVotingCriterias();
        function refreshVotingCriterias() {
            blockUI.start("Loading...");

            var k = VotingCriteriaResource.getAllVotingCriterias({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.VotingCriteriaList = results.items;
                $scope.totalCount = results.metadata.totalItemCount; 
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                   // ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
                });
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function confirmationDelete(model) {
            var updateObj = new VotingCriteriaResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshVotingCriterias();
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

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshVotingCriterias();
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('home')
        .controller('ArtWorkMediaController', ['appCONSTANTS', '$stateParams', 'ArtWorkMediaResource', '$translate', 'ArtWorkResource', 'blockUI', '$uibModal',
            'ToastService', ArtWorkMediaController]);


    function ArtWorkMediaController(appCONSTANTS, $stateParams, ArtWorkMediaResource, $translate, ArtWorkResource, blockUI, $uibModal, ToastService) {
        // $(".pmd-sidebar-nav>li>a").removeClass("active");
        // $($(".pmd-sidebar-nav").children()[4].children[0]).addClass("active");
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS; 
        refreshArtWorks();
        function refreshArtWorks() {
            blockUI.start("Loading...");

            var k = ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise.then(function (results) {
                vm.mediaItemList = results;
                blockUI.stop();

            },
                function (data, status) {
                    
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
       

        function confirmationDelete(model) {
         
            var updateObj = new ArtWorkMediaResource();
            
            updateObj.$deleteMediaItem({ id: model.id }).then(
                function (data, status) {
                    refreshArtWorks();
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
            refreshArtWorks();
        }

    }

})();

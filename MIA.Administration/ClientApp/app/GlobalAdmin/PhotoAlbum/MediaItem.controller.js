(function () {
    'use strict';

    angular
        .module('home')
        .controller('mediaItemController', ['appCONSTANTS', '$scope', '$translate', 'PhotoAlbumResource', 'blockUI', '$uibModal',
            'ToastService', '$stateParams', mediaItemController]);


    function mediaItemController(appCONSTANTS, $scope, $translate, PhotoAlbumResource, blockUI, $uibModal, ToastService, $stateParams) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        refreshMediaItems();
        function refreshMediaItems() {
            blockUI.start("Loading..."); 
            var k = PhotoAlbumResource.getMediaItems({ id: $stateParams.id, pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                // vm.mediaItemList = results;
                debugger;
                vm.mediaItemList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function confirmationDelete(model) {
            var obj = new PhotoAlbumResource();
            obj.$deleteMediaItems({ id: model.id }).then(
                function (data, status) {
                    refreshMediaItems();
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
            var updateObj = new PhotoAlbumResource();
            updateObj.id = model.id;
            updateObj.featured = (model.featured == true ? false : true);
            updateObj.$updateMediaItem().then(
                function (data, status) {
                    //  refreshMediaItems();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.featured = updateObj.featured;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshMediaItems();
        }



    }

})();

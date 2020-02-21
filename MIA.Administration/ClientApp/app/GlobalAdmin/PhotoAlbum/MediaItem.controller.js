(function () {
    'use strict';

    angular
        .module('home')
        .controller('mediaItemController', ['appCONSTANTS', '$scope', '$translate', 'PhotoAlbumResource', 'blockUI', '$uibModal',
            'ToastService', '$stateParams', mediaItemController]);


    function mediaItemController(appCONSTANTS, $scope, $translate, PhotoAlbumResource, blockUI, $uibModal, ToastService, $stateParams) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        refreshMediaItems();
        function refreshMediaItems() {
            blockUI.start("Loading...");
            debugger;
            var k = PhotoAlbumResource.getMediaItems({ id: $stateParams.id }).$promise.then(function (results) {
                vm.mediaItemList = results;
                console.log(vm.mediaItemList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(MediaItem, isDeleted) {
            var updateObj = new PhotoAlbumResource();
            updateObj.id = MediaItem.id;
            if (!isDeleted)
                updateObj.status = (MediaItem.status == true ? false : true);
            updateObj.isDeleted = MediaItem.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    // if (isDeleted)
                    refreshMediaItems();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    MediaItem.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateMediaItem = function (MediaItem) {
            change(MediaItem, false);
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
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    //  refreshMediaItems();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
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

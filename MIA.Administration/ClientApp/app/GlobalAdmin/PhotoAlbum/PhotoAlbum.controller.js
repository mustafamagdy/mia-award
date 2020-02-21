(function () {
    'use strict';

    angular
        .module('home')
        .controller('PhotoAlbumController', ['appCONSTANTS', '$scope', '$translate', 'PhotoAlbumResource', 'blockUI', '$uibModal',
            'ToastService', PhotoAlbumController]);


    function PhotoAlbumController(appCONSTANTS, $scope, $translate, PhotoAlbumResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshPhotoAlbums();
        function refreshPhotoAlbums() {
            blockUI.start("Loading...");

            var k = PhotoAlbumResource.getAllPhotoAlbums({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.PhotoAlbumList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.PhotoAlbumList);
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(PhotoAlbum, isDeleted) {
            var updateObj = new PhotoAlbumResource();
            updateObj.id = PhotoAlbum.id;
            if (!isDeleted)
                updateObj.status = (PhotoAlbum.status == true ? false : true);
            updateObj.isDeleted = PhotoAlbum.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    // if (isDeleted)
                    refreshPhotoAlbums();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    PhotoAlbum.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdatePhotoAlbum = function (PhotoAlbum) {
            change(PhotoAlbum, false);
        }

        function confirmationDelete(model) {
            var updateObj = new PhotoAlbumResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshPhotoAlbums();
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
                    //  refreshPhotoAlbums();
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
            refreshPhotoAlbums();
        }

    }

})();

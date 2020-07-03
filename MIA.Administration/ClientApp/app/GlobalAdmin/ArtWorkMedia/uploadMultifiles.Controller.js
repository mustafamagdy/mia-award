(function () {
    'use strict';

    angular
        .module('home')

        .filter("range", function () {
            return (x, n) => Array.from({ length: n }, (x, index) => (index));
        })

        .filter('Filesize', function () {
            return function (size) {
                if (isNaN(size))
                    size = 0;

                if (size < 1024)
                    return size + ' Bytes';

                size /= 1024;

                if (size < 1024)
                    return size.toFixed(2) + ' Kb';

                size /= 1024;

                if (size < 1024)
                    return size.toFixed(2) + ' Mb';

                size /= 1024;

                if (size < 1024)
                    return size.toFixed(2) + ' Gb';

                size /= 1024;

                return size.toFixed(2) + ' Tb';
            };
        })
        .controller('UploadMultiFilesController', ['$scope', '$stateParams', 'blockUI', '$translate', '$state', 'appCONSTANTS',
            'ArtWorkResource', 'ArtWorkByIdPrepService', 'ArtWorkMediaResource', 'ArtWorkMediaByArtWorkIdPrepService', '$uibModal','ToastService', UploadMultiFilesController])

    function UploadMultiFilesController($scope, $stateParams, blockUI, $translate, $state, appCONSTANTS, ArtWorkResource, ArtWorkByIdPrepService,
        ArtWorkMediaResource, ArtWorkMediaByArtWorkIdPrepService,$uibModal,  ToastService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.artWork = ArtWorkByIdPrepService;
        vm.artWorkFiles = ArtWorkMediaByArtWorkIdPrepService;

        $scope.getFileDetails = function (e) {
            $scope.files = [];
            $scope.$apply(function () {

                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };

        vm.removeFile = function (id) {

            var updateObj = new ArtWorkMediaResource();

            updateObj.$deleteMediaItem({ id: id }).then(
                function (data, status) {
                    refreshArtWorkFiles();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        function confirmationDelete(model) {
debugger
            var updateObj = new ArtWorkMediaResource();

            updateObj.$deleteMediaItem({ id: model.id }).then(
                function (data, status) {
                    refreshArtWorkFiles();
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
        vm.close = function () {
            $state.go('ArtWorkMedia', { id: $stateParams.id });
        }
        function refreshArtWorkFiles() {
            blockUI.start("Loading...");

            var k = ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise.then(function (results) {
                
                vm.artWorkFiles = results;
                console.log(vm.artWorkFiles); blockUI.stop();

            },
                function (data, status) {
                    
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
    }
}());

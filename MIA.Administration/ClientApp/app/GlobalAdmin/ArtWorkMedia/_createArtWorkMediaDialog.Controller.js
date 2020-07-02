(function () {
    'use strict';

    angular
        .module('home')
 
        .filter("range", function () {
            return (x, n) => Array.from({ length: n }, (x, index) => (index));
        })
        .controller('createArtWorkMediaDialogController', ['$stateParams', 'blockUI', '$uibModal', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ArtWorkMediaResource', 'ToastService', 'ArtWorkMediaByArtWorkIdPrepService', createArtWorkMediaDialogController])

    function createArtWorkMediaDialogController($stateParams, blockUI, $uibModal, $state, appCONSTANTS, $translate, ArtWorkResource,
        ArtWorkMediaResource, ToastService, ArtWorkMediaByArtWorkIdPrepService) {
        var vm = this;

        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ArtWorkMedia', { id: $stateParams.id });
        }

        vm.AddNewArtWorkMedia = function () {
            debugger;
            blockUI.start("Loading...");
            var newObj = new ArtWorkMediaResource();
            newObj.ArtWorkId = $stateParams.id;
            newObj.Description ="سيي";// vm.Description;
            newObj.$createMediaFile().then(
                function (data, status) {
                    blockUI.stop();
                    //ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    openUploadDialog(data.id, appCONSTANTS.API_URL + 'artWorks/artwork/' + data.id + '/files')
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );
        }

        function callBackUpload(model) {
            debugger
            var updateObj = new ArtWorkMediaResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.FileUrl;
            updateObj.FileKey = model.data.FileKey;
            updateObj.$UpdateMediaItemVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('ArtWorkMedia', { id: $stateParams.id });

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        function openUploadDialog(id, url) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                controller: 'uploadVideoController',
                controllerAs: 'uploadDlCtrl',
                resolve: {
                    itemId: function () { return id },
                    url: function () { return url },
                    callBackFunction: function () { return callBackUpload }
                }

            });
        }

    }
}());

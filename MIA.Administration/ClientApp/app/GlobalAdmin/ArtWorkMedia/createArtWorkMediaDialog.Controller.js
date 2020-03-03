(function () {
    'use strict';

    angular
        .module('home')

        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model, modelSetter;

                    attrs.$observe('fileModel', function (fileModel) {
                        model = $parse(attrs.fileModel);
                        modelSetter = model.assign;
                    });

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope.$parent, element[0].files[0]);
                        });
                    });
                }
            };
        }])
        .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
                    .success(function () {
                    })
                    .error(function () {
                    });
            }
        }])

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
            newObj.Description = vm.title;
            newObj.$createMediaFile().then(
                function (data, status) {
                    blockUI.stop();
                    //ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    openUploadDialog(data.id, apiBaseUrl + '/api/artWorks/artwork/' + data.id + '/files')
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
            updateObj.FileUrl = model.data.trailerUrl;
            updateObj.FileKey = model.data.trailerId;
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

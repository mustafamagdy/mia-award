(function () {
    'use strict';

    angular
        .module('home')
        .controller('createMediaItemController', ['$uibModal', '$scope', 'blockUI', '$stateParams', '$state', '$http', '$q', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createMediaItemController])

    function createMediaItemController($uibModal, $scope, blockUI, $stateParams, $state, $http, $q, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.selectedMediaType = "";
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewMediaItem = function () {

            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.title;

            newObj.Featured = vm.isFeatured;
            newObj.MediaType = vm.selectedMediaType;
            newObj.AlbumId = $stateParams.id;
            debugger;
            if (vm.posterVideo != null) {
                var splitVideoImage = vm.posterVideo.split(',');
                newObj.Poster = splitVideoImage[1];
                newObj.PosterFileName = splitVideoImage[0];
            }
            else {
                var splitImage = vm.posterImage.split(',');
                newObj.Media = splitImage[1];
                newObj.MediaFileName = splitImage[0];
            }

            // newObj.FileKey = splitImage[1];
            // newObj.FileUrl = splitImage[0];


            newObj.$createMediaItem().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.mediaType == 'image') {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('mediaItems', { id: $stateParams.id });

                    } else {
                        debugger;
                        openUploadDialog(data.id, appCONSTANTS.API_URL + 'albums/mediaItems/' + data.id + '/files')
                    }
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
            debugger;
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            debugger;
            var logoFile = element[0];
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newMediaItemForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

                            $scope.$apply();
                        };
                        if (logoFile) {
                            reader.readAsDataURL(logoFile);
                        }
                    })
                } else {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (logoFile) {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }
        }

        $scope.uploadPosterFile = function (element) {
            debugger;
            vm.posterImage = $(element)[0].files[0];
        };



        vm.LoadUploadPosterVideo = function () {
            $("#posterVideo").click();
        }
        var posterVideo;
        $scope.AddposterVideo = function (element) {
            var logoFile = element[0];
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']
            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newMediaItemForm.$dirty = true;
                    $scope.$apply(function () {

                        posterVideo = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterVideo = reader.result;

                            $scope.$apply();
                        };
                        if (logoFile) {
                            reader.readAsDataURL(logoFile);
                        }
                    })
                } else {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (logoFile) {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }
        }

        $scope.uploadPosterVideoFile = function (element) {
            debugger;
            vm.posterVideo = $(element)[0].files[0];
        };

        function callBackUpload(model) {
            debugger
            var updateObj = new PhotoAlbumResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.fileUrl;
            updateObj.FileKey = model.data.fileKey;
            updateObj.$UpdateMediaItemVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('mediaItems', { id: $stateParams.id });

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

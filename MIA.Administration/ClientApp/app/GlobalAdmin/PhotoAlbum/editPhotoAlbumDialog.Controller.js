(function () {
    'use strict';

    angular
        .module('home')
        .controller('editPhotoAlbumDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', 'PhotoAlbumByIdPrepService', editPhotoAlbumDialogController])

    function editPhotoAlbumDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, PhotoAlbumByIdPrepService) {
        var vm = this;
        var posterImage;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.PhotoAlbum = PhotoAlbumByIdPrepService;
        vm.posterImage= vm.PhotoAlbum.posterUrl;
        console.log(vm.PhotoAlbum);

        vm.Close = function () {
            $state.go('PhotoAlbum');
        }
        vm.UpdatePhotoAlbum = function () {
           // var splitImage = vm.posterImage.split(',');
            blockUI.start("Loading..."); 
            var updateObj = new PhotoAlbumResource();
            updateObj.Id = vm.PhotoAlbum.id;
            updateObj.title = vm.PhotoAlbum.title; 
            if ( posterImage != null) {
                // updateObj.image = splitImage[1];
                // updateObj.imageContentType = $rootScope.imageType;
                // updateObj.Poster = $scope.file;

                updateObj.Poster = splitImage[1];
                updateObj.PosterFileName = posterImage.type;
            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('PhotoAlbum');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/gif']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.editPhotoAlbumForm.$dirty = true;
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
            vm.posterImage = $(element)[0].files[0];
        };

    }
}());

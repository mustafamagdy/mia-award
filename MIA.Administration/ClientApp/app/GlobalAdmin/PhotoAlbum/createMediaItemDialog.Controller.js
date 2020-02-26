(function () {
    'use strict';

    angular
        .module('home')
        .controller('createMediaItemController', ['$uibModal','$scope', 'blockUI', '$stateParams', '$state', '$http', '$q', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createMediaItemController])

    function createMediaItemController($uibModal,$scope, blockUI, $stateParams, $state, $http, $q, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.selectedMediaType = "";
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewMediaItem = function () {
            debugger;
            var splitImage = vm.posterImage.split(',');
            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.title;  
            newObj.Media = splitImage[1];
            newObj.MediaFileName = splitImage[0];
            newObj.Featured = vm.isFeatured;
            newObj.MediaType = vm.selectedMediaType;
            newObj.AlbumId = $stateParams.id;

            newObj.Poster = splitImage[1];
            newObj.PosterFileName = splitImage[0];
            newObj.FileKey = splitImage[1];
            newObj.FileUrl = splitImage[0];

            
            newObj.$createMediaItem().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('mediaItems', { id: $stateParams.id });
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
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

 


    }
}());

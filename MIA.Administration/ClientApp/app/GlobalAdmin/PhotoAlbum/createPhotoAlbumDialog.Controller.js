(function () {
    'use strict';

    angular
        .module('home')
        .controller('createPhotoAlbumDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createPhotoAlbumDialogController])

    function createPhotoAlbumDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        $rootScope.image = null;
        vm.selectedMediaType = "";
        vm.posterImage = [];
        vm.files = [];
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewPhotoAlbum = function () {
            angular.forEach(vm.posterImage, function (value, key) {
                var splitImage = value.split(',');

                vm.files.push({
                    Media: splitImage[1],
                    MediaFileName: splitImage[0]
                });

            });
            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.titleDictionary;
            newObj.Files = vm.files;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('PhotoAlbum');
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
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']
            var logoFile = "";

            angular.forEach(element, function (value, key) {
                logoFile = value;
                if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                    if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                        $scope.newPhotoAlbumForm.$dirty = true;
                        $scope.$apply(function () {

                            posterImage = logoFile;
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                vm.posterImage.push(reader.result);

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
            });

        }

        $scope.uploadPosterFile = function (element) {
            
            vm.posterImage = $(element)[0].files[0];
        };

    }
}());

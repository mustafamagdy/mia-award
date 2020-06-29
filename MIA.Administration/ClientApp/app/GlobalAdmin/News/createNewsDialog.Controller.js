(function () {
    'use strict';

    angular
        .module('home')
        .directive('imgUpload', ['$rootScope', function (rootScope) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var canvas = document.createElement("canvas");
                    var extensions = 'jpeg ,jpg, png, gif';
                    rootScope.isValid = true;
                    elem.on('change', function () {
                        reader.readAsDataURL(elem[0].files[0]);
                        var filename = elem[0].files[0].name;
                        debugger;
                        var extensionlist = filename.split('.');
                        rootScope.imageType = extensionlist[1];

                        var extension = extensionlist[extensionlist.length - 1];
                        if (extensions.indexOf(extension) == -1) {
                            alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp' are allowed.");
                            scope.imageName = null;
                            rootScope.isValid = false;
                        } else {
                            scope.file = elem[0].files[0];
                            scope.imageName = filename;
                            rootScope.isValid = true;
                        }
                    });

                    var reader = new FileReader();
                    // reader.onload = function (e) {
                    //     debugger;
                    //     rootScope.image = e.target.result;
                    //     scope.$apply();

                    // }
                    reader.onload = function (e) {
                        debugger;
                        if (rootScope.isValid == false) {
                            rootScope.image = null;
                            scope.$apply();
                        }
                        else {
                            rootScope.image = e.target.result;
                            scope.$apply();
                        }
                    }
                }
            }
        }])
        .controller('createNewsDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', '$rootScope', createNewsDialogController])

    function createNewsDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, $rootScope) {
        var vm = this;
        $rootScope.image = null;

        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('News');
        }


        vm.AddNewNews = function () { 
            var splitImage = vm.posterImage.split(',');
            blockUI.start("Loading...");
            var newObj = new NewsResource();
            newObj.Title = vm.titleDictionary;
            newObj.Body = vm.bodyDictionary; 
            newObj.PosterByte = splitImage[1];
            newObj.PosterFileName = posterImage.type;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('News');
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
                    $scope.newNewsForm.$dirty = true;
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

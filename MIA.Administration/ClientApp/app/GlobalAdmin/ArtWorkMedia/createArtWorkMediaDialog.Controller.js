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
        .controller('createArtWorkMediaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkMediaByArtWorkIdPrepService', createArtWorkMediaDialogController])

    function createArtWorkMediaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkMediaByArtWorkIdPrepService) {
        var vm = this;
        debugger;
        // vm.artWorkId = localStorage.getItem('artWorkId');
        // vm.filesCount = localStorage.getItem('filesCount');
        vm.artWorkMedia = ArtWorkMediaByArtWorkIdPrepService;
        //  if (vm.artWorkMedia.length < 0) {
        vm.filesCount = vm.artWorkMedia[0].artWork.fileCount;
        console.log(vm.artWorkMedia, 'media')
        vm.filesCounts = [];
        //  }
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ArtWork');
        }

        vm.AddNewArtWork = function () {
            debugger;
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            // newObj.Poster = $scope.file;

            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


    }
}());

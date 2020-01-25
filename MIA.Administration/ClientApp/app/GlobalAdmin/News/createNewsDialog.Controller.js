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
            // var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            var newObj = new NewsResource();
            newObj.Title = vm.titleDictionary;
            newObj.Body = vm.bodyDictionary;
            newObj.Poster = $scope.file;

            // newObj.Image = splitImage[1];
            // newObj.imageContentType = $rootScope.imageType;
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

    }
}());

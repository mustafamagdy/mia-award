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
                    //     
                    //     rootScope.image = e.target.result;
                    //     scope.$apply();

                    // }
                    reader.onload = function (e) {
                        
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
        .controller('createProductDialogController', ['blockUI', '$rootScope', '$state', 'appCONSTANTS', '$translate',
            'ProductResource', 'ProductNewCodePrepService', 'CategoryPrepService', 'ToastService', createProductDialogController])

    function createProductDialogController(blockUI, $rootScope, $state, appCONSTANTS, $translate, ProductResource,
        ProductNewCodePrepService, CategoryPrepService, ToastService) {

        blockUI.start("Loading...");
        var vm = this;
        $rootScope.image = null;
        vm.language = appCONSTANTS.supportedLanguage;
        if (CategoryPrepService == null)
            ToastService.show("right", "bottom", "fadeInUp", $translate.instant('NoCategorysAvailable'), "success");

        vm.categories = CategoryPrepService;

        vm.selectedCategoryId = 0;
        vm.code = ProductNewCodePrepService.id;

        vm.AddNewProduct = function () {
            

            var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            var newObj = new ProductResource();
            newObj.code = vm.code;
            newObj.categoryId = vm.selectedCategoryId;
            newObj.description = vm.description;
            newObj.image = splitImage[1];
            newObj.imageContentType = $rootScope.imageType;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('Products');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();
        vm.close = function () {
            $state.go('Products');
        }

    }
}());

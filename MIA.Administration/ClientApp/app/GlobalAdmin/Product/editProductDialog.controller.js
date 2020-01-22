(function () {
    'use strict';

    angular
        .module('home')
        .controller('editProductDialogController', ['$rootScope', '$filter', 'blockUI', 'CategoryPrepService', '$state', 'appCONSTANTS', '$translate', 'ProductResource', 'ToastService',
            'ProductByIdPrepService', editProductDialogController])

    function editProductDialogController($rootScope, $filter, blockUI, CategoryPrepService, $state, appCONSTANTS, $translate, ProductResource, ToastService, ProductByIdPrepService) {
        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Product = ProductByIdPrepService;
        vm.categories = CategoryPrepService;

        $rootScope.image = appCONSTANTS.Image_URL_ORDER + vm.Product.image;

        var indexRate = vm.categories.indexOf($filter('filter')(vm.categories, { 'id': vm.Product.category.id }, true)[0]);
        vm.selectedCategoryId = vm.categories[indexRate].id;

        // console.log("kkmo",vm.Product.category);


        vm.UpdateProduct = function () {
            blockUI.start("Loading...");
            var splitImage = $rootScope.image.split(',');

            var updateObj = new ProductResource();
            updateObj.code = vm.Product.code;
            updateObj.productId = vm.Product.productId;
            updateObj.categoryId = vm.selectedCategoryId;
            updateObj.description = vm.Product.description;
            if ($rootScope.imageType != null) {
                updateObj.image = splitImage[1];
                updateObj.imageContentType = $rootScope.imageType;
            }



            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
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
        vm.Close = function () {
            $state.go('Products');
        }
    }
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('editCategoryDialogController', ['$rootScope','$scope','blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'CategoryResource', 'ToastService', 'CategoryByIdPrepService', editCategoryDialogController])

    function editCategoryDialogController($rootScope,$scope,blockUI, $filter, $http, $state, appCONSTANTS, $translate, CategoryResource,
        ToastService, CategoryByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Category = CategoryByIdPrepService;
        $rootScope.image = appCONSTANTS.Image_URL_ORDER + vm.Category.image;
        // console.log(vm.Category.image);

        vm.Close = function () {
            $state.go('Category');
        }
        vm.UpdateCategory = function () {
            var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            
            var updateObj = new CategoryResource();
            updateObj.CategoryId = vm.Category.id;
            updateObj.titles = vm.Category.titles;  
            if ($rootScope.imageType != null) {
                updateObj.image = splitImage[1];
                updateObj.imageContentType = $rootScope.imageType;
            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('Category');

                },
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());

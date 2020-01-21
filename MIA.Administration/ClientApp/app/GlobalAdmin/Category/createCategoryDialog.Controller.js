(function () {
    'use strict';

    angular
        .module('home')
        .controller('createCategoryDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CategoryResource', 'ToastService', '$rootScope', createCategoryDialogController])

    function createCategoryDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CategoryResource,
        ToastService, $rootScope) {
        var vm = this;
        $rootScope.image = null;

        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Category');
        }


        vm.AddNewCategory = function () {
            var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            var newObj = new CategoryResource();
            newObj.Titles = vm.titleDictionary;
            newObj.image = splitImage[1];
            newObj.imageContentType = $rootScope.imageType;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Category');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

    }
}());

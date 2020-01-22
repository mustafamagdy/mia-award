(function () {
    'use strict';

    angular
        .module('home')
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
          debugger;
            var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            var newObj = new NewsResource();
            newObj.Title = vm.titleDictionary;
            newObj.Image = splitImage[1];
            newObj.imageContentType = $rootScope.imageType;
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

(function () {
    'use strict';

    angular
        .module('home')
        .controller('editNewsDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', 'NewsByIdPrepService', editNewsDialogController])

    function editNewsDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, NewsByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.News = NewsByIdPrepService;
        $rootScope.image = vm.News.posterUrl;
        // console.log(vm.News.image);

        vm.Close = function () {
            $state.go('News');
        }
        vm.UpdateNews = function () {
            var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");

            var updateObj = new NewsResource();
            updateObj.NewsId = vm.News.id;
            updateObj.titles = vm.News.titles;
            if ($rootScope.imageType != null) {
                updateObj.image = splitImage[1];
                updateObj.imageContentType = $rootScope.imageType;
            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('News');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());

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
     debugger;
        $rootScope.image = vm.News.posterUrl;
        // console.log(vm.News.image);

        vm.Close = function () {
            $state.go('News');
        }
        vm.UpdateNews = function () {
          //  var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            debugger;

            var updateObj = new NewsResource();
            updateObj.Id = vm.News.id;
            updateObj.title = vm.News.title;
            updateObj.body = vm.News.body;
            if ($scope.file != null) {
                // updateObj.image = splitImage[1];
                // updateObj.imageContentType = $rootScope.imageType;
                updateObj.Poster = $scope.file;

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

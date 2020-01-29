(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkMediaDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkMediaDialogController])

    function editArtWorkMediaDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
     debugger; 

        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.UpdateArtWork = function () {
          //  var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            debugger;

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.title = vm.ArtWork.title;
            updateObj.body = vm.ArtWork.body;
            if ($scope.file != null) {
                // updateObj.image = splitImage[1];
                // updateObj.imageContentType = $rootScope.imageType;
                updateObj.Poster = $scope.file;

            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('ArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());

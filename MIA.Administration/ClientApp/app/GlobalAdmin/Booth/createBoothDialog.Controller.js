(function () {
    'use strict';

    angular
        .module('home')
        .controller('createBoothDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'BoothResource', 'ToastService', '$rootScope', createBoothDialogController])

    function createBoothDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, BoothResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Booth');
        }


        vm.AddNewBooth = function () {
            blockUI.start("Loading...");
            var newObj = new BoothResource();
            newObj.Description = vm.Description;
            newObj.Code = vm.Code;
            newObj.Area = vm.Area;
            newObj.Price = vm.Price;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Booth');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

    }
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBoothDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'BoothResource', 'ToastService', 'BoothByIdPrepService', editBoothDialogController])

    function editBoothDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, BoothResource,
        ToastService, BoothByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Booth = BoothByIdPrepService; 
        console.log(vm.Booth);

        vm.Close = function () {
            $state.go('Booth');
        }
        vm.UpdateBooth = function () { 
            blockUI.start("Loading...");
            debugger;

            var updateObj = new BoothResource();
            updateObj.Id = vm.Booth.id;
            updateObj.Description = vm.Booth.description;
            updateObj.Code = vm.Booth.code;
            updateObj.Price = vm.Booth.price;
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('Booth');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());

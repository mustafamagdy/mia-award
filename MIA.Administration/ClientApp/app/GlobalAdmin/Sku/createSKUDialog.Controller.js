(function () {
    'use strict';

    angular
        .module('home')
        .controller('createSKUDialogController', ['blockUI', '$state', 'appCONSTANTS', '$translate',
            'SKUResource', 'ToastService', 'GeneratCodePrepService', createSKUDialogController])

    function createSKUDialogController(blockUI, $state, appCONSTANTS, $translate, SKUResource,
        ToastService, GeneratCodePrepService) {
        blockUI.start("Loading...");
        var vm = this;
        vm.code = GeneratCodePrepService.id;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('SKU');
        }

        vm.AddNewSKU = function () {
            blockUI.start("Loading...");
            var newObj = new SKUResource();
            newObj.titles = vm.titles;
            newObj.isBasic = vm.isBasic;
            newObj.code = vm.code;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('SKU');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                }
            );
        }
        blockUI.stop();

    }
}());

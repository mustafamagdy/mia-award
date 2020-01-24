(function () {
    'use strict';

    angular
        .module('home')
        .controller('editSKUDialogController', ['blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'SKUResource', 'ToastService',
            'SKUByIdPrepService', '$stateParams', editSKUDialogController])

    function editSKUDialogController(blockUI, $http, $state, appCONSTANTS, $translate, SKUResource, ToastService,
        SKUByIdPrepService, $stateParams) {
        blockUI.start("Loading...");
        

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.sku = SKUByIdPrepService;
        // vm.id = SKUByIdPrepService.id;
        console.log(vm.sku.titles);

        vm.Close = function () {
            $state.go('SKU');
        }
        vm.UpdateSKU = function () {
            
            blockUI.start("Loading...");
            var updateObj = new SKUResource();
            updateObj.skuId = vm.sku.skuId;
            // updateObj.skuId= $stateParams.sku.skuId;
            updateObj.titles = vm.sku.titles;
            updateObj.isBasic = vm.sku.isBasic;
            updateObj.code = vm.sku.code;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                        $state.go('SKU');
                    }
                    else
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());

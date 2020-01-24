(function () {
    'use strict';

    angular
        .module('home')
        .controller('createCountryDialogController', ['blockUI', '$state', 'appCONSTANTS', '$translate',
            'CountryResource', 'ToastService', createCountryDialogController])

    function createCountryDialogController(blockUI, $state, appCONSTANTS, $translate, CountryResource,
        ToastService) {

        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Countries');
        }

        vm.AddNewCountry = function () {
            blockUI.start("Loading...");
            
            var newObj = new CountryResource();
            newObj.titles = vm.titles;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Countries');
                    blockUI.stop();


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

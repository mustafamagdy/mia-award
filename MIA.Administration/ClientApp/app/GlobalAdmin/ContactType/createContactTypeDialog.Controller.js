(function () {
    'use strict';

    angular
        .module('home')
        .controller('createContactTypeDialogController', ['blockUI', '$state', 'appCONSTANTS', '$translate',
            'ContactTypeResource', 'ToastService', createContactTypeDialogController])

    function createContactTypeDialogController(blockUI, $state, appCONSTANTS, $translate, ContactTypeResource,
        ToastService) {

        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ContactType');
        }

        vm.AddNewContactType = function () {
            blockUI.start("Loading...");
            
            var newObj = new ContactTypeResource();
            newObj.titles = vm.titles;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('ContactType');
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

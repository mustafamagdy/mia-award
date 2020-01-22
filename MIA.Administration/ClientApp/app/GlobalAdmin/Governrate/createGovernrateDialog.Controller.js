(function () {
    'use strict';

    angular
        .module('home')
        .controller('createGovernrateDialogController', ['GovernrateResource', '$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ToastService', '$stateParams', 'CountryByIdPrepService'
            , createGovernrateDialogController])

    function createGovernrateDialogController(GovernrateResource, $scope, blockUI, $http, $state, appCONSTANTS, $translate,
        ToastService, $stateParams, CountryByIdPrepService) {

        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];

        vm.close = function () {
            $state.go('Governrates', { countryId: $stateParams.countryId });
        }

        vm.AddNewGovernrate = function () {
            blockUI.start("Loading...");
            
            var newObj = new GovernrateResource();
            newObj.parentId = $stateParams.countryId;
            newObj.titles = vm.titles;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Governrates', { countryId: $stateParams.countryId }, { reload: true });

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

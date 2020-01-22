(function () {
    'use strict';

    angular
        .module('home')
        .controller('createRegionDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'RegionResource', 'ToastService', '$stateParams', 'CountryByIdPrepService', createRegionDialogController])

    function createRegionDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, RegionResource,
        ToastService, $stateParams, CountryByIdPrepService) {

        blockUI.start("Loading...");

        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];

        Manufacture.close = function () {
            $state.go('Regions', { countryId: $stateParams.countryId });
        }

        Manufacture.AddNewRegion = function () {
            blockUI.start("Loading...");

            var newObj = new RegionResource();
            newObj.countryId = $stateParams.countryId;
            newObj.titles = Manufacture.titles;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Regions', { countryId: $stateParams.countryId }, { reload: true });


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

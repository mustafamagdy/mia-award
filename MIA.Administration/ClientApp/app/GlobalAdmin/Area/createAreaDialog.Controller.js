(function () {
    'use strict';

    angular
        .module('home')
        .controller('createAreaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'AreaResource', 'ToastService', '$stateParams', 'CityByIdPrepService', 'GovernrateByIdPrepService', createAreaDialogController])

    function createAreaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, AreaResource,
        ToastService, $stateParams, CityByIdPrepService, GovernrateByIdPrepService) {

        blockUI.start("Loading...");

        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        Manufacture.close = function () {
            $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId });
        }

        Manufacture.AddNewArea = function () {
            blockUI.start("Loading...");

            var newObj = new AreaResource();
            newObj.cityId = $stateParams.cityId;
            newObj.titleDictionary = Manufacture.titleDictionary;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId }, { reload: true });
                    blockUI.stop();


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

(function () {
    'use strict';

    angular
        .module('home')
        .controller('createCityDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CityResource', 'ToastService', '$stateParams', 'GovernrateByIdPrepService', createCityDialogController])

    function createCityDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CityResource,
        ToastService, $stateParams, GovernrateByIdPrepService) {

        blockUI.start("Loading...");

        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        // $scope.countryName = GovernrateByIdPrepService.countryNames[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titles[$scope.selectedLanguage];
        Manufacture.close = function () {
            $state.go('Cities', { countryId: $stateParams.countryId, governrateId: $stateParams.governrateId });
        }

        Manufacture.AddNewCity = function () {
            blockUI.start("Loading...");

            var newObj = new CityResource();
            newObj.ParentId = $stateParams.governrateId;
            newObj.titles = Manufacture.titles;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Cities', { countryId: $stateParams.countryId, governrateId: $stateParams.governrateId }, { reload: true });
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

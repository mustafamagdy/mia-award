(function () {
    'use strict';

    angular
        .module('home')
        .controller('editCityDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'CityResource', 'ToastService',
            'CityByIdPrepService', '$stateParams', 'GovernrateByIdPrepService', editCityDialogController])

    function editCityDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CityResource, ToastService,
        CityByIdPrepService, $stateParams, GovernrateByIdPrepService) {
        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.City = CityByIdPrepService;
        // $scope.countryName = GovernrateByIdPrepService.countryNames[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titles[$scope.selectedLanguage];

        vm.Close = function () {
           $state.go('Cities', { governrateId: $stateParams.governrateId });
        }
        vm.UpdateCity = function () {
            blockUI.start("Loading...");

            var updateObj = new CityResource();
            updateObj.cityId = vm.City.cityId;
            updateObj.ParentId = $stateParams.governrateId;
            updateObj.titles = vm.City.titles;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('Cities', { governrateId: $stateParams.governrateId });

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());

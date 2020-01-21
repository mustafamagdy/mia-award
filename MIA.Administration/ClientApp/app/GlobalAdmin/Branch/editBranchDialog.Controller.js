(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBranchDialogController', ['$scope', 'blockUI','$http', '$state', 'appCONSTANTS', '$translate', 'BranchResource', 'ToastService',
            'BranchByIdPrepService','$stateParams','AreaByIdPrepService','CityByIdPrepService', 'GovernrateByIdPrepService', editBranchDialogController])

    function editBranchDialogController($scope,blockUI, $http, $state, appCONSTANTS, $translate, BranchResource, ToastService,
         BranchByIdPrepService,$stateParams,AreaByIdPrepService,CityByIdPrepService, GovernrateByIdPrepService) {
        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        Manufacture.Branch = BranchByIdPrepService;
        
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.areaName = AreaByIdPrepService.titleDictionary[$scope.selectedLanguage];
            
        Manufacture.close = function () {
            $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId });
        }
        Manufacture.UpdateBranch = function () {
            blockUI.start("Loading...");
            var updateObj = new BranchResource();
            updateObj.BranchId = Manufacture.Branch.branchId;
            updateObj.titleDictionary = Manufacture.Branch.titleDictionary;
            updateObj.IsDeleted = false;
            updateObj.IsStatic = false;
            updateObj.$update().then(
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                    $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId },{ reload: true });

                },
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.title, "error");
                }
            );
        }
    }
}());

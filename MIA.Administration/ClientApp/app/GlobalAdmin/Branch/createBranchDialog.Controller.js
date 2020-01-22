(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createBranchDialogController', ['$scope', 'blockUI','$http', '$state', 'appCONSTANTS', '$translate',
            'BranchResource', 'ToastService', '$stateParams', 'AreaByIdPrepService','CityByIdPrepService', 'GovernrateByIdPrepService', createBranchDialogController])

    function createBranchDialogController($scope, blockUI,$http, $state, appCONSTANTS, $translate, BranchResource,
        ToastService, $stateParams, AreaByIdPrepService,CityByIdPrepService, GovernrateByIdPrepService) {
		var Manufacture = this;
		Manufacture.Area = AreaByIdPrepService;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.areaName = AreaByIdPrepService.titleDictionary[$scope.selectedLanguage];
		Manufacture.close = function(){
		    $state.go('Area',{ countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId });
		} 
		 
		Manufacture.AddNewBranch = function () {
            blockUI.start("Loading...");
            var newObj = new BranchResource();
		    newObj.AreaId = Manufacture.Area.areaId;
            newObj.titleDictionary = Manufacture.titleDictionary;
            newObj.IsDeleted = false; 
            newObj.IsStatic =false;
            newObj.$create().then(
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Area',{ countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId },{ reload: true });

                },
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
  
	}	
}());

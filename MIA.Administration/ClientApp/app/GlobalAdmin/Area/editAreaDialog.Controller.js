(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editAreaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'AreaResource', 'ToastService',
            'AreaByIdPrepService','$stateParams','CityByIdPrepService','GovernrateByIdPrepService', editAreaDialogController])

    function editAreaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, AreaResource, ToastService, 
        AreaByIdPrepService, $stateParams, CityByIdPrepService, GovernrateByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var Manufacture = this; 
		Manufacture.language = appCONSTANTS.supportedLanguage;
        Manufacture.Area = AreaByIdPrepService; 
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        Manufacture.Close = function () {
            $state.go('Area',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId});
        }
        Manufacture.UpdateArea = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new AreaResource();
            updateObj.AreaId = Manufacture.Area.areaId;
            updateObj.cityId= $stateParams.cityId;                        
            updateObj.titleDictionary = Manufacture.Area.titleDictionary;
		    updateObj.IsDeleted = false;
		    updateObj.IsStatic = false;
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Area',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId},{ reload: true });

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

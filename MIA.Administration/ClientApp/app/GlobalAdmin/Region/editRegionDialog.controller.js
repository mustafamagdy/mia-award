(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editRegionDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'RegionResource', 'ToastService',
            'RegionByIdPrepService','$stateParams','CountryByIdPrepService', editRegionDialogController])

    function editRegionDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, RegionResource, ToastService, 
        RegionByIdPrepService,$stateParams,CountryByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var Manufacture = this; 
		Manufacture.language = appCONSTANTS.supportedLanguage;
        Manufacture.Region = RegionByIdPrepService; 
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];
        
        Manufacture.Close = function () {
            $state.go('Regions',{countryId: $stateParams.countryId });
        }
        Manufacture.UpdateRegion  = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new RegionResource();
            updateObj.regionId = Manufacture.Region.regionId;
            updateObj.countryId= $stateParams.countryId;
            updateObj.titles = Manufacture.Region.titles;
		    updateObj.IsDeleted = false;
		    updateObj.IsStatic = false;
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Regions',{countryId: $stateParams.countryId },{ reload: true });

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

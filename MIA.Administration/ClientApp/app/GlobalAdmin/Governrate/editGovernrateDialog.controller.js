(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editGovernrateDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'GovernrateResource', 'ToastService',
            'GovernrateByIdPrepService','$stateParams','CountryByIdPrepService', editGovernrateDialogController])

    function editGovernrateDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, GovernrateResource, ToastService, 
        GovernrateByIdPrepService,$stateParams,CountryByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Governrate = GovernrateByIdPrepService; 
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];
        
        vm.Close = function () {
            $state.go('Governrates',{countryId: $stateParams.countryId });
        }
        vm.UpdateGovernrate  = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new GovernrateResource();
            updateObj.GovernrateId = vm.Governrate.governrateId;
            updateObj.countryId= $stateParams.countryId;
            updateObj.titles = vm.Governrate.titles; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Governrates',{countryId: $stateParams.countryId },{ reload: true });

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

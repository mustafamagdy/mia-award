(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editCountryDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'CountryResource', 'ToastService',
            'CountryByIdPrepService', editCountryDialogController])

    function editCountryDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryResource, ToastService, CountryByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Country = CountryByIdPrepService; 
        vm.Close = function () {
            $state.go('Countries');
        }
        vm.UpdateCountry  = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new CountryResource();
            updateObj.countryId = vm.Country.countryId;
            updateObj.titles = vm.Country.titles; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Countries');

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

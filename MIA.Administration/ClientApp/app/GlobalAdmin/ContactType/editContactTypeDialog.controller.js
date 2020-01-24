(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editContactTypeDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'ContactTypeResource', 'ToastService',
            'ContactTypeByIdPrepService', editContactTypeDialogController])

    function editContactTypeDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ContactTypeResource, ToastService, ContactTypeByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.ContactType = ContactTypeByIdPrepService; 
        console.log(ContactTypeByIdPrepService);
        vm.Close = function () {
            $state.go('ContactType');
        }
        vm.UpdateContactType  = function () { 
            
            blockUI.start("Loading..."); 
            
            var updateObj = new ContactTypeResource();
            updateObj.contactTypeId = vm.ContactType.contactTypeId;
            updateObj.titles = vm.ContactType.titles; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('ContactType');

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

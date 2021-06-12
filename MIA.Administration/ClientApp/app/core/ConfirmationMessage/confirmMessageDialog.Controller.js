(function () {
	'use strict';
	angular
		.module('home')
		.controller('confirmMessageDialogController', ['$uibModalInstance', 'callBackFunction', confirmMessageDialogController])

	function confirmMessageDialogController($uibModalInstance, callBackFunction) {
		var vm = this; 
		vm.close = function () {
			$uibModalInstance.dismiss();
		}

		vm.Confirm = function () {
			callBackFunction();
			$uibModalInstance.dismiss();
		}

	}
}());

(function () {
	'use strict';
	angular
		.module('home')
		.controller('confirmDeleteDialogController', ['$uibModalInstance', 'model', 'itemName', 'itemId', 'message', 'callBackFunction', confirmDeleteDialogController])

	function confirmDeleteDialogController($uibModalInstance, model, itemName, itemId, message, callBackFunction) {
		var vm = this;
		vm.itemName = itemName;
		vm.model = model;
		vm.message = message;
		vm.close = function () {
			$uibModalInstance.dismiss();
		}

		vm.Confirm = function () {
			callBackFunction(model);
			$uibModalInstance.dismiss();
		}

	}
}());

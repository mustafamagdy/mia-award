(function () {
	'use strict';
	angular
		.module('home')
		.controller('ProductDetailsDialogController', ['$uibModalInstance', 'ToastService', '$translate', '$state', '$stateParams', '$filter', 'SKUConversion', 'blockUI', '$localStorage', '$scope', 'ProductResource', 'model', 'callBackFunction', ProductDetailsDialogController])

	function ProductDetailsDialogController($uibModalInstance, ToastService, $translate, $state, $stateParams, $filter, SKUConversion, blockUI, $localStorage, $scope, ProductResource, model, callBackFunction) {
		var vm = this;
		vm.model = model;
		vm.close = function () {
			$uibModalInstance.dismiss();
		}
		$scope.selectedLanguage = $localStorage.language;
		vm.Confirm = function () {
			callBackFunction(model);
			$uibModalInstance.dismiss();
		}
		
		vm.SKUConversion = SKUConversion;

		var index = vm.SKUConversion.indexOf($filter('filter')(vm.SKUConversion, { 'skuId': vm.model.priceList[0].skuId }, true)[0]);
		vm.selectedskuId = vm.SKUConversion[index].skuId;
		blockUI.stop();


		$scope.dateIsValid = false;
		$scope.dateChange = function () {
			
			if ($('#startdate').data('date') == null || $('#startdate').data('date') == "") {
				$scope.dateIsValid = false;
				// $scope.$apply();
			} else if ($scope.editProductDetailsForm.$valid) {
				$scope.dateIsValid = true;
				// $scope.$apply();
			}
		}

		vm.UpdateSKUConversion = function () {
			blockUI.start("Loading...");
			
			vm.data = {
				"productDetialsId": vm.model.productDetailsId,
				"barCode": vm.model.barCode,
				"minorderQty": vm.model.minorderQty,
				"blockOnDate": $('#startdate').val(),
				"isPormotedAllow": vm.model.isPormotedAllow,
				"isActive": vm.model.isActive,
				"priceList": [{
					"skuId": vm.selectedskuId,
					"price": vm.model.priceList[0].price
				}]

			}
			var updateObj = new ProductResource();
			updateObj.productId = $stateParams.produdctId;
			updateObj.data = vm.data;
			updateObj.$updateSKUConversion().then(
				function (data, status) {
					blockUI.stop();
					
					if (data.isSuccsess) {
						model.blockOnDate = $('#startdate').val();
						vm.model.priceList[0].skuId = vm.selectedskuId;
						$uibModalInstance.dismiss();
						ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
						//$state.go('ProductDetails', { produdctId: $stateParams.produdctId });
					}
					else {
						ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
					}

				},
				function (data, status) {
					blockUI.stop();

					ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
				}
			);
		}

	}
}());

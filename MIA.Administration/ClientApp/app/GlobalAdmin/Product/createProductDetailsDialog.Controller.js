(function () {
	'use strict';
	angular
		.module('home')
		.controller('createProductDetailsDialog', ['ToastService', '$translate', '$state', '$stateParams', '$filter', 'SKUConversionPrepService', 'blockUI', '$localStorage', '$scope', 'ProductResource', createProductDetailsDialog])

	function createProductDetailsDialog(ToastService, $translate, $state, $stateParams, $filter, SKUConversionPrepService, blockUI, $localStorage, $scope, ProductResource) {
		var vm = this;
		vm.selectedskuId = 0;
		vm.minQty = 0;
		vm.price = 1;
		vm.close = function () {
			$state.go('ProductDetails', { produdctId: $stateParams.produdctId });
		}
		$scope.selectedLanguage = $localStorage.language;
		vm.Confirm = function () {
			// callBackFunction(model);
			// $uibModalInstance.dismiss();
		}
		debugger
		vm.SKUConversion = SKUConversionPrepService;

		blockUI.stop();


		$scope.dateIsValid = false;
		$scope.dateChange = function () {
			
			if ($('#startdate').data('date') == null || $('#startdate').data('date') == "") {
				$scope.dateIsValid = false;
				// $scope.$apply();
			} else if ($scope.addProductDetailsForm.$valid) {
				$scope.dateIsValid = true;
				// $scope.$apply();
			}
		}

		vm.AddSKUConversion = function () {
			blockUI.start("Loading...");
			if (vm.price <= 0) {
				ToastService.show("right", "bottom", "fadeInUp", $translate.instant('mustisertpricevalue'),"error");
				blockUI.stop();
				return;
			}
			vm.data = {
				"barCode": vm.barCode,
				"minorderQty": vm.minQty,
				"blockOnDate": $('#startdate').val(),
				"isPormotedAllow": vm.isPormotedAllow,
				"isActive": vm.status,
				"priceList": [{
					"skuId": vm.selectedskuId,
					"price": vm.price
				}]

			}
			var createObj = new ProductResource();
			createObj.productId = $stateParams.produdctId;
			createObj.data = vm.data;
			createObj.$createSKUConversion().then(
				function (data, status) {
					blockUI.stop();
					
					if (data.isSuccsess) {
						ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
						$state.go('ProductDetails', { produdctId: $stateParams.produdctId });
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

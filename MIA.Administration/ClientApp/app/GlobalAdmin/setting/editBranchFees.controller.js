(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBranchFeesController', ['$scope', 'blockUI', '$filter', '$translate',
            '$state', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', '$stateParams'
            , 'branchFeesPrepService' , '$uibModalInstance', 'BranchResource', editBranchFeesController]);


    function editBranchFeesController($scope, blockUI, $filter, $translate,
        $state, $localStorage, authorizationService, appCONSTANTS, ToastService, $stateParams,
        branchFeesPrepService, $uibModalInstance, BranchResource) {
        //console.log(progDetailsPrepService);

        $scope.selectedLanguage = $localStorage.language;
        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        blockUI.stop();
        $scope.branch = branchFeesPrepService[0];

        Manufacture.close = function () {
            $uibModalInstance.dismiss();
            //  $uibModalInstance.dismiss('cancel');
            // callBackFunction();
        }


        Manufacture.UpdateFees = function () {
            var branch = new BranchResource();
            
            branch.deliveryCost = $scope.branch.deliveryCost;
            branch.deliveryPrice = $scope.branch.deliveryPrice;
            branch.isFees = true;
            branch.branchId = $scope.branch.branchId;

            branch.$update().then(
                function (data, status) {
                    $uibModalInstance.dismiss();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('EditedSuccessfully'), "success");
                    // callBackFunction();

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }

})();

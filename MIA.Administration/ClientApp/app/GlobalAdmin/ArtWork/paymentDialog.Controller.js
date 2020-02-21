(function () {
    'use strict';

    angular
        .module('home')
        .controller('artWorkPaymentDialogController', ['$scope', 'blockUI', '$http', '$state', '$stateParams', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', 'ArtWorkPaymentByArtWorkIdPrepService', artWorkPaymentDialogController])

    function artWorkPaymentDialogController($scope, blockUI, $http, $state, $stateParams, $translate, ArtWorkResource,
        ToastService, $rootScope, ArtWorkPaymentByArtWorkIdPrepService) {
        var vm = this;
        var receiptImage;
        vm.artWorkPayment = ArtWorkPaymentByArtWorkIdPrepService;
        console.log(vm.artWorkPayment)
        vm.paymentStatus = 0;
        vm.receiptImage = vm.artWorkPayment.receiptUrl;
        vm.close = function () {
            $state.go('ArtWork');
        }

        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
                // $scope.$apply();
            } else if ($scope.artWorkPaymentForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
        }
        $scope.uploadReceiptFile = function (element) {
            debugger;
            vm.receipt = $(element)[0].files[0];
        };


        vm.AddPayment = function () {
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.ArtWorkId = $stateParams.id;// vm.artWorkPayment.ArtWorkId;
            newObj.PaymentStatus = vm.PaymentStatus == true ? 1 : 0;
            newObj.TransactionNumber = vm.TransactionNumber;
            newObj.Amount = vm.Amount;
            // newObj.PaymentDate = $('#paymentDate').val();
            newObj.Receipt = receiptImage;

            newObj.$createPayment().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('ArtWork');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.UpdatePayment = function () {
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Id = vm.artWorkPayment.id;
            newObj.ArtWorkId = vm.artWorkPayment.artWorkId;
            newObj.PaymentStatus = vm.artWorkPayment.paymentStatus == true ? 1 : 0;
            newObj.TransactionNumber = vm.artWorkPayment.transactionNumber;
            newObj.Amount = vm.artWorkPayment.amount;
            // newObj.PaymentDate = $('#paymentDate').val();
            newObj.Receipt = receiptImage;

            newObj.$updatePayment().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('ArtWork');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }
        vm.LoadUploadreceipt = function () {
            debugger;
            $("#receiptImage").click();
        }
        $scope.AddreceiptImage = function (element) {
            debugger;
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.artWorkPaymentForm.$dirty = true;
                    $scope.$apply(function () {

                        receiptImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.receiptImage = reader.result;

                            $scope.$apply();
                        };
                        if (logoFile) {
                            reader.readAsDataURL(logoFile);
                        }
                    })
                } else {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (logoFile) {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        $scope.uploadreceiptFile = function (element) {
            debugger;
            vm.receiptImage = $(element)[0].files[0];
        };
    }
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('newBoothPaymentDialogController', ['$scope', 'blockUI', '$http', '$state', '$stateParams', '$translate',
            'BoothResource', 'ToastService', '$rootScope', 'status', newBoothPaymentDialogController])

    function newBoothPaymentDialogController($scope, blockUI, $http, $state, $stateParams, $translate, BoothResource,
        ToastService, $rootScope, status) {
        var vm = this;
        var receiptImage;
        vm.statusList = status.StatusList;

        vm.close = function () {
            $state.go('Booth');
        }

        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
                // $scope.$apply();
            } else if ($scope.boothPaymentForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
        }

        vm.UpdatePayment = function () {
            debugger;
            var fileByte = "";
            var fileName = "";
            blockUI.start("Loading...");
            var newObj = new BoothResource();
            newObj.ContactName = vm.contactName;
            newObj.Phone1 = vm.phone1;
            newObj.Phone2 = vm.phone2;
            newObj.Email = vm.email;
            newObj.BoothId = $stateParams.id;
            if (receiptImage != null) {
                var splitImage = vm.receiptImage.split(',');
                fileByte = splitImage[1];
                fileName = receiptImage.type;
            }

            var Payment = {
                TransactionNumber: vm.payment.transactionNumber,
                Amount: vm.payment.amount,
                PaymentDate: +new Date($('#paymentDate').val()),
                PaymentStatus: vm.selectedStatus.Id,
                Receipt: fileByte,
                ReceiptFileName: fileName
            };
            newObj.Payment = Payment;

            newObj.$createPayment().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Booth');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
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
                    $scope.boothPaymentForm.$dirty = true;
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

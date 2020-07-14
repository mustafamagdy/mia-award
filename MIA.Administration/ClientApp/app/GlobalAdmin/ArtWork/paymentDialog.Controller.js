(function () {
    'use strict';

    angular
        .module('home')
        .controller('artWorkPaymentDialogController', ['$scope', 'blockUI', 'status', '$state', '$stateParams', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', 'ArtWorkPaymentByArtWorkIdPrepService', artWorkPaymentDialogController])

    function artWorkPaymentDialogController($scope, blockUI, status, $state, $stateParams, $translate, ArtWorkResource,
        ToastService, $rootScope, ArtWorkPaymentByArtWorkIdPrepService) {
        var vm = this;
        var receiptImage;

        vm.statusList = status.StatusList;
        vm.artWorkPayment = ArtWorkPaymentByArtWorkIdPrepService;
        vm.CheckIsUpdate = angular.copy(vm.artWorkPayment.amount);
        if (vm.artWorkPayment.paymentStatus == 'waiting')
            vm.selectedStatus = vm.statusList[0];
        if (vm.artWorkPayment.paymentStatus == 'confirmed')
            vm.selectedStatus = vm.statusList[1];
        if (vm.artWorkPayment.paymentStatus == 'rejected')
            vm.selectedStatus = vm.statusList[2];

        vm.receiptImage = vm.artWorkPayment.receiptUrl;
        vm.close = function () {
            $state.go('ArtWork');
        }

        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
                // $scope.$apply();
            } else if ($scope.artWorkPaymentForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
        }
        $scope.uploadReceiptFile = function (element) {
            
            vm.receipt = $(element)[0].files[0];
        };


        vm.AddArtWorkPaymet = function () {
            var fileByte = "";
            var fileName = "";
            if (receiptImage != null) {
                var splitImage = vm.receiptImage.split(',');
                fileByte = splitImage[1];
                fileName = receiptImage.type;
            }

            blockUI.start("Loading...");
            
            var newObj = new ArtWorkResource();
            newObj.ArtWorkId = $stateParams.id;// vm.artWorkPayment.ArtWorkId;
            newObj.PaymentStatus = vm.selectedStatus.Id;
            newObj.TransactionNumber = vm.artWorkPayment.transactionNumber;
            newObj.Amount = vm.artWorkPayment.amount;
            newObj.PaymentDate = +new Date($('#paymentDate').val());
            newObj.ReceiptByte = fileByte;
            newObj.ReceiptFileName = fileName;

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
            var fileByte = "";
            var fileName = "";
            if (receiptImage != null) {
                var splitImage = vm.receiptImage.split(',');
                fileByte = splitImage[1];
                fileName = receiptImage.type;
            }
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Id = vm.artWorkPayment.id;
            newObj.ArtWorkId = $stateParams.id;//vm.artWorkPayment.artWorkId;
            newObj.PaymentStatus = vm.selectedStatus.Id;//vm.artWorkPayment.paymentStatus == true ? 1 : 0;
            newObj.TransactionNumber = vm.artWorkPayment.transactionNumber;
            newObj.Amount = vm.artWorkPayment.amount;
            newObj.PaymentDate = +new Date($('#paymentDate').val());
            newObj.Receipt = fileByte;
            newObj.ReceiptFileName = fileName;

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
            
            $("#receiptImage").click();
        }
        $scope.AddreceiptImage = function (element) {
            
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
            
            vm.receiptImage = $(element)[0].files[0];
        };
    }
}());

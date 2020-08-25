(function () {
  "use strict";

  angular
    .module("home")
    .controller("boothPaymentDialogController", [
      "$scope",
      "blockUI",
      "$http",
      "$state",
      "$stateParams",
      "$translate",
      "BoothResource",
      "ToastService",
      "$rootScope",
      "status",
      "BoothPaymentByBoothIdPrepService",
      boothPaymentDialogController,
    ]);

  function boothPaymentDialogController(
    $scope,
    blockUI,
    $http,
    $state,
    $stateParams,
    $translate,
    BoothResource,
    ToastService,
    $rootScope,
    status,
    BoothPaymentByBoothIdPrepService
  ) {
    var vm = this;
    var receiptImage;

    vm.statusList = status.StatusList;
    vm.boothPayment = BoothPaymentByBoothIdPrepService;

    if (vm.boothPayment.payment.paymentStatus == "waiting") vm.selectedStatus = vm.statusList[0];
    if (vm.boothPayment.payment.paymentStatus == "confirmed") vm.selectedStatus = vm.statusList[1];
    if (vm.boothPayment.payment.paymentStatus == "rejected") vm.selectedStatus = vm.statusList[2];

    vm.receiptImage = vm.boothPayment.payment.receiptUrl;
    const paymentDate = new Date(vm.boothPayment.payment.paymentDate*1000);
    const dateTimeFormat = new Intl.DateTimeFormat("en", { year: "numeric", month: "2-digit", day: "2-digit" });
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(paymentDate);

    vm.paymentDate = `${year }-${month}-${day}`
    vm.close = function () {
      $state.go("Booth");
    };

    $scope.dateIsValid = false;
    $scope.dateChange = function () {
      if ($("#paymentDate").data("date") == null || $("#paymentDate").data("date") == "") {
        $scope.dateIsValid = false;
        // $scope.$apply();
      } else if ($scope.boothPaymentForm.$valid) {
        $scope.dateIsValid = true;
        // $scope.$apply();
      }
    };

    vm.UpdatePayment = function () {
      blockUI.start("Loading...");
      var newObj = new BoothResource();
      newObj.Id = vm.boothPayment.payment.id;
      newObj.PaymentStatus = vm.selectedStatus.Id;
      newObj.TransactionNumber = vm.boothPayment.payment.transactionNumber;
      newObj.Amount = vm.boothPayment.payment.amount;
      newObj.PaymentDate = +new Date($("#paymentDate").val());
      if (receiptImage != null) {
        var splitImage = vm.receiptImage.split(",");
        newObj.Receipt = splitImage[1];
        newObj.ReceiptFileName = receiptImage.type;
      }

      newObj.$updatePayment().then(
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("AddedSuccessfully"), "success");
          $state.go("Booth");
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
        }
      );
    };
    vm.LoadUploadreceipt = function () {
      $("#receiptImage").click();
    };
    $scope.AddreceiptImage = function (element) {
      var logoFile = element[0];

      var allowedImageTypes = ["image/jpg", "image/png", "image/jpeg"];

      if (logoFile && logoFile.size >= 0 && logoFile.size / (1024 * 1000) < 2) {
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
          });
        } else {
          $("#logoImage").val("");
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("imageTypeError"), "error");
        }
      } else {
        if (logoFile) {
          $("#logoImage").val("");
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("imgaeSizeError"), "error");
        }
      }
    };

    $scope.uploadreceiptFile = function (element) {
      vm.receiptImage = $(element)[0].files[0];
    };
  }
})();

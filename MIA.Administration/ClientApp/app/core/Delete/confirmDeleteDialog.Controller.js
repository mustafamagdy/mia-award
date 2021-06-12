(function () {
  "use strict";
  angular
    .module("home")
    .controller("confirmDeleteDialogController", [
      "$uibModalInstance",
      "model",
      "itemName",
      "itemId",
      "message",
      "callBackFunction",
      "okLabel",
      "cancelLabel",
      confirmDeleteDialogController,
		])
		.value('okLabel', null)
		.value('cancelLabel', null)
		;

  function confirmDeleteDialogController(
    $uibModalInstance,
    model,
    itemName,
    itemId,
    message,
    callBackFunction,
    okLabel,
    cancelLabel
  ) {
    var vm = this;
    vm.itemName = itemName;
    vm.model = model;
    vm.message = message;
    vm.okLabel = okLabel;
    vm.cancelLabel = cancelLabel;

    vm.close = function () {
      $uibModalInstance.dismiss();
    };

    vm.Confirm = function () {
      callBackFunction(model);
      $uibModalInstance.dismiss();
    };
  }
})();

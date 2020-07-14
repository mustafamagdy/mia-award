(function () {
  "use strict";

  angular
    .module("home")
    .controller("BoothController", [
      "appCONSTANTS",
      "$scope",
      "$translate",
      "BoothResource",
      "blockUI",
      "$uibModal",
      "ToastService",
      BoothController,
    ]);

  function BoothController(
    appCONSTANTS,
    $scope,
    $translate,
    BoothResource,
    blockUI,
    $uibModal,
    ToastService
  ) {
    // $(".pmd-sidebar-nav>li>a").removeClass("active");
    // $($(".pmd-sidebar-nav").children()[3].children[0]).addClass("active");
    var vm = this;
    vm.currentPage = 1;
    vm.appCONSTANTS = appCONSTANTS;
    vm.showDetails = false;

    refreshBooths();
    function refreshBooths() {
      blockUI.start("Loading...");

      var k = BoothResource.getAllBooths({
        pageNumber: vm.currentPage,
        pageSize: 10,
      }).$promise.then(
        function (results) {
          $scope.BoothList = results.items;
          $scope.totalCount = results.metadata.totalItemCount;
          //   console.log($scope.BoothList);
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
        }
      );
    }

    vm.showMore = function (element, booth) {
      // $(element.currentTarget).toggleClass("child-table-collapse");

      const _inst = $uibModal.open({
        templateUrl: "purchases.html",
        controller: [
          "$scope",
          function (_scope) {
              debugger;
            _scope.purchases = booth.boothPurchase;
            _scope.boothCode = booth.code;
            _scope.cancel = function () {
              _inst.dismiss();
            };
          },
        ],
      });
    };

    function confirmationDelete(model) {
      var updateObj = new BoothResource();
      updateObj.$delete({ id: model.id }).then(
        function (data, status) {
          refreshBooths();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("DeletedSuccessfully"),
            "success"
          );
        },
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.data.message,
            "error"
          );
        }
      );
    }
    vm.openDeleteDialog = function (model, name, id) {
      var modalContent = $uibModal.open({
        templateUrl: "./app/core/Delete/templates/ConfirmDeleteDialog.html",
        controller: "confirmDeleteDialogController",
        controllerAs: "deleteDlCtrl",
        resolve: {
          model: function () {
            return model;
          },
          itemName: function () {
            return name;
          },
          itemId: function () {
            return id;
          },
          message: function () {
            return null;
          },
          callBackFunction: function () {
            return confirmationDelete;
          },
        },
      });
    };
    vm.ChangeStatus = function (model) {
      var updateObj = new BoothResource();
      updateObj.id = model.id;
      updateObj.sellable = model.sellable == true ? false : true;

      updateObj.$toggleSellable().then(
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("Editeduccessfully"),
            "success"
          );
          model.sellable = updateObj.sellable;
        },
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.message,
            "error"
          );
        }
      );
      return;
    };

    vm.changePage = function (page) {
      vm.currentPage = page;
      refreshBooths();
    };
  }
})();

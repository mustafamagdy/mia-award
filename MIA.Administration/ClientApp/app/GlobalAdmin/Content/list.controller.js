(function () {
  "use strict";

  angular
    .module("home")
    .controller("ListController", [
      "appCONSTANTS",
      "$scope",
      "$translate",
      "NewsResource",
      "blockUI",
      "$uibModal",
      "ToastService",
      ListController,
    ]);

  function ListController(
    appCONSTANTS,
    $scope,
    $translate,
    NewsResource,
    blockUI,
    $uibModal,
    ToastService
  ) {
    // $(".pmd-sidebar-nav>li>a").removeClass("active");
    // $($(".pmd-sidebar-nav").children()[2].children[0]).addClass("active");

    var vm = this;

    vm.currentPage = 1;
    vm.appCONSTANTS = appCONSTANTS;

    refreshNewss();
    function refreshNewss() {
      blockUI.start("Loading...");

      var k = NewsResource.getAllNewss({
        pageNumber: vm.currentPage,
        pageSize: 10,
      }).$promise.then(
        function (results) {
          $scope.NewsList = results.items;
          $scope.totalCount = results.metadata.totalItemCount;
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          //s ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
        }
      );
    }
    function change(news, isDeleted) {
      var updateObj = new NewsResource();
      updateObj.id = news.id;
      if (!isDeleted) updateObj.status = news.status == true ? false : true;
      updateObj.isDeleted = news.isDeleted;

      updateObj.$update().then(
        function (data, status) {
          // if (isDeleted)
          refreshNewss();

          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("Editeduccessfully"),
            "success"
          );
          news.status = updateObj.status;
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
    vm.UpdateNews = function (news) {
      change(news, false);
    };

    function confirmationDelete(model) {
      var updateObj = new NewsResource();
      updateObj.$delete({ id: model.id }).then(
        function (data, status) {
          refreshNewss();
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
      var updateObj = new NewsResource();
      updateObj.id = model.id;
      updateObj.title = model.title;
      updateObj.body = model.body;
      updateObj.outdated = model.outdated == true ? false : true;
      updateObj.$update().then(
        function (data, status) {
          //  refreshNewss();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("Editeduccessfully"),
            "success"
          );
          model.outdated = updateObj.outdated;
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
      refreshNewss();
    };
  }
})();

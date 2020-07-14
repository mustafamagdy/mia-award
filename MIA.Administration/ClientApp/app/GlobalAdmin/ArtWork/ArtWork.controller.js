(function () {
  "use strict";

  angular
    .module("home")
    .controller("ArtWorkController", [
      "appCONSTANTS",
      "$scope",
      "$translate",
      "ArtWorkResource",
      "blockUI",
      "$uibModal",
      "ToastService",
      ArtWorkController
    ]);

  function ArtWorkController(appCONSTANTS, $scope, $translate, ArtWorkResource, blockUI, $uibModal, ToastService) {
    // $(".pmd-sidebar-nav>li>a").removeClass("active");
    // $($(".pmd-sidebar-nav").children()[4].children[0]).addClass("active");
    var vm = this;

    vm.currentPage = 1;
    vm.appCONSTANTS = appCONSTANTS;
    refreshArtWorks();
    function refreshArtWorks() {
      blockUI.start("Loading...");

      var k = ArtWorkResource.getAllArtWorks({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(
        function (results) {
          $scope.ArtWorkList = results.items;
          $scope.totalCount = results.metadata.totalItemCount;
          console.log($scope.ArtWorkList);
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
         // ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
        }
      );
    }
    function change(artWork, isDeleted) {
      var updateObj = new ArtWorkResource();
      updateObj.id = artWork.id;
      if (!isDeleted) updateObj.status = artWork.status == true ? false : true;
      updateObj.isDeleted = artWork.isDeleted;

      updateObj.$update().then(
        function (data, status) {
          // if (isDeleted)
          refreshArtWorks();

          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("Editeduccessfully"), "success");
          artWork.status = updateObj.status;
        },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        }
      );
    }
    vm.UpdateArtWork = function (artWork) {
      change(artWork, false);
    };

    function confirmationDelete(model) {
      var updateObj = new ArtWorkResource();
      updateObj.$delete({ id: model.id }).then(
        function (data, status) {
          refreshArtWorks();
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("DeletedSuccessfully"), "success");
        },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
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
          }
        }
      });
    };
    vm.ChangeStatus = function (model) {
      var updateObj = new ArtWorkResource();
      updateObj.id = model.id;
      updateObj.title = model.title;
      updateObj.body = model.body;
      updateObj.outdated = model.outdated == true ? false : true;
      updateObj.$update().then(
        function (data, status) {
          //  refreshArtWorks();
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("Editeduccessfully"), "success");
          model.outdated = updateObj.outdated;
        },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        }
      );
      return;
    };

    vm.changePage = function (page) {
      vm.currentPage = page;
      refreshArtWorks();
    };
  }
})();

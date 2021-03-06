(function () {
  "use strict";

  angular
    .module("home")
    .controller("JudgeArtWorkController", [
      "appCONSTANTS",
      "$scope",
      "$translate",
      "JudgeArtWorkResource",
      "blockUI",
      "$uibModal",
      "ToastService",
      "$stateParams",
      JudgeArtWorkController,
    ]);

  function JudgeArtWorkController(
    appCONSTANTS,
    $scope,
    $translate,
    JudgeArtWorkResource,
    blockUI,
    $uibModal,
    ToastService,
    $stateParams
  ) {
    // $(".pmd-sidebar-nav>li>a").removeClass("active");
    // $($(".pmd-sidebar-nav").children()[6].children[0]).addClass("active");
    var vm = this;
    vm.currentPage = 1;
    vm.appCONSTANTS = appCONSTANTS;
    vm.tabs = ["remaining", "done"];
    vm.selectedTab = "remaining";
    vm.setActiveTab = function (tab) {
      vm.selectedTab = tab;
    };

    refreshJudgeArtWorks();

    function refreshJudgeArtWorks() {
      blockUI.start("Loading...");

      var k = JudgeArtWorkResource.getJudgeArtWorks(
        {
          // id: $scope.user.id
        },
        null
      ).$promise.then(
        function (results) {
          $scope.remaining_level1Artworks = results.remaining.level1Artworks;
          $scope.remaining_level2Artworks = results.remaining.level2Artworks;
          $scope.done_level1Artworks = results.done.level1Artworks;
          $scope.done_level2Artworks = results.done.level2Artworks;

          // $scope.totalCount = results.metadata.totalItemCount;
          // console.log($scope.JudgeArtWorkList);
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
        }
      );
    }
    vm.showMore = function (element) {
      $(element.currentTarget).toggleClass("child-table-collapse");
    };

    vm.defaultCover = "./assets/img/big_award.png";
    vm.getPosterUrl = function (artwork) {
      return artwork.posterUrl == undefined || artwork.posterUrl == ""
        ? vm.defaultCover
        : artwork.posterUrl;
    };

    function confirmationDelete(model) {
      var updateObj = new JudgeArtWorkResource();
      updateObj.$delete({ id: model.id }).then(
        function (data, status) {
          refreshJudgeArtWorks();
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
      var updateObj = new JudgeArtWorkResource();
      updateObj.id = model.id;
      updateObj.title = model.title;
      updateObj.body = model.body;
      updateObj.outdated = model.outdated == true ? false : true;
      updateObj.$update().then(
        function (data, status) {
          //  refreshJudgeArtWorks();
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
      refreshJudgeArtWorks();
    };
  }
})();

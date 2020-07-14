(function () {
  "use strict";

  angular
    .module("home")
    .controller("VotingCriteriaController", [
      "appCONSTANTS",
      "$scope",
      "$translate",
      "VotingCriteriaResource",
      "AwardResource",
      "blockUI",
      "$uibModal",
      "ToastService",
      VotingCriteriaController,
    ]);

  function VotingCriteriaController(
    appCONSTANTS,
    $scope,
    $translate,
    VotingCriteriaResource,
    AwardResource,
    blockUI,
    $uibModal,
    ToastService
  ) {
    // $(".pmd-sidebar-nav>li>a").removeClass("active");
    // $($(".pmd-sidebar-nav").children()[6].children[0]).addClass("active");
    var vm = this;

    vm.currentPage = 1;
    vm.appCONSTANTS = appCONSTANTS;
    vm.awards = [];
    vm.selectedAward = undefined;
    vm.selectedLevel = undefined;

    vm.levels = [
      { id: "", name: { en: "All levels", ar: "كل المراحل" } },
      { id: "1", name: { en: "Level 1", ar: "مرحلة 1" }, levelNumber: 0 },
      { id: "2", name: { en: "Level 2", ar: "مرحلة 2" }, levelNumber: 1 },
    ];

    vm.filterByAward = function () {
      blockUI.start("Loading...");
      console.log(vm.selectedAward);
      console.log(vm.selectedLevel);
      const awardId =
        vm.selectedAward == undefined || vm.selectedAward.id == ""
          ? undefined
          : vm.selectedAward.id;
      const level =
        vm.selectedLevel == undefined || vm.selectedLevel.id == ""
          ? undefined
          : vm.selectedLevel.levelNumber;
      var k = VotingCriteriaResource.filterByAward({
        awardId: awardId,
        level: level,
        pageNumber: vm.currentPage,
        pageSize: 10,
      }).$promise.then(
        function (results) {
          $scope.VotingCriteriaList = results.items;
          $scope.totalCount = results.metadata.totalItemCount;
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          // ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
          $scope.VotingCriteriaList = [];
          $scope.totalCount = 0;
        }
      );
    };

    loadAwards();
    vm.filterByAward();

    vm.showMore = function (element) {
      $(element.currentTarget).toggleClass("child-table-collapse");
    };

    function loadAwards() {
      var k = AwardResource.awardsForDropdown().$promise.then(
        function (results) {
          const _empty = {
            id: "",
            title: { en: "All awards", ar: "كل الجوائز" },
          };
          vm.awards = [_empty, ...results];
          vm.selectedAward = _empty;
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
        }
      );
    }

    function confirmationDelete(model) {
      var updateObj = new VotingCriteriaResource();
      updateObj.$delete({ id: model.id }).then(
        function (data, status) {
          vm.filterByAward();
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

    vm.changePage = function (page) {
      vm.currentPage = page;
      vm.filterByAward();
    };
  }
})();

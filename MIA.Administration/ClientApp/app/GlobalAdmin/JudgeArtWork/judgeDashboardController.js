(function () {
  "use strict";

  angular
    .module("home")
    .controller("judgeDashboardController", [
      "$sce",
      "$scope",
      "blockUI",
      "$stateParams",
      "ArtWorkResource",
      "$state",
      "appCONSTANTS",
      "$translate",
      "$uibModal",
      "$timeout",
      "JudgeArtWorkResource",
      "ToastService",
      "JudgeDashboardPrepService",
      judgeDashboardController,
    ]);

  function judgeDashboardController(
    $sce,
    $scope,
    blockUI,
    $stateParams,
    ArtWorkResource,
    $state,
    appCONSTANTS,
    $translate,
    $uibModal,
    $timeout,
    JudgeArtWorkResource,
    ToastService,
    JudgeDashboardPrepService
  ) {
    var vm = this;
    vm.awards = [];
    vm.selectedAward = undefined;

    loadAwards();
    vm.statistics = JudgeDashboardPrepService;

    function loadAwards() {
      var k = JudgeArtWorkResource.getJudgeAwards().$promise.then(
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

    vm.filterByAward = function () {
      blockUI.start();
      const id =
        vm.selectedAward == undefined || vm.selectedAward.id == ""
          ? undefined
          : vm.selectedAward.id;

      JudgeArtWorkResource.getMyStatistics({
        awardId: id,
      }).$promise.then(
        function (results) {
          vm.statistics = results;
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
        }
      );
    };
  }
})();

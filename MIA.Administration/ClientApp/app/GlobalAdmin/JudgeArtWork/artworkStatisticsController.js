(function () {
  "use strict";

  angular
    .module("home")
    .controller("artworkStatisticsController", [
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
      "ArtworkStatisticsPrepService",
      artworkStatisticsController,
    ]);

  function artworkStatisticsController(
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
    ArtworkStatisticsPrepService
  ) {
    var vm = this;
    vm.awards = [];
    vm.selectedAward = undefined;
    vm.noDataFound = false;

    loadAwards();
    vm.statistics = ArtworkStatisticsPrepService;

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

      JudgeArtWorkResource.getArtworkStatistics({
        awardId: id,
        pageSize: 10,
        pageNumber: 1,
      }).$promise.then(
        function (results) {
          vm.statistics = results;
          vm.noDataFound = false;
          blockUI.stop();
        },
        function (data, status) {
          vm.statistics = [];
          vm.noDataFound = true;
          blockUI.stop();
        }
      );
    };
  }
})();

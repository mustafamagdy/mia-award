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
    vm.noDataFound = false;

    loadAwards();
    vm.statistics = JudgeDashboardPrepService;
    vm.remaining = vm.statistics.remaining.level1Artworks;
    vm.done =
      vm.statistics.totals.level1Artworks -
      vm.statistics.remaining.level1Artworks;

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
          vm.remaining = results.remaining.level1Artworks;
          vm.done =
            results.totals.level1Artworks - results.remaining.level1Artworks;

          vm.noDataFound = false;

          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          vm.noDataFound = true;
        }
      );
    };

    vm.data = {
      labels: ["remaining", "done"],
      datasets: [
        {
          data: [vm.remaining, vm.done],
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
        },
      ],
    };

    vm.options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        labels: {
          fontColor: "#d9c290",
          fontFamily: "Cairo",
        },
      },
      title: {
        display: true,
        text: "My Dashboard",
        fontColor: "#d9c290",
        fontFamily: "Cairo",
      },
    };
  }
})();

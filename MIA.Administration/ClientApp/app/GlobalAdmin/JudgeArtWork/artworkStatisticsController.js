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

    $scope.data = {
      labels: [
        "16 Jan",
        "16 Feb",
        "16 Mar",
        "16 Apr",
        "16 May",
        "16 Jun",
        "16 Jul",
      ],
      datasets: [
        {
          label: "A",
          backgroundColor: "rgba(255, 99, 132, 1)",
          borderColor: "rgba(255,99,132,1)",
          data: [60, 90, 120, 60, 90, 120, 60],
        },
        {
          label: "B",
          backgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: [40, 60, 80, 40, 60, 80, 40],
        },
      ],
    };

    $scope.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
      legend: {
        display: true,
        labels: {
          fontColor: "rgb(255, 99, 132)",
        },
      },
      title: {
        display: true,
        text: "Custom Chart Title",
      },

      // Chart.js options can go here.
    };
  }
})();

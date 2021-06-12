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
    vm.noDataFound = true;

    loadAwards();
    vm.statistics = ArtworkStatisticsPrepService;
    vm.artworkLabels = vm.statistics.map(
      (a) => a.artwork.projectName[$scope.selectedLanguage]
    );
    vm.level1Data = vm.statistics.map((a) => a.level1.avg * 100.0);
    vm.level2Data = vm.statistics.map((a) => a.level2.avg * 100.0);
    vm.noDataFound = vm.statistics.length > 0;
    
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

    vm.data = {
      labels: vm.artworkLabels,
      datasets: [
        {
          label: "Level 1 (avg)",
          backgroundColor: "rgba(255, 99, 132, 1)",
          borderColor: "rgba(255,99,132,1)",
          data: vm.level1Data,
        },
        {
          label: "Level 2 (avg)",
          backgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: vm.level2Data,
        },
      ],
    };

    vm.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: false,
          },
        ],
        yAxes: [
          {
            stacked: false,
            ticks: {
              fontColor: "white",
              fontFamily: "Cairo",
            },
          },
        ],
      },
      legend: {
        display: true,
        labels: {
          fontColor: "#d9c290",
          fontFamily: "Cairo",
        },
      },
      title: {
        display: true,
        text: "Artworks Statistics",
        fontColor: "#d9c290",
        fontFamily: "Cairo",
      },
    };
  }
})();

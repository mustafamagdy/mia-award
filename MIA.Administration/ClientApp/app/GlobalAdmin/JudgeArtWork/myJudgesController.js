(function () {
  "use strict";

  angular
    .module("home")
    .controller("myJudgesController", [
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
      myJudgesController,
    ]);

  function myJudgesController(
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
    ToastService
  ) {
    var vm = this;
    vm.awards = [];
    vm.selectedAward = undefined;
    vm.noDataFound = true;

    loadAwards();
    vm.statistics = [];

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

      JudgeArtWorkResource.myAwardJudgesWork({
        awardId: id,
      }).$promise.then(
        function (results) {
          vm.statistics = results;
          vm.artworkLabels = vm.statistics.map((a) => a.judgeFullName);
          vm.level1Remaining = vm.statistics.map(
            (a) => a.remaining.level1Artworks
          );
          vm.level1Done = vm.statistics.map(
            (a) => a.totals.level1Artworks - a.remaining.level1Artworks
          );

          vm.level2Remaining = vm.statistics.map(
            (a) => a.remaining.level2Artworks
          );
          vm.level2Done = vm.statistics.map(
            (a) => a.totals.level2Artworks - a.remaining.level2Artworks
          );

          vm.data = {
            labels: vm.artworkLabels,
            datasets: [
              {
                label: "Level1 Remaining",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                data: vm.level1Remaining,
                // yAxisID: "y-axis-level1",
              },
              {
                label: "Level1 Done",
                backgroundColor: "rgba(255, 159, 64, 0.5)",
                borderColor: "rgba(255, 159, 64, 1)",
                data: vm.level1Done,
                // yAxisID: "y-axis-level1",
              },
              {
                label: "Level2 Remaining",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                data: vm.level2Remaining,
                // yAxisID: "y-axis-level2",
              },
              {
                label: "Level2 Done",
                backgroundColor: "rgba(153, 102, 255, 0.5)",
                borderColor: "rgba(153, 102, 255, 1)",
                data: vm.level2Done,
                // yAxisID: "y-axis-level2",
              },
            ],
          };

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
            // id: "y-axis-level1",
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

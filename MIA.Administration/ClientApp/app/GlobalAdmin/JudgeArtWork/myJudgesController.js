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
          blockUI.stop();
        },
        function (data, status) {
          vm.statistics = [];
          blockUI.stop();
        }
      );
    };
  }
})();

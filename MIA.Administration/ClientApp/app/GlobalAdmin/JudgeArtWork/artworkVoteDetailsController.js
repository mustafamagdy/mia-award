(function () {
  "use strict";

  angular
    .module("home")
    .controller("artworkVoteDetailsController", [
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
      artworkVoteDetailsController,
    ]);

  function artworkVoteDetailsController(
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
    vm.artworks = [];
    vm.selectedArtwork = undefined;
    vm.selectedLevel = undefined;
    vm.levels = [
      { id: "", name: { en: "All levels", ar: "كل المراحل" } },
      { id: "1", name: { en: "Level 1", ar: "مرحلة 1", levelNumber: 0 } },
      { id: "2", name: { en: "Level 2", ar: "مرحلة 2", levelNumber: 1 } },
    ];
    vm.noDataFound = true;
    vm.artwork = undefined;
    vm.level1 = [];
    vm.level2 = [];
    loadArtworksDropdown();

    function loadArtworksDropdown() {
      var k = ArtWorkResource.artworksForDropdown().$promise.then(
        function (results) {
          const _empty = {
            id: "",
            title: { en: "Choose artwork", ar: "اختر عمل" },
          };
          vm.artworks = [_empty, ...results];
          vm.selectedArtwork = _empty;
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
        }
      );
    }

    vm.selectArtwork = function () {};
    vm.selectLevel = function () {};

    vm.getArtworkWithDetails = function () {
      blockUI.start();

      const artworkId =
        vm.selectedArtwork == undefined || vm.selectedArtwork.id == ""
          ? undefined
          : vm.selectedArtwork.id;

      const level =
        vm.selectedLevel == undefined || vm.selectedLevel.id == ""
          ? undefined
          : vm.selectedLevel.levelNumber;

      JudgeArtWorkResource.artworkScoreDetail({
        awardId: artworkId,
        level: level,
      }).$promise.then(
        function (results) {
          vm.noDataFound = false;
          const { votes, ...rest } = results;

          vm.artwork = rest;
          vm.level1 = votes.filter((a) => a.levelNumber == 0);
          vm.level2 = votes.filter((a) => a.levelNumber == 1);
          
          blockUI.stop();
        },
        function (data, status) {
          vm.noDataFound = true;
          vm.artwork = undefined;
          vm.level1 = [];
          vm.level2 = [];
          blockUI.stop();
        }
      );
    };
  }
})();

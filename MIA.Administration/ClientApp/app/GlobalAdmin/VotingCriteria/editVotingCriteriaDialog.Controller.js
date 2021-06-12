(function () {
  "use strict";

  angular
    .module("home")
    .controller("editVotingCriteriaDialogController", [
      "$rootScope",
      "$scope",
      "blockUI",
      "$filter",
      "$http",
      "$state",
      "appCONSTANTS",
      "$translate",
      "VotingCriteriaResource",
      "AwardResource",
      "ToastService",
      "VotingCriteriaByIdPrepService",
      editVotingCriteriaDialogController,
    ]);

  function editVotingCriteriaDialogController(
    $rootScope,
    $scope,
    blockUI,
    $filter,
    $http,
    $state,
    appCONSTANTS,
    $translate,
    VotingCriteriaResource,
    AwardResource,
    ToastService,
    VotingCriteriaByIdPrepService
  ) {
    var vm = this;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.VotingCriteria = VotingCriteriaByIdPrepService;
    vm.awards = [];

    loadAwards();

    // vm.selectedVotingLevel = vm.VotingCriteria.level;
    $scope.selectedVotingLevel = vm.VotingCriteria.level;

    function loadAwards() {
      var k = AwardResource.awardsForDropdown().$promise.then(
        function (results) {
          const _empty = {
            id: "",
            title: { en: "All awards", ar: "كل الجوائز" },
          };
          vm.awards = [_empty, ...results];
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
        }
      );
    }

    vm.Close = function () {
      $state.go("VotingCriteria");
    };

    vm.UpdateVotingCriteria = function () {
      blockUI.start("Loading...");

      var updateObj = new VotingCriteriaResource();
      updateObj.Id = vm.VotingCriteria.id;
      updateObj.name = vm.VotingCriteria.name;
      updateObj.Code = vm.VotingCriteria.code;
      updateObj.Weight = vm.VotingCriteria.weight;
      if (vm.VotingCriteria.awardId == "") {
        updateObj.AwardId = undefined;
      } else {
        updateObj.AwardId = vm.VotingCriteria.awardId;
      }
      updateObj.Level = $scope.selectedVotingLevel;

      updateObj.$update().then(
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("Editeduccessfully"),
            "success"
          );
          blockUI.stop();

          $state.go("VotingCriteria");
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.data.errorMessage,
            "error"
          );
        }
      );
    };
  }
})();

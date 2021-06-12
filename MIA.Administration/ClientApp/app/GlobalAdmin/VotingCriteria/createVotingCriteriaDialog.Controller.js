(function () {
  "use strict";

  angular
    .module("home")
    .controller("createVotingCriteriaDialogController", [
      "$scope",
      "blockUI",
      "$http",
      "$state",
      "appCONSTANTS",
      "$translate",
      "VotingCriteriaResource",
      "AwardResource",
      "ToastService",
      "$rootScope",
      createVotingCriteriaDialogController,
    ]);

  function createVotingCriteriaDialogController(
    $scope,
    blockUI,
    $http,
    $state,
    appCONSTANTS,
    $translate,
    VotingCriteriaResource,
    AwardResource,
    ToastService,
    $rootScope
  ) {
    var vm = this;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.close = function () {
      $state.go("VotingCriteria");
    };

    vm.awards = [];
    loadAwards();

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
    vm.AddNewVotingCriteria = function () {
      blockUI.start("Loading...");
      var newObj = new VotingCriteriaResource();
      newObj.Name = vm.Name;
      newObj.Code = vm.Code;
      newObj.Weight = vm.Weight;
      newObj.Level = vm.selectedVotingLevel;
      if (vm.awardId == "") {
        newObj.AwardId = undefined;
      } else {
        newObj.AwardId = vm.awardId;
      }
      newObj.$create().then(
        function (data, status) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("AddedSuccessfully"),
            "success"
          );
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

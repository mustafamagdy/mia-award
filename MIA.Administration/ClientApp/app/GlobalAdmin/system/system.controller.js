(function () {
  "use strict";

  angular
    .module("home")
    .controller("systemController", [
      "$sce",
      "$scope",
      "blockUI",
      "$stateParams",
      "$state",
      "appCONSTANTS",
      "$translate",
      "$uibModal",
      "$timeout",
      "ToastService",
      "SystemResource",
      "SystemStatusPrepService",
      systemController,
    ]);

  function systemController(
    $sce,
    $scope,
    blockUI,
    $stateParams,
    $state,
    appCONSTANTS,
    $translate,
    $uibModal,
    $timeout,
    ToastService,
    SystemResource,
    SystemStatusPrepService
  ) {
    var vm = this;
    vm.systemResults = SystemStatusPrepService;

    vm.closed = vm.systemResults.status;
    vm.winners = vm.systemResults.results || [];
    vm.groupedWinners = groupedWinners(vm.winners);

    function groupedWinners(winners) {
      const artworkWinners = winners.filter((a) => a.awardType == "artwork");
      const personWinners = winners.filter((a) => a.awardType == "person");
      return [
        {
          awardType: "artwork",
          winners: artworkWinners,
        },
        { awardType: "person", winners: personWinners },
      ];
    }

    vm.confirmClosingJudge = function (element) {
      const _inst = $uibModal.open({
        templateUrl: "confirmClosingJudge.html",
        controller: [
          "$scope",
          function (_scope) {
            _scope.cancel = function () {
              _inst.dismiss();
            };
            _scope.yes = function () {
              blockUI.start();
              SystemResource.closeAll().$promise.then(
                function (results) {
                  vm.closed = true;
                  vm.winners = results || [];
                  vm.groupedWinners = groupedWinners(vm.winners);
                  blockUI.stop();
                },
                function (data, status) {
                  blockUI.stop();
                }
              );
              _inst.dismiss();
            };
          },
        ],
      });
    };
  }
})();

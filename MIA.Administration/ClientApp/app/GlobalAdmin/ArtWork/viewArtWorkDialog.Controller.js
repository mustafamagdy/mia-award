(function () {
  "use strict";

  angular
    .module("home")
    .controller("viewArtWorkDialogController", [
      "$rootScope",
      "$sce",
      "$scope",
      "blockUI",
      "$filter",
      "$http",
      "$uibModal",
      "$state",
      "appCONSTANTS",
      "$translate",
      "ArtWorkResource",
      "ToastService",
      "ArtWorkByIdPrepService",
      viewArtWorkDialogController,
    ]);

  function viewArtWorkDialogController(
    $rootScope,
    $sce,
    $scope,
    blockUI,
    $filter,
    $http,
    $uibModal,
    $state,
    appCONSTANTS,
    $translate,
    ArtWorkResource,
    ToastService,
    ArtWorkByIdPrepService
  ) {
    var vm = this;

    // vm.countryList = [];
    vm.selectedAward = "";
    vm.selectedNominee = "";
    vm.language = appCONSTANTS.supportedLanguage;
    vm.ArtWork = ArtWorkByIdPrepService;

    vm.posterImage = vm.ArtWork.posterUrl;
    vm.coverImage = vm.ArtWork.coverUrl;

    vm.yearsList = [2019, 2020];
    vm.selectedProductionYear = vm.ArtWork.productionYear; // vm.yearsList[0];
    vm.selectedBroadcastYear = vm.ArtWork.broadcastYear; // vm.yearsList[0];
    vm.IsArtwork = false;
    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    };
    this.tab = 1;

    this.setTab = function (tabId) {
      this.tab = tabId;
    };

    this.isSet = function (tabId) {
      return this.tab === tabId;
    };

    if (vm.ArtWork.award.awardType == "artwork") vm.IsArtwork = true;

    vm.Close = function () {
      $state.go("ArtWork");
    };

    function doApproveArtwork(model) {
      const _resource = new ArtWorkResource();
      _resource.$allowFileUpload({ id: model.id }).then(
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("approved"),
            "success"
          );
        },
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.data.message,
            "error"
          );
        }
      );
    }
    vm.confirmAndApproveArtwork = function (model, name, id) {
      var modalContent = $uibModal.open({
        templateUrl: "./app/core/Delete/templates/ConfirmDeleteDialog.html",
        controller: "confirmDeleteDialogController",
        controllerAs: "deleteDlCtrl",
        resolve: {
          model: function () {
            return model;
          },
          okLabel: function () {
            return "yes";
          },
          itemName: function () {
            return name;
          },
          itemId: function () {
            return id;
          },
          message: function () {
            return $translate.instant("confirm_approve_artwork");
          },
          callBackFunction: function () {
            return doApproveArtwork;
          },
        },
      });
    };
  }
})();

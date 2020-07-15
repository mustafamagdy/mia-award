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
    vm.artwork = ArtWorkByIdPrepService;

    vm.posterImage = vm.artwork.posterUrl;
    vm.coverImage = vm.artwork.coverUrl;

    vm.yearsList = [2019, 2020];
    vm.selectedProductionYear = vm.artwork.productionYear; // vm.yearsList[0];
    vm.selectedBroadcastYear = vm.artwork.broadcastYear; // vm.yearsList[0];
    vm.IsArtwork = false;

    vm.defaultCover = "./assets/img/big_award.png";
    vm.getCoverUrl = function () {
      return vm.artwork.coverUrl == undefined ||
        vm.artwork.coverUrl == ""
        ? vm.defaultCover
        : vm.artwork.coverUrl;
    };

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

    if (vm.artwork.award.awardType == "artwork") vm.IsArtwork = true;

    vm.Close = function () {
      $state.go("ArtWork");
    };

    vm.getAttachments = function () {
      const _ar = [];
      if (vm.artwork.resume.fileUrl != "") _ar.push(vm.artwork.resume);
      if (vm.artwork.file1.fileUrl != "") _ar.push(vm.artwork.file1);
      if (vm.artwork.file2.fileUrl != "") _ar.push(vm.artwork.file2);
      if (vm.artwork.file3.fileUrl != "") _ar.push(vm.artwork.file3);
      return _ar;
    };

    function doApproveArtwork(model) {
      const _resource = new ArtWorkResource();
      _resource.$allowFileUpload({ id: model.id }).then(
        function (data, status) {
          vm.artwork.allowFileUpload = true;
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

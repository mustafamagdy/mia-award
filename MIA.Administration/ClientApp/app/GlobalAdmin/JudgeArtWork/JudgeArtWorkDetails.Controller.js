(function () {
  "use strict";

  angular
    .module("home")
    .controller("judgeArtWorkDetailsController", [
      "$sce",
      "$scope",
      "blockUI",
      "$stateParams",
      "ArtWorkResource",
      "$state",
      "appCONSTANTS",
      "$translate",
      "$uibModal",
      "JudgeArtWorkResource",
      "ToastService",
      "ArtWorkWithFilesByIdPrepService",
      judgeArtWorkDetailsController,
    ]);

  function judgeArtWorkDetailsController(
    $sce,
    $scope,
    blockUI,
    $stateParams,
    ArtWorkResource,
    $state,
    appCONSTANTS,
    $translate,
    $uibModal,
    JudgeArtWorkResource,
    ToastService,
    ArtWorkWithFilesByIdPrepService
  ) {
    var vm = this;

    vm.showMediaList = true;
    vm.showCriteriaList = false;
    vm.JudgeArtWork = ArtWorkWithFilesByIdPrepService;
    vm.artWorkLevel = 0;
    vm.defaultCover = "./assets/img/newlogo.png";
    vm.votingCriteriaList = [
      {
        votingValue: 0,
      },
    ];

    vm.getCoverUrl = function () {
      return vm.JudgeArtWork.coverUrl == undefined ||
        vm.JudgeArtWork.coverUrl == ""
        ? vm.defaultCover
        : vm.JudgeArtWork.coverUrl;
    };
    vm.getPosterUrl = function () {
      return vm.JudgeArtWork.posterUrl == undefined ||
        vm.JudgeArtWork.posterUrl == ""
        ? vm.defaultCover
        : vm.JudgeArtWork.posterUrl;
    };

    vm.activeFileIndex = 0;
    //it requires array but we need to pass only one video at a time
    vm.sources =
      vm.JudgeArtWork.files && vm.JudgeArtWork.files.length > 0
        ? [vm.JudgeArtWork.files[vm.activeFileIndex]].map((f) => ({
            src: $sce.trustAsResourceUrl(f.fileUrl),
            type: `video/${f.fileUrl.split(".").pop()}`,
          }))
        : [];

    // [{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},];
    vm.tracks = [];
    vm.trailer =
      vm.JudgeArtWork.trailerUrl == ""
        ? []
        : [
            {
              src: vm.JudgeArtWork.trailerUrl,
              type: `video/${vm.JudgeArtWork.trailerUrl.split(".").pop()}`,
            },
          ];

    vm.tabs = ["episodes", "judging"];
    vm.selectedTab = "episodes";
    vm.setActiveTab = function (tab) {
      vm.selectedTab = tab;
    };

    vm.Close = function () {
      $state.go("JudgeArtWork");
    };
    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    };
    vm.showMedia = function () {
      vm.showMediaList = !vm.showMediaList;
      vm.showCriteriaList = false;

      // getArtWorkMediaList();
    };
    vm.showJudging = function () {
      vm.showCriteriaList = !vm.showCriteriaList;
      vm.showMediaList = false;

      if (vm.JudgeArtWork.illegibleForJudge) vm.artWorkLevel = 1;
      getVotingCriterias();
    };

    vm.changeValue = function (value, index) {
      vm.votingCriteriaList[index].value = value;
    };

    vm.UpdateJudgeArtWork = function () {
      blockUI.start("Loading...");

      var updateObj = new JudgeArtWorkResource();
      updateObj.Id = vm.JudgeArtWork.id;
      updateObj.ArtWorkId = vm.JudgeArtWork.id;
      updateObj.JudgeId = $scope.user.id;
      updateObj.CriteriaValues = vm.votingCriteriaList;
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
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.data.message,
            "error"
          );
        }
      );
    };

    vm.confirmJudgeComplete = function (name) {
      var modalContent = $uibModal.open({
        templateUrl: "./app/core/Delete/templates/ConfirmDeleteDialog.html",
        controller: "confirmDeleteDialogController",
        controllerAs: "deleteDlCtrl",
        resolve: {
          model: function () {
            return vm.JudgeArtWork;
          },
          okLabel: function () {
            return "yes";
          },
          itemName: function () {
            return name;
          },
          itemId: function () {
            return vm.JudgeArtWork.id;
          },
          message: function () {
            return $translate.instant("confirm_complete_judging");
          },
          callBackFunction: function () {
            return startFinalizingJudging;
          },
        },
      });
    };

    function startFinalizingJudging(model) {
      vm.tabs = ["final_thoughts"];
      vm.selectedTab = vm.tabs[0];
    }

    vm.resetTabs = function () {
      vm.tabs = ["episodes", "judging"];
      vm.selectedTab = vm.tabs[0];
    };

    vm.finalizeJudge = function () {
      var addFinalThoughts = new JudgeArtWorkResource();
      addFinalThoughts.finalThoughts = vm.finalThoughts;
      addFinalThoughts.level = vm.level;
      addFinalThoughts.artworkId = vm.JudgeArtWork.id;

      addFinalThoughts.$postFinalThoughts().then(
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("Editeduccessfully"),
            "success"
          );
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.data.message,
            "error"
          );
        }
      );
    };

    vm.slider = {
      votingValue: 10,
      maxValue: 90,
      options: {
        floor: 0,
        ceil: 100,
        step: 10,
        showTicks: true,
      },
    };
    function getArtWorkMediaList() {
      blockUI.start("Loading...");

      var k = ArtWorkResource.getArtWorkFiles({
        id: $stateParams.id,
      }).$promise.then(
        function (results) {
          vm.mediaItemList = results;
          ////   console.log(vm.mediaItemList);
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
        }
      );
    }

    function getVotingCriterias() {
      var k = JudgeArtWorkResource.getCriteriaByLevel({
        level: vm.artWorkLevel,
      }).$promise.then(
        function (results) {
          vm.votingCriteriaList = results;
          for (let index = 0; index < vm.votingCriteriaList.length; index++) {
            const element = vm.votingCriteriaList[index];
            element.votingValue = 0;
            element.votingValue = 0;
          }
          console.log(vm.votingCriteriaList);
          vm.totalCount = results.length;
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
        }
      );
    }
  }
})();

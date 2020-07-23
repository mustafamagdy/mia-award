(function () {
  "use strict";

  angular
    .module("home")
    .controller("editAwardDialogController", [
      "$rootScope",
      "$scope",
      "blockUI",
      "$filter",
      "awardType",
      "$state",
      "appCONSTANTS",
      "$translate",
      "AwardResource",
      "ToastService",
      "AwardDetailsByAwardIdPrepService",
      "ListAllUsersPrepService",
      editAwardDialogController,
    ]);

  function editAwardDialogController(
    $rootScope,
    $scope,
    blockUI,
    $filter,
    awardType,
    $state,
    appCONSTANTS,
    $translate,
    AwardResource,
    ToastService,
    AwardDetailsByAwardIdPrepService,
    ListAllUsersPrepService
  ) {
    var vm = this;

    vm.ManagerList = ListAllUsersPrepService;
    vm.selectedManager = "";

    vm.language = appCONSTANTS.supportedLanguage;
    vm.Award = AwardDetailsByAwardIdPrepService;
    vm.awardTypes = awardType.TypeList;
    vm.trophyImage = vm.Award.trophyUrl;
    vm.judgesLevel1List = [];
    vm.judgesLevel2List = [];

    refreshJudgess();

    vm.Close = function () {
      $state.go("Award");
    };

    vm.UpdateAward = function () {
      blockUI.start("Loading...");

      var updateObj = new AwardResource();
      updateObj.Id = vm.Award.id;
      updateObj.ManagerId = vm.selectedManager.id;
      //level 1
      const selectedJudgesLevel1 = vm.judgesLevel1List.filter(
        (a) => a.isSelected
      );
      const notSelectedJudgesLevel1 = vm.judgesLevel1List.filter(
        (a) => !a.isSelected
      );
      const _newLevel1Judges = selectedJudgesLevel1.filter(
        (a) =>
          !vm.Award.allJudges.some(
            (x) => x.level == "level1" && x.judgeId == a.id
          )
      );
      const _removeLevel1Judges = notSelectedJudgesLevel1.filter((a) =>
        vm.Award.allJudges.some((x) => x.level == "level1" && x.judgeId == a.id)
      );
      //level 2
      const selectedJudgesLevel2 = vm.judgesLevel2List.filter(
        (a) => a.isSelected
      );
      const notSelectedJudgesLevel2 = vm.judgesLevel2List.filter(
        (a) => !a.isSelected
      );

      const _newLevel2Judges = selectedJudgesLevel2.filter(
        (a) =>
          !vm.Award.allJudges.some(
            (x) => x.level == "level2" && x.judgeId == a.id
          )
      );
      const _removeLevel2Judges = notSelectedJudgesLevel2.filter((a) =>
        vm.Award.allJudges.some((x) => x.level == "level2" && x.judgeId == a.id)
      );
      updateObj.AddLevel1Judges = _newLevel1Judges.map((a) => a.id);
      updateObj.AddLevel2Judges = _newLevel2Judges.map((a) => a.id);
      updateObj.RemoveLevel1Judges = _removeLevel1Judges.map((a) => a.id);
      updateObj.RemoveLevel2Judges = _removeLevel2Judges.map((a) => a.id);

      updateObj.Title = vm.Award.title;
      updateObj.Description = vm.Award.description;
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

          $state.go("Award");
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

    vm.toggleUser = function (user, level) {};

    vm.selectJudgeLevel1 = function (user) {
      const judge = this.selectedJudgesLevel1.find((b) => b.id == user.id);
      if (user.isSelected && judge == null) {
        this.selectedJudgesLevel1.push(user);
        // var index = vm.judgesLevel1List.indexOf($filter('filter')(vm.RemoveLevel1Judges, { 'id': user.id }, true)[0], 1);
        // var index = vm.judgesLevel1List.indexOf($filter('filter')(vm.judgesLevel1List, { 'id': user.id }, true)[0]);
        if (this.RemoveLevel1Judges.find((b) => b.id == user.id)) {
          this.RemoveLevel1Judges.splice(
            this.RemoveLevel1Judges.indexOf(user),
            1
          );
        }
      } else {
        this.selectedJudgesLevel1.splice(
          this.selectedJudgesLevel1.indexOf(user),
          1
        );
        this.RemoveLevel1Judges.push(user);
      }
    };

    vm.selectAllJudgeLevel1 = function (isselectAllJudgeLevel1) {
      this.selectedJudgesLevel1 = [];
      this.RemoveLevel1Judges = [];
      this.judgesLevel1List.map((x) => (x.isSelected = isselectAllJudgeLevel1));
      if (isselectAllJudgeLevel1) {
        this.selectedJudgesLevel1.push(...this.judgesLevel1List);
      } else {
        this.RemoveLevel1Judges.push(...this.judgesLevel1List);
      }
    };

    vm.selectJudgeLevel2 = function (user) {
      const judge = this.selectedJudgesLevel2.find((b) => b.id == user.id);
      if (user.isSelected && judge == null) {
        this.selectedJudgesLevel2.push(user);
        if (this.RemoveLevel2Judges.find((b) => b.id == user.id)) {
          this.RemoveLevel2Judges.splice(
            this.RemoveLevel2Judges.indexOf(user),
            1
          );
        }
      } else {
        this.selectedJudgesLevel2.splice(
          this.selectedJudgesLevel2.indexOf(user),
          1
        );
        this.RemoveLevel2Judges.push(user);
      }
    };

    vm.selectAllJudgeLevel2 = function (isselectAllJudgeLevel2) {
      this.selectedJudgesLevel2 = [];
      this.RemoveLevel2Judges = [];

      this.judgesLevel2List.map((x) => (x.isSelected = isselectAllJudgeLevel2));
      if (isselectAllJudgeLevel2) {
        this.selectedJudgesLevel2.push(...this.judgesLevel2List);
      } else {
        this.RemoveLevel2Judges.push(...this.judgesLevel2List);
      }
    };

    function refreshJudgess() {
      var k = AwardResource.getAllJudges().$promise.then(
        function (results) {
          vm.judgesLevel1List = results.map((a) => ({
            ...a,
            isSelected:
              vm.Award.allJudges.find(
                (x) => x.level == "level1" && x.judgeId == a.id
              ) != undefined,
          }));
          vm.judgesLevel2List = results.map((a) => ({
            ...a,
            isSelected:
              vm.Award.allJudges.find(
                (x) => x.level == "level2" && x.judgeId == a.id
              ) != undefined,
          }));
          
          blockUI.stop();
          var index = vm.ManagerList.indexOf(
            $filter("filter")(
              vm.ManagerList,
              { id: vm.Award.managerId },
              true
            )[0]
          );
          vm.selectedManager = vm.ManagerList[index];
        },
        function (data, status) {
          blockUI.stop();
        }
      );
    }
  }
})();

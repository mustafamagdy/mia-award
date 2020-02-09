(function () {
    'use strict';

    angular
        .module('home')
        .controller('editAwardDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'AwardResource', 'ToastService', 'AwardDetailsByAwardIdPrepService', editAwardDialogController])

    function editAwardDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, AwardResource,
        ToastService, AwardDetailsByAwardIdPrepService) {
        var vm = this;
        vm.judgesList = [];
        vm.ManagerList = [];
        vm.selectedManager = "";
        vm.selectedJudges = [];
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Award = AwardDetailsByAwardIdPrepService;
        console.log(vm.Award);
        refreshJudgess();
        vm.Close = function () {
            $state.go('Award');
        }
        vm.UpdateAward = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new AwardResource();
            updateObj.Id = vm.Award.id;
            updateObj.ManagerId = vm.selectedManager.id;
            updateObj.JudgeAwards = vm.selectedJudges;
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('Award');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        function refreshJudgess() {
            var k = AwardResource.getAllJudges().$promise.then(function (results) {
                vm.judgesList = results;
                vm.ManagerList = results;
                blockUI.stop();
                debugger;
                var i;
                for (i = 0; i < vm.Award.judgeAwards.length; i++) {
                    var index = vm.judgesList.indexOf($filter('filter')(vm.judgesList, { 'id': vm.Award.judgeAwards[i].judgeId }, true)[0]);
                    vm.selectedJudges.push(vm.judgesList[index]);

                }

                var index = vm.ManagerList.indexOf($filter('filter')(vm.ManagerList, { 'id': vm.Award.managerId }, true)[0]);
                vm.selectedManager = vm.ManagerList[index];
            },
                function (data, status) {

                    blockUI.stop();
                });
        }
    }
}());

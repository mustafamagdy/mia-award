(function () {
    'use strict';

    angular
        .module('home')
        .controller('editAwardDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', 'awardType', '$state', 'appCONSTANTS', '$translate',
            'AwardResource', 'ToastService', 'AwardDetailsByAwardIdPrepService', editAwardDialogController
        ])

    function editAwardDialogController($rootScope, $scope, blockUI, $filter, awardType, $state, appCONSTANTS, $translate, AwardResource,
        ToastService, AwardDetailsByAwardIdPrepService) {
        var vm = this;
        vm.judgesLevel1List = [];
        vm.judgesLevel2List = [];
        vm.ManagerList = [];
        vm.selectedManager = "";
        vm.selectedJudgesLevel1 = [];
        vm.selectedJudgesLevel2 = [];
        vm.RemoveLevel1Judges = [];
        vm.RemoveLevel2Judges = [];
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Award = AwardDetailsByAwardIdPrepService;
        vm.awardTypes = awardType.TypeList;
        vm.trophyImage = vm.Award.trophyUrl;

        vm.addLevel1Judges = [];
        vm.addLevel2Judges = [];
        vm.removeLevel1Judges = [];
        vm.removeLevel2Judges = [];

        console.log(vm.Award);
        refreshJudgess();

        vm.Close = function () {
            $state.go('Award');
        }
        vm.UpdateAward = function () {
            blockUI.start("Loading...");
            
            //add new judge 1
            for (let index = 0; index < vm.selectedJudgesLevel1.length; index++) {
                const element = vm.selectedJudgesLevel1[index];
                if (element.isSelected) {
                    vm.addLevel1Judges.push({
                        AwardId: vm.Award.id,
                        JudgeId: element.id
                    })
                }
            }

            //add new judge 2
            for (let index = 0; index < vm.selectedJudgesLevel2.length; index++) {
                const element = vm.selectedJudgesLevel2[index];
                if (element.isSelected) {
                    vm.addLevel2Judges.push({
                        AwardId: vm.Award.id,
                        JudgeId: element.id
                    })
                }
            }

            //remove judge 1
            for (let index = 0; index < vm.RemoveLevel1Judges.length; index++) {
                const element = vm.RemoveLevel1Judges[index];
                // if (element.isSelected) {
                vm.removeLevel1Judges.push({
                    AwardId: vm.Award.id,
                    JudgeId: element.id
                })
                // }
            }
            //remove judge 2
            for (let index = 0; index < vm.RemoveLevel2Judges.length; index++) {
                const element = vm.RemoveLevel2Judges[index];
                //  if (element.isSelected) {
                vm.removeLevel2Judges.push({
                    AwardId: vm.Award.id,
                    JudgeId: element.id
                })
                // }
            }
            var updateObj = new AwardResource();
            updateObj.Id = vm.Award.id;
            updateObj.ManagerId = vm.selectedManager.id;
            updateObj.AddLevel1Judges = vm.addLevel1Judges;
            updateObj.AddLevel2Judges = vm.addLevel2Judges;
            updateObj.RemoveLevel1Judges = vm.removeLevel1Judges;
            updateObj.RemoveLevel2Judges = vm.removeLevel2Judges;
            updateObj.Title = vm.Award.title;
            updateObj.Description = vm.Award.description;
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


        vm.selectJudgeLevel1 = function (user) {
            
            const userFromAdmins = this.selectedJudgesLevel1.find(b => b.id == user.id)
            if (user.isSelected && userFromAdmins == null) {
                this.selectedJudgesLevel1.push(user);
                // var index = vm.judgesLevel1List.indexOf($filter('filter')(vm.RemoveLevel1Judges, { 'id': user.id }, true)[0], 1);
                // var index = vm.judgesLevel1List.indexOf($filter('filter')(vm.judgesLevel1List, { 'id': user.id }, true)[0]);

                // this.RemoveLevel1Judges.splice(vm.judgesLevel1List[index], 1);
            } else {
                this.selectedJudgesLevel1.splice(this.selectedJudgesLevel1.indexOf(user), 1);
                this.RemoveLevel1Judges.push(user);
            }
        }
        vm.selectAllJudgeLevel1 = function (isselectAllJudgeLevel1) {
            this.selectedJudgesLevel1 = [];
            this.RemoveLevel1Judges = [];
            this.judgesLevel1List.map(x => x.isSelected = isselectAllJudgeLevel1);
            if (isselectAllJudgeLevel1) {
                this.selectedJudgesLevel1.push(...this.judgesLevel1List);
            } else {
                this.RemoveLevel1Judges.push(...this.judgesLevel1List);
            }
        }

        vm.selectJudgeLevel2 = function (user) {
            const userFromAdmins = this.selectedJudgesLevel2.find(b => b.id == user.id)
            if (user.isSelected && userFromAdmins == null) {
                this.selectedJudgesLevel2.push(user);
                //this.RemoveLevel2Judges.splice(this.RemoveLevel2Judges.indexOf(user), 1);
            } else {
                this.selectedJudgesLevel2.splice(this.selectedJudgesLevel2.indexOf(user), 1);
                this.RemoveLevel2Judges.push(user);
            }
        }
        vm.selectAllJudgeLevel2 = function (isselectAllJudgeLevel2) {
            this.selectedJudgesLevel2 = [];
            this.judgesLevel2List.map(x => x.isSelected = isselectAllJudgeLevel2);
            if (isselectAllJudgeLevel2) {
                this.selectedJudgesLevel2.push(...this.judgesLevel2List);
            } else {
                this.RemoveLevel2Judges.push(...this.judgesLevel2List);
            }
        }


        function refreshJudgess() {
            var k = AwardResource.getAllJudges().$promise.then(function (results) {
                vm.judgesLevel1List = angular.copy(results); //[...results];
                vm.judgesLevel2List = angular.copy(results);;
                vm.ManagerList = angular.copy(results);;
                blockUI.stop();
                
                if (vm.Award.level1Judges != null) {
                    var i;
                    for (i = 0; i < vm.Award.level1Judges.length; i++) {
                        var index = vm.judgesLevel1List.indexOf($filter('filter')(vm.judgesLevel1List, { 'id': vm.Award.level1Judges[i].judgeId }, true)[0]);
                        vm.judgesLevel1List[index].isSelected = true;
                    }
                }
                if (vm.Award.level2Judges != null) {
                    var i;
                    for (i = 0; i < vm.Award.level2Judges.length; i++) {
                        var index = vm.judgesLevel2List.indexOf($filter('filter')(vm.judgesLevel2List, { 'id': vm.Award.level2Judges[i].judgeId }, true)[0]);
                        vm.judgesLevel2List[index].isSelected = true;
                    }
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

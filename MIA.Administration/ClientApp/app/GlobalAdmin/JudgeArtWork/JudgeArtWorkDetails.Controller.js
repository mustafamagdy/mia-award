(function () {
    'use strict';

    angular
        .module('home')
        .controller('judgeArtWorkDetailsController', ['$sce', '$scope', 'blockUI', '$stateParams', 'ArtWorkResource', '$state', 'appCONSTANTS', '$translate',
            'JudgeArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', judgeArtWorkDetailsController
        ])

    function judgeArtWorkDetailsController($sce, $scope, blockUI, $stateParams, ArtWorkResource, $state, appCONSTANTS, $translate, JudgeArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.showMediaList = true;
        vm.showCriteriaList = false;
        vm.JudgeArtWork = ArtWorkByIdPrepService;
        vm.artWorkLevel = 0;
        console.log(vm.JudgeArtWork);
        vm.votingCriteriaList = [{
            votingValue: 0
        }]
        vm.Close = function () {
            $state.go('JudgeArtWork');
        }
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        vm.showMedia = function () {
            vm.showMediaList = !vm.showMediaList;
            vm.showCriteriaList = false;

            getArtWorkMediaList();
        }
        vm.showJudging = function () {
            vm.showCriteriaList = !vm.showCriteriaList;
            vm.showMediaList = false;

            if (vm.JudgeArtWork.illegibleForJudge)
                vm.artWorkLevel = 1;
            getVotingCriterias();
        }

        vm.changeValue = function (value, index) {
            
            vm.votingCriteriaList[index].value = value;

        }
        vm.UpdateJudgeArtWork = function (judgeComplete) {
            blockUI.start("Loading...");

            var updateObj = new JudgeArtWorkResource();
            updateObj.Id = vm.JudgeArtWork.id;
            updateObj.ArtWorkId = vm.JudgeArtWork.id;
            updateObj.JudgeId = $scope.user.id;
            updateObj.CriteriaValues = vm.votingCriteriaList;
            updateObj.JudgeComplete = judgeComplete;
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.slider = {
            votingValue: 10,
            maxValue: 90,
            options: {
                floor: 0,
                ceil: 100,
                step: 10,
                showTicks: true,

            }
        };
        function getArtWorkMediaList() {
            blockUI.start("Loading...");

            var k = ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise.then(function (results) {
                vm.mediaItemList = results;
                ////   console.log(vm.mediaItemList);
                blockUI.stop();
            },
                function (data, status) {
                    
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }

        function getVotingCriterias() {
            var k = JudgeArtWorkResource.getCriteriaByLevel({ level: vm.artWorkLevel }).$promise.then(function (results) {
                vm.votingCriteriaList = results;
                for (let index = 0; index < vm.votingCriteriaList.length; index++) {
                    const element = vm.votingCriteriaList[index];element.votingValue=0;
                    element.votingValue=0;
                }
                console.log(vm.votingCriteriaList);
                vm.totalCount = results.length;
                blockUI.stop();
            },
                function (data, status) {

                    blockUI.stop();
                });
        }

    }
}());
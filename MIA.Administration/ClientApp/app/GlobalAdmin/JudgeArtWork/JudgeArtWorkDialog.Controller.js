(function () {
    'use strict';

    angular
        .module('home')
        .controller('viewJudgeArtWorkController', ['ArtWorkMediaByArtWorkIdPrepService', '$scope', 'blockUI', '$stateParams', '$uibModal', '$state', 'appCONSTANTS', '$translate',
            'JudgeArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', viewJudgeArtWorkController
        ])

    function viewJudgeArtWorkController(ArtWorkMediaByArtWorkIdPrepService, $scope, blockUI, $stateParams, $uibModal, $state, appCONSTANTS, $translate, JudgeArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.JudgeArtWork = ArtWorkByIdPrepService;
        vm.artWorkMedia = ArtWorkMediaByArtWorkIdPrepService;
        vm.votingCriteriaList = [];
        console.log('sdsd', vm.JudgeArtWork);
        refreshVotingCriterias();
        vm.Close = function () {
            $state.go('JudgeArtWork');
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

        function refreshVotingCriterias() {
            var k = JudgeArtWorkResource.getJudgeVoteCriteriaValues({ id: $stateParams.id }).$promise.then(function (results) {
                vm.votingCriteriaList = results;
                console.log(vm.votingCriteriaList);
                vm.totalCount = results.length;
                blockUI.stop();
            },
                function (data, status) {

                    blockUI.stop();
                });
        }

        function confirmationMessage() {
            var updateObj = new JudgeArtWorkResource();
            updateObj.Id = vm.JudgeArtWork.id;
            updateObj.ArtWorkId = vm.JudgeArtWork.id;
            updateObj.JudgeId = $scope.user.id;
            updateObj.CriteriaValues = vm.votingCriteriaList;
            updateObj.JudgeComplete = true;
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
        vm.openMessageDialog = function () {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/ConfirmationMessage/templates/ConfirmMessageDialog.html',
                controller: 'confirmMessageDialogController',
                controllerAs: 'messageDlCtrl',
                resolve: {
                    callBackFunction: function () { return confirmationMessage }
                }

            });
        }
        vm.slider = {
            minValue: 10,
            maxValue: 90,
            options: {
                floor: 0,
                ceil: 100,
                step: 10,
                showTicks: true,
             
            }
        };
    }
}());
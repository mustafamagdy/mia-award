(function () {
    'use strict';

    angular
        .module('home')
        .controller('createVotingCriteriaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'VotingCriteriaResource', 'ToastService', 'ArtWorkResource', createVotingCriteriaDialogController])

    function createVotingCriteriaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, VotingCriteriaResource,
        ToastService, ArtWorkResource) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('VotingCriteria');
        }
        refreshAwards();

        vm.AddNewVotingCriteria = function () {
            blockUI.start("Loading...");
            var newObj = new VotingCriteriaResource();
            newObj.Name = vm.Name;
            newObj.Code = vm.Code;
            newObj.Weight = vm.Weight;
            newObj.Level = vm.selectedVotingLevel;
            newObj.AwardId = vm.selectedAward.id;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('VotingCriteria');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }
        function refreshAwards() {
            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {

                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                vm.selectedAward = vm.awardList[0];
                console.log(vm.awardList);
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }
    }
}());

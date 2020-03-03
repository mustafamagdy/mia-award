(function () {
    'use strict';

    angular
        .module('home')
        .controller('viewJudgeArtWorkController', ['ArtWorkMediaByArtWorkIdPrepService', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'JudgeArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', viewJudgeArtWorkController])

    function viewJudgeArtWorkController(ArtWorkMediaByArtWorkIdPrepService, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, JudgeArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.JudgeArtWork = ArtWorkByIdPrepService;
        vm.artWorkMedia = ArtWorkMediaByArtWorkIdPrepService;
        vm.votingCriteriaList = [];
       debugger;
        console.log('sdsd',vm.JudgeArtWork);
        refreshVotingCriterias();
        vm.Close = function () {
            $state.go('JudgeArtWork');
        }
        vm.changeValue = function (value, index) {
            vm.votingCriteriaList[index].value = value;

        }
        vm.UpdateJudgeArtWork = function () {
            blockUI.start("Loading..."); 

            var updateObj = new JudgeArtWorkResource();
            updateObj.Id = vm.JudgeArtWork.id;
            updateObj.ArtWorkId = vm.JudgeArtWork.id;
            updateObj.JudgeId = $scope.user.id;
            updateObj.CriteriaValues = vm.votingCriteriaList; 
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    //  $state.go('JudgeArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        function refreshVotingCriterias() {
            var k = JudgeArtWorkResource.getAllVotingCriterias({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {
                vm.votingCriteriaList = results.items;
                console.log(vm.votingCriteriaList);
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();
            },
                function (data, status) {

                    blockUI.stop();
                });
        }
    }
}());

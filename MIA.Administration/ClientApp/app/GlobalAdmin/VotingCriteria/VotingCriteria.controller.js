(function () {
    'use strict';

    angular
        .module('home')
        .controller('VotingCriteriaController', ['appCONSTANTS', '$scope', 'ArtWorkResource', 'VotingCriteriaResource', 'blockUI', '$uibModal',
            'ToastService', VotingCriteriaController]);


    function VotingCriteriaController(appCONSTANTS, $scope, ArtWorkResource, VotingCriteriaResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshVotingCriterias();
        refreshAwards();
        function refreshVotingCriterias() {
            blockUI.start("Loading...");

            var k = VotingCriteriaResource.getAllVotingCriterias({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.VotingCriteriaList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                blockUI.stop();
                console.log($scope.VotingCriteriaList)
            },
                function (data, status) {
                    blockUI.stop();
                    // ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
                });
        }


        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshVotingCriterias();
        }
        vm.changeAward = function () {
            refreshVotingCriteriaByAward()
        }
        function refreshVotingCriteriaByAward() {
            blockUI.start("Loading...");
            var k = VotingCriteriaResource.getVotingCriteriaByAward({ id: vm.selectedAward.id, pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {
                $scope.VotingCriteriaList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log(vm.VotingCriteriaList);
                blockUI.stop();
            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    $scope.VotingCriteriaList = [];
                    $scope.totalCount = 0;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.errorMessage, "error");
                });
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

})();

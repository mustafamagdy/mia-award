(function () {
    'use strict';

    angular
        .module('home')
        .controller('AwardController', ['appCONSTANTS', '$scope', '$translate', 'awardType', 'AwardResource', 'blockUI', '$uibModal',
            'ToastService', AwardController]);


    function AwardController(appCONSTANTS, $scope, $translate, awardType, AwardResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        vm.awardTypes = awardType.TypeList;
        vm.selectedType = vm.awardTypes[1];
        refreshAwards();
        function refreshAwards() {
            blockUI.start("Loading...");

            var k = AwardResource.getAllAwards({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.AwardList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.AwardList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }


        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshAwards();
        }
        vm.changeAwardType = function () {
            refreshAwardsByType();
        }
        function refreshAwardsByType() {
            blockUI.start("Loading...");

            debugger;
            var k = AwardResource.getAllAwards({ awardType: vm.selectedType.Id,pageNumber: vm.currentPage, pageSize: 10  }).$promise.then(function (results) {
                $scope.AwardList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.AwardList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
    }

})();

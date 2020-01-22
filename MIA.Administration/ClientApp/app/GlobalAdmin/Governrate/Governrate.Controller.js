(function () {
    'use strict';

    angular
        .module('home')
        .controller('GovernrateController', ['$rootScope', 'GovernrateSearchPrepService', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'GovernrateResource', 'GovernratesPrepService', '$stateParams', 'appCONSTANTS',
            'ToastService', 'CountryByIdPrepService', GovernrateController]);


    function GovernrateController($rootScope, GovernrateSearchPrepService, blockUI, $scope, $filter, $translate,
        $state, GovernrateResource, GovernratesPrepService, $stateParams, appCONSTANTS, ToastService, CountryByIdPrepService) {

        // $('.pmd-sidebar-nav>li>a').removeClass("active")
        // $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        
        vm.currentPage = 1;
        $scope.totalCount = GovernratesPrepService.totalCount;
        $scope.Governrates = GovernratesPrepService.results;
        //   $scope.totalCountGovernrate = GovernrateSearchPrepService.totalCount;
        //  $scope.Governrate  = GovernrateSearchPrepService;
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];
        //   $scope.GovernrateName = GovernrateSearchPrepService.results[2].titles; 
        function refreshGovernrates() {

            blockUI.start("Loading...");

            var k = GovernrateResource.getAllGovernrates({ countryId: $stateParams.countryId, page: vm.currentPage }).$promise.then(function (results) {
                $scope.Governrates = results.results
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        
        vm.ChangeGovernrateStatus = function (model) {
            
            var updateObj = new GovernrateResource();
            updateObj.governrateId = model.governrateId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$ChangeGovernrateStatus({ governrateId: model.governrateId, status: updateObj.status }).then(
                function (data, status) {
                    refreshGovernrates();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.filterGovernrate = function (name) {
            
            refreshGovernrate(name);
            vm.name = "";
        }
        function refreshGovernrate(name) {
            blockUI.start("Loading...");
            
            var k = GovernrateResource.search({ text: name, page: vm.currentPage, countryId: $stateParams.countryId }).$promise.then(function (results) {
                $scope.Governrates = results.results;
                $scope.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshGovernrates();
        }
        blockUI.stop();




    }

})();

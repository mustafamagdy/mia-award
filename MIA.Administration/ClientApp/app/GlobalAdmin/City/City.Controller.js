(function () {
    'use strict';

    angular
        .module('home')
        .controller('CityController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CityResource', 'CitiesPrepService',  '$stateParams', 'appCONSTANTS',
            'ToastService','GovernrateByIdPrepService','CountryByIdPrepService', CityController]);


    function CityController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CityResource, CitiesPrepService, $stateParams, appCONSTANTS, ToastService,GovernrateByIdPrepService,CountryByIdPrepService) { 

        // $('.pmd-sidebar-nav>li>a').removeClass("active")
        // $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = CitiesPrepService.totalCount;
        $scope.Cities  = CitiesPrepService;
        console.log($scope.Cities);
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];
       
        $scope.GovernrateName = GovernrateByIdPrepService.titles[$scope.selectedLanguage];
        function refreshCities() {

            blockUI.start("Loading..."); 
            
            var k = CityResource.getAllCities({governrateId: $stateParams.governrateId ,page:vm.currentPage}).$promise.then(function (results) { 
                $scope.Cities = results  
                blockUI.stop();
                
            },
            function (data, status) {
                blockUI.stop();
                
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
        
        vm.ChangeCityStatus = function (model) {
            
            var updateObj = new CityResource();
            updateObj.cityId = model.cityId;
            updateObj.status =   (model.isActive == true ? false : true); 
            updateObj.$ChangeCityStatus({cityId:model.cityId,status:updateObj.status}).then(
                function (data, status) {
                    refreshCities();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
    
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshCities();
        }
        blockUI.stop();
        
    }

})();

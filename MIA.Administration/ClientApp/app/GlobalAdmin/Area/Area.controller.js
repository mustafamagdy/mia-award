(function () {
    'use strict';

    angular
        .module('home')
        .controller('AreaController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'AreaResource', 'AreaPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService','CityByIdPrepService','GovernrateByIdPrepService','$stateParams', AreaController]);


    function AreaController($rootScope, blockUI, $scope, $filter, $translate,
        $state, AreaResource, AreaPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService,CityByIdPrepService,GovernrateByIdPrepService,$stateParams) { 

        // $('.pmd-sidebar-nav>li>a').removeClass("active")
        // $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var Manufacture = this;
        $scope.totalCount = AreaPrepService.totalCount;  

        
        $scope.AreaList = AreaPrepService;
        console.log($scope.AreaList);
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        function refreshAreas() {

            blockUI.start("Loading..."); 
            
            var k = AreaResource.getAllAreas({cityId: $stateParams.cityId, page:Manufacture.currentPage}).$promise.then(function (results) { 
                $scope.AreaList = results  
                blockUI.stop();
                
            },
            function (data, status) {
                blockUI.stop();
                
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
        Manufacture.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshAreas();
        }
        blockUI.stop();
        
    }

})();

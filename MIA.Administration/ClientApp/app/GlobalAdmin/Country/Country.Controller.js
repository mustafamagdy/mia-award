(function () {
    'use strict';

    angular
        .module('home')
        .controller('CountryController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CountryResource', 'CountryPrepService',  '$localStorage', 'appCONSTANTS',
            'ToastService', CountryController]);


    function CountryController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CountryResource, CountryPrepService, $localStorage, appCONSTANTS, ToastService) { 
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var Manufacture = this;
        $scope.totalCount = CountryPrepService.totalCount;
        $scope.Countries  = CountryPrepService.results;
        console.log($scope.Countries);
        function refreshCountries() {

            blockUI.start("Loading..."); 
         
            var k = CountryResource.getAllCountries({page:Manufacture.currentPage}).$promise.then(function (results) { 
                $scope.Countries = results  
                blockUI.stop();
                
            },
            
            function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
        
        Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshCountries();
        }
        blockUI.stop();
        
    }

})();

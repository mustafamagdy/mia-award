
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ProductDetailsController', ['blockUI', '$uibModal', 'appCONSTANTS', '$scope','ProductInfoByIdPrepService', 'ProductResource', 'ProductDetaqilsByProductIdPrepService',
            'ToastService', ProductDetailsController]);


    function ProductDetailsController(blockUI, $uibModal, appCONSTANTS, $scope,ProductInfoByIdPrepService, ProductResource, ProductDetaqilsByProductIdPrepService, ToastService) {

      
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = ProductDetaqilsByProductIdPrepService.totalCount;
        $scope.ProductDetails = ProductDetaqilsByProductIdPrepService;
        $scope.Product = ProductInfoByIdPrepService;
       
       var k = ProductResource.getAllSKUConversion().$promise.then(function (results) {
      
        vm.SKUConversion = results;
        blockUI.stop();
    },
        function (data, status) {
            blockUI.stop();
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        });
            //getAllSKUConversion();
        //console.log("first details", $scope.ProductDetails)


        blockUI.stop();
        vm.openProductDetails = function (model) {
            
            blockUI.start("Loading...");
            var modalContent = $uibModal.open({
                templateUrl: './app/GlobalAdmin/Product/templates/ProductDetailsDialog.html',
                // templateUrl: './app/GlobalAdmin/Product/templates/ProductDetails.html',
                controller: 'ProductDetailsDialogController',
                controllerAs: 'ProductDetailsDialoglCtrl',
                resolve: {
                    model: function () { return model },
                    SKUConversion: function () { return vm.SKUConversion },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }

        function getAllSKUConversion() {
            var k = ProductResource.getAllSKUConversion().$promise.then(function (results) {
                console.log("sku", results.results)
                vm.SKUConversion = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function confirmationDelete() {
            alert("sdsd");
        }

    }

})();

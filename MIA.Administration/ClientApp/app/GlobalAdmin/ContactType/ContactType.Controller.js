(function () {
    'use strict';

    angular
        .module('home')
        .controller('ContactTypeController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'ContactTypeResource', 'ContactTypePrepService', '$localStorage', 'appCONSTANTS',
            'ToastService', ContactTypeController]);


    function ContactTypeController($rootScope, blockUI, $scope, $filter, $translate,
        $state, ContactTypeResource, ContactTypePrepService, $localStorage, appCONSTANTS, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = ContactTypePrepService.totalCount;
        vm.ContactTypes = ContactTypePrepService.results;
        console.log(vm.ContactTypes);
        function refreshContactType() {
            
            blockUI.start("Loading...");

            var k = ContactTypeResource.getAllContactType({ page: vm.currentPage }).$promise.then(function (results) {
                vm.ContactTypes = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeContactTypeStatus = function (model) {
            

            var updateObj = new ContactTypeResource();
            // updateObj.contactTypeId = model.contactTypeId;
            // updateObj.status = (model.status == true ? false : true); 
            updateObj.$ChangeStatus({ contactTypeId: model.contactTypeId, status: (model.status == true ? false : true) }).then(
                function (data, status) {
                    
                    refreshContactType();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.status;
                    //model.status =model.status ;
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
            refreshContactType();
        }
        blockUI.stop();

    }

})();

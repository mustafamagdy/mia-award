(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkMediaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', createArtWorkMediaDialogController])

    function createArtWorkMediaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.awardList = [];
        vm.selectedAward = "";

        vm.nomineeList = [];
        vm.selectedNominee = "";
        refreshAwards();
        refreshNominees();
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ArtWork');
        }


        vm.AddNewArtWork = function () {
            debugger;
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Title = vm.Title;
            newObj.AwardId = vm.selectedAward.id;
            newObj.NomineeId = vm.selectedNominee.id;
            newObj.FileCount = vm.FileCount;
            // newObj.Poster = $scope.file;

            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                   // $state.go('ArtWork');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


        function refreshNominees() {
            // blockUI.start("Loading...");

            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                debugger;
                vm.nomineeList = results;
                // vm.totalCount = results.metadata.totalItemCount; 
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    //  ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }

        function refreshAwards() {
            // blockUI.start("Loading...");

            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    //   ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }

    }
}());

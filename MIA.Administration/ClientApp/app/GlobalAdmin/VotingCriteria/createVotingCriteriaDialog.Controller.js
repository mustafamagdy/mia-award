(function () {
    'use strict';

    angular
        .module('home')
        .controller('createVotingCriteriaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'VotingCriteriaResource', 'ToastService', '$rootScope', createVotingCriteriaDialogController])

    function createVotingCriteriaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, VotingCriteriaResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('VotingCriteria');
        }


        vm.AddNewVotingCriteria = function () {
            blockUI.start("Loading...");
            var newObj = new VotingCriteriaResource();
            newObj.Name = vm.Name;
            newObj.Code = vm.Code; 
            newObj.Weight= vm.Weight;
            newObj.Level= vm.selectedVotingLevel;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('VotingCriteria');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

    }
}());

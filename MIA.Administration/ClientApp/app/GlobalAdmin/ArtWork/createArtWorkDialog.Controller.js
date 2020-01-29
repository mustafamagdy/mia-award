(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', createArtWorkDialogController])

    function createArtWorkDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.awardList = [];
        vm.nomineeList = [];
        vm.countryList = [];
        vm.selectedAward = "";
        vm.selectedNominee = "";
        vm.selectedCountry = "";
        vm.PaymentStatus = 0;
        vm.showStepOne = true;
        vm.showStepTwo = false;
        vm.receipt = "";

        refreshAwards();
        refreshNominees();
        refreshCountries();

        vm.close = function () {
            $state.go('ArtWork');
        }

        vm.nextStep = function () {
            vm.showStepOne = false;
            vm.showStepTwo = true;
        }

        vm.perviousStep = function () {
            vm.showStepOne = true;
            vm.showStepTwo = false;
        }
        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
                // $scope.$apply();
            } else if ($scope.newArtWorkForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
        }
        $scope.uploadReceiptFile = function (element) { 
            vm.receipt = $(element)[0].files[0];
        };

        vm.AddNewArtWork = function () { 


          
            //     Amount: vm.Amount,
            //     PaymentDate: $('#paymentDate').val(),
            //     Receipt: vm.receipt
            // };
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Title = vm.Title;
            newObj.AwardId = vm.selectedAward.id;
            newObj.NomineeId = vm.selectedNominee.id;
            newObj.FileCount = vm.FileCount;
            newObj.DateOfRelease = vm.DateOfRelease;
            newObj.Country = vm.selectedCountry.shortName;
            newObj.ShowDescription = vm.ShowDescription;
            newObj.Director = vm.Director.join(', ');
            newObj.Production = vm.Production.join(', ');
            newObj.Writers = vm.Writers.join(', ');
            newObj.Story = vm.Story.join(', ');
            newObj.Crew = vm.Crew.join(', ');
            newObj.PaymentStatus = vm.PaymentStatus == true ? 1 : 0;
            // newObj.Payment = {
            //     TransactionNumber: vm.TransactionNumber,
            //     Amount: vm.Amount,
            //     PaymentDate: $('#paymentDate').val(),
            //     Receipt: vm.receipt
            // };
            newObj.Payment={};
            newObj.Payment.TransactionNumber= vm.TransactionNumber,
            newObj.Payment.Amount= vm.Amount,
            newObj.Payment.PaymentDate=$('#paymentDate').val();

            newObj.Poster = $scope.file;
            newObj.Video = $scope.file;

            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                   
                    $rootScope.$broadcast('artWorkId', data.Id);
                    $rootScope.$broadcast('FilesCount', data.FileCount);
                     $state.go('Payment', data.id);
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


        function refreshNominees() {
            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                vm.nomineeList = results;
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }

        function refreshAwards() {
            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {

                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }


        function refreshCountries() {
            var k = ArtWorkResource.getAllCountries().$promise.then(function (results) {
                vm.countryList = results;
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                });
        }
    }
}());

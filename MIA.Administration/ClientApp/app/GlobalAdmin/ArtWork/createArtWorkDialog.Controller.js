(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', '$localStorage', createArtWorkDialogController])

    function createArtWorkDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope, $localStorage) {
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
            debugger;
            vm.receipt = $(element)[0].files[0];
        };


        vm.AddNewArtWork = function () {
            // var Payment = {
            //     TransactionNumber: vm.TransactionNumber,
            //     Amount: vm.Amount,
            //     PaymentDate: $('#paymentDate').val(),
            //     Receipt: receiptImage//vm.receipt
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
            newObj.TransactionNumber = vm.TransactionNumber;
            newObj.Amount = vm.Amount;
            // newObj.PaymentDate = $('#paymentDate').val();
            newObj.Receipt = receiptImage;
            // newObj.Payment = JSON.stringify(Payment)
            newObj.Poster = posterImage;// $scope.file;
            newObj.Video = posterImage;



            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    debugger;

                    // $rootScope.$broadcast('artWorkId', data.id);
                    // $rootScope.$broadcast('filesCount', data.fileCount);
                    localStorage.setItem('artWorkId', data.id);
                    localStorage.setItem('filesCount', data.filesCount);

                    $state.go('newArtWorkMedia', { id: data.id });
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

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

                            $scope.$apply();
                        };
                        if (logoFile) {
                            reader.readAsDataURL(logoFile);
                        }
                    })
                } else {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (logoFile) {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        $scope.uploadPosterFile = function (element) {
            debugger;
            vm.posterImage = $(element)[0].files[0];
        };





        vm.LoadUploadreceipt = function () {
            $("#receiptImage").click();
        }
        var receiptImage;
        $scope.AddreceiptImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        receiptImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.receiptImage = reader.result;

                            $scope.$apply();
                        };
                        if (logoFile) {
                            reader.readAsDataURL(logoFile);
                        }
                    })
                } else {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (logoFile) {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        $scope.uploadreceiptFile = function (element) {
            debugger;
            vm.receiptImage = $(element)[0].files[0];
        };
    }
}());

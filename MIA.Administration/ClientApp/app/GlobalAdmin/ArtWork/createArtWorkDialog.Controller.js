(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkDialogController', ['$uibModal', '$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', '$localStorage', createArtWorkDialogController])

    function createArtWorkDialogController($uibModal, $scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope, $localStorage) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.awardList = [];
        vm.nomineeList = [];
        vm.countryList = [];
        vm.selectedAward = "";
        //vm.selectedCountry = "";
        // vm.PaymentStatus = 0;
        vm.showStepOne = true;
        vm.showStepTwo = false;
        //vm.receipt = "";
        vm.yearsList = [2019, 2020];
        vm.selectedProductionYear = vm.yearsList[0];
        vm.selectedBroadcastYear = vm.yearsList[0];
        refreshAwards();
        refreshNominees();
        //refreshCountries();

        vm.close = function () {
            $state.go('ArtWork');
        }

        // vm.nextStep = function () {
        //     vm.showStepOne = false;
        //     vm.showStepTwo = true;
        // }

        // vm.perviousStep = function () {
        //     vm.showStepOne = true;
        //     vm.showStepTwo = false;
        // }
        // $scope.dateIsValid = false;
        // $scope.dateChange = function () {
        //     debugger;
        //     if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
        //         $scope.dateIsValid = false;
        //         // $scope.$apply();
        //     } else if ($scope.newArtWorkForm.$valid) {
        //         $scope.dateIsValid = true;
        //         // $scope.$apply();
        //     }
        // }
        $scope.uploadReceiptFile = function (element) {
            debugger;
            vm.receipt = $(element)[0].files[0];
        };


        vm.AddNewArtWork = function () {
            debugger;
            if (vm.selectedAward.awardType == 'artwork') {
                var splitPoster = vm.posterImage.split(',');
                var splitCover = vm.coverImage.split(',');
            }
            // var splitTrailerPoster = vm.trailerPoster.split(',');
            //var splitReciept = vm.receiptImage.split(',');
            // var Payment = {
            //     TransactionNumber: vm.TransactionNumber,
            //     Amount: vm.Amount,
            //     PaymentDate: $('#paymentDate').val(),
            //     Receipt: receiptImage//vm.receipt
            // };
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.ProjectName = vm.ProjectName;
            newObj.Description = vm.Description;

            newObj.AwardId = vm.selectedAward.id;
            newObj.NomineeId = vm.selectedNominee.id;
            newObj.IsArtwork = false;

            newObj.OnlineChannels = vm.OnlineChannels.join(', ');
            newObj.TvChannels = vm.TvChannels.join(', ');

            newObj.SiteUrl = vm.SiteUrl;
            newObj.ProductionYear = vm.selectedProductionYear;
            newObj.BroadcastYear = vm.selectedBroadcastYear;
            newObj.ProductionLicenseNumber = vm.ProductionLicenseNumber;
            newObj.ProductionLicenseAgency = vm.ProductionLicenseAgency;
            // newObj.Story = vm.Story.join(', ');
            // newObj.Crew = vm.Crew.join(', ');

            // newObj.DateOfRelease = vm.DateOfRelease;
            //newObj.FileCount = vm.FileCount;
            //newObj.Country = vm.selectedCountry.shortName;
            // newObj.PaymentStatus = vm.PaymentStatus == true ? 1 : 0;
            // newObj.TransactionNumber = vm.TransactionNumber;
            // newObj.Amount = vm.Amount; 
            // newObj.Receipt = splitReciept[1]; 
            // newObj.ReceiptFileName = receiptImage.type; 
            if (vm.selectedAward.awardType == 'artwork') {
                newObj.PosterByte = splitPoster[1];
                newObj.PosterFileName = posterImage.type;

                newObj.CoverByte = splitCover[1];
                newObj.CoverFileName = splitCover[0];
                newObj.IsArtwork = true;
            }
            // newObj.TrailerPoster = splitTrailerPoster[1];
            // newObj.TrailerPosterFileName = splitTrailerPoster[0];


            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    debugger;
                    if (vm.selectedAward.awardType == 'artwork')
                        openUploadDialog(data.id, appCONSTANTS.API_URL + 'artWorks/artwork/' + data.id + '/files')
                    else
                        $state.go('ArtWork'); 

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


        function callBackUpload(model) {
            debugger
            var updateObj = new ArtWorkResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.trailerUrl;
            updateObj.FileKey = model.data.trailerId;
            updateObj.$UpdateTrailerVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('ArtWork');

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        function openUploadDialog(id, url) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                controller: 'uploadVideoController',
                controllerAs: 'uploadDlCtrl',
                resolve: {
                    itemId: function () { return id },
                    url: function () { return url },
                    callBackFunction: function () { return callBackUpload }
                }

            });
        }
        function refreshNominees() {
            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                debugger;
                vm.nomineeList = results;
                vm.selectedNominee = vm.nomineeList[0];
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
                vm.selectedAward = vm.awardList[0];
                console.log(vm.awardList);
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }


        // function refreshCountries() {
        //     var k = ArtWorkResource.getAllCountries().$promise.then(function (results) {
        //         vm.countryList = results;
        //         blockUI.stop();

        //     },
        //         function (data, status) {
        //             blockUI.stop();
        //         });
        // }

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
            vm.posterImage = $(element)[0].files[0];
        };



        vm.LoadUploadTrailerPoster = function () {
            $("#trailerPoster").click();
        }
        var trailerPoster;
        $scope.AddTrailerPoster = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        trailerPoster = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.trailerPoster = reader.result;

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

        $scope.uploadTrailerPosterFile = function (element) {
            vm.trailerPoster = $(element)[0].files[0];
        };



        vm.LoadUploadCover = function () {
            $("#coverImage").click();
        }
        var coverImage;
        $scope.AddcoverImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        coverImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.coverImage = reader.result;

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

        $scope.uploadCoverFile = function (element) {
            vm.coverImage = $(element)[0].files[0];
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

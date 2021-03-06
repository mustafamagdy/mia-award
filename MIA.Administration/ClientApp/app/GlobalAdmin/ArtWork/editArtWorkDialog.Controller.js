(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkDialogController', ['$rootScope','$sce', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkDialogController])

    function editArtWorkDialogController($rootScope,$sce, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {

        refreshAwards();
        refreshNominees();
        var posterImage;
        var vm = this;
        vm.awardList = [];
        vm.nomineeList = [];
        // vm.countryList = []; 
        vm.selectedAward = "";
        vm.selectedNominee = "";
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
      
        vm.posterImage = vm.ArtWork.posterUrl;
        vm.coverImage = vm.ArtWork.coverUrl;

        vm.yearsList = [2019, 2020];
        vm.selectedProductionYear = vm.ArtWork.productionYear;// vm.yearsList[0];
        vm.selectedBroadcastYear = vm.ArtWork.broadcastYear;// vm.yearsList[0];
        vm.IsArtwork = false;
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        this.tab = 1;

        this.setTab = function (tabId) {
            this.tab = tabId;
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };
        if (vm.ArtWork.award.awardType == 'artwork')
            vm.IsArtwork = true;

        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.chnagein = function (ddd) {
            

        }
        vm.UpdateArtWork = function () {
            blockUI.start("Loading...");
            
            if (vm.ArtWork.award.awardType == 'artwork') {
                var splitPoster = vm.posterImage.split(',');
                var splitCover = vm.coverImage.split(',');
            }

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.ProjectName = vm.ArtWork.projectName;
            updateObj.Description = vm.ArtWork.description;
            updateObj.AwardId = vm.ArtWork.award.id;


            updateObj.NomineeId = vm.selectedNominee.id;
            updateObj.IsArtwork = vm.IsArtwork;

            // updateObj.OnlineChannels = vm.ArtWork.onlineChannels.join(', ');
            // updateObj.TvChannels = vm.ArtWork.tvChannels.join(', ');
            updateObj.OnlineChannels = vm.ArtWork.onlineChannels;
            updateObj.TvChannels = vm.ArtWork.tvChannels;
            updateObj.SiteUrl = vm.ArtWork.siteUrl;
            updateObj.ProductionYear = vm.selectedProductionYear;
            updateObj.BroadcastYear = vm.selectedBroadcastYear;
            updateObj.ProductionLicenseNumber = vm.ArtWork.productionLicenseNumber;
            updateObj.ProductionLicenseAgency = vm.ArtWork.productionLicenseAgency;
            if (posterImage != null) {

                if (vm.IsArtwork) {
                    updateObj.PosterByte = splitPoster[1];
                    updateObj.PosterFileName = posterImage.type;

                    updateObj.CoverByte = splitCover[1];
                    updateObj.CoverFileName = splitCover[0];
                    updateObj.IsArtwork = true;
                }

                updateObj.Poster = posterImage;
                updateObj.Video = posterImage;

            }
            // updateObj.Poster = posterImage;
            // updateObj.Video = posterImage;

            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('ArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        $scope.getFileDetails = function (e) {
            $scope.files = [];
            $scope.$apply(function () {

                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };

        function refreshNominees() {
            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                vm.nomineeList = results;
                blockUI.stop();


                var index = vm.nomineeList.indexOf($filter('filter')(vm.nomineeList, { 'id': vm.ArtWork.nomineeId }, true)[0]);
                vm.selectedNominee = vm.nomineeList[index];
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
                var index = vm.awardList.indexOf($filter('filter')(vm.awardList, { 'id': vm.ArtWork.awardId }, true)[0]);
                vm.selectedAward = vm.awardList[index];

            },
                function (data, status) {

                    blockUI.stop();
                });
        }

        vm.LoadUploadPoster = function () {
            
            $("#posterImage").click();
        }
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];
            
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.editArtWorkForm.$dirty = true;
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





        vm.LoadUploadCover = function () {
            
            $("#coverImage").click();
        }
        $scope.AddcoverImage = function (element) {
            var logoFile = element[0];
            
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.editArtWorkForm.$dirty = true;
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

        vm.LoadUploadTrailler = function () {
            
            $("#traillerUploder").click();
        }
    }
}());

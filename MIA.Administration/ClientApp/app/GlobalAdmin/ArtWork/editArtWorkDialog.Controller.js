(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkDialogController])

    function editArtWorkDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {

        refreshAwards();
        refreshNominees();
        refreshCountries();
        var posterImage;
        var vm = this;
        vm.awardList = [];
        vm.nomineeList = [];
        vm.countryList = [];
        vm.productionList = [];
        vm.selectedAward = "";
        vm.selectedNominee = "";
        vm.selectedCountry = "";
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
        vm.selectedProduction = null;//vm.ArtWork.production; 
        vm.posterImage = vm.ArtWork.posterUrl;
        if (vm.ArtWork.production.indexOf(',') != -1) {
            vm.productionList = vm.ArtWork.production.split(',');
        }
        console.log(vm.ArtWork);
        // vm.changeProduction = function (group) {
        //  debugger;
        //  var dd=$scope.valueee;
        //     vm.ArtWork.production = vm.selectedProduction;
        // }
        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.UpdateArtWork = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.Title = vm.ArtWork.title;
            updateObj.AwardId = vm.selectedAward.id;
            updateObj.NomineeId = vm.selectedNominee.id;
            updateObj.FileCount = vm.ArtWork.fileCount;
            updateObj.DateOfRelease = vm.ArtWork.dateOfRelease;
            updateObj.Country = vm.selectedCountry.shortName;
            updateObj.ShowDescription = vm.ArtWork.showDescription;
            updateObj.Director = vm.ArtWork.director.join(', ');
            updateObj.Production = vm.ArtWork.production.join(', ');
            updateObj.Writers = vm.ArtWork.writers.join(', ');
            updateObj.Story = vm.ArtWork.story.join(', ');
            updateObj.Crew = vm.ArtWork.crew.join(', ');
 
            if (posterImage != null) {
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


        function refreshCountries() {
            var k = ArtWorkResource.getAllCountries().$promise.then(function (results) {
                vm.countryList = results;
                blockUI.stop();

                var indexRate = vm.countryList.indexOf($filter('filter')(vm.countryList, { 'shortName': vm.ArtWork.country }, true)[0]);
                vm.selectedCountry = vm.countryList[indexRate];


            },
                function (data, status) {
                    blockUI.stop();
                });
        }

        vm.LoadUploadPoster = function () {
            debugger
            $("#posterImage").click();
        }
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];
            debugger
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
            debugger;
            vm.posterImage = $(element)[0].files[0];
        };




    }
}());

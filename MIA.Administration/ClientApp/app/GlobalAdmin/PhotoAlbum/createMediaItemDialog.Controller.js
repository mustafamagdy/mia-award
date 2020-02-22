(function () {
    'use strict';

    angular
        .module('home')
        .controller('createMediaItemController', ['$scope', 'blockUI', '$stateParams', '$state','$http','$q', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createMediaItemController])

    function createMediaItemController($scope, blockUI, $stateParams, $state,$http, $q,appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.selectedMediaType = "";
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewMediaItem = function () {
          debugger;
            var splitImage = vm.posterImage.split(',');
            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.title;
            newObj.Media = splitImage[1];
            newObj.MediaFileName = splitImage[0];
            newObj.Featured = vm.isFeatured;
            newObj.MediaType = vm.selectedMediaType;
            newObj.AlbumId = $stateParams.id;
            newObj.$createMediaItem().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('mediaItems', { id: $stateParams.id });
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
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
                    $scope.newMediaItemForm.$dirty = true;
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
        $scope.one = function () {
            $scope.file = $('#file').get(0).files[0];
            $scope.splitfilea(1);
        };

        $scope.splitfilea = function (currentpage) {
            let persize=1024*1024*10; //10Mb
            let allpage = Math.ceil($scope.file.size/persize);
            let start = (currentpage-1)*persize;
            let end = start+persize;
            if(currentpage===allpage){
                end=$scope.file.size;
            }
            $scope.filesplitdata = $scope.file.slice(start, end);
            $scope.r = new FileReader();
            $scope.r.readAsDataURL($scope.filesplitdata);
            $scope.r.onloadend=function (e) {
                console.log(currentpage);
                var bolb = e.target.result;
                $scope.encode_blob = new Blob([bolb]);
                $q.when($scope.httppost($scope.encode_blob)).then(function () {
                    delete $scope.formData;
                    if(currentpage<=allpage){
                        currentpage = currentpage+1;
                        $scope.splitfilea(currentpage);
                    }else{
                        console.log('end');
                    }
                });
            };
        };
        $scope.httppost = function (blob) {
            var deferral_local = $q.defer();
            $http({
            method: 'POST',
            url: 'http://localhost:65207/artwork/01e1gzjhtvpkb68am8q6swp27g/files',
            headers: {
                'Content-Type': undefined
            },
            data: {
                abc: blob,
                filename:"SADECO final.pdf",
                type:"pdf"
            },
            transformRequest: function (data, headersGetter) {
                if(!$scope.formData){
                    $scope.formData = new FormData();
                }
                angular.forEach(data, function (value, key) {
                    if(key === "abc"){
                        $scope.formData.append(key, value,"xxx.txt");
                    }else{
                        $scope.formData.append(key, value);
                    }
                });
                var headers = headersGetter();
                delete headers['Content-Type'];

                return $scope.formData;
            }
        }).success(function (response) {
                deferral_local.resolve( { status: 'good' } );
            });
            return deferral_local.promise;
        };
    }
}());

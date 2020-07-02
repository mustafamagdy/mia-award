(function () {
    'use strict';

    angular
        .module('home')
        .controller('createMediaItemController', ['$uibModal', '$scope', 'blockUI', '$stateParams', '$state', '$http', '$q', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createMediaItemController])

    function createMediaItemController($uibModal, $scope, blockUI, $stateParams, $state, $http, $q, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.selectedMediaType = "";
        vm.showVideo = false;
        vm.showButtonVideo = false;
        vm.mediaId = 0;
        vm.selectedMediaType = 'Image';
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewMediaItem = function () {

            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.title;

            newObj.Featured = vm.isFeatured;
            newObj.MediaType = vm.selectedMediaType;
            newObj.AlbumId = $stateParams.id;
            debugger;
            if (vm.posterVideo != null) {
                var splitVideoImage = vm.posterVideo.split(',');
                newObj.Poster = splitVideoImage[1];
                newObj.PosterFileName = splitVideoImage[0];
            }
            else {
                var splitImage = vm.posterImage.split(',');
                newObj.Media = splitImage[1];
                newObj.MediaFileName = splitImage[0];
            }

            // newObj.FileKey = splitImage[1];
            // newObj.FileUrl = splitImage[0];


            newObj.$createMediaItem().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.mediaType == 'image') {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('mediaItems', { id: $stateParams.id });

                    } else {
                        debugger;
                        vm.showButtonVideo = true;
                        vm.showVideo = true;
                        vm.mediaId = data.id;
                        //openUploadDialog(data.id, appCONSTANTS.API_URL + 'albums/mediaItems/' + data.id + '/files')
                    }
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }
        vm.UpdateMediaItemVideo = function () {
            processFile($scope.files[0], vm.mediaId)
        }
        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
            debugger;
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            debugger;
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



        vm.LoadUploadPosterVideo = function () {
            $("#posterVideo").click();
        }
        var posterVideo;
        $scope.AddposterVideo = function (element) {
            var logoFile = element[0];
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']
            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newMediaItemForm.$dirty = true;
                    $scope.$apply(function () {

                        posterVideo = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterVideo = reader.result;

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

        $scope.uploadPosterVideoFile = function (element) {
            debugger;
            vm.posterVideo = $(element)[0].files[0];
        };

        // function callBackUpload(model) {
        //     debugger
        //     var updateObj = new PhotoAlbumResource();
        //     updateObj.Id = model.id;
        //     updateObj.FileUrl = model.data.fileUrl;
        //     updateObj.FileKey = model.data.fileKey;
        //     updateObj.$UpdateMediaItemVideoUrl().then(
        //         function (data, status) {
        //             debugger;
        //             $state.go('mediaItems', { id: $stateParams.id });

        //             ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
        //         },
        //         function (data, status) {
        //             ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        //         }
        //     );
        // }
        // function openUploadDialog(id, url) {
        //     var modalContent = $uibModal.open({
        //         templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
        //         controller: 'uploadVideoController',
        //         controllerAs: 'uploadDlCtrl',
        //         resolve: {
        //             itemId: function () { return id },
        //             url: function () { return url },
        //             callBackFunction: function () { return callBackUpload }
        //         }

        //     });
        // }


        vm.LoadUploadTrailler = function () {
            debugger
            $("#traillerUploder").click();
        }
        $scope.getFileDetails = function (e) {
            $scope.files = [];
            $scope.$apply(function () {

                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };


        const sliceSize = 5 * 1024 * 1024; // Send 5MB Chunks
        var url;
        vm.Progress = 0;
        vm.size = 0;
        vm.FileModule = 0;
        $scope.init = function (obj, id, FileModule) {
            vm.FileModule = FileModule;
            processFile(obj, id);
        };

        function processFile(file, itemId) {
            url = appCONSTANTS.API_URL + 'albums/mediaItems/' + itemId + '/files';

            let start = 0;
            let uploadId = "";
            vm.size = file.size;
            const totalChunks = Math.ceil(vm.size / sliceSize);
            const chunkIndex = 0;
            let end = 0;
            start = chunkIndex * sliceSize;
            end = start + sliceSize;
            send(itemId, file, start, end, chunkIndex, totalChunks, [], uploadId);
        };
        function slice(file, start, end) {
            let slice = file.mozSlice ? file.mozSlice : file.webkitSlice ? file.webkitSlice : file.slice ? file.slice : this.noop;
            return slice.bind(file)(start, end);
        };
        this.noop = function () { };
        function send(itemId, file, start, end, chunkIndex, totalChunks, etags, uploadId) {
            if (chunkIndex >= totalChunks) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function () {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(",")[1];

                uploadChunkApi({ id: itemId, fileName: file.name, uploadId, chunkIndex, totalChunks, chunk: base64, eTags: etags })
                    .then(
                        function (data, status) {
                            var a = data;
                            if (a.status == 200) {
                                if (end < vm.size) {
                                    chunkIndex = chunkIndex + 1;
                                    const newEnd = start + sliceSize * 2;
                                    const newStart = start + sliceSize;
                                    debugger;
                                    const percent = (chunkIndex / totalChunks) * 100;
                                    onProgress && onProgress(percent);
                                    //upload next slice
                                    send(itemId, file, newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
                                } else {
                                    debugger;

                                    //  onUploadComplete && onUploadComplete(data);
                                    onProgress(100);
                                    // alert("Files uploaded successfully.");
                                    // ToastService.show("right", "bottom", "fadeInUp", "File uploaded", "success");
                                    //  $uibModalInstance.dismiss();
                                    data.id = itemId;
                                    callBackUpload(data);
                                }
                            } else {
                                ToastService.show("right", "bottom", "fadeInUp", a.data.errors, "error");
                                console.error("sending error", file.name, chunkIndex, a.data);
                            }
                        },
                        function (data, status) {
                            ToastService.show("right", "bottom", "fadeInUp", data, "error");
                        }
                    );
            };

            const slicedPart = slice(file, start, end);
            reader.readAsDataURL(slicedPart);
        };

        function uploadChunkApi({ id, ...data }) {
            return $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
            });
        };
        function onProgress(evt) {
            vm.Progress = Math.round(evt);
        }
        function callBackUpload(model) {
            var updateObj = new PhotoAlbumResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.file.fileUrl;
            updateObj.FileKey = model.data.file.fileKey;
            updateObj.$UpdateMediaItemVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('mediaItems', { id: $stateParams.id });
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Fileuploaded'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());

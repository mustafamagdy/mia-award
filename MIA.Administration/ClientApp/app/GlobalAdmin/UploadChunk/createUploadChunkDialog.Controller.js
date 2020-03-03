(function () {
    'use strict';

    angular
        .module('home')

        .directive("uploadVideoDirective", function ($http, $stateParams) {
            return {
                restrict: 'E',
                scope: {
                    itemId: '=id'
                },
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                link: function ($scope, ToastService, itemId) {
                    $scope.LoadUploadVideo = function () {
                        $("#file").click();
                    }
                    $scope.uploadVideo = function (id) {
                        $scope.onProgress && $scope.onProgress(0);
                        debugger
                        itemId = $stateParams.id// id;
                        const file = $('#file').get(0).files[0];
                        $scope.processFile(file);
                    };

                    const sliceSize = 5 * 1024 * 1024; // Send 5MB Chunks

                    $scope.size = 0;
                    $scope.processFile = function (file) {
                        let start = 0;
                        let uploadId = "";
                        $scope.size = file.size;
                        const totalChunks = Math.ceil($scope.size / sliceSize);
                        const chunkIndex = 0;
                        let end = 0;
                        start = chunkIndex * sliceSize;
                        end = start + sliceSize;
                        $scope.send(file, start, end, chunkIndex, totalChunks, [], uploadId);
                    };
                    $scope.slice = function (file, start, end) {
                        let slice = file.mozSlice ? file.mozSlice : file.webkitSlice ? file.webkitSlice : file.slice ? file.slice : $scope.noop;
                        return slice.bind(file)(start, end);
                    };
                    $scope.noop = function () { };
                    $scope.send = function (file, start, end, chunkIndex, totalChunks, etags, uploadId) {
                        if (chunkIndex >= totalChunks) {
                            return;
                        }
                        var reader = new FileReader();
                        reader.onload = function () {
                            var dataUrl = reader.result;
                            var base64 = dataUrl.split(",")[1];
                            console.log("sending ", file.name, chunkIndex);

                            $scope.uploadChunkApi({ id: itemId, fileName: file.name, uploadId, chunkIndex, totalChunks, chunk: base64, eTags: etags })
                                .then(
                                    function (data, status) {
                                        debugger;
                                        var a = data;
                                        if (a.status == 200) {
                                            if (end < $scope.size) {
                                                chunkIndex = chunkIndex + 1;
                                                const newEnd = start + sliceSize * 2;
                                                const newStart = start + sliceSize;
                                                const percent = (chunkIndex / totalChunks) * 100;
                                                $scope.onProgress && $scope.onProgress(percent);
                                                //upload next slice
                                                $scope.send(file, newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
                                            } else {
                                                $scope.onProgress && $scope.onProgress(100);
                                                ToastService.show("right", "bottom", "fadeInUp", "File uploaded", "success");

                                            }
                                        } else {
                                            ToastService.show("right", "bottom", "fadeInUp", a.data.errors, "error");
                                            console.error("sending error", file.name, chunkIndex, a.data);
                                        }
                                    },
                                    function (data, status) {
                                        ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                                    }
                                );
                        };

                        const slicedPart = $scope.slice(file, start, end);
                        reader.readAsDataURL(slicedPart);
                    };

                    $scope.uploadChunkApi = function ({ id, ...data }) {


                        return $http({
                            method: 'POST',
                            url: apiBaseUrl + `/api/test/artwork/${id}/files`,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data,
                        });
                    };
                    $scope.onProgress = function (evt) {
                        debugger;
                        var element = angular.element(document.querySelector('#dvProgress'));
                        $scope.Progress = Math.round(evt);
                        element.html('<div style="width: ' + $scope.Progress + '%">' + $scope.Progress + '%</div>');
                    }
                }
            };
        })
        .controller('uploadVideoController', ['$uibModalInstance', 'itemId', 'url', '$scope', '$http', 'ToastService', 'callBackFunction', uploadVideoController])

    function uploadVideoController($uibModalInstance, itemId, url, $scope, $http, ToastService, callBackFunction) {
        var vm = this;
        $scope.LoadUploadVideo = function () {
            $("#file").click();
        }
        $scope.uploadVideo = function (id) {
            $scope.onProgress && $scope.onProgress(0);
            debugger
            //  itemId = $stateParams.id// id;
            const file = $('#file').get(0).files[0];
            $scope.processFile(file);
        };

        const sliceSize = 5 * 1024 * 1024; // Send 5MB Chunks

        $scope.size = 0;
        $scope.processFile = function (file) {
            let start = 0;
            let uploadId = "";
            $scope.size = file.size;
            const totalChunks = Math.ceil($scope.size / sliceSize);
            const chunkIndex = 0;
            let end = 0;
            start = chunkIndex * sliceSize;
            end = start + sliceSize;
            $scope.send(file, start, end, chunkIndex, totalChunks, [], uploadId);
        };
        $scope.slice = function (file, start, end) {
            let slice = file.mozSlice ? file.mozSlice : file.webkitSlice ? file.webkitSlice : file.slice ? file.slice : $scope.noop;
            return slice.bind(file)(start, end);
        };
        $scope.noop = function () { };
        $scope.send = function (file, start, end, chunkIndex, totalChunks, etags, uploadId) {
            if (chunkIndex >= totalChunks) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function () {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(",")[1];
                console.log("sending ", file.name, chunkIndex);

                $scope.uploadChunkApi({ id: itemId, fileName: file.name, uploadId, chunkIndex, totalChunks, chunk: base64, eTags: etags })
                    .then(
                        function (data, status) {
                            debugger;
                            var a = data;
                            if (a.status == 200) {
                                if (end < $scope.size) {
                                    chunkIndex = chunkIndex + 1;
                                    const newEnd = start + sliceSize * 2;
                                    const newStart = start + sliceSize;
                                    const percent = (chunkIndex / totalChunks) * 100;
                                    $scope.onProgress && $scope.onProgress(percent);
                                    //upload next slice
                                    $scope.send(file, newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
                                } else {
                                    $scope.onProgress && $scope.onProgress(100);
                                    ToastService.show("right", "bottom", "fadeInUp", "File uploaded", "success");
                                    $uibModalInstance.dismiss();
                                    data.id = itemId;
                                    callBackFunction(data);
                                }
                            } else {
                                ToastService.show("right", "bottom", "fadeInUp", a.data.errors, "error");
                                console.error("sending error", file.name, chunkIndex, a.data);
                            }
                        },
                        function (data, status) {
                            ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                        }
                    );
            };

            const slicedPart = $scope.slice(file, start, end);
            reader.readAsDataURL(slicedPart);
        };

        $scope.uploadChunkApi = function ({ id, ...data }) {
            debugger;

            return $http({
                method: 'POST',
                url: url, 
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
            });
        };
        $scope.onProgress = function (evt) {
            debugger;
            var element = angular.element(document.querySelector('#dvProgress'));
            $scope.Progress = Math.round(evt);
            element.html('<div style="width: ' + $scope.Progress + '%">' + $scope.Progress + '%</div>');
        }
        vm.Confirm = function () {
            callBackFunction(model);
            $uibModalInstance.dismiss();
        }

    }
}());

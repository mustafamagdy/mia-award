(function () {
    'use strict';

    angular
        .module('home')
        .directive('getWidth', function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    attrs.$observe('rowHeight', function (value) {
                        $(element).css('width', value + "%");
                    });
                }
            }
        })
        .controller('UploaderController', ['$scope', '$translate', 'blockUI', '$http', 'appCONSTANTS', 'ArtWorkMediaResource', 'ToastService', UploaderController])

    function UploaderController($scope, $translate, blockUI, $http, appCONSTANTS,
        ArtWorkMediaResource, ToastService) {
        var vm = this;
        const sliceSize = 5 * 1024 * 1024; // Send 5MB Chunks
        var url;
        vm.Progress = 0;
        vm.size = 0;
        $scope.init = function (obj, id) {
        debugger;
            processFile(obj, id);
        };

        function processFile(file, itemId) {
            url = appCONSTANTS.API_URL + 'artWorks/artwork/' + itemId + '/files'; let start = 0;
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
        function onUploadComplete(evt) {
            //todo
            callBackUpload(model);
        }
        function callBackUpload(model) {
            debugger
            var addObj = new ArtWorkMediaResource();
            addObj.ArtWorkId = model.id;
            addObj.FileUrl = model.data.trailer.fileUrl;
            addObj.FileKey = model.data.trailer.fileKey;
            addObj.$createMediaFile().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Fileuploaded'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());

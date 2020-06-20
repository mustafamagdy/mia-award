(function () {
    'use strict';

    angular
        .module('home')

        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model, modelSetter;

                    attrs.$observe('fileModel', function (fileModel) {
                        model = $parse(attrs.fileModel);
                        modelSetter = model.assign;
                    });

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope.$parent, element[0].files[0]);
                        });
                    });
                }
            };
        }])
        .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
                    .success(function () {
                    })
                    .error(function () {
                    });
            }
        }])

        .filter("range", function () {
            return (x, n) => Array.from({ length: n }, (x, index) => (index));
        })

        .filter('Filesize', function () {
            return function (size) {
                if (isNaN(size))
                    size = 0;

                if (size < 1024)
                    return size + ' Bytes';

                size /= 1024;

                if (size < 1024)
                    return size.toFixed(2) + ' Kb';

                size /= 1024;

                if (size < 1024)
                    return size.toFixed(2) + ' Mb';

                size /= 1024;

                if (size < 1024)
                    return size.toFixed(2) + ' Gb';

                size /= 1024;

                return size.toFixed(2) + ' Tb';
            };
        })
        .controller('MultiFilesController', ['$scope', '$stateParams', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkByIdPrepService', 'ArtWorkMediaResource', 'ToastService', MultiFilesController])

    function MultiFilesController($scope, $stateParams, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkByIdPrepService,
        ArtWorkMediaResource, ToastService) {
        var vm = this;
        vm.errordata = 0;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.artWork = ArtWorkByIdPrepService;
        console.log(vm.artWork);
        var url = appCONSTANTS.API_URL + 'artWorks/artwork/' + vm.artWork.id + '/files';


        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e) {
            debugger;
            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };
        // NOW UPLOAD THE FILES.
        $scope.uploadSingleFile = function (file) {
            debugger;

            $scope.processFile(file);



        }
        // NOW UPLOAD THE FILES.
        $scope.uploadFiles = function () {
            debugger;

            //FILL FormData WITH FILE DETAILS.
            var data = new FormData();
            for (var i in $scope.files) {
                $scope.processFile($scope.files[i]);
                // data.append("uploadedFile", $scope.files[i]);
            }


        }

        // // UPDATE PROGRESS BAR.
        // function updateProgress(e) {
        //     if (e.lengthComputable) {
        //         document.getElementById('pro').setAttribute('value', e.loaded);
        //         document.getElementById('pro').setAttribute('max', e.total);
        //     }
        // }

        // // CONFIRMATION.
        // function transferComplete(e) {
        //     alert("Files uploaded successfully.");
        // }

        // $scope.uploadVideo = function () {
        //     debugger;
        //     $scope.filesCount = 4;
        //     const file = $('#file').get(0).files;
        //     // $scope.processFile(file);
        //     $scope.filesCount = 2;
        //     vm.errordata = 10;
        //     for (let index = 0; index < $scope.filesCount; index++) {
        //         const element = file[index];
        //         //  $scope.processFile(element);

        //     }
        // };


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

                $scope.uploadChunkApi({ id: vm.artWork.id, fileName: file.name, uploadId, chunkIndex, totalChunks, chunk: base64, eTags: etags })
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
                                    $scope.onProgress && $scope.onProgress(percent,file.size);
                                    //upload next slice
                                    $scope.send(file, newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
                                } else {
                                    $scope.onProgress && $scope.onProgress(100,file.size);
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
        $scope.onProgress = function (evt, size) {
            debugger;
            var element = angular.element(document.querySelector('#dvProgress' + size));
            $scope.Progress = Math.round(evt);
            element.html('<div style="width: ' + $scope.Progress + '%">' + $scope.Progress + '%</div>');
        }
        vm.Confirm = function () {
            callBackFunction(model);
            $uibModalInstance.dismiss();
        }
        vm.close = function () {
            $state.go('ArtWorkMedia', { id: $stateParams.id });
        }
    }
}());

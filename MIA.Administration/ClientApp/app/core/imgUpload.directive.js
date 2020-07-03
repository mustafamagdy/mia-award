
angular.module('core')

    .directive('imgUpload', ['$rootScope', function (rootScope) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var canvas = document.createElement("canvas");
                var extensions = 'jpeg ,jpg, png, gif';
                rootScope.isValid = true;

                elem.on('change', function () {
                    reader.readAsDataURL(elem[0].files[0]);
                    var filename = elem[0].files[0].name;
                    var extensionlist = filename.split('.');
                    rootScope.imageType = extensionlist[1];

                    var extension = extensionlist[extensionlist.length - 1];
                    if (extensions.indexOf(extension) == -1) {
                        alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp' are allowed.");
                        scope.imageName = null;
                        rootScope.isValid = false;
                    } else {
                        scope.file = elem[0].files[0];
                        scope.imageName = filename;
                        rootScope.isValid = true;
                    }
                });

                var reader = new FileReader();
                // reader.onload = function (e) {
                //     
                //     rootScope.image = e.target.result;
                //     scope.$apply();

                // }
                reader.onload = function (e) {
                    if (rootScope.isValid == false) {
                        rootScope.image = null;
                        scope.$apply();
                    }
                    else {
                        rootScope.image = e.target.result;
                        scope.$apply();
                    }
                }
            }
        }
    }])
    ;

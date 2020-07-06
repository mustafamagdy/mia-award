(function () {
  "use strict";
  angular
    .module("home")
    .controller("imageCropperController", ["$scope", imageCropperController]);

  function imageCropperController($scope) {
    var vm = this;
    vm.croppedImage = "";
    vm.originalImage = "";

    vm.rectangleWidth = 100;
    vm.rectangleHeight = 100;

    vm.cropper = {
      cropWidth: vm.rectangleWidth,
      cropHeight: vm.rectangleHeight,
    };

    var handleFileSelect = function (evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
          console.log('scope ', $scope);
          $scope.cropperCtrl.originalImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    angular
      .element(document.querySelector("#fileInput"))
      .on("change", handleFileSelect);
  }
})();

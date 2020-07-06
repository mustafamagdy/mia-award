(function () {
  "use strict";

  angular
    .module("home")
    .controller("editNewsDialogController", [
      "$rootScope",
      "$scope",
      "blockUI",
      "$filter",
      "$http",
      "$state",
      "appCONSTANTS",
      "$translate",
      "NewsResource",
      "ToastService",
      "NewsByIdPrepService",
      editNewsDialogController,
    ]);

  function editNewsDialogController(
    $rootScope,
    $scope,
    blockUI,
    $filter,
    $http,
    $state,
    appCONSTANTS,
    $translate,
    NewsResource,
    ToastService,
    NewsByIdPrepService
  ) {
    var vm = this;
    var posterImage;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.News = NewsByIdPrepService;

    vm.posterImage = vm.News.posterUrl;
    vm.newsDate = new Date(vm.News.date).toLocaleDateString();
    // vm.keywords = vm.News.keywords.split(",");
    vm.keywords = vm.News.keywords.split(",");

    vm.Close = function () {
      $state.go("News");
    };
    vm.UpdateNews = function () {
      var splitImage = vm.posterImage.split(",");
      blockUI.start("Loading...");

      var updateObj = new NewsResource();
      updateObj.Id = vm.News.id;
      updateObj.title = vm.News.title;
      updateObj.body = vm.News.body;
      if (Array.isArray(vm.News.keywords)) {
        updateObj.keywords = vm.News.keywords.join(",");
      } else {
        updateObj.keywords = vm.News.keywords;
      }
      updateObj.date = +new Date(vm.newsDate);
      updateObj.featured = vm.News.featured;
      updateObj.category = vm.News.category;

      if (posterImage != null) {
        // updateObj.image = splitImage[1];
        // updateObj.imageContentType = $rootScope.imageType;
        // updateObj.Poster = $scope.file;

        updateObj.PosterByte = splitImage[1];
        updateObj.PosterFileName = posterImage.type;
      }
      updateObj.$update().then(
        function (data, status) {
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("Editeduccessfully"),
            "success"
          );
          blockUI.stop();

          $state.go("News");
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.data.message,
            "error"
          );
        }
      );
    };

    vm.LoadUploadPoster = function () {
      $("#posterImage").click();
    };
    $scope.AddposterImage = function (element) {
      var logoFile = element[0];

      var allowedImageTypes = ["image/jpg", "image/png", "image/gif"];

      if (logoFile && logoFile.size >= 0 && logoFile.size / (1024 * 1000) < 2) {
        if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
          $scope.editNewsForm.$dirty = true;
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
          });
        } else {
          $("#logoImage").val("");
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("imageTypeError"),
            "error"
          );
        }
      } else {
        if (logoFile) {
          $("#logoImage").val("");
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("imgaeSizeError"),
            "error"
          );
        }
      }
    };

    $scope.uploadPosterFile = function (element) {
      vm.posterImage = $(element)[0].files[0];
    };
  }
})();

(function () {
  "use strict";

  angular
    .module("home")
    .directive("player", [
      "$sce",
      "$timeout",

      function ($sce, $timeout) {
        "use strict";
        return {
          restrict: "E",
          scope: {
            videos: "=",
          },
          link: function (scope, element, attrs) {
            var video = element.find("video");
            element.addClass("player");
            scope.playing = false;
            scope.trustSrc = function (src) {
              return $sce.trustAsResourceUrl(src);
            };

            video.on("timeupdate", function (e) {
              scope.$apply(function () {
                scope.percent =
                  (video[0].currentTime / video[0].duration) * 100;
              });
            });

            scope.frame = function (num) {
              if (video[0].readyState !== 0) {
                video[0].currentTime += num;
              }
            };

            scope.toggle = function () {
              if (video[0].paused === true) {
                video[0].play();
                scope.playing = true;
              } else {
                video[0].pause();
                scope.playing = false;
              }
            };
          },
          template:
            '<video preload="none" poster="{{ trustSrc(videos[0].poster) }}">' +
            '<source ng-repeat="item in videos" ng-src="{{ trustSrc(item.src) }}" type="video/{{ item.type }}" />' +
            '<track kind="captions" ng-src="{{ trustSrc(videos[0].captions) }}" srclang="en" label="English" />' +
            "</video>" +
            '<progressbar value="percent" max="100"></progressbar>' +
            '<div class="controls noselect">' +
            '<a ng-click="frame(-0.04)">&lt;</a>' +
            '<a ng-click="toggle()"> <span ng-show="!playing">&#9654;</span><span ng-show="playing">&#9616;&#9616;</span> </a>' +
            '<a ng-click="frame(0.04)">&gt;</a>' +
            "</div>",
        };
      },
    ])
    .controller("DisplayVideoController", [
      "appCONSTANTS",
      "$sce",
      "MediaFileByIdPrepService",
      "$scope",
      "$translate",
      "JudgeArtWorkResource",
      "blockUI",
      "$state",
      "$timeout",
      "ToastService",
      "$stateParams",
      DisplayVideoController,
    ]);

  function DisplayVideoController(
    appCONSTANTS,
    $sce,
    MediaFileByIdPrepService,
    $scope,
    $translate,
    JudgeArtWorkResource,
    blockUI,
    $state,
    $timeout,
    ToastService,
    $stateParams
  ) {
    $(".pmd-sidebar-nav>li>a").removeClass("active");
    $($(".pmd-sidebar-nav").children()[6].children[0]).addClass("active");
    var vm = this;
    vm.currentPage = 1;
    vm.appCONSTANTS = appCONSTANTS;
    vm.mediaFile = MediaFileByIdPrepService;
    vm.currentTime = 0;

    refreshComments();

    vm.fileUrl = [vm.mediaFile].map((f) => ({
      src: $sce.trustAsResourceUrl(f.file.fileUrl),
      type: `video/${f.file.fileUrl.split(".").pop()}`,
    }));

    vm.tracks = [];
    vm.onUpdateTime = function (currentTime, totalTime) {
      vm.currentTime = currentTime.toFixed(0);
      vm.time = vm.niceTime(currentTime);

      //   console.log("current time -> ", currentTime, totalTime);
      //   vm.currentTime = currentTime;
      //   vm.totalTime = totalTime;
    };

    vm.niceTime = function (seconds) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2);
      const hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60;

      return [hours, minutes, seconds % 60].map(format).join(":");
    };
    vm.Close = function () {
      $state.go("JudgeArtWork");
    };

    $scope.playing = false;
    vm.submitComment = function () {
      blockUI.start("Loading...");

      var updateObj = new JudgeArtWorkResource();
      updateObj.MediaFileId = vm.mediaFile.id;
      updateObj.JudgeId = $scope.user.id;
      updateObj.MediaTime = vm.time;
      updateObj.Comments = vm.comment;
      updateObj.$postComment().then(
        function (data, status) {
          vm.comment = "";

          refreshComments();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("Editeduccessfully"),
            "success"
          );
          blockUI.stop();
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

    function refreshComments() {
      var k = JudgeArtWorkResource.getCommetsListByMedia({
        id: vm.mediaFile.id,
      }).$promise.then(
        function (results) {
          vm.commentsList = results;
          console.log(vm.commentsList);
          vm.totalCount = results.length;
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
        }
      );
    }

    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    };
  }
})();

(function () {
  "use strict";

  angular
    .module("home")
    .controller("homeCtrl", [
      "$interval",
      "$filter",
      "ToastService",
      "$window",
      "$rootScope",
      "blockUI",
      "$transitions",
      "$translate",
      "$scope",
      "appCONSTANTS",
      "$state",
      "_",
      "authenticationService",
      "authorizationService",
      "$localStorage",
      homeCtrl,
    ]);

  function homeCtrl(
    $interval,
    $filter,
    ToastService,
    $window,
    $rootScope,
    blockUI,
    $transitions,
    $translate,
    $scope,
    appCONSTANTS,
    $state,
    _,
    authenticationService,
    authorizationService,
    $localStorage
  ) {
    // $scope.$on('LOAD', function () { $scope.loading = true });
    // $scope.$on('UNLOAD', function () { $scope.loading = false });

    var vm = this;
    $scope.appCONSTANTS = appCONSTANTS;
    $scope.emailEmpty = false;
    $scope.passwordEmpty = false;
    $scope.ManufactureList = [];
    $scope.totalCount = 0;
    $scope.CurrentDate = new Date();

    $scope.languages = [
      {
        id: "en",
        label: "english",
      },
      {
        id: "ar",
        label: "arabic",
      },
    ];
    $scope.init = function () {
      if (!!$localStorage.authInfo) {
        $scope.user = authorizationService.getUser();
      } else {
        $state.go("login");
        return;
      }

      $scope.selectedManufacture = $localStorage.tenant;
      if ($scope.user.userTypeId == 4 || $scope.user.userTypeId == 5)
        getManufactures();
      if ($scope.user.userTypeId == 2 || $scope.user.userTypeId == 7) {
        refreshOrders();
        getManufactureById();

        //uncomment to run signal R
        // vm.connection = new signalR.HubConnectionBuilder().withUrl(appCONSTANTS.SIGNAL_URL + "newOrder").build();
        // console.log(vm.connection.id);

        // vm.connection.on("NewOrder", function(user) {
        //   ToastService.show("right", "bottom", "fadeInUp", "لديك طلب جديد", "success");
        //   refreshOrders();
        //   return console.log(user);
        // });

        // vm.connection.on("RefreshOrder", function(user) {
        //   refreshOrders();
        //   return console.log(user);
        // });

        // vm.connection
        //   .start()
        //   .then(function() {})
        //   .catch(function(err) {
        //     return console.error(err.toString());
        //   });
      }
      if ($localStorage.tenant != undefined) {
        $scope.selectedTenant = $localStorage.tenant.manufactureId;
        $scope.selectedManufacture = $localStorage.tenant;
      }
    };
    $scope.init();

    $scope.openOrder = function (orderId) {
      blockUI.start("Loading...");
      // var updateObj = new OrderResource();
      // updateObj.orderId = orderId;
      // updateObj.$changeStatusOpen({ orderId: orderId }).then(
      //   function(data, status) {
      //     vm.connection.invoke("getConnectionId").then(function(connectionId) {
      //       vm.connectionId = connectionId;
      //       vm.connection.invoke("refresh"); // Send the connectionId to controller
      //     });
      //     blockUI.stop();
      //     $state.go("OrderDetailsByTenant", { orderId: orderId });
      //   },
      //   function(data, status) {
      //     blockUI.stop();
      //     ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
      //   }
      // );
    };

    if ($localStorage.language == null) {
      $scope.selectedLanguage = $scope.languages[0].id;
      $localStorage.language = $scope.selectedLanguage;
    } else $scope.selectedLanguage = $localStorage.language;

    $translate.use($scope.selectedLanguage);

    $scope.submit = function (username, password) {
      blockUI.start("Loading...");

      authorizationService.isPasswordchanged = false;
      $("#passwordChanged").hide();
      //  $('#userInActivated').hide();
      if (!username) $scope.emailEmpty = true;
      if (!password) $scope.passwordEmpty = true;
      if (username && password) {
        $scope.afterSubmit = false;
        $scope.emailEmpty = $scope.passwordEmpty = false;
        authenticationService
          .authenticate(username, password)
          .then(loginSuccess, loginFailed);
        //.error(loginFailed);;
      } else {
        $scope.afterSubmit = false;
      }
    };

    $scope.reloadPage = true;
    $rootScope.$on("$stateChangeStart", function (
      e,
      toState,
      toParams,
      fromState,
      fromParams
    ) {
      if (fromState.name != "" && $scope.reloadPage) {
        e.preventDefault();
        $scope.reloadPage = false;
        $state.go(toState.name, toParams, { reload: true });
      }
    });

    $transitions.onStart({}, function (transition) {
      if (authorizationService.isLoggedIn()) {
        var user = authorizationService.getUser();
        var authorize = false;
        if (transition._targetState._identifier.self != undefined) {
          if (
            transition._targetState._identifier.self.data != undefined &&
            transition._targetState._identifier.self.data.permissions.only !=
              undefined
          ) {
            authorize = transition._targetState._identifier.self.data.permissions.only.some(
              (a) => {
                const _parts = a.split(".");
                const _module = _parts[0];
                const _permission = _parts[1];
                return (
                  _module &&
                  _permission &&
                  user.userPermissions[_module][_permission]
                );
              }
            );
            if (!authorize) {
              $state.go(
                transition._targetState._identifier.self.data.permissions
                  .redirectTo
              );
            }
          }
        } else {
          if (
            transition._targetState._definition.data != undefined &&
            transition._targetState._definition.data.permissions.only !=
              undefined
          ) {
            authorize = transition._targetState._definition.data.permissions.only.some(
              (a) => {
                const _parts = a.split(".");
                const _module = _parts[0];
                const _permission = _parts[1];
                return (
                  _module &&
                  _permission &&
                  user.userPermissions[_module][_permission]
                );
              }
            );

            if (!authorize) {
              $state.go(
                transition._targetState._definition.data.permissions.redirectTo
              );
            }
          }
        }

        $(".pmd-sidebar-nav>li>a").removeClass("active");
        $(`a.pmd-ripple-effect[data-state=${transition._targetState._definition.name}`).addClass("active");
      } else {
        $state.go("login");
      }
    });

    $scope.$watch(
      function () {
        return $localStorage.authInfo;
      },
      function (newVal, oldVal) {
        if (
          oldVal != undefined &&
          newVal === undefined &&
          $localStorage.authInfo == undefined
        ) {
          $state.go("login");
        }
        if (
          oldVal === undefined &&
          newVal !== undefined &&
          $localStorage.authInfo != undefined
        ) {
          $scope.user = authorizationService.getUser();
          loginSuccess();
          // authorizationService.isLoggedIn() && !location.href.contains('connect')
        }
      }
    );
    function loginSuccess(response) {
      blockUI.stop();
      if (response.data.userId == 0) {
        $scope.invalidLoginInfo = false;
        $scope.inActiveUser = true;
        $scope.errorMessage = response.data.message; //"User not found";
        return;
      }

      $scope.afterSubmit = false;
      $scope.invalidLoginInfo = false;
      $scope.user = authorizationService.getUser();
    }

    function loginFailed(response) {
      blockUI.stop();
      //  $scope.errorMessage = response.data.message;
      $scope.afterSubmit = true;
      if (response.data == null) {
        $scope.invalidLoginInfo = false;
        $scope.inActiveUser = true;
        $scope.errorMessage = "Can't reach to the server";
      }
      // $scope.invalidLoginInfo = true;
      if (response) {
        if (response.data.message == "Password invalied") {
          $scope.invalidLoginInfo = true;
          $scope.inActiveUser = false;
        }
        if (response.data.message == "User not found") {
          $scope.invalidLoginInfo = false;
          $scope.inActiveUser = true;
        }

        if (response.data.message == "Account is Locked") {
          $scope.errorMessage = response.data.message;
          $scope.invalidLoginInfo = false;
          $scope.inActiveUser = true;
        }
      }
    }

    $scope.logout = function () {
      authorizationService.logout();
      $state.go("login");
    };
    $scope.reset = function () {
      $scope.invalidLoginInfo = false;
      $scope.inActiveUser = false;
    };
    $scope.hasOneOfPermissions = function (...permissions) {
      return authorizationService.hasOneOfPermissions(...permissions);
    };
    $scope.isLoggedIn = function () {
      return authorizationService.isLoggedIn();
    };
    $scope.changeLanguage = function (language) {
      $scope.selectedLanguage = language;
      $localStorage.language = $scope.selectedLanguage;
      $state.reload();
      $translate.use(language);
    };
    $scope.getCurrentTime = function () {
      return new Date().getTime();
    };
  }
})();

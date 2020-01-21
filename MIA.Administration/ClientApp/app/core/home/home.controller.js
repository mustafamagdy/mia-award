(function() {
  "use strict";

  angular
    .module("home")
    .controller("homeCtrl", [
      "ManufactureResource",
      "$interval",
      "$filter",
      "OrderResource",
      "UserResource",
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
      homeCtrl
    ]);

  function homeCtrl(
    ManufactureResource,
    $interval,
    $filter,
    OrderResource,
    UserResource,
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

    var tick = function() {
      $scope.clock = Date.now();
    };
    // tick();
    // $interval(tick, 1000);
    $scope.languages = [
      {
        id: "en-uk",
        label: "english"
      },
      {
        id: "ar-eg",
        label: "arabic"
      }
    ];
    $scope.init = function() {
      $scope.user = authorizationService.getUser();
      $scope.selectedManufacture = $localStorage.tenant;

      if ($scope.user.userTypeId == 4 || $scope.user.userTypeId == 5) getManufactures();
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
    function refreshOrders() {
      //  blockUI.start("Loading...");
      var k = OrderResource.getAllOrdersBy({ isNew: true, page: vm.currentPage }).$promise.then(
        function(results) {
          $scope.Orders = results.results;
          $scope.totalCount = results.totalCount;
          blockUI.stop();
        },
        function(data, status) {
          blockUI.stop();
          //   ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        }
      );
    }

    $scope.openOrder = function(orderId) {
      blockUI.start("Loading...");
      var updateObj = new OrderResource();
      updateObj.orderId = orderId;
      updateObj.$changeStatusOpen({ orderId: orderId }).then(
        function(data, status) {
          vm.connection.invoke("getConnectionId").then(function(connectionId) {
            
            vm.connectionId = connectionId;
            vm.connection.invoke("refresh"); // Send the connectionId to controller
          });
          blockUI.stop();
          $state.go("OrderDetailsByTenant", { orderId: orderId });
        },
        function(data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        }
      );
    };
    function getManufactureById() {
      blockUI.start("Loading...");
      var k = ManufactureResource.getManufacture({ manufactureId: $scope.user.tenantId }).$promise.then(
        function(results) {
          $localStorage.tenant = results;
          $scope.selectedManufacture = $localStorage.tenant;
          blockUI.stop();
        },
        function(data, status) {
          blockUI.stop();
          if ((data.statusText = "Unauthorized")) authorizationService.logout();
          //ToastService.show("right", "bottom", "fadeInUp", data.statusText, "error");
        }
      );
    }
    function getManufactures() {
      blockUI.start("Loading...");
      var k = ManufactureResource.getAllManufactures().$promise.then(
        function(results) {
          $scope.ManufactureList.push({ manufactureId: 0, name: "All", companyLogo: "/Upload/newlogo.png" });
          // $scope.ManufactureList = results.results;
          $scope.ManufactureList = $scope.ManufactureList.concat(results.results);
          $scope.selectedManufacture = $localStorage.tenant;
          vm.selectedCountryId = 0; // $scope.selectedTenant = $scope.ManufactureList[0];
          blockUI.stop();
        },
        function(data, status) {
          blockUI.stop();

          if ((data.statusText = "Unauthorized")) authorizationService.logout();
          ToastService.show("right", "bottom", "fadeInUp", data.statusText, "error");
        }
      );
    }

    if ($localStorage.language == null) {
      $scope.selectedLanguage = $scope.languages[0].id;
      $localStorage.language = $scope.selectedLanguage;
    } else $scope.selectedLanguage = $localStorage.language;

    $translate.use($scope.selectedLanguage);

    $scope.submit = function(username, password) {
      blockUI.start("Loading...");

      authorizationService.isPasswordchanged = false;
      $("#passwordChanged").hide();
      //  $('#userInActivated').hide();
      if (!username) $scope.emailEmpty = true;
      if (!password) $scope.passwordEmpty = true;
      if (username && password) {
        $scope.afterSubmit = false;
        $scope.emailEmpty = $scope.passwordEmpty = false;
        authenticationService.authenticate(username, password).then(loginSuccess, loginFailed);
        //.error(loginFailed);;
      } else {
        $scope.afterSubmit = false;
      }
    };

    $scope.reloadPage = true;
    $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
      if (fromState.name != "" && $scope.reloadPage) {
        e.preventDefault();
        $scope.reloadPage = false;
        $state.go(toState.name, toParams, { reload: true });
      }
    });
    $transitions.onStart({}, function(transition) {
      if (authorizationService.isLoggedIn()) {
        var user = authorizationService.getUser();
        var authorize = false;
        if (transition._targetState._identifier.self != undefined) {
          if (transition._targetState._identifier.self.data.permissions.only != undefined) {
            transition._targetState._identifier.self.data.permissions.only.forEach(function(element) {
              if (user.PermissionId.includes(element.toString())) authorize = true;
            }, this);
            if (!authorize) $state.go(transition._targetState._identifier.self.data.permissions.redirectTo);
          }
        }
      } else {
        $state.go("login");
      }
    });
    $scope.$watch(
      function() {
        return $localStorage.authInfo;
      },
      function(newVal, oldVal) {
        if (oldVal != undefined && newVal === undefined && $localStorage.authInfo == undefined) {
          console.log("logout");
          $state.go("login");
        }
        if (oldVal === undefined && newVal !== undefined && $localStorage.authInfo != undefined) {
          console.log("login");
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

      //comment this at 4/8/2019
      // if (response.xhrStatus = "error")
      //     loginFailed(response);
      $scope.afterSubmit = false;
      $scope.invalidLoginInfo = false;
      //$scope.inActiveUser = false;
      $scope.user = authorizationService.getUser();
      $localStorage.tenant = { manufactureId: 0, name: "All", companyLogo: "/Upload/newlogo.png" };
      if ($scope.user.userTypeId == 4) $window.location.reload();

      // if ($scope.user.PermissionId[0] == 1)
      //    $state.go('users');
      // $state.reload();
      // $scope.init();
      // if ($scope.user.userTypeId == 4 || $scope.user.userTypeId == 5)
      //     getManufactures();
      // else
      //     getManufactureById();
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

    $scope.logout = function() {
      authorizationService.logout();
      $state.go("login");
    };
    $scope.reset = function() {
      $scope.invalidLoginInfo = false;
      $scope.inActiveUser = false;
    };
    $scope.isLoggedIn = function() {
      return authorizationService.isLoggedIn();
    };
    $scope.changeLanguage = function(language) {
      $scope.selectedLanguage = language;
      $localStorage.language = $scope.selectedLanguage;
      $state.reload();
      $translate.use(language);
    };
    $scope.getCurrentTime = function() {
      return new Date().getTime();
    };
    $scope.changeTenant = function(tenant) {
      blockUI.start("We Are Changing now to new Manufacture...");
      var newObj = new UserResource();
      newObj.tenantId = $scope.selectedTenant;
      newObj.$refreshLogin().then(
        function(data, status) {
          blockUI.stop();
          if (data.token != null) {
            var getUserInfo = authorizationService.getUser();
            getUserInfo.token = data.token;
            getUserInfo.username = data.username;
            getUserInfo.userId = data.userId;
            getUserInfo.userType = data.userType;

            authorizationService.setAuthInfoAfterChangeTenant(getUserInfo);
            var index = $scope.ManufactureList.indexOf($filter("filter")($scope.ManufactureList, { manufactureId: tenant }, true)[0]);
            $localStorage.tenant = $scope.ManufactureList[index];
            $scope.selectedManufacture = $localStorage.tenant;
            $window.location.reload();
          } else {
            //    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
          }
        },
        function(data, status) {
          blockUI.stop();

          // ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        }
      );
    };
  }
})();

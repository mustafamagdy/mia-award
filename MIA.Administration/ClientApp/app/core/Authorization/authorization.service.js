(function () {
  "use strict";

  angular.module("core").factory("authorizationService", authorizationService);
  authorizationService.$inject = ["$rootScope", "$localStorage", "AUTH_EVENTS", "jwtHelper"];
  function authorizationService($rootScope, $localStorage, AUTH_EVENTS, jwtHelper) {
    var factory = {
      getAuthInfo: getAuthInfo,
      setAuthInfoAfterChangeTenant: setAuthInfoAfterChangeTenant,
      getUser: getUser,
      hasRole: hasRole,
      isLoggedIn: isLoggedIn,
      logout: logout,
      setAuthInfo: setAuthInfo,
      isDisabled: false,
      isPasswordchanged: false
    };

    return factory;

    function isLoggedIn() {
      return !!$localStorage.authInfo;
    }

    function getAuthInfo() {
      return $localStorage.authInfo;
    }

    function getUser() {
      var token = getAuthInfo();
      if (token == undefined) return undefined;
      const userDetails = jwtHelper.decodeToken(token);
      userDetails.PermessionId  = userDetails.PermessionId || '';
      userDetails.PermessionId = userDetails.PermessionId.split(';').map(a => a.trim());
      userDetails.PermessionModules = JSON.parse(userDetails.PermessionModules);

      return userDetails;
      // return {
      //   tenantId: info ? info.tenantId : "",
      //   name: info ? info.username : "",
      //   role: info ? info.Role : "",
      //   id: info ? info.userId : "",
      //   permessionModules: info ? info.permessionModules : 0,
      //   PermissionId: info ? info.PermissionId : [],
      //   userTypeId: info && info.userType ? info.userType : 0
      // };
    }

    function hasRole(role) {
      if (!isLoggedIn()) {
        return false;
      }
      // return JSON.parse(getAuthInfo().Roles).indexOf(role) > -1;
      return getAuthInfo().Role == role;
    }

    function logout() {
      $localStorage.authInfo = undefined;
      $localStorage.tenant = undefined;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function setAuthInfo(info) {
      // info.data.PermissionId = info.data.permissionId;
      // info.data.permessionModules = info.data.permessionModules;
      // info.data.expires_in = "172799";
      // info.data.token_type = "bearer";

      // $localStorage.authInfo = info.data;
      // var currentDate = new Date();
      // $localStorage.authInfo['expires_in'] = currentDate.setSeconds(currentDate.getSeconds() + $localStorage.authInfo['expires_in']);

      $localStorage.authInfo = info.data;
    }

    function setAuthInfoAfterChangeTenant(info) {
      info.PermissionId = info.PermissionId;
      info.permessionModules = info.permessionModules;
      info.expires_in = "172799";
      info.token = info.token;
      info.token_type = "bearer";
      info.userType = info.userType;

      $localStorage.authInfo = info;
      var currentDate = new Date();
      $localStorage.authInfo["expires_in"] = currentDate.setSeconds(currentDate.getSeconds() + $localStorage.authInfo["expires_in"]);
    }
  }
})();

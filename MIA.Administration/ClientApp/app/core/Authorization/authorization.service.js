(function () {
  "use strict";

  angular.module("core").factory("authorizationService", authorizationService);
  authorizationService.$inject = [
    "$rootScope",
    "$localStorage",
    "AUTH_EVENTS",
    "jwtHelper",
  ];
  function authorizationService(
    $rootScope,
    $localStorage,
    AUTH_EVENTS,
    jwtHelper
  ) {
    var factory = {
      getAuthInfo: getAuthInfo,
      setAuthInfoAfterChangeTenant: setAuthInfoAfterChangeTenant,
      getUser: getUser,
      hasRole: hasRole,
      isLoggedIn: isLoggedIn,
      logout: logout,
      setAuthInfo: setAuthInfo,
      hasOneOfPermissions: hasOneOfPermissions,
      isDisabled: false,
      isPasswordchanged: false,
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
      const _modules = (userDetails.userModules || "")
        .split(";")
        .map((a) => a.trim());
      //this will make the user modules as object { 'admin': true, ... etc}
      userDetails.userModules = _modules.reduce(function (acc, cur, i) {
        acc[cur] = true;
        return acc;
      }, {});

      userDetails.userPermissions = JSON.parse(userDetails.userPermissions);
      Object.keys(userDetails.userPermissions).forEach((k) => {
        const _permissions = userDetails.userPermissions[k];
        userDetails.userPermissions[k] = _permissions.reduce(function (
          acc,
          cur,
          i
        ) {
          acc[cur] = true;
          return acc;
        },
        {});
      });
      return userDetails;
    }

    function hasOneOfPermissions(...permissions) {
      const user = getUser();
      if(!user) return false;
      
      const hasPermission = permissions.some((p) => {
        const _parts = p.split(".");
        const _module = _parts[0];
        const _permission = _parts[1];
        return (
          _module && _permission && user.userPermissions[_module][_permission]
        );
      });

      return hasPermission;
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
      $localStorage.authInfo = info.data;
    }

    function setAuthInfoAfterChangeTenant(info) {}
  }
})();

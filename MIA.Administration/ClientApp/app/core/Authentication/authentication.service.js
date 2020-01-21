(function() {
  "use strict";

  angular.module("core").factory("authenticationService", authenticationService);

  authenticationService.$inject = ["$injector", "appCONSTANTS", "authorizationService", "AUTH_EVENTS", "$rootScope", "$q", "ToastService"];

  function authenticationService($injector, appCONSTANTS, authorizationService, AUTH_EVENTS, $rootScope, $q, ToastService) {
    var factory = {
      authenticate: authenticate,
      getToken: getToken,
      isAuthenticated: isAuthenticated
    };

    return factory;

    function authenticate(email, password) {
      var credentials = {
        username: email,
        password: password
      };
      var request = requestToken(credentials, "password");
      request.then(authenticated, authenticaionFailed);
      return request;

      //.error(authenticaionFailed);
    }

    function authenticated(res) {
      if (res.data == null) authenticaionFailed(res);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      return res;
    }

    function authenticaionFailed(res) {
      ToastService.show("right", "bottom", "fadeInUp", res.data.title, "error");
      // data.data = null;
      res.status = "-1";
      res.statusText = "";
      res.xhrStatus = "error";
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      return res;
    }

    function getToken(forceRefresh) {
      if (!isAuthenticated()) {
        return $q.reject({
          status: 401
        });
      }
      var authInfo = authorizationService.getAuthInfo();
      var expirydate = new Date(authInfo[".expires"]);
      if (forceRefresh || new Date() >= expirydate) {
        return refreshToken(authInfo["refresh_token"]).then(refreshedToken, function() {
          authorizationService.logout();
        });
      }
      var defer = $q.defer();
      defer.resolve(authInfo);
      return defer.promise;
    }

    function isAuthenticated() {
      return !!authorizationService.getAuthInfo();
    }

    function refreshToken(refreshToken) {
      var credentials = {
        refresh_token: refreshToken
      };
      return requestToken(credentials, "refresh_token");
    }

    function refreshedToken(response) {
      $rootScope.$broadcast(AUTH_EVENTS.refreshedToken);
      authorizationService.setAuthInfo(response);
      return response.data;
    }

    function requestToken(credentials, grantType) {
      angular.extend(credentials, {
        grant_type: grantType
      });

      var $http = $injector.get("$http");
      var result = $http.post(appCONSTANTS.API_URL + "auth/login", JSON.stringify(credentials));
      result.then(function(res) {
        
        if (res.data != null) authorizationService.setAuthInfo(res);
        else return (result = res);
      });
      return result;
    }
  }
})();

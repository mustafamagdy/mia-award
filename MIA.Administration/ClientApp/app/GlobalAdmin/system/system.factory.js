(function () {
  angular
    .module("home")
    .factory("SystemResource", ["$resource", "appCONSTANTS", SystemResource]);

  function SystemResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + "system", {}, {
      checkSystemResults: { method: 'GET', url: appCONSTANTS.API_URL + 'system/check-system-results', useToken: true},
      closeAll: { method: 'POST', url: appCONSTANTS.API_URL + 'system/close-all', isArray: true, useToken: true},
    });
  }
})();

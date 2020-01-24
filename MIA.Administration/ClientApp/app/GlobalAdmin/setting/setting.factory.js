(function () {
  angular
    .module('home')
    .factory('GetSettingsResource', ['$resource', 'appCONSTANTS', GetSettingsResource])
    .factory('UpdateSettingsResource', ['$resource', 'appCONSTANTS', UpdateSettingsResource])
    .factory('AddSettingsResource', ['$resource', 'appCONSTANTS', AddSettingsResource])
    .factory('UpdateBranchFeesResource', ['$resource', 'appCONSTANTS', UpdateBranchFeesResource])
    ;


  function GetSettingsResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Setting/GetSetting', {}, {
      getAllSettings: { method: 'GET', useToken: true }
    })
  }

  function UpdateSettingsResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Setting/UpdateSetting', {}, {
      update: { method: 'POST', useToken: true },
    })
  }

  function AddSettingsResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Setting/AddSettings', {}, {
      create: { method: 'POST', useToken: true },
    })
  }

  function UpdateBranchFeesResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Branchs/UpdateBranchFees', {}, {
      updateBranchFees: { method: 'POST', useToken: true },
    })
  }

}());


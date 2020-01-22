(function () {
    angular
        .module('home')
        .factory('UserResource', ['$resource', 'appCONSTANTS', UserResource])

    function UserResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Account/CreateUser', {}, {
            getAllUsersByUserType: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetUsers/:userType', useToken: true, params: { lang: '@lang' } },
            getAllUsersForManufacture: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetTenantUsers/:tenantId', useToken: true, params: { lang: '@lang' } },
            getAllAdminUsers: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetAdminUsers/:userType', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/UpdateUser', useToken: true },
            createOperationUser: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/CreateOperationUser/:userType', useToken: true },
            getUser: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetUserById/:userId', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/ChangeStatus/:userId', useToken: true },
            changeRole: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/MoveToAdminRole/:userType/:userId', useToken: true },
            getUserRole: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/RoleForUser/:userId', useToken: true},
            refreshLogin: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/RefreshLogin', useToken: true },
        })
    }

}());

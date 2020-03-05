(function () {
    angular
        .module('home')
        .factory('RoleResource', ['$resource', 'appCONSTANTS', RoleResource])

    function RoleResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Role/CreateRole', {}, {
            getAllRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/roles', useToken: true, isArray: true },
            getAllActivateRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'Roles/GetAllActivateRoles', useToken: true, params: { lang: '@lang' } },
            getAllPermissions: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/permissions', isArray: true, useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/UpdateRole', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Role/Delete/:roleId', useToken: true },
            getRole: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/GetRoleById/:roleId', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/ChangeStatus/:roleId/:status', useToken: true },

        })
    }
}());


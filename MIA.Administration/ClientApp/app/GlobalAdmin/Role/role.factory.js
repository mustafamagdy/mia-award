(function () {
    angular
        .module('home')
        .factory('RoleResource', ['$resource', 'appCONSTANTS', RoleResource])

    function RoleResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Role/CreateRole', {}, {
            getAllRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/roles', useToken: true, isArray: true },
            getAllActivateRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/roles', useToken: true, isArray: true, params: { lang: '@lang' } },
            getAllPermissions: { method: 'POST', url: appCONSTANTS.API_URL + 'admin/permissions', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            addPermissionToRole: { method: 'POST', url: appCONSTANTS.API_URL + 'admin/role/:roleName/permissions/:permissionId', useToken: true },
            removePermissionToRole: { method: 'DELETE', url: appCONSTANTS.API_URL + 'admin/role/:roleName/permissions/:permissionId', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Role/Delete/:roleId', useToken: true },
            getRole: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/role/:roleName/permissions', useToken: true, isArray: true },
            addUserToRole: { method: 'POST', url: appCONSTANTS.API_URL + 'admin/role/:roleName/user/:userId', useToken: true },
            getAllModules: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/role/modules', isArray: true, useToken: true, params: { lang: '@lang' } },
            getAllPermissionsByModule: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/permissions/module/:moduleName', isArray: true, useToken: true, params: { lang: '@lang' } },
        })
    }
}());


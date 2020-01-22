(function () {
    'use strict';

    angular
        .module('home')
        .controller('loginController', ['$rootScope', '$scope', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS', loginController]);

    function loginController($rootScope, $scope, $state, $localStorage, authorizationService, appCONSTANTS) {
        if (!!$localStorage.authInfo) {
            var user = authorizationService.getUser();
            // if (user.PermissionId[0] == 1)
            //     $state.go('users'); 
            // if (user.PermissionId[0] == 3)
            //     $state.go('Role');
            // if (user.PermissionId[0] == 4)
            //     $state.go('Area'); 
            // if ($scope.user.PermissionId[0] == 10)
            //     $state.go('Dashboard');

        }
        else {
            $state.go('login');
        }
    }

}())
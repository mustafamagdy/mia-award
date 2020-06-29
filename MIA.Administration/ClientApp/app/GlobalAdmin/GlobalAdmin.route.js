(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                // user
                .state('users', {
                    url: '/users',
                    templateUrl: './app/GlobalAdmin/user/templates/user.html',
                    controller: 'userController',
                    'controllerAs': 'userCtrl',
                    data: {
                        permissions: {
                           // only: ['12'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('addUser', {
                    url: '/addUser',
                    templateUrl: './app/GlobalAdmin/user/templates/addUser.html',
                    controller: 'addUserController',
                    'controllerAs': 'addUserCtrl',
                    resolve: {
                      //  UserRoleByIdPrepService: UserRoleByIdPrepService,
                    },
                    data: {
                        permissions: {
                         //   only: ['12', '16', '17', '18'],
                            redirectTo: 'root'
                        }
                    }
                })
                .state('editUser', {
                    url: '/editUser/:userId/:userType',
                    templateUrl: './app/GlobalAdmin/user/templates/editUser.html',
                    controller: 'editUserController',
                    'controllerAs': 'editUserCtrl',
                    resolve: {
                        UserRoleByIdPrepService: UserRoleByIdPrepService,
                        EditUserPrepService: EditUserPrepService,
                    },
                    data: {
                        permissions: {
                           // only: ['12', '16', '17', '18', '22', '21'],
                            redirectTo: 'root'
                        }
                    }

                })
                // Rple
                .state('Role', {
                    url: '/Role',
                    templateUrl: './app/GlobalAdmin/Role/templates/Role.html',
                    controller: 'RoleController',
                    'controllerAs': 'RoleCtrl',
                    resolve: {
                        RolePrepService: RolePrepService
                    },
                    data: {
                        permissions: {
                          //  only: ['11'],
                            redirectTo: 'root'
                        }
                    }
                })
                .state('newRole', {
                    url: '/newRole',
                    templateUrl: './app/GlobalAdmin/Role/templates/new.html',
                    controller: 'createRoleDialogController',
                    'controllerAs': 'newRoleCtrl',
                    resolve: {
                        PermissionPrepService: PermissionPrepService
                    },
                    data: {
                        permissions: {
                          //  only: ['11'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editRole', {
                    url: '/editRole/:name',
                    templateUrl: './app/GlobalAdmin/Role/templates/edit.html',
                    controller: 'editRoleDialogController',
                    'controllerAs': 'editRoleCtrl',
                    resolve: {
                        RoleByIdPrepService: RoleByIdPrepService,
                        // PermissionPrepService: PermissionPrepService,
                        // ModulePrepService: ModulePrepService
                    },
                    data: {
                        permissions: {
                          //  only: ['11'],
                            redirectTo: 'root'
                        }
                    }

                })
                // News
                .state('News', {
                    url: '/News',
                    templateUrl: './app/GlobalAdmin/News/templates/News.html',
                    controller: 'NewsController',
                    'controllerAs': 'NewsCtrl',
                    resolve: {
                        //  NewsPrepService: NewsPrepService
                    },
                    data: {
                        permissions: {
                         //   only: ['1'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newNews', {
                    url: '/newNews',
                    templateUrl: './app/GlobalAdmin/News/templates/new.html',
                    controller: 'createNewsDialogController',
                    'controllerAs': 'newNewsCtrl',
                    resolve: {
                    },
                    data: {
                        permissions: {
                          //  only: ['1'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editNews', {
                    url: '/editnews/:id',
                    templateUrl: './app/GlobalAdmin/News/templates/edit.html',
                    controller: 'editNewsDialogController',
                    'controllerAs': 'editNewsCtrl',
                    resolve: {
                        NewsByIdPrepService: NewsByIdPrepService,
                    },
                    data: {
                        permissions: {
                        //    only: ['1'],
                            redirectTo: 'root'
                        }
                    }

                })
                // Dashboard
                .state('Dashboard', {
                    url: '/Dashboard',
                    templateUrl: './app/GlobalAdmin/dashboard/templates/dashboard.html',
                    controller: 'dashboardController',
                    'controllerAs': 'dashboardCtrl',
                    resolve: {
                        //CountriesPrepService: CountriesPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['10'],
                            redirectTo: 'root'
                        }
                    }
                })
        })


    /*User */
    userPrepService.$inject = ['UserResource']
    function userPrepService(UserResource) {
        return UserResource.getAllUsers().$promise;
    }

    EditUserPrepService.$inject = ['UserResource', '$stateParams']
    function EditUserPrepService(GetUserResource, $stateParams) {
        return GetUserResource.getUser({ userId: $stateParams.userId }).$promise;
    }
    /*Role */
    RolePrepService.$inject = ['RoleResource']
    function RolePrepService(RoleResource) {
        return RoleResource.getAllRoles().$promise;
    }
    RoleByIdPrepService.$inject = ['RoleResource', '$stateParams']
    function RoleByIdPrepService(RoleResource, $stateParams) {
        return RoleResource.getRole({ roleName: $stateParams.name }).$promise;
    }

    PermissionPrepService.$inject = ['RoleResource']
    function PermissionPrepService(RoleResource) {
        return RoleResource.getAllPermissions().$promise;
    }

    ModulePrepService.$inject = ['RoleResource']
    function ModulePrepService(RoleResource) {
        return RoleResource.getAllModules().$promise;
    }
    /*News */
    NewsPrepService.$inject = ['NewsResource']
    function NewsPrepService(NewsResource) {
        return NewsResource.getAllNewss({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    NewssPrepService.$inject = ['NewsResource']
    function NewssPrepService(NewsResource) {
        return NewsResource.getAllNewss().$promise;
    }
    NewsByIdPrepService.$inject = ['NewsResource', '$stateParams']
    function NewsByIdPrepService(NewsResource, $stateParams) {
        return NewsResource.getNews({ id: $stateParams.id }).$promise;
    }

    // area for user
    AreasForUserPrepService.$inject = ['AreaResource', '$stateParams']
    function AreasForUserPrepService(AreaResource, $stateParams) {
        return AreaResource.getAllAreasForUser({ userId: $stateParams.userId }).$promise;
    }
    UserRoleByIdPrepService.$inject = ['UserResource', '$stateParams']
    function UserRoleByIdPrepService(UserResource, $stateParams) {
        return UserResource.getUserRole({ name: $stateParams.name }).$promise;
    }

}());
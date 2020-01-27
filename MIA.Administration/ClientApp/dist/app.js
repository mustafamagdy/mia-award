(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('users', {
                    url: '/users',
                    templateUrl: './app/GlobalAdmin/user/templates/user.html',
                    controller: 'userController',
                    'controllerAs': 'userCtrl',
                    data: {
                        permissions: {
                            only: ['12'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('addUser', {
                    url: '/addUser/:tenantId/:userType/:userId',
                    templateUrl: './app/GlobalAdmin/user/templates/addUser.html',
                    controller: 'addUserController',
                    'controllerAs': 'addUserCtrl',
                    resolve: {
                        UserRoleByIdPrepService: UserRoleByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['12', '16', '17', '18'],
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
                            only: ['12', '16', '17', '18', '22', '21'],
                            redirectTo: 'root'
                        }
                    }

                })
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
                            only: ['11'],
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
                            only: ['11'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editRole', {
                    url: '/editRole/:roleId',
                    templateUrl: './app/GlobalAdmin/Role/templates/edit.html',
                    controller: 'editRoleDialogController',
                    'controllerAs': 'editRoleCtrl',
                    resolve: {
                        RoleByIdPrepService: RoleByIdPrepService,
                        PermissionPrepService: PermissionPrepService
                    },
                    data: {
                        permissions: {
                            only: ['11'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('News', {
                    url: '/News',
                    templateUrl: './app/GlobalAdmin/News/templates/News.html',
                    controller: 'NewsController',
                    'controllerAs': 'NewsCtrl',
                    resolve: {
                    },
                    data: {
                        permissions: {
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
                            redirectTo: 'root'
                        }
                    }

                })
                .state('Dashboard', {
                    url: '/Dashboard',
                    templateUrl: './app/GlobalAdmin/dashboard/templates/dashboard.html',
                    controller: 'dashboardController',
                    'controllerAs': 'dashboardCtrl',
                    resolve: {
                    },
                    data: {
                        permissions: {
                            only: ['10'],
                            redirectTo: 'root'
                        }
                    }
                })
        })


    userPrepService.$inject = ['UserResource']
    function userPrepService(UserResource) {
        return UserResource.getAllUsers().$promise;
    }

    EditUserPrepService.$inject = ['UserResource', '$stateParams']
    function EditUserPrepService(GetUserResource, $stateParams) {
        return GetUserResource.getUser({ userId: $stateParams.userId }).$promise;
    }
    RolePrepService.$inject = ['RoleResource']
    function RolePrepService(RoleResource) {
        return RoleResource.getAllRoles().$promise;
    }
    RoleByIdPrepService.$inject = ['RoleResource', '$stateParams']
    function RoleByIdPrepService(RoleResource, $stateParams) {
        return RoleResource.getRole({ roleId: $stateParams.roleId }).$promise;
    }

    PermissionPrepService.$inject = ['RoleResource']
    function PermissionPrepService(RoleResource) {
        return RoleResource.getAllPermissions().$promise;
    }

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

    AreasForUserPrepService.$inject = ['AreaResource', '$stateParams']
    function AreasForUserPrepService(AreaResource, $stateParams) {
        return AreaResource.getAllAreasForUser({ userId: $stateParams.userId }).$promise;
    }
    UserRoleByIdPrepService.$inject = ['UserResource', '$stateParams']
    function UserRoleByIdPrepService(UserResource, $stateParams) {
        return UserResource.getUserRole({ userId: $stateParams.userId }).$promise;
    }

}());(function() {
    'use strict';

      angular
      .module('home')
      .config(config)
      .run(runBlock);

      config.$inject = ['ngProgressLiteProvider'];
    runBlock.$inject = ['$rootScope', 'ngProgressLite','$transitions','blockUI'];

      function config(ngProgressLiteProvider) {
      ngProgressLiteProvider.settings.speed = 1000;

      }

      function runBlock($rootScope, ngProgressLite,$transitions,blockUI) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          startProgress();
      });
      $transitions.onStart({}, function(transition) {
        blockUI.start("Loading..."); 
      });
      $transitions.onSuccess({}, function(transition) {
        blockUI.stop();
      });
      $transitions.onError({  }, function(transition) {
        blockUI.stop();
      });
      var routingDoneEvents = ['$stateChangeSuccess', '$stateChangeError', '$stateNotFound'];

        angular.forEach(routingDoneEvents, function(event) {
        $rootScope.$on(event, function(event, toState, toParams, fromState, fromParams) {
          endProgress();
        });
      });

        function startProgress() {
        ngProgressLite.start();
      }

        function endProgress() {
        ngProgressLite.done();
      }

      }
  })();
  (function () {
    'use strict';

    angular
        .module('home')
        .controller('ArtWorkController', ['appCONSTANTS', '$scope', '$translate', 'ArtWorkResource', 'blockUI', '$uibModal',
            'ToastService', ArtWorkController]);


    function ArtWorkController(appCONSTANTS, $scope, $translate, ArtWorkResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        debugger;
        refreshArtWorks();
        function refreshArtWorks() {
            blockUI.start("Loading...");

            var k = ArtWorkResource.getAllArtWorks({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                $scope.ArtWorkList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.ArtWorkList);
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(artWork, isDeleted) {
            var updateObj = new ArtWorkResource();
            updateObj.id = artWork.id;
            if (!isDeleted)
                updateObj.status = (artWork.status == true ? false : true);
            updateObj.isDeleted = artWork.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    refreshArtWorks();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    artWork.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateArtWork = function (artWork) {
            change(artWork, false);
        }

        function confirmationDelete(model) {
            var updateObj = new ArtWorkResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshArtWorks();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new ArtWorkResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshArtWorks();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('ArtWorkResource', ['$resource', 'appCONSTANTS', ArtWorkResource])

    function ArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            getAllArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/search', useToken: true, params: { lang: '@lang' } },
            getAllNominees: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/nominees', useToken: true, isArray: true, params: { lang: '@lang' } },
            getAllAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'Awards/search', useToken: true, params: { lang: '@lang' } },
            create: {
                method: 'POST', useToken: true,



            },
            update: {
                method: 'PUT', useToken: true,
                transformRequest: function (data) {
                    debugger;
                    if (data === undefined)
                        return data;

                    var fd = new FormData();
                    angular.forEach(data, function (value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function (file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            if (typeof value == "object" && typeof value.size == "number")
                                fd.append(key, value);
                            if (typeof value == "object") {
                                Object.keys(value).forEach(v => {
                                    fd.append(key, value[v]);
                                });
                            }
                            else
                                fd.append(key, value);

                        }
                    });
                    return fd;
                },
                headers: { 'Content-Type': undefined }
            },
            getArtWork: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ArtWork', {
                    url: '/ArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/ArtWork.html',
                    controller: 'ArtWorkController',
                    'controllerAs': 'ArtWorkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newArtWork', {
                    url: '/newArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/new.html',
                    controller: 'createArtWorkDialogController',
                    'controllerAs': 'newArtWorkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editArtWork', {
                    url: '/editArtWork/:countryId',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/edit.html',
                    controller: 'editArtWorkDialogController',
                    'controllerAs': 'editArtWorkCtrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ArtWorkPrepService.$inject = ['ArtWorkResource']
    function ArtWorkPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWork({ countryId: $stateParams.countryId }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkResource']
    function AllAwardPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', createArtWorkDialogController])

    function createArtWorkDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.awardList = [];
        vm.selectedAward = "";

        vm.nomineeList = [];
        vm.selectedNominee = "";
        refreshAwards();
        refreshNominees();
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ArtWork');
        }


        vm.AddNewArtWork = function () {
            debugger;
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Title = vm.Title;
            newObj.AwardId = vm.selectedAward.id;
            newObj.NomineeId = vm.selectedNominee.id;
            newObj.FileCount = vm.FileCount;

            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


        function refreshNominees() {

            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                debugger;
                vm.nomineeList = results;
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                });
        }

        function refreshAwards() {

            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                });
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkDialogController])

    function editArtWorkDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
     debugger; 

        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.UpdateArtWork = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.title = vm.ArtWork.title;
            updateObj.body = vm.ArtWork.body;
            if ($scope.file != null) {
                updateObj.Poster = $scope.file;

            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('ArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ArtWorkController', ['appCONSTANTS', '$scope', '$translate', 'ArtWorkResource', 'blockUI', '$uibModal',
            'ToastService', ArtWorkController]);


    function ArtWorkController(appCONSTANTS, $scope, $translate, ArtWorkResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        debugger;
        refreshArtWorks();
        function refreshArtWorks() {
            blockUI.start("Loading...");

            var k = ArtWorkResource.getAllArtWorks({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                $scope.ArtWorkList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.ArtWorkList);
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(artWork, isDeleted) {
            var updateObj = new ArtWorkResource();
            updateObj.id = artWork.id;
            if (!isDeleted)
                updateObj.status = (artWork.status == true ? false : true);
            updateObj.isDeleted = artWork.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    refreshArtWorks();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    artWork.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateArtWork = function (artWork) {
            change(artWork, false);
        }

        function confirmationDelete(model) {
            var updateObj = new ArtWorkResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshArtWorks();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new ArtWorkResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshArtWorks();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('ArtWorkResource', ['$resource', 'appCONSTANTS', ArtWorkResource])

    function ArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            getAllArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/search', useToken: true, params: { lang: '@lang' } },
            getAllNominees: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/nominees', useToken: true, isArray: true, params: { lang: '@lang' } },
            getAllAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'Awards/search', useToken: true, params: { lang: '@lang' } },
            create: {
                method: 'POST', useToken: true,



            },
            update: {
                method: 'PUT', useToken: true,
                transformRequest: function (data) {
                    debugger;
                    if (data === undefined)
                        return data;

                    var fd = new FormData();
                    angular.forEach(data, function (value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function (file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            if (typeof value == "object" && typeof value.size == "number")
                                fd.append(key, value);
                            if (typeof value == "object") {
                                Object.keys(value).forEach(v => {
                                    fd.append(key, value[v]);
                                });
                            }
                            else
                                fd.append(key, value);

                        }
                    });
                    return fd;
                },
                headers: { 'Content-Type': undefined }
            },
            getArtWork: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ArtWork', {
                    url: '/ArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/ArtWork.html',
                    controller: 'ArtWorkController',
                    'controllerAs': 'ArtWorkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newArtWork', {
                    url: '/newArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/new.html',
                    controller: 'createArtWorkDialogController',
                    'controllerAs': 'newArtWorkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editArtWork', {
                    url: '/editArtWork/:countryId',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/edit.html',
                    controller: 'editArtWorkDialogController',
                    'controllerAs': 'editArtWorkCtrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ArtWorkPrepService.$inject = ['ArtWorkResource']
    function ArtWorkPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWork({ countryId: $stateParams.countryId }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkResource']
    function AllAwardPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', createArtWorkDialogController])

    function createArtWorkDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.awardList = [];
        vm.selectedAward = "";

        vm.nomineeList = [];
        vm.selectedNominee = "";
        refreshAwards();
        refreshNominees();
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ArtWork');
        }


        vm.AddNewArtWork = function () {
            debugger;
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Title = vm.Title;
            newObj.AwardId = vm.selectedAward.id;
            newObj.NomineeId = vm.selectedNominee.id;
            newObj.FileCount = vm.FileCount;

            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


        function refreshNominees() {

            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                debugger;
                vm.nomineeList = results;
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                });
        }

        function refreshAwards() {

            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                });
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkDialogController])

    function editArtWorkDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
     debugger; 

        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.UpdateArtWork = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.title = vm.ArtWork.title;
            updateObj.body = vm.ArtWork.body;
            if ($scope.file != null) {
                updateObj.Poster = $scope.file;

            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('ArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ArtWorkController', ['appCONSTANTS', '$scope', '$translate', 'ArtWorkResource', 'blockUI', '$uibModal',
            'ToastService', ArtWorkController]);


    function ArtWorkController(appCONSTANTS, $scope, $translate, ArtWorkResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        debugger;
        refreshArtWorks();
        function refreshArtWorks() {
            blockUI.start("Loading...");

            var k = ArtWorkResource.getAllArtWorks({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                $scope.ArtWorkList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.ArtWorkList);
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(artWork, isDeleted) {
            var updateObj = new ArtWorkResource();
            updateObj.id = artWork.id;
            if (!isDeleted)
                updateObj.status = (artWork.status == true ? false : true);
            updateObj.isDeleted = artWork.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    refreshArtWorks();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    artWork.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateArtWork = function (artWork) {
            change(artWork, false);
        }

        function confirmationDelete(model) {
            var updateObj = new ArtWorkResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshArtWorks();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new ArtWorkResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshArtWorks();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('ArtWorkResource', ['$resource', 'appCONSTANTS', ArtWorkResource])

    function ArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            getAllArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/search', useToken: true, params: { lang: '@lang' } },
            getAllNominees: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/nominees', useToken: true, isArray: true, params: { lang: '@lang' } },
            getAllAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'Awards/search', useToken: true, params: { lang: '@lang' } },
            create: {
                method: 'POST', useToken: true,



            },
            update: {
                method: 'PUT', useToken: true,
                transformRequest: function (data) {
                    debugger;
                    if (data === undefined)
                        return data;

                    var fd = new FormData();
                    angular.forEach(data, function (value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function (file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            if (typeof value == "object" && typeof value.size == "number")
                                fd.append(key, value);
                            if (typeof value == "object") {
                                Object.keys(value).forEach(v => {
                                    fd.append(key, value[v]);
                                });
                            }
                            else
                                fd.append(key, value);

                        }
                    });
                    return fd;
                },
                headers: { 'Content-Type': undefined }
            },
            getArtWork: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ArtWork', {
                    url: '/ArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/ArtWork.html',
                    controller: 'ArtWorkController',
                    'controllerAs': 'ArtWorkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newArtWork', {
                    url: '/newArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/new.html',
                    controller: 'createArtWorkDialogController',
                    'controllerAs': 'newArtWorkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editArtWork', {
                    url: '/editArtWork/:countryId',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/edit.html',
                    controller: 'editArtWorkDialogController',
                    'controllerAs': 'editArtWorkCtrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ArtWorkPrepService.$inject = ['ArtWorkResource']
    function ArtWorkPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWork({ countryId: $stateParams.countryId }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkResource']
    function AllAwardPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', createArtWorkDialogController])

    function createArtWorkDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.awardList = [];
        vm.selectedAward = "";

        vm.nomineeList = [];
        vm.selectedNominee = "";
        refreshAwards();
        refreshNominees();
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ArtWork');
        }


        vm.AddNewArtWork = function () {
            debugger;
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Title = vm.Title;
            newObj.AwardId = vm.selectedAward.id;
            newObj.NomineeId = vm.selectedNominee.id;
            newObj.FileCount = vm.FileCount;

            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


        function refreshNominees() {

            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                debugger;
                vm.nomineeList = results;
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                });
        }

        function refreshAwards() {

            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                });
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkDialogController])

    function editArtWorkDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
     debugger; 

        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.UpdateArtWork = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.title = vm.ArtWork.title;
            updateObj.body = vm.ArtWork.body;
            if ($scope.file != null) {
                updateObj.Poster = $scope.file;

            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('ArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('NewsController', ['appCONSTANTS', '$scope', '$translate', 'NewsResource', 'blockUI', '$uibModal',
            'ToastService', NewsController]);


    function NewsController(appCONSTANTS, $scope, $translate, NewsResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshNewss();
        function refreshNewss() {
            blockUI.start("Loading...");

            var k = NewsResource.getAllNewss({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                $scope.NewsList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.NewsList);
                blockUI.stop();

            },
                function (data, status) {
                debugger;
                blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(news, isDeleted) {
            var updateObj = new NewsResource();
            updateObj.id = news.id;
            if (!isDeleted)
                updateObj.status = (news.status == true ? false : true);
            updateObj.isDeleted = news.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    refreshNewss();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    news.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateNews = function (news) {
            change(news, false);
        }

        function confirmationDelete(model) {
            var updateObj = new NewsResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshNewss();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new NewsResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshNewss();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('NewsResource', ['$resource', 'appCONSTANTS', NewsResource])

    function NewsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'news', {}, {
            getAllNewss: { method: 'POST', url: appCONSTANTS.API_URL + 'news/search', useToken: true, params: { lang: '@lang' } },
            create: {
                method: 'POST', useToken: true,
                transformRequest: function (data) {
                    if (data === undefined)
                        return data;

                    var fd = new FormData();
                    angular.forEach(data, function (value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function (file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            if (typeof value == "object" && typeof value.size == "number")
                                fd.append(key, value);
                            if (typeof value == "object") {
                                Object.keys(value).forEach(v => {
                                    fd.append(key, value[v]);
                                });
                            }
                            else
                                fd.append(key, value);

                        }
                    });

                    return fd;
                },
                headers: { 'Content-Type': undefined }
            },
            update: {
                method: 'PUT', useToken: true,
                transformRequest: function (data) {
                    debugger;
                    if (data === undefined)
                        return data;

                    var fd = new FormData();
                    angular.forEach(data, function (value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function (file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            if (typeof value == "object" && typeof value.size == "number")
                                fd.append(key, value);
                            if (typeof value == "object") {
                                Object.keys(value).forEach(v => {
                                    fd.append(key, value[v]);
                                });
                            }
                            else
                                fd.append(key, value);

                        }
                    });
                    return fd;
                },
                headers: { 'Content-Type': undefined }
            },
            getNews: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'news/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .directive('imgUpload', ['$rootScope', function (rootScope) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var canvas = document.createElement("canvas");
                    var extensions = 'jpeg ,jpg, png, gif';
                    rootScope.isValid = true;

                        elem.on('change', function () {
                        reader.readAsDataURL(elem[0].files[0]);
                        var filename = elem[0].files[0].name;
                        debugger;
                        var extensionlist = filename.split('.');
                        rootScope.imageType = extensionlist[1];

                            var extension = extensionlist[extensionlist.length - 1];
                        if (extensions.indexOf(extension) == -1) {
                            alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp' are allowed.");
                            scope.imageName = null;
                            rootScope.isValid = false;
                        } else {
                            scope.file = elem[0].files[0];
                            scope.imageName = filename;
                            rootScope.isValid = true;
                        }
                    });

                        var reader = new FileReader();

                    reader.onload = function (e) {
                        debugger;
                        if (rootScope.isValid == false) {
                            rootScope.image = null;
                            scope.$apply();
                        }
                        else {
                            rootScope.image = e.target.result;
                            scope.$apply();
                        }
                    }
                }
            }
        }])
         .controller('createNewsDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', '$rootScope', createNewsDialogController])

    function createNewsDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, $rootScope) {
        var vm = this;
        $rootScope.image = null;

        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('News');
        }


        vm.AddNewNews = function () {
            blockUI.start("Loading...");
            var newObj = new NewsResource();
            newObj.Title = vm.titleDictionary;
            newObj.Body = vm.bodyDictionary;
            newObj.Poster = $scope.file;

            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('News');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editNewsDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', 'NewsByIdPrepService', editNewsDialogController])

    function editNewsDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, NewsByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.News = NewsByIdPrepService;
     debugger;
        $rootScope.image = vm.News.posterUrl;

        vm.Close = function () {
            $state.go('News');
        }
        vm.UpdateNews = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new NewsResource();
            updateObj.Id = vm.News.id;
            updateObj.title = vm.News.title;
            updateObj.body = vm.News.body;
            if ($scope.file != null) {
                updateObj.Poster = $scope.file;

            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('News');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createRoleDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'RoleResource', 'ToastService', '$rootScope', 'PermissionPrepService', createRoleDialogController])

    function createRoleDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, RoleResource,
        ToastService, $rootScope, PermissionPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        $scope.permissionList = PermissionPrepService 
        vm.selectedModuleList = [];
        vm.selectedModule = "";
        vm.selectedPermissions = [];
        vm.ChangeSelectedModule = function () {
            angular.forEach(vm.selectedModule, function (value, key) {
                angular.forEach(value.permessions, function (valuePermission, key1) {
                    if (vm.selectedModuleList != 0) {
                        if (!vm.selectedModuleList.includes(valuePermission)) {
                            vm.selectedModuleList.push(valuePermission);
                        }

                    }
                    else
                        vm.selectedModuleList.push(valuePermission);

                });
            });

         }

         vm.close = function () {
            $state.go('Role');
        }

        vm.AddNewRole = function () {
            blockUI.start("Loading...");

            var newObj = new RoleResource();
            newObj.titles = vm.titles;
            newObj.roles = vm.selectedPermissions;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Role');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editRoleDialogController', ['blockUI', '$filter', '$state',
            'appCONSTANTS', '$translate', 'RoleResource', 'PermissionPrepService', 'ToastService',
            'RoleByIdPrepService', editRoleDialogController])

    function editRoleDialogController(blockUI, $filter, $state, appCONSTANTS, $translate, RoleResource,
        PermissionPrepService, ToastService, RoleByIdPrepService) {
        var vm = this;

        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.language = appCONSTANTS.supportedLanguage;
        vm.permissionList = PermissionPrepService;
        vm.Role = RoleByIdPrepService;
        console.log(RoleByIdPrepService);
        vm.selectedPermissions = [];

        var i;
        for (i = 0; i < vm.Role.permessionTree.length; i++) {

                        angular.forEach(vm.Role.permessionTree[i].permessions, function (valueModule, keyModule) {
                if (valueModule.seclected)
                    vm.selectedPermissions.push(valueModule.permessionId);
            });

        }
        vm.UpdateRole = function () {

                        blockUI.start("Loading...");
            console.log(vm.Role);
            var updateObj = new RoleResource();
            updateObj.roleId = vm.Role.userGroupId;
            updateObj.roles = vm.selectedPermissions;
            updateObj.titles = vm.Role.titles;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('Role');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.selectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.selectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.selectedPermissions.indexOf(obj.permessionId);
                vm.selectedPermissions.splice(index, 1);
            }
        }
        vm.ChangeSelectedModule = function () {
            angular.forEach(vm.selectedModule, function (value, key) {
                angular.forEach(value.permessions, function (valuePermission, key1) {
                    if (vm.selectedModuleList != 0) {
                        if (!vm.selectedModuleList.includes(valuePermission)) {
                            vm.selectedModuleList.push(valuePermission);
                        }

                    }
                    else
                        vm.selectedModuleList.push(valuePermission);

                });
            });

        }
        vm.Close = function () {
            $state.go('Role');
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('RoleController', ['blockUI', '$scope', '$translate', 'RoleResource', 'RolePrepService',
            'ToastService', '$uibModal', RoleController]);


    function RoleController(blockUI, $scope, $translate, RoleResource, RolePrepService, ToastService, $uibModal) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;

        $scope.totalCount = RolePrepService.totalCount;
        $scope.RoleList = RolePrepService;
        console.log($scope.RoleList)
        function refreshRoles() {
            blockUI.start("Loading...");

            var k = RoleResource.getAllRoles({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.RoleList = results;
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                          var updateObj = new RoleResource();
              updateObj.roleId = model.userGroupId;
              updateObj.status = (model.isActive == true ? false : true);
              updateObj.$changeStatus({ roleId: model.userGroupId, status: updateObj.status }).then(
                  function (data, status) {
                      refreshRoles();
                      ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                      updateObj.status = model.isActive;
                  },
                  function (data, status) {
                      ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                  }
              );
              return;
          }

        function confirmationDelete(model) {

                        var deleteObj = new RoleResource();
            deleteObj.roleId = model.userGroupId;
            deleteObj.$delete({ roleId : model.userGroupId }).then(
                function (data, status) {
                    refreshRoles();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeleteSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {

                        var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }


        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshRoles();
        }
        blockUI.stop();

    }

})();(function () {
    angular
        .module('home')
        .factory('RoleResource', ['$resource', 'appCONSTANTS', RoleResource])

    function RoleResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Role/CreateRole', {}, {
            getAllRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/GetAllRoles', useToken: true },
            getAllActivateRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'Roles/GetAllActivateRoles', useToken: true, params: { lang: '@lang' } },
            getAllPermissions: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/PermessionTree', isArray: true, useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/UpdateRole', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Role/Delete/:roleId', useToken: true },
            getRole: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/GetRoleById/:roleId', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/ChangeStatus/:roleId/:status', useToken: true },

        })
    } 
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('dashboardController', ['blockUI', '$scope', '$state',
            '$translate', 'dashboardResource', 'QuestionResource', 'TicketDashboardPrepService',
            'AnswerQuestionPrepService', '$filter', 'allcategoryTypePrepService', 'AnswerQuestionResource', 'CountriesPrepService',
            'BranchManagerPrepService', 'TechnasianPrepService', 'DepartmentPrepService',
            'GovernrateResource', 'CityResource', 'AreaResource', 'UsersAnswersQuestionPrepService', dashboardController]);

    function dashboardController(blockUI, $scope, $state,
        $translate, dashboardResource, QuestionResource, TicketDashboardPrepService,
        AnswerQuestionPrepService, $filter, allcategoryTypePrepService, AnswerQuestionResource, CountriesPrepService,
        BranchManagerPrepService, TechnasianPrepService, DepartmentPrepService,
        GovernrateResource, CityResource, AreaResource, UsersAnswersQuestionPrepService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[10].children[0]).addClass("active")
        blockUI.start("Loading...");

        var Manufacture = this;

        function init() {
            Manufacture.ticketsFilter = [
                {
                    name: $translate.instant('Country'),
                    value: "country"
                },
                {
                    name: $translate.instant('Governrate'),
                    value: "Governrate"
                },
                {
                    name: $translate.instant('City'),
                    value: "city"
                },
                {
                    name: $translate.instant('Area'),
                    value: "area"
                },
                {
                    name: $translate.instant('Branch'),
                    value: "branch"
                },
                {
                    name: $translate.instant('Department'),
                    value: "department"
                },
                {
                    name: $translate.instant('CategoryLbl'),
                    value: "category"
                }
            ]
            Manufacture.selectedTicketFilter = "branch"
            Manufacture.options = {
                chart: {
                    type: 'multiBarChart',
                    height: 300,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 65,
                        left: 50
                    },
                    stacked: true,

                    duration: 100,
                    xAxis: {
                        rotateLabels: 30
                    },
                    yAxis: {
                        axisLabel: $translate.instant('ticketsCount'),
                        axisLabelDistance: -10,

                    }
                }
            };
            loadTicketDashboard(TicketDashboardPrepService);
            Manufacture.questionList = AnswerQuestionPrepService.results;
            Manufacture.categoryTypes = [];
            Manufacture.selectedCategoryType = { categoryTypeId: 0, titleDictionary: { "en": "All", "ar": "كل" } };
            Manufacture.categoryTypes.push(Manufacture.selectedCategoryType);
            Manufacture.categoryTypes = Manufacture.categoryTypes.concat(allcategoryTypePrepService.results)

            Manufacture.countiesSurvey = [];
            Manufacture.selectedCountrySurvey = { countryId: 0, titleDictionary: { "en": "All Countries", "ar": "كل البلاد" } };
            Manufacture.countiesSurvey.push(Manufacture.selectedCountrySurvey);
            Manufacture.countiesSurvey = Manufacture.countiesSurvey.concat(CountriesPrepService.results)

            Manufacture.selectedGovernrateSurvey = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.GovernratesSurvey = [];
            Manufacture.GovernratesSurvey.push(Manufacture.selectedGovernrateSurvey);
            Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.citiesSurvey = [];
            Manufacture.citiesSurvey.push(Manufacture.selectedCitySurvey);
            Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.areaListSurvey = [];
            Manufacture.areaListSurvey.push(Manufacture.selectedAreaSurvey);
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey = [];
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);

            Manufacture.selectedDepartmentSurvey = { departmentId: 0, titleDictionary: { "en": "All Departments", "ar": "كل الاقسام" } };
            Manufacture.departmentsSurvey = [];
            Manufacture.departmentsSurvey.push(Manufacture.selectedDepartmentSurvey);
            Manufacture.departmentsSurvey = Manufacture.departmentsSurvey.concat(DepartmentPrepService.results)
            Manufacture.selectedCategorySurvey = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categoriesSurvey = [];
            Manufacture.categoriesSurvey.push(Manufacture.selectedCategorySurvey);

            Manufacture.selectedAnswersUser = { userId: 0, userName: $translate.instant('allUsers') };
            Manufacture.AnswersUsers = [];
            Manufacture.AnswersUsers.push(Manufacture.selectedAnswersUser);
            Manufacture.AnswersUsers = Manufacture.AnswersUsers.concat(UsersAnswersQuestionPrepService)

            Manufacture.counties = [];
            Manufacture.selectedCountry = { countryId: 0, titleDictionary: { "en": "All Countries", "ar": "كل البلاد" } };
            Manufacture.counties.push(Manufacture.selectedCountry);
            Manufacture.counties = Manufacture.counties.concat(CountriesPrepService.results)

            Manufacture.selectedGovernrate = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.Governrates = [];
            Manufacture.Governrates.push(Manufacture.selectedGovernrate);
            Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.cities = [];
            Manufacture.cities.push(Manufacture.selectedCity);
            Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.areaList = [];
            Manufacture.areaList.push(Manufacture.selectedArea);
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList = [];
            Manufacture.branchList.push(Manufacture.selectedBranch);

            Manufacture.selectedDepartment = { departmentId: 0, titleDictionary: { "en": "All Departments", "ar": "كل الاقسام" } };
            Manufacture.departments = [];
            Manufacture.departments.push(Manufacture.selectedDepartment);
            Manufacture.departments = Manufacture.departments.concat(DepartmentPrepService.results)
            Manufacture.selectedCategory = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categories = [];
            Manufacture.categories.push(Manufacture.selectedCategory);

            Manufacture.selectedBranchManager = { userId: 0, userName: $translate.instant('allBranchesM') };
            Manufacture.BranchManagers = [];
            Manufacture.BranchManagers.push(Manufacture.selectedBranchManager);
            Manufacture.BranchManagers = Manufacture.BranchManagers.concat(BranchManagerPrepService.results)
            Manufacture.selectedTechnician = { userId: 0, userName: $translate.instant('allTechnasian') };
            Manufacture.Technicians = [];
            Manufacture.Technicians.push(Manufacture.selectedTechnician);
            Manufacture.Technicians = Manufacture.Technicians.concat(TechnasianPrepService.results)

        }
        Manufacture.countryChange = function () {
            Manufacture.selectedGovernrate = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.Governrates = [];
            Manufacture.cities = [Manufacture.selectedCity];
            Manufacture.areaList = [Manufacture.selectedArea];
            Manufacture.Governrates.push(Manufacture.selectedGovernrate);

            Manufacture.branchList = [];
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList.push(Manufacture.selectedBranch);
            GovernrateResource.getAllGovernrates({ countryId: Manufacture.selectedCountry.countryId, pageSize: 0 }).$promise.then(function (results) {

                Manufacture.Governrates = Manufacture.Governrates.concat(results.results);
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            blockUI.stop();
        }
        Manufacture.GovernrateChange = function () {
            if (Manufacture.selectedGovernrate.GovernrateId != undefined) {
                Manufacture.cities = [];
                Manufacture.areaList = [];
                Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
                Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.cities.push(Manufacture.selectedCity);
                Manufacture.areaList = [Manufacture.selectedArea];

                Manufacture.branchList = [];
                Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchList.push(Manufacture.selectedBranch);
                CityResource.getAllCities({ GovernrateId: Manufacture.selectedGovernrate.GovernrateId, pageSize: 0 }).$promise.then(function (results) {

                    Manufacture.cities = Manufacture.cities.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.cityChange = function () {
            if (Manufacture.selectedCity.cityId != undefined) {
                Manufacture.areaList = [];
                Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.areaList.push(Manufacture.selectedArea);

                Manufacture.branchList = [];
                Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchList.push(Manufacture.selectedBranch);
                AreaResource.getAllAreas({ cityId: Manufacture.selectedCity.cityId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.areaList = Manufacture.areaList.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.areaChange = function () {
            Manufacture.branchList = [];
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList.push(Manufacture.selectedBranch);
            if (Manufacture.selectedArea.areaId > 0)
                Manufacture.branchList = Manufacture.branchList.concat(Manufacture.selectedArea.branches);
        }

        Manufacture.departmentChange = function () {

            Manufacture.categories = [];
            Manufacture.selectedCategory = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categories.push(Manufacture.selectedCategory);
            if (Manufacture.selectedDepartment.departmentId > 0)
                Manufacture.categories = Manufacture.categories.concat(Manufacture.selectedDepartment.categories);
        }
        Manufacture.countryId = 0;
        Manufacture.GovernrateId = 0;
        Manufacture.cityId = 0;
        Manufacture.areaId = 0;
        Manufacture.branchId = 0;
        Manufacture.departmentId = 0;
        Manufacture.categoryId = 0;

        Manufacture.branchManagerId = 0;
        Manufacture.technasianId = 0;
        Manufacture.from = "";
        Manufacture.to = "";
        Manufacture.applyFilter = function () {
            Manufacture.from = ""
            if ($('#fromdate').val() != "") {
                var fromDate = $('#fromdate').val().split('/')
                Manufacture.from = (new Date(fromDate[1] + "/" + fromDate[0] + "/" + fromDate[2])).toISOString().replace('Z', '');
            }
            Manufacture.to = ""
            if ($('#todate').val() != "") {
                var toDate = $('#todate').val().split('/')
                Manufacture.to = (new Date(toDate[1] + "/" + toDate[0] + "/" + toDate[2])).toISOString().replace('Z', '');
            }
            Manufacture.countryId = Manufacture.selectedCountry.countryId;
            Manufacture.GovernrateId = Manufacture.selectedGovernrate.GovernrateId;
            Manufacture.cityId = Manufacture.selectedCity.cityId;
            Manufacture.areaId = Manufacture.selectedArea.areaId;
            Manufacture.branchId = Manufacture.selectedBranch.branchId;
            Manufacture.branchManagerId = Manufacture.selectedBranchManager.userId;
            Manufacture.technasianId = Manufacture.selectedTechnician.userId;

            Manufacture.departmentId = Manufacture.selectedDepartment.departmentId;
            Manufacture.categoryId = Manufacture.selectedCategory.categoryId;
            Manufacture.status = Manufacture.selectedStatus;
            Manufacture.ticketFilterChange()
        }
        function loadTicketDashboard(tickets) {
            var assigned = [];
            var closed = [];
            var InProgress = [];
            var Pending = [];
            var Rejected = [];
            var Reassigned = [];
            var complete = [];
            tickets.forEach(function (element) {
                assigned.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.assignedCount
                })
                InProgress.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.inProgressCount
                })
                Pending.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.pendingCount
                })
                Rejected.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.rejectedCount
                })
                closed.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.closedCount
                })
                Reassigned.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.reassignedCount
                })
                complete.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.completedCount
                })
            }, this);
            Manufacture.data = [
                {
                    "key": $translate.instant('AssignedStatus'),
                    "values": assigned
                },
                {
                    "key": $translate.instant('InProgressStatus'),
                    "values": InProgress
                },
                {
                    "key": $translate.instant('Pending'),
                    "values": Pending
                },
                {
                    "key": $translate.instant('RejectedStatus'),
                    "values": Rejected
                },
                {
                    "key": $translate.instant('ClosedStatus'),
                    "values": closed
                },
                {
                    "key": $translate.instant('Reassigned'),
                    "values": Reassigned
                },
                {
                    "key": $translate.instant('completed'),
                    "values": complete
                }
            ];
        }
        init();

        Manufacture.ticketFilterChange = function () {
            dashboardResource.getTicketsDashboard({
                xaxis: Manufacture.selectedTicketFilter,
                countryId: Manufacture.countryId, GovernrateId: Manufacture.GovernrateId, cityId: Manufacture.cityId,
                areaId: Manufacture.areaId, branchId: Manufacture.branchId, from: Manufacture.from, to: Manufacture.to,
                departmentId: Manufacture.departmentId, categoryId: Manufacture.categoryId,
                branchManagerId: Manufacture.branchManagerId, technasianId: Manufacture.technasianId,
                status: Manufacture.status
            }).$promise
                .then(function (results) {
                    loadTicketDashboard(results)
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        Manufacture.countrySurveyChange = function () {
            Manufacture.selectedGovernrateSurvey = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.GovernratesSurvey = [];
            Manufacture.citiesSurvey = [Manufacture.selectedCitySurvey];
            Manufacture.areaListSurvey = [Manufacture.selectedAreaSurvey];
            Manufacture.GovernratesSurvey.push(Manufacture.selectedGovernrateSurvey);

            Manufacture.branchListSurvey = [];
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
            GovernrateResource.getAllGovernrates({ countryId: Manufacture.selectedCountrySurvey.countryId, pageSize: 0 }).$promise.then(function (results) {

                Manufacture.GovernratesSurvey = Manufacture.GovernratesSurvey.concat(results.results);
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            blockUI.stop();
        }
        Manufacture.GovernrateSurveyChange = function () {
            if (Manufacture.selectedGovernrateSurvey.GovernrateId != undefined) {
                Manufacture.citiesSurvey = [];
                Manufacture.areaListSurvey = [];
                Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
                Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.citiesSurvey.push(Manufacture.selectedCitySurvey);
                Manufacture.areaListSurvey = [Manufacture.selectedAreaSurvey];

                Manufacture.branchListSurvey = [];
                Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
                CityResource.getAllCities({ GovernrateId: Manufacture.selectedGovernrateSurvey.GovernrateId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.citiesSurvey = Manufacture.citiesSurvey.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.citySurveyChange = function () {
            if (Manufacture.selectedCitySurvey.cityId != undefined) {
                Manufacture.areaListSurvey = [];
                Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.areaListSurvey.push(Manufacture.selectedAreaSurvey);

                Manufacture.branchListSurvey = [];
                Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
                AreaResource.getAllAreas({ cityId: Manufacture.selectedCitySurvey.cityId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.areaListSurvey = Manufacture.areaListSurvey.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.areaSurveyChange = function () {
            Manufacture.branchListSurvey = [];
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
            if (Manufacture.selectedAreaSurvey.areaId > 0)
                Manufacture.branchListSurvey = Manufacture.branchListSurvey.concat(Manufacture.selectedAreaSurvey.branches);
        }

        Manufacture.departmentSurveyChange = function () {
            Manufacture.categoriesSurvey = [];
            Manufacture.selectedCategorySurvey = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categoriesSurvey.push(Manufacture.selectedCategorySurvey);
            if (Manufacture.selectedDepartmentSurvey.departmentId > 0)
                Manufacture.categoriesSurvey = Manufacture.categoriesSurvey.concat(Manufacture.selectedDepartmentSurvey.categories);
        }
        Manufacture.countryIdSurvey = 0;
        Manufacture.GovernrateIdSurvey = 0;
        Manufacture.cityIdSurvey = 0;
        Manufacture.areaIdSurvey = 0;
        Manufacture.branchIdSurvey = 0;
        Manufacture.departmentIdSurvey = 0;
        Manufacture.categoryIdSurvey = 0;

        Manufacture.fromSurvey = "";
        Manufacture.toSurvey = "";

        Manufacture.applySurveyFilter = function () {
            blockUI.start("Loading...");
            Manufacture.fromSurvey = ""
            if ($('#fromdateSurvey').val() != "") {
                var fromDateSurvey = $('#fromdateSurvey').val().split('/')
                Manufacture.fromSurvey = (new Date(fromDateSurvey[1] + "/" + fromDateSurvey[0] + "/" + fromDateSurvey[2])).toISOString().replace('Z', '');
            }
            Manufacture.toSurvey = ""
            if ($('#todateSurvey').val() != "") {
                var toDateSurvey = $('#todateSurvey').val().split('/')
                Manufacture.toSurvey = (new Date(toDateSurvey[1] + "/" + toDateSurvey[0] + "/" + toDateSurvey[2])).toISOString().replace('Z', '');
            }
            Manufacture.countryIdSurvey = Manufacture.selectedCountrySurvey.countryId;
            Manufacture.GovernrateIdSurvey = Manufacture.selectedGovernrateSurvey.GovernrateId;
            Manufacture.cityIdSurvey = Manufacture.selectedCitySurvey.cityId;
            Manufacture.areaIdSurvey = Manufacture.selectedAreaSurvey.areaId;
            Manufacture.branchIdSurvey = Manufacture.selectedBranchSurvey.branchId;

            Manufacture.departmentIdSurvey = Manufacture.selectedDepartmentSurvey.departmentId;
            Manufacture.categoryIdSurvey = Manufacture.selectedCategorySurvey.categoryId;
            Manufacture.AnsweredBy = Manufacture.selectedAnswersUser.userId;

            AnswerQuestionResource.getAllQuestions({
                catgoryTypeId: Manufacture.selectedCategoryType.categoryTypeId,
                departmentId: Manufacture.departmentIdSurvey, categoryId: Manufacture.categoryIdSurvey
            }).$promise.then(function (results) {
                Manufacture.questionList = results.results;

                blockUI.stop();
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        Manufacture.getQuestionDashbard = function (question) {
            question.isloading = true;
            QuestionResource.getQuestionDashBoard({
                questionId: question.questionId,
                countryId: Manufacture.countryIdSurvey, GovernrateId: Manufacture.GovernrateIdSurvey, cityId: Manufacture.cityIdSurvey,
                areaId: Manufacture.areaIdSurvey, branchId: Manufacture.branchIdSurvey, from: Manufacture.fromSurvey, to: Manufacture.toSurvey,
                AnsweredBy: Manufacture.AnsweredBy
            }).$promise
                .then(function (results) {
                    question.dashboard = results;
                    question.isloading = false;
                    if (question.questionTypeId == 0) {
                        question.data = []
                        if (question.dashboard.optionsCount != undefined) {
                            for (var element in question.dashboard.optionsCount) {
                                question.data.push({
                                    key: ($filter('filter')(question.questionDetailses, { questionDetailsId: element }))[0].titleDictionary[$scope.selectedLanguage],
                                    y: question.dashboard.optionsCount[element]
                                })
                            }

                            question.options = {
                                chart: {
                                    type: 'pieChart',
                                    height: 350,
                                    x: function (d) { return d.key; },
                                    y: function (d) { return d.y; },
                                    showLabels: true,
                                    duration: 500,
                                    legend: {
                                        margin: {
                                            top: 5,
                                            right: 35,
                                            bottom: 5,
                                            left: 0
                                        }
                                    }
                                }
                            };
                        }
                    }
                    if (question.questionTypeId == 1) {
                        question.data = [
                            {
                                key: $translate.instant('onestar'),
                                y: question.dashboard.oneStartCount
                            },
                            {
                                key: $translate.instant('twostar'),
                                y: question.dashboard.twoStartCount
                            },
                            {
                                key: $translate.instant('threestar'),
                                y: question.dashboard.threeStartCount
                            },
                            {
                                key: $translate.instant('fourstar'),
                                y: question.dashboard.fourStartCount
                            },
                            {
                                key: $translate.instant('fivestar'),
                                y: question.dashboard.fiveStartCount
                            }
                        ]
                        question.options = {
                            chart: {
                                type: 'pieChart',
                                height: 350,
                                x: function (d) { return d.key; },
                                y: function (d) { return d.y; },
                                showLabels: true,
                                duration: 500,
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 35,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }
                        };
                    }
                    if (question.questionTypeId == 2) {
                        question.data = [
                            {
                                key: $translate.instant('LikeLbl'),
                                y: question.dashboard.likeCount
                            },
                            {
                                key: $translate.instant('DisLikeLbl'),
                                y: question.dashboard.disLikeCount
                            }
                        ]
                        question.options = {
                            chart: {
                                type: 'pieChart',
                                height: 300,
                                x: function (d) { return d.key; },
                                y: function (d) { return d.y; },
                                showLabels: true,
                                donut: true,
                                pie: {
                                    startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
                                    endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
                                },
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 35,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }
                        };
                    }
                },
                function (data, status) {
                    question.isloading = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();

        Manufacture.exportPDF = function(){

                        html2canvas(document.getElementById('surveyDiv')).then(function(canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        height:canvas.height,
                        width:500   
                    }],
                };
                pdfMake.createPdf(docDefinition).download("test.pdf");
            });
        }


    }

}());(function () {
    angular
        .module('home')
        .factory('dashboardResource', ['$resource', 'appCONSTANTS', dashboardResource])

    function dashboardResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Tickets/', {}, {
            getTicketsDashboard: { method: 'GET', url: appCONSTANTS.API_URL + 'Tickets/dashboard', useToken: true,isArray:true },
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBranchFeesController', ['$scope', 'blockUI', '$filter', '$translate',
            '$state', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', '$stateParams'
            , 'branchFeesPrepService' , '$uibModalInstance', 'BranchResource', editBranchFeesController]);


    function editBranchFeesController($scope, blockUI, $filter, $translate,
        $state, $localStorage, authorizationService, appCONSTANTS, ToastService, $stateParams,
        branchFeesPrepService, $uibModalInstance, BranchResource) {

        $scope.selectedLanguage = $localStorage.language;
        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        blockUI.stop();
        $scope.branch = branchFeesPrepService[0];

        Manufacture.close = function () {
            $uibModalInstance.dismiss();
        }


        Manufacture.UpdateFees = function () {
            var branch = new BranchResource();

                        branch.deliveryCost = $scope.branch.deliveryCost;
            branch.deliveryPrice = $scope.branch.deliveryPrice;
            branch.isFees = true;
            branch.branchId = $scope.branch.branchId;

            branch.$update().then(
                function (data, status) {
                    $uibModalInstance.dismiss();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('EditedSuccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('settingController', ['$rootScope', 'blockUI', '$scope', '$http', '$filter', '$translate',
            '$state', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', '$stateParams'
            , '$uibModal', 'settingsPrepService', 'BranchPrepService', 'AddSettingsResource', 'UpdateSettingsResource', settingController]);


    function settingController($rootScope, blockUI, $scope, $http, $filter, $translate,
        $state, $localStorage, authorizationService,
        appCONSTANTS, ToastService, $stateParams, $uibModal, settingsPrepService
        , BranchPrepService, AddSettingsResource, UpdateSettingsResource) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[14].children[0]).addClass("active")


        var Manufacture = this;
        $scope.settingsPrepService = settingsPrepService;
        console.log($scope.settingsPrepService);
        Manufacture.orderType = {
            type: 'item'
        };

        Manufacture.currency;
        Manufacture.minDays;
        Manufacture.maxPause;
        Manufacture.allowPause;
        Manufacture.allowHistory;
        Manufacture.programDiscount=$scope.settingsPrepService.programDiscount;

        if ($scope.settingsPrepService.isActive != undefined) {
            if ($scope.settingsPrepService.isSMS && $scope.settingsPrepService.isMail) {
                Manufacture.orderType.type = "both"
            }
            else if ($scope.settingsPrepService.isSMS) {
                Manufacture.orderType.type = "sms"
            }
            else if ($scope.settingsPrepService.isMail) {
                Manufacture.orderType.type = "mail"
            }
            else {
                Manufacture.orderType.type = "none"
            }

        }


        $scope.BranchPrepService = BranchPrepService;

        Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshAreas();
        }

        Manufacture.UpdateProgram = function (program) {
            change(program, false);
        }



        Manufacture.AddSetting = function () {
            blockUI.start("Loading...");

            var setting = new AddSettingsResource();

            if (Manufacture.orderType.type == "none") {
                setting.isSMS = false;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "sms") {
                setting.isSMS = true;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "mail") {
                setting.isSMS = false;
                setting.isMail = true;
            }
            else if (Manufacture.orderType.type == "both") {
                setting.isSMS = true;
                setting.isMail = true;
            }

            setting.isDeleted = false;
            setting.isPause = Manufacture.allowPause;

            if (Manufacture.allowPause == true) {
                setting.maxPauseDays = Manufacture.maxPause;
            }
            else if (Manufacture.allowPause == false) {
                setting.maxPauseDays = 0;
            }
            setting.allowHistory = Manufacture.allowHistory;
            setting.currencyCode = Manufacture.currency;
            setting.minNoDaysPerProgram = Manufacture.minDays;
            setting.isDeleted = false;
            setting.isActive = true;
            setting.programDiscount = Manufacture.programDiscount;

            setting.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        Manufacture.UpdateSetting = function () {
            blockUI.start("Loading...");

            var setting = new UpdateSettingsResource();

            if (Manufacture.orderType.type == "none") {
                setting.isSMS = false;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "sms") {
                setting.isSMS = true;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "mail") {
                setting.isSMS = false;
                setting.isMail = true;
            }
            else if (Manufacture.orderType.type == "both") {
                setting.isSMS = true;
                setting.isMail = true;
            }

            setting.isDeleted = false;
            setting.isPause = $scope.settingsPrepService.isPause;

            if (setting.isPause == true) {
                setting.maxPauseDays = $scope.settingsPrepService.maxPauseDays;
            }
            else if (setting.isPause == false) {
                setting.maxPauseDays = 0;
            }
            setting.allowHistory = $scope.settingsPrepService.allowHistory;
            setting.currencyCode = $scope.settingsPrepService.currencyCode;
            setting.minNoDaysPerProgram = $scope.settingsPrepService.minNoDaysPerProgram;
            setting.isDeleted = false;
            setting.isActive = true;
            setting.programDiscount = Manufacture.programDiscount;


            setting.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        $scope.EditBranchDialog = function (branchIdd) {
            blockUI.stop();
            Manufacture.branch = $scope.BranchPrepService.results.filter(x => x.branchId == branchIdd);

            $uibModal.open({
                templateUrl: './app/GlobalAdmin/setting/templates/editBranchFees.html',
                controller: 'editBranchFeesController',
                controllerAs: 'editBranchFeesCtrl',
                resolve: {
                    branchFeesPrepService: function () { return Manufacture.branch; }
                }
            });
        }

        function change(program, isDeleted) {

                        var updateObj = new UpdateProgramResource();
            updateObj.ProgramId = program.programId;
            if (!isDeleted)
                updateObj.isActive = (program.isActive == true ? false : true);
            updateObj.isDeleted = program.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshPrograms();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    program.isActive = updateObj.isActive;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }

        function refreshPrograms() {
            blockUI.start("Loading...");

            var k = GetProgramResource.gatAllPrograms().$promise.then(function (results) {
                $scope.programList = results;

                console.log($scope.programList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }


    }

})();
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

(function () {
    'use strict';

    angular
        .module('home')
        .controller('addOperationUserController', ['blockUI', 'UserRoleByIdPrepService','$stateParams', '$translate', '$state', 'UserResource', '$scope', 'ToastService', addOperationUserController]);

    function addOperationUserController(blockUI,UserRoleByIdPrepService, $stateParams, $translate, $state, UserResource, $scope, ToastService, ) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        var vm = this;
        vm.selectedTypeId = 0;
        blockUI.start("Loading...");
        vm.Role = UserRoleByIdPrepService;
        console.log(UserRoleByIdPrepService);
        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.UnSelectedPermissions = [];
        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.UnSelectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.UnSelectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.UnSelectedPermissions.indexOf(obj.permessionId);
                vm.UnSelectedPermissions.splice(index, 1);
            }
        }
        vm.AddNewUser = function () {

                        blockUI.start("Loading...");
            var newUser = new UserResource();
            newUser.fullName = vm.fullName;
            newUser.username = vm.userName;
            newUser.unSelectedRoles = vm.UnSelectedPermissions;
            newUser.email = vm.email;
            newUser.mobileNumber = vm.mobileNumber;
            newUser.password = vm.password;
            newUser.$createOperationUser({ userType: $stateParams.userType }).then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");
                        if ($scope.user.userTypeId == 1)
                            $state.go('RetailerUser');
                        if ($scope.user.userTypeId == 2)
                            $state.go('ManufactureUser');
                        if ($scope.user.userTypeId == 3)
                            $state.go('DistributerUser');
                        if ($scope.user.userTypeId == 4)
                            $state.go('users');
                        if ($scope.user.userTypeId == 5)
                            $state.go('IooUser');
                        if ($scope.user.userTypeId == 255)
                            $state.go('IoaUser');
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        vm.close = function () {
            if ($scope.user.userTypeId == 1)
                $state.go('RetailerUser');
            if ($scope.user.userTypeId == 2)
                $state.go('ManufactureUser');
            if ($scope.user.userTypeId == 3)
                $state.go('DistributerUser');
            if ($scope.user.userTypeId == 4)
                $state.go('users');
            if ($scope.user.userTypeId == 5)
                $state.go('IooUser');
            if ($scope.user.userTypeId == 255)
                $state.go('IoaUser');
        }
        blockUI.stop();




    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('addUserController', ['blockUI', 'UserRoleByIdPrepService','$stateParams', '$translate', '$state', 'UserResource', '$scope', 'ToastService', addUserController]);

    function addUserController(blockUI,UserRoleByIdPrepService, $stateParams, $translate, $state, UserResource, $scope, ToastService, ) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        var vm = this;
        vm.selectedRoleId = 0;
        blockUI.start("Loading...");
        vm.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

        vm.Role = UserRoleByIdPrepService;
        console.log(UserRoleByIdPrepService);
        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.UnSelectedPermissions = [];


        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.UnSelectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.UnSelectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.UnSelectedPermissions.indexOf(obj.permessionId);
                vm.UnSelectedPermissions.splice(index, 1);
            }
        }
        console.log(vm.permissionList);
        vm.AddNewUser = function () {

                        blockUI.start("Loading...");
            var newUser = new UserResource();
            newUser.fullName = vm.fullName;
            newUser.username = vm.userName;
            newUser.unSelectedRoles = vm.UnSelectedPermissions;
            newUser.email = vm.email;
            newUser.mobileNumber = vm.mobileNumber;
            newUser.password = vm.password;
            newUser.tenantId = $stateParams.tenantId;
            newUser.userType = $stateParams.userType;
            newUser.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");
                        if ($scope.user.userTypeId == 1)
                            $state.go('RetailerUser');
                        if ($scope.user.userTypeId == 2)
                            $state.go('ManufactureUser');
                        if ($scope.user.userTypeId == 3)
                            $state.go('DistributerUser');
                        if ($scope.user.userTypeId == 4)
                            $state.go('users');
                        if ($scope.user.userTypeId == 5)
                            $state.go('IooUser');
                        if ($scope.user.userTypeId == 255)
                            $state.go('IoaUser');
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        vm.close = function () {
            if ($scope.user.userTypeId == 1)
                $state.go('RetailerUser');
            if ($scope.user.userTypeId == 2)
                $state.go('ManufactureUser');
            if ($scope.user.userTypeId == 3)
                $state.go('DistributerUser');
            if ($scope.user.userTypeId == 4)
                $state.go('users');
            if ($scope.user.userTypeId == 5)
                $state.go('IooUser');
            if ($scope.user.userTypeId == 255)
                $state.go('IoaUser');
        }
        blockUI.stop();




    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('editUserController', ['$stateParams','UserRoleByIdPrepService', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',
            'EditUserPrepService', 'ToastService', editUserController]);


    function editUserController($stateParams,UserRoleByIdPrepService, blockUI, $scope, $filter, $translate, $state, UserResource,
        EditUserPrepService, ToastService) {

        blockUI.start("Loading...");

        $scope.isPaneShown = true;
        $scope.$emit('LOAD')
        var vm = this;

        vm.userObj = EditUserPrepService;

        vm.Role = UserRoleByIdPrepService;
        console.log(UserRoleByIdPrepService);
        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.UnSelectedPermissions = [];
        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.UnSelectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.UnSelectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.UnSelectedPermissions.indexOf(obj.permessionId);
                vm.UnSelectedPermissions.splice(index, 1);
            }
        }
        vm.EditUser = function () {
            blockUI.start("Loading...");
            vm.show = false;
            var updateUser = new UserResource();
            updateUser.userId = vm.userObj.userId;
            updateUser.fullName = vm.userObj.fullName;
            updateUser.username = vm.userObj.userName;
            updateUser.unSelectedRoles = vm.UnSelectedPermissions;
            updateUser.email = vm.userObj.email;
            updateUser.mobileNumber = vm.userObj.mobileNumber;
            updateUser.password = vm.userObj.password;

            updateUser.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        if ($scope.user.userTypeId == 1)
                            $state.go('RetailerUser');
                        if ($scope.user.userTypeId == 2)
                            $state.go('ManufactureUser');
                        if ($scope.user.userTypeId == 3)
                            $state.go('DistributerUser');
                        if ($scope.user.userTypeId == 4)
                            $state.go('users');
                        if ($scope.user.userTypeId == 5)
                            $state.go('IooUser');
                        if ($scope.user.userTypeId == 255)
                            $state.go('IoaUser');

                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.close = function () {

                        if ($scope.user.userTypeId == 1)
                $state.go('RetailerUser');
            if ($scope.user.userTypeId == 2)
                $state.go('ManufactureUser');
            if ($scope.user.userTypeId == 3)
                $state.go('DistributerUser');
            if ($scope.user.userTypeId == 4)
                $state.go('users');
            if ($scope.user.userTypeId == 5)
                $state.go('IooUser');
            if ($scope.user.userTypeId == 255)
                $state.go('IoaUser');
        }
        blockUI.stop();

    }

})();(function () {
    'use strict';

    angular
        .module('home')
        .controller('userController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userController]);

    function userController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        vm.close = function () {

                        $state.go('users');
        }


        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: vm.currentTenantType, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        vm.changeUserType = function (id) {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: id }).$promise.then(function (results) {
                vm.currentTenantType = id;
                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.userType = 2;
            updateObj.$changeRole({ userType: 2, userId: model.userId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
    }

}());(function () {
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
(function () {
    'use strict';

    angular
        .module('home')
        .controller('userDistributerController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userDistributerController]);

    function userDistributerController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        vm.close = function () {

                        $state.go('users');
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        refreshUsers()
        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 3, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null) {
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                            return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");

                    } else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userIoaController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userIoaController]);

    function userIoaController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading..."); 

        vm.showMore = function(element)
        {
            $(element.currentTarget).toggleClass( "child-table-collapse" );
        } 
        refreshUsers();
        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllAdminUsers({ userType: 5, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null){
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                        return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");

                }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId  }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userIooController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userIooController]);

    function userIooController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");


             vm.showMore = function(element)
        {
            $(element.currentTarget).toggleClass( "child-table-collapse" );
        } 
        refreshUsers()
        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllAdminUsers({ userType: 4, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null){
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                        return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId  }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userManufactureController', ['blockUI', '$translate', '$state', 'UserResource',
            '$scope', 'ToastService', userManufactureController]);

    function userManufactureController(blockUI, $translate, $state, UserResource, $scope, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

                var vm = this;
        vm.currentTenantType = 0;
        vm.masterUserId = 0;
        blockUI.start("Loading...");

                if ($scope.user.userTypeId == 4 || $scope.user.userTypeId == 5)
            refreshUsers()
        if ($scope.user.userTypeId == 2 || $scope.user.userTypeId == 7)
            refreshManufactureUsers($scope.user.tenantId);



        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 2, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        function refreshManufactureUsers(tenant) {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersForManufacture({ tenantId: tenant, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null){
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                        return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error"); 
                }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.userType = 2;
            updateObj.$changeRole({ userType: 2, userId: model.userId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userRetailerController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userRetailerController]);

    function userRetailerController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

                var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        refreshUsers();
        vm.close = function () {

                        $state.go('users');
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 1, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }



        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                        if (data.message != null){
                            if (data.message == "Optimistic concurrency failure, object has been modified.")
                            return;
                            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());